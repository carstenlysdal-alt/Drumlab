'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import Header from '@/components/Header';

type Mode = 'login' | 'signup' | 'reset';

export default function LoginPage() {
  const router = useRouter();
  const { login, signUpWithEmail, signInWithEmail, resetPassword } = useAuth();

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!displayName.trim()) { setErrorMsg('Skriv dit navn.'); setLoading(false); return; }
        await signUpWithEmail(email, password, displayName.trim());
        router.push('/dashboard');
      } else if (mode === 'login') {
        await signInWithEmail(email, password);
        router.push('/dashboard');
      } else {
        await resetPassword(email);
        setSuccessMsg('Vi har sendt et link til at nulstille dit kodeord.');
        setMode('login');
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/email-already-in-use') setErrorMsg('Denne email er allerede registreret. Log ind i stedet.');
      else if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') setErrorMsg('Forkert kodeord. Prøv igen eller nulstil det.');
      else if (code === 'auth/user-not-found') setErrorMsg('Vi kan ikke finde en konto med den email.');
      else if (code === 'auth/weak-password') setErrorMsg('Kodeordet skal være mindst 6 tegn.');
      else if (code === 'auth/invalid-email') setErrorMsg('Ugyldig email-adresse.');
      else setErrorMsg('Der opstod en fejl. Prøv igen.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await login();
      router.push('/dashboard');
    } catch {
      setErrorMsg('Google-login fejlede. Prøv igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem' }}>

          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>
              {mode === 'signup' ? 'Opret konto' : mode === 'reset' ? 'Nulstil kodeord' : 'Log ind'}
            </h1>
            <p className="text-muted-color" style={{ fontSize: '0.9rem' }}>
              {mode === 'signup'
                ? 'Lav en konto og start din rejse som trommeslager.'
                : mode === 'reset'
                ? 'Vi sender dig et link til at vælge et nyt kodeord.'
                : 'Velkommen tilbage.'}
            </p>
          </div>

          {successMsg && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', fontSize: '0.875rem', color: '#5dd39e' }}>
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', fontSize: '0.875rem', color: '#f87171' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label" htmlFor="displayName">Dit navn</label>
                <input
                  id="displayName"
                  type="text"
                  className="form-control"
                  placeholder="Hvad skal vi kalde dig?"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="din@email.dk"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete={mode === 'signup' ? 'email' : 'username'}
              />
            </div>

            {mode !== 'reset' && (
              <div className="form-group">
                <label className="form-label" htmlFor="password">Kodeord</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder={mode === 'signup' ? 'Mindst 6 tegn' : '••••••••'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              style={{ marginTop: '0.5rem' }}
              disabled={loading}
            >
              {loading
                ? 'Arbejder...'
                : mode === 'signup'
                ? 'Opret konto'
                : mode === 'reset'
                ? 'Send nulstillingslink'
                : 'Log ind'}
            </button>
          </form>

          {mode !== 'reset' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                <span className="text-muted-color" style={{ fontSize: '0.8rem' }}>eller</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              </div>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="btn btn-secondary w-full"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Fortsæt med Google
              </button>
            </>
          )}

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            {mode === 'login' && (
              <>
                <button onClick={() => { setMode('signup'); setErrorMsg(''); }} className="btn-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--accent-purple)' }}>
                  Har du ikke en konto? Opret dig
                </button>
                <button onClick={() => { setMode('reset'); setErrorMsg(''); }} className="btn-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Glemt kodeord?
                </button>
              </>
            )}
            {mode === 'signup' && (
              <button onClick={() => { setMode('login'); setErrorMsg(''); }} className="btn-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--accent-purple)' }}>
                Har du allerede en konto? Log ind
              </button>
            )}
            {mode === 'reset' && (
              <button onClick={() => { setMode('login'); setErrorMsg(''); }} className="btn-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--accent-purple)' }}>
                Tilbage til login
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
