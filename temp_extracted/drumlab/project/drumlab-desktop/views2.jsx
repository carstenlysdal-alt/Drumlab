// DrumLab Desktop — Studio Kit + Profile + Library

// ─────────────────────────────────────────────────────────────
// STUDIO KIT (interactive)
// ─────────────────────────────────────────────────────────────
function KitView({ t, dark }) {
  const pads = [
    { label: 'Hi-hat', sub: 'Closed', accent: true, freq: 800 },
    { label: 'Hi-hat', sub: 'Open',   freq: 700 },
    { label: 'Crash',  sub: '16"',    freq: 600 },
    { label: 'Snare',  sub: 'Center', accent: true, freq: 200 },
    { label: 'Tom 1',  sub: '10"',    freq: 350 },
    { label: 'Tom 2',  sub: '12"',    freq: 280 },
    { label: 'Floor',  sub: '14"',    freq: 180 },
    { label: 'Ride',   sub: '20"',    freq: 500 },
    { label: 'Kick',   sub: 'Bass',   accent: true, freq: 60 },
  ];

  const [active, setActive] = React.useState({});
  const [recording, setRecording] = React.useState(false);
  const [bpm, setBpm] = React.useState(92);
  const [metronome, setMetronome] = React.useState(false);

  // mixer state
  const [vols, setVols] = React.useState({ kick: 80, snare: 70, hihat: 65, toms: 60, cymbals: 55 });

  const hit = (i) => {
    setActive(a => ({ ...a, [i]: Date.now() }));
    setTimeout(() => setActive(a => {
      const next = { ...a }; delete next[i]; return next;
    }), 240);
    try {
      const ctx = window.__dkitAudio || (window.__dkitAudio = new (window.AudioContext || window.webkitAudioContext)());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const p = pads[i];
      o.type = p.label === 'Kick' ? 'sine' : p.label === 'Snare' ? 'triangle' : 'square';
      o.frequency.value = p.freq;
      g.gain.value = 0.06;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (p.label === 'Kick' ? 0.18 : 0.08));
      o.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  };

  // keyboard support
  React.useEffect(() => {
    const keys = { 'h': 0, 'g': 1, 'c': 2, 's': 3, 't': 4, 'y': 5, 'f': 6, 'r': 7, 'k': 8, ' ': 8 };
    const onKey = (e) => {
      const idx = keys[e.key.toLowerCase()];
      if (idx !== undefined) { e.preventDefault(); hit(idx); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={{ padding: '28px 48px 60px', color: t.text, fontFamily: t.font }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <DSection t={t} color={t.accent}>Dit virtuelle trommesæt</DSection>
          <DDisplay t={t} size={56}>Studio Kit</DDisplay>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setRecording(!recording)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: recording ? t.accent : 'transparent',
            border: `1px solid ${recording ? t.accent : t.borderStrong}`,
            color: recording ? '#fff' : t.text,
            padding: '10px 16px', borderRadius: 999, cursor: 'pointer',
            fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase',
            fontFamily: t.font,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: recording ? '#fff' : t.accent }} />
            {recording ? 'Stop' : 'Optag'}
          </button>
          <DCTA t={t} variant="ghost" icon={<IcLoop size={14}/>}>Eksport</DCTA>
        </div>
      </div>

      {/* Layout: kit illustration center + pads bottom + mixer right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        {/* Center column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Kit illustration */}
          <DCard t={t} padding={0} style={{ position: 'relative', overflow: 'hidden', height: 280 }}>
            <div style={{
              position: 'absolute', width: 400, height: 400,
              background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 65%)`,
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IllKit size={420} color={t.accent} sw={1.4}/>
            </div>
            {/* HUD */}
            <div style={{ position: 'absolute', top: 18, left: 22, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.good }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: t.textMuted }}>Live</span>
            </div>
            <div style={{ position: 'absolute', top: 18, right: 22, fontFamily: t.mono, fontSize: 13, color: t.text, fontWeight: 600 }}>
              {recording ? '● REC' : ''}
            </div>
            <div style={{ position: 'absolute', bottom: 18, left: 22, fontFamily: t.serif, fontStyle: 'italic', fontSize: 18, whiteSpace: 'nowrap' }}>
              Maple Studio Kit
            </div>
            <div style={{ position: 'absolute', bottom: 18, right: 22, fontFamily: t.mono, fontSize: 11, color: t.textMuted, letterSpacing: 0.5 }}>
              4-PIECE · OAK SHELLS
            </div>
          </DCard>

          {/* Pads */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {pads.map((p, i) => {
              const isActive = active[i];
              return (
                <button key={i} onMouseDown={() => hit(i)} onTouchStart={() => hit(i)} style={{
                  height: 96, borderRadius: 16,
                  background: isActive ? t.accent : t.surface,
                  border: `1px solid ${isActive ? t.accent : (p.accent ? t.borderStrong : t.border)}`,
                  color: isActive ? '#fff' : t.text, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontFamily: t.font, transition: 'all 0.08s ease-out',
                  transform: isActive ? 'scale(0.96)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 32px ${t.accent}66` : 'none',
                  padding: 0, position: 'relative',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.7, whiteSpace: 'nowrap' }}>{p.sub}</div>
                  <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 24, marginTop: 4, lineHeight: 1, whiteSpace: 'nowrap' }}>{p.label}</div>
                </button>
              );
            })}
          </div>

          {/* Transport */}
          <DCard t={t} padding={16} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button onClick={() => setMetronome(!metronome)} style={{
                width: 44, height: 44, borderRadius: '50%',
                background: metronome ? t.accent : t.surface2,
                border: 'none', color: metronome ? '#fff' : t.text, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><IcMetro size={18} /></button>
              <div>
                <div style={{ fontFamily: t.mono, fontSize: 22, fontWeight: 600 }}>{bpm}</div>
                <div style={{ fontSize: 9, color: t.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700 }}>BPM</div>
              </div>
              <input type="range" min={40} max={220} value={bpm} onChange={e => setBpm(+e.target.value)} style={{
                width: 220, accentColor: t.accent,
              }}/>
            </div>
            <div style={{ fontFamily: t.mono, fontSize: 12, color: t.textMuted, letterSpacing: 0.5 }}>
              TASTATUR: H · G · C · S · T · Y · F · R · ␣
            </div>
          </DCard>
        </div>

        {/* Mixer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <DCard t={t} padding={20}>
            <DSection t={t}>Mixer</DSection>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { id: 'kick', label: 'Kick' },
                { id: 'snare', label: 'Snare' },
                { id: 'hihat', label: 'Hi-hat' },
                { id: 'toms', label: 'Toms' },
                { id: 'cymbals', label: 'Cymbals' },
              ].map(ch => (
                <div key={ch.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                    <span style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 14, whiteSpace: 'nowrap' }}>{ch.label}</span>
                    <span style={{ fontFamily: t.mono, color: t.textMuted, fontSize: 11 }}>{vols[ch.id]}</span>
                  </div>
                  <input type="range" min={0} max={100} value={vols[ch.id]}
                    onChange={e => setVols(v => ({ ...v, [ch.id]: +e.target.value }))}
                    style={{ width: '100%', accentColor: t.accent }} />
                </div>
              ))}
            </div>
          </DCard>

          <DCard t={t} padding={20}>
            <DSection t={t}>Kit</DSection>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: 'Maple Studio', sub: 'Naturlig', active: true },
                { name: 'Vintage Birch', sub: 'Varm' },
                { name: 'Punch Steel', sub: 'Aggressiv' },
                { name: 'Jazz Brushwork', sub: 'Subtil' },
              ].map((k, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  background: k.active ? t.accentSoft : 'transparent',
                  border: `1px solid ${k.active ? t.accent : t.border}`,
                  borderRadius: 12, cursor: 'pointer',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: k.active ? 'none' : `1px solid ${t.borderStrong}`,
                    background: k.active ? t.accent : 'transparent',
                    color: k.active ? '#fff' : t.textMuted,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{k.active ? <IcCheck size={13} /> : <TabKit size={14} color={t.textMuted} sw={1.5}/>}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{k.name}</div>
                    <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1, letterSpacing: 0.5 }}>{k.sub.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </DCard>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────
function ProfileView({ t, dark, setDark }) {
  return (
    <div style={{ padding: '36px 48px 60px', color: t.text, fontFamily: t.font }}>
      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 32 }}>
        <div style={{
          width: 120, height: 120, borderRadius: '50%', background: t.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: t.serif, fontStyle: 'italic', fontSize: 48,
          boxShadow: '0 14px 38px rgba(239,90,58,0.45)',
        }}>AL</div>
        <div style={{ flex: 1 }}>
          <DSection t={t} color={t.accent}>Niveau 4 · Intermediate · Pro</DSection>
          <DDisplay t={t} size={56}>Astrid Lind</DDisplay>
          <div style={{ marginTop: 16, maxWidth: 360 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.textMuted, marginBottom: 6, fontFamily: t.mono, fontWeight: 600, letterSpacing: 0.5 }}>
              <span>NIV 4</span>
              <span>620 / 1000 XP</span>
              <span>NIV 5</span>
            </div>
            <DProgress pct={62} t={t} h={6} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <DCTA t={t} variant="ghost">Rediger profil</DCTA>
          <DCTA t={t}>Del</DCTA>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 36 }}>
        {[
          { icon: <IcFlame size={16} color={t.accent} />, value: '12', label: 'Dage streak' },
          { icon: <IcClock size={16} />, value: '48t', label: 'Total øvetid' },
          { icon: <IcCalendar size={16} />, value: '34/60', label: 'Aktive dage' },
          { icon: <IcTrophy size={16} />, value: '2', label: 'Forløb færdige' },
        ].map((s, i) => (
          <DCard key={i} t={t} padding={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', border: `1px solid ${t.borderStrong}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text,
              }}>{s.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', color: t.textMuted }}>{s.label}</span>
            </div>
            <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 40, marginTop: 12, lineHeight: 1 }}>{s.value}</div>
          </DCard>
        ))}
      </div>

      {/* 2 cols: Activity heatmap + Settings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
        {/* Heatmap */}
        <div>
          <DSection t={t}>Aktivitet — sidste 12 uger</DSection>
          <DCard t={t} padding={24}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6 }}>
              {Array.from({ length: 84 }).map((_, i) => {
                // pseudo-random density
                const v = ((Math.sin(i * 2.4) + Math.cos(i * 1.7)) + 2) / 4;
                const intensity = i < 4 ? 0 : v;
                const op = intensity < 0.2 ? 0.06 : intensity < 0.4 ? 0.25 : intensity < 0.65 ? 0.55 : 0.95;
                return (
                  <div key={i} style={{
                    aspectRatio: '1', borderRadius: 4,
                    background: intensity < 0.05 ? t.surface2 : t.accent,
                    opacity: intensity < 0.05 ? 1 : op,
                  }} />
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <span style={{ fontSize: 11, color: t.textMuted, fontFamily: t.mono, letterSpacing: 0.5 }}>FEB 2026 — MAJ 2026</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: t.textMuted, fontFamily: t.mono, letterSpacing: 0.5 }}>
                <span>MIN</span>
                {[0.1, 0.3, 0.55, 0.85].map((op, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: t.accent, opacity: op }}/>
                ))}
                <span>MAX</span>
              </div>
            </div>
          </DCard>

          <div style={{ marginTop: 28 }}>
            <DSection t={t}>Mærker</DSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
              {[
                { icon: <IcFlame size={22} />, label: '7 dage', earned: true },
                { icon: <IcTrophy size={22} />, label: 'Niv. 4', earned: true },
                { icon: <IcWave size={22} />, label: 'Groove', earned: true },
                { icon: <IcMic size={22} />, label: 'Optag', earned: true },
                { icon: <IcLock size={20} />, label: 'Speed', earned: false },
                { icon: <IcLock size={20} />, label: 'Polyrytme', earned: false },
              ].map((b, i) => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 14, background: t.surface,
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
        </div>

        {/* Settings */}
        <div>
          <DSection t={t}>Indstillinger</DSection>
          <DCard t={t} padding={0}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
              borderBottom: `1px solid ${t.border}`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', border: `1px solid ${t.borderStrong}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{dark ? <IcMoon size={14} /> : <IcSun size={14} />}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>Mørkt tema</div>
              <button onClick={() => setDark(!dark)} style={{
                width: 46, height: 26, borderRadius: 999, position: 'relative',
                background: dark ? t.accent : t.surface2,
                border: 'none', cursor: 'pointer',
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
              { icon: <IcUser size={14} />, label: 'Konto', detail: 'Pro' },
              { icon: <IcLogout size={14} />, label: 'Log ud' },
            ].map((s, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', border: `1px solid ${t.borderStrong}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text,
                }}>{s.icon}</div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{s.label}</div>
                {s.detail && <span style={{ fontSize: 12, color: t.textMuted }}>{s.detail}</span>}
                <IcChev size={14} color={t.textDim} />
              </div>
            ))}
          </DCard>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LIBRARY (simple list)
