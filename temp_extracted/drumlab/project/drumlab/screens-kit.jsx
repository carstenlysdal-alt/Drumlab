// DrumLab — Studio Kit (virtual drum kit)

// ─────────────────────────────────────────────────────────────
// Studio Kit — overview (reference card style)
// ─────────────────────────────────────────────────────────────
function StudioKitScreen({ t, dark, onOpenPads }) {
  return (
    <div style={{ color: t.text, fontFamily: t.font, padding: '4px 0 40px' }}>
      {/* header */}
      <div style={{ padding: '4px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: t.textMuted }}>Trommesæt</div>
        <button style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcMore size={18} /></button>
      </div>

      <div style={{ padding: '0 24px' }}>
        {/* illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 14px', position: 'relative' }}>
          <div style={{
            position: 'absolute', width: 240, height: 180,
            background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 65%)`,
            borderRadius: '50%', top: 0,
          }} />
          <div style={{ position: 'relative' }}>
            <IllKit size={300} color={t.accent} sw={1.3}/>
          </div>
        </div>

        {/* title */}
        <Display t={t} size={36} style={{ marginBottom: 6 }}>Studio Kit</Display>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: t.accent, marginBottom: 14 }}>
          Dit virtuelle trommesæt
        </div>

        {/* blurb */}
        <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 15, color: t.text, opacity: 0.8, lineHeight: 1.5 }}>
          Et professionelt trommesæt med realistisk lyd og respons.
        </div>

        {/* feature list */}
        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { icon: <IcWave size={18} />, title: 'Realistisk lyd', sub: 'Optaget i studiekvalitet' },
            { icon: <IcTuner size={18} />, title: 'Tilpas dit kit', sub: 'Justér lyd og opsætning' },
            { icon: <IcMic size={18} />, title: 'Responsiv følelse', sub: 'Naturlig spiloplevelse' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                border: `1px solid ${t.borderStrong}`, color: t.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 18, lineHeight: 1.1 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 30 }}>
          <CTA t={t} onClick={onOpenPads} icon={<IcPlay size={13} fill color="#fff"/>}>Åbn trommesæt</CTA>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pad play view (overlay)
// ─────────────────────────────────────────────────────────────
function KitPadView({ t, dark, onClose }) {
  const pads = [
    { label: 'Hi-hat', sub: 'Closed', color: '#ef5a3a', accent: true, key: 'h' },
    { label: 'Hi-hat', sub: 'Open',   color: '#ef5a3a', key: 'g' },
    { label: 'Crash',  sub: '16"',    color: '#ef5a3a', key: 'c' },
    { label: 'Snare',  sub: 'Center', color: '#ef5a3a', accent: true, key: 's' },
    { label: 'Tom 1',  sub: '10"',    color: '#ef5a3a', key: 't' },
    { label: 'Tom 2',  sub: '12"',    color: '#ef5a3a', key: 'y' },
    { label: 'Floor',  sub: '14"',    color: '#ef5a3a', key: 'f' },
    { label: 'Ride',   sub: '20"',    color: '#ef5a3a', key: 'r' },
    { label: 'Kick',   sub: 'Bass',   color: '#ef5a3a', accent: true, key: 'k' },
  ];

  const [active, setActive] = React.useState({});
  const [recording, setRecording] = React.useState(false);

  const hit = (i) => {
    setActive(a => ({ ...a, [i]: Date.now() }));
    setTimeout(() => setActive(a => {
      const next = { ...a };
      delete next[i];
      return next;
    }), 240);
    // tiny audio via web audio for fun (optional)
    try {
      const ctx = window.__kitAudio || (window.__kitAudio = new (window.AudioContext || window.webkitAudioContext)());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const isKick = pads[i].label === 'Kick';
      const isSnare = pads[i].label === 'Snare';
      o.type = isKick ? 'sine' : isSnare ? 'triangle' : 'square';
      o.frequency.value = isKick ? 60 : isSnare ? 200 : (300 + i * 40);
      g.gain.value = 0.06;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (isKick ? 0.18 : 0.08));
      o.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, background: t.bg, zIndex: 150,
      display: 'flex', flexDirection: 'column', color: t.text, fontFamily: t.font,
      animation: 'slideUp 0.3s ease-out', overflow: 'hidden',
    }}>
      <div style={{ height: 62 }} />

      {/* header */}
      <div style={{ padding: '0 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcBack size={16} /></button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, textTransform: 'uppercase' }}>Studio Kit</div>
          <Display t={t} size={16} style={{ marginTop: 2 }}>Live play</Display>
        </div>
        <button onClick={() => setRecording(!recording)} style={{
          width: 38, height: 38, borderRadius: '50%',
          background: recording ? t.accent : 'transparent',
          border: `1px solid ${recording ? t.accent : t.border}`,
          color: recording ? '#fff' : t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcMic size={16} /></button>
      </div>

      {/* mini kit */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 16px', position: 'relative' }}>
        <div style={{
          position: 'absolute', width: 200, height: 130,
          background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 60%)`,
          borderRadius: '50%', top: 0,
        }} />
        <div style={{ position: 'relative' }}>
          <IllKit size={200} color={t.accent} sw={1.3}/>
        </div>
      </div>

      {/* pad grid */}
      <div style={{ flex: 1, padding: '0 16px', overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {pads.map((p, i) => {
            const isActive = active[i];
            return (
              <button key={i} onMouseDown={() => hit(i)} onTouchStart={() => hit(i)} style={{
                aspectRatio: '1', borderRadius: 18,
                background: isActive ? t.accent : t.surface,
                border: `1px solid ${isActive ? t.accent : (p.accent ? t.borderStrong : t.border)}`,
                color: isActive ? '#fff' : t.text, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontFamily: t.font, transition: 'all 0.08s ease-out',
                transform: isActive ? 'scale(0.96)' : 'scale(1)',
                boxShadow: isActive ? '0 0 30px rgba(239,90,58,0.4)' : 'none',
                padding: 0,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.7 }}>{p.sub}</div>
                <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 22, marginTop: 4, lineHeight: 1 }}>{p.label}</div>
              </button>
            );
          })}
        </div>

        {/* transport */}
        <div style={{
          marginTop: 18, padding: 14,
          background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: recording ? t.accent : t.textDim }} />
            <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{recording ? 'Optager' : 'Klar'}</div>
          </div>
          <div style={{ fontFamily: t.mono, fontSize: 14, fontWeight: 600 }}>00:00</div>
          <button style={{
            background: 'transparent', border: `1px solid ${t.border}`, color: t.text,
            padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
            fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 6, fontFamily: t.font,
          }}><IcMetro size={12} /> 92 BPM</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StudioKitScreen, KitPadView });
