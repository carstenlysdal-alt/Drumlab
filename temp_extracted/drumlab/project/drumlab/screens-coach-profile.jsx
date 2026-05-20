// DrumLab — Coach (AI chat) + Profile

// ─────────────────────────────────────────────────────────────
// COACH (AI chat) — full screen overlay
// ─────────────────────────────────────────────────────────────
function CoachScreen({ t, dark, onClose }) {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    { role: 'ai', text: 'Hej Astrid 👋\nJeg er din AI Coach. Jeg har set, du arbejder med 16-dele hi-hat lige nu. Hvordan går det?' },
    { role: 'user', text: 'Det er svært at holde tempo når jeg tilføjer kick. Højre hånd bliver hurtig.' },
    { role: 'ai', text: 'Det er en klassisk udfordring — kroppen vil gerne synkronisere bevægelserne. Prøv det her:\n\n1.   Sæt metronomen til 70 BPM\n2.   Spil KUN hi-hat 16-dele i 8 takter\n3.   Hold tempo, og tilføj så kun kick på 1\n\nFokuser bevidst på at hi-hat-hånden IKKE accelererer. Vil du have, jeg åbner en øvelse til dig?' },
    { role: 'user', text: 'Ja tak.' },
  ]);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', text: input }];
    setInput('');
    setMessages(next);
    setTimeout(() => {
      setMessages([...next, { role: 'ai', text: 'Lad mig finde den…', typing: true }]);
      setTimeout(() => {
        setMessages([...next, { role: 'ai', text: 'Klar — jeg har bygget et 4-trins forløb til dig: starter i 60 BPM og bygger op til 100 BPM. Tryk Start når du er klar.' }]);
      }, 1100);
    }, 250);
  };

  const suggested = [
    'Forklar synkoper',
    'Vis paradiddle',
    'Hvad skal jeg øve i dag?',
    'Hjælp med 16-dele',
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: t.bg, zIndex: 130,
      display: 'flex', flexDirection: 'column', color: t.text, fontFamily: t.font,
      animation: 'slideUp 0.3s ease-out', overflow: 'hidden',
    }}>
      <div style={{ height: 62 }} />

      {/* Header */}
      <div style={{ padding: '4px 16px 14px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            width: 38, height: 38, borderRadius: '50%', background: 'transparent',
            border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IcBack size={16} /></button>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', background: t.accent, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(239,90,58,0.35)',
          }}><IcSpark size={20} color="#fff" /></div>
          <div style={{ flex: 1 }}>
            <Display t={t} size={20} style={{ lineHeight: 1 }}>AI Coach</Display>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.good }} />
              <span style={{ fontSize: 11, color: t.textMuted }}>Online · husker dit niveau</span>
            </div>
          </div>
          <button style={{
            width: 38, height: 38, borderRadius: '50%', background: 'transparent',
            border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IcMore size={18} /></button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '18px 16px 8px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 12,
          }}>
            <div style={{
              maxWidth: '82%',
              padding: '11px 14px', borderRadius: 18,
              borderBottomRightRadius: m.role === 'user' ? 6 : 18,
              borderBottomLeftRadius: m.role === 'ai' ? 6 : 18,
              background: m.role === 'user' ? t.accent : t.surface,
              color: m.role === 'user' ? '#fff' : t.text,
              border: m.role === 'ai' ? `1px solid ${t.border}` : 'none',
              fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap',
              fontWeight: m.role === 'user' ? 500 : 400,
            }}>
              {m.text}
              {m.typing && <span style={{ marginLeft: 4, opacity: 0.5 }}>•••</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested chips */}
      <div style={{
        padding: '8px 16px 4px', display: 'flex', gap: 8, overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {suggested.map((s, i) => (
          <button key={i} onClick={() => setInput(s)} style={{
            flexShrink: 0, padding: '8px 13px', borderRadius: 999,
            background: 'transparent', border: `1px solid ${t.border}`,
            color: t.textMuted, fontSize: 12, fontWeight: 500, cursor: 'pointer',
            fontFamily: t.font, whiteSpace: 'nowrap',
          }}>{s}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 16px 22px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: 999, padding: '6px 6px 6px 16px',
        }}>
          <button style={{
            width: 32, height: 32, borderRadius: '50%', background: 'transparent',
            border: 'none', color: t.textMuted, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IcAttach size={18} /></button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Stil et spørgsmål…"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: t.font, fontSize: 14, color: t.text, padding: '8px 0',
            }}
          />
          <button onClick={send} style={{
            width: 38, height: 38, borderRadius: '50%',
            background: input.trim() ? t.accent : t.surface2,
            border: 'none', color: input.trim() ? '#fff' : t.textDim,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IcSend size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────
function ProfileScreen({ t, dark, setDark }) {
  return (
    <div style={{ color: t.text, fontFamily: t.font, padding: '4px 0 40px' }}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: t.textMuted }}>Profil</div>
        <button style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcMore size={18} /></button>
      </div>

      {/* Hero */}
      <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: t.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: t.serif, fontStyle: 'italic', fontSize: 36, color: '#fff',
            boxShadow: '0 10px 28px rgba(239,90,58,0.4)',
          }}>AL</div>
        </div>
        <Display t={t} size={28} style={{ marginTop: 16 }}>Astrid Lind</Display>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: t.accent, marginTop: 6 }}>Niveau 4 · Intermediate</div>

        {/* xp bar */}
        <div style={{ marginTop: 18, padding: '0 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.textMuted, marginBottom: 6, fontFamily: t.mono, fontWeight: 600, letterSpacing: 0.5 }}>
            <span>NIV 4</span>
            <span>620 / 1000 XP</span>
            <span>NIV 5</span>
          </div>
          <Progress pct={62} t={t} h={6} />
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: <IcFlame size={16} color={t.accent} />, value: '12', label: 'Dage streak' },
            { icon: <IcClock size={16} color={t.text} />, value: '48t', label: 'Total øvetid' },
            { icon: <IcCalendar size={16} color={t.text} />, value: '34/60', label: 'Aktive dage' },
            { icon: <IcTrophy size={16} color={t.text} />, value: '2', label: 'Forløb færdige' },
          ].map((s, i) => (
            <div key={i} style={{
              background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 16, padding: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {s.icon}
                <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</span>
              </div>
              <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 26, marginTop: 6, lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ padding: '24px 20px 0' }}>
        <SectionLabel t={t}>Mærker</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { icon: <IcFlame size={20} />, label: '7 dage', earned: true },
            { icon: <IcTrophy size={20} />, label: 'Niv. 4', earned: true },
            { icon: <IcWave size={20} />, label: 'Groove', earned: true },
            { icon: <IcLock size={18} />, label: 'Speed', earned: false },
          ].map((b, i) => (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: 16, background: t.surface,
              border: `1px solid ${t.border}`, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 6, opacity: b.earned ? 1 : 0.4,
            }}>
              <div style={{ color: b.earned ? t.accent : t.textDim }}>{b.icon}</div>
              <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '26px 20px 0' }}>
        <SectionLabel t={t}>Indstillinger</SectionLabel>
        <div style={{
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: 18, overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            borderBottom: `1px solid ${t.border}`,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', border: `1px solid ${t.borderStrong}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text,
            }}>{dark ? <IcMoon size={14} /> : <IcSun size={14} />}</div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>Mørkt tema</div>
            <button onClick={() => setDark(!dark)} style={{
              width: 46, height: 26, borderRadius: 999, position: 'relative',
              background: dark ? t.accent : t.surface2,
              border: 'none', cursor: 'pointer', transition: 'background 0.2s',
            }}>
              <div style={{
                position: 'absolute', top: 2, left: dark ? 22 : 2, transition: 'left 0.2s',
                width: 22, height: 22, borderRadius: '50%', background: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              }} />
            </button>
          </div>
          {[
            { icon: <IcBell size={14} />, label: 'Notifikationer', detail: 'Hver dag kl. 18' },
            { icon: <IcMetro size={14} />, label: 'Standard metronom', detail: '92 BPM' },
            { icon: <IcUser size={14} />, label: 'Konto og abonnement', detail: 'Pro' },
            { icon: <IcLogout size={14} />, label: 'Log ud' },
          ].map((s, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', border: `1px solid ${t.borderStrong}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text,
              }}>{s.icon}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{s.label}</div>
              {s.detail && <span style={{ fontSize: 12, color: t.textMuted, marginRight: 2 }}>{s.detail}</span>}
              <IcChev size={14} color={t.textDim} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 28, fontSize: 10, color: t.textDim, fontFamily: t.mono, letterSpacing: 1, textTransform: 'uppercase' }}>
        DrumLab v1.2.0
      </div>
    </div>
  );
}

Object.assign(window, { CoachScreen, ProfileScreen });