// ─────────────────────────────────────────────────────────────
function LibraryView({ t, dark }) {
  return (
    <div style={{ padding: '36px 48px 60px', color: t.text, fontFamily: t.font }}>
      <DSection t={t}>Gemte ressourcer</DSection>
      <DDisplay t={t} size={48} style={{ marginBottom: 28 }}>Bibliotek</DDisplay>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { tag: 'NODER', title: 'Basic Rock Groove', sub: '4/4 · 92 BPM' },
          { tag: 'NODER', title: 'Half-time Shuffle', sub: '4/4 · 84 BPM' },
          { tag: 'VIDEO', title: 'Paradiddles fra nul', sub: '7:48 · Sofie Krarup' },
          { tag: 'VIDEO', title: 'Linear fills i 4/4', sub: '11:02 · Daniel Lund' },
          { tag: 'OPTAGELSE', title: 'Take 04 — 16-dele', sub: '2:18 · I går' },
          { tag: 'OPTAGELSE', title: 'Take 02 — Ghost notes', sub: '1:55 · 2 dage' },
        ].map((it, i) => (
          <DCard key={i} t={t} padding={20} style={{ cursor: 'pointer' }}>
            <DSection t={t} color={t.accent}>{it.tag}</DSection>
            <DDisplay t={t} size={20} style={{ marginBottom: 8 }}>{it.title}</DDisplay>
            <div style={{ fontSize: 11, color: t.textMuted, fontFamily: t.mono, letterSpacing: 0.5 }}>{it.sub.toUpperCase()}</div>
          </DCard>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { KitView, ProfileView, LibraryView });
