// DrumLab — design tokens + Home screen (editorial coral)

// ─────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────
const tokens = (dark) => ({
  bg: dark ? '#0a0a0a' : '#f4f1ec',
  bgGradient: dark ? '#0a0a0a' : '#f4f1ec',
  surface: dark ? '#161618' : '#ffffff',
  surface2: dark ? '#1f1f22' : '#ebe7e0',
  surfaceElev: dark ? '#262629' : '#ffffff',
  border: dark ? 'rgba(255,255,255,0.07)' : 'rgba(20,20,28,0.08)',
  borderStrong: dark ? 'rgba(255,255,255,0.14)' : 'rgba(20,20,28,0.14)',
  text: dark ? '#f4f1ec' : '#16161a',
  textMuted: dark ? '#8a8580' : '#6e6a62',
  textDim: dark ? '#56524c' : '#a8a39a',
  accent: '#ef5a3a',         // coral red
  accentDeep: '#d94527',
  accentSoft: dark ? 'rgba(239,90,58,0.13)' : 'rgba(239,90,58,0.10)',
  accentText: dark ? '#f5b8a8' : '#a83419',
  good: '#5dd39e',
  goodSoft: dark ? 'rgba(93,211,158,0.13)' : 'rgba(93,211,158,0.14)',
  mono: 'ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace',
  font: '-apple-system, "SF Pro Text", system-ui, sans-serif',
  serif: '"DM Serif Display", "Playfair Display", Georgia, serif',
});

// ─────────────────────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────────────────────
function SectionLabel({ children, t, color }) {
  return (
    <div style={{
      fontFamily: t.font, fontSize: 11, fontWeight: 600, letterSpacing: 1.8,
      textTransform: 'uppercase', color: color || t.textMuted, marginBottom: 12,
    }}>{children}</div>
  );
}

function Card({ children, t, style = {}, onClick, padding = 18 }) {
  return (
    <div onClick={onClick} style={{
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 20, padding, cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

function Pill({ children, t, tone = 'default' }) {
  const map = {
    default: { bg: t.surface2, fg: t.textMuted },
    accent: { bg: t.accentSoft, fg: t.accentText },
    good: { bg: t.goodSoft, fg: t.good },
  };
  const c = map[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: c.bg, color: c.fg, padding: '4px 9px',
      borderRadius: 999, fontSize: 11, fontWeight: 600,
      fontFamily: t.font, letterSpacing: 0.2,
    }}>{children}</span>
  );
}

function Progress({ pct, t, h = 6, color }) {
  return (
    <div style={{ width: '100%', height: h, background: t.surface2, borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color || t.accent, borderRadius: 999 }} />
    </div>
  );
}

// Editorial CTA — full-width pill, uppercase, letter-spaced
function CTA({ children, t, onClick, variant = 'primary', icon }) {
  const isPrimary = variant === 'primary';
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '16px 18px', borderRadius: 999,
      background: isPrimary ? t.accent : 'transparent',
      color: isPrimary ? '#fff' : t.text,
      border: isPrimary ? 'none' : `1px solid ${t.borderStrong}`,
      fontFamily: t.font, fontSize: 13, fontWeight: 700,
      letterSpacing: 2, textTransform: 'uppercase',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      boxShadow: isPrimary ? '0 8px 24px rgba(239,90,58,0.3)' : 'none',
    }}>
      {icon}{children}
    </button>
  );
}

// Editorial serif italic display
function Display({ children, t, size = 32, style = {} }) {
  return (
    <div style={{
      fontFamily: t.serif, fontStyle: 'italic', fontSize: size,
      lineHeight: 1.05, color: t.text, letterSpacing: -0.3, ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
function HomeScreen({ t, dark, setDark, onOpenLesson, onTab, onOpenCoach }) {
  return (
    <div style={{ padding: '4px 20px 40px', color: t.text, fontFamily: t.font }}>
      {/* Top row: greeting + bell */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* tiny brand mark */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2" strokeLinecap="round">
            <path d="M3 12h2l2-6 3 12 3-14 3 14 3-12 2 6h3"/>
          </svg>
          <Display t={t} size={20}>Hej, Astrid</Display>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onOpenCoach} style={{
            width: 38, height: 38, borderRadius: '50%', background: 'transparent',
            border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IcSpark size={16} color={t.accent} /></button>
          <button style={{
            width: 38, height: 38, borderRadius: '50%', background: 'transparent',
            border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IcBell size={16} /></button>
        </div>
      </div>

      {/* DAILY GOAL — radial ring */}
      <SectionLabel t={t}>Dagligt mål</SectionLabel>
      <Card t={t} padding={20} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <RadialProgress size={104} pct={73} color={t.accent} track={dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'} sw={8} t={t} label="73%" />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: t.mono, fontSize: 14, fontWeight: 600 }}>
            22 <span style={{ color: t.textMuted, fontWeight: 500 }}>/ 30 min</span>
          </div>
          <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 16, marginTop: 4, color: t.text, lineHeight: 1.25 }}>
            Fortsæt det gode arbejde
          </div>
          <button onClick={() => onTab('practice')} style={{
            marginTop: 12, background: 'transparent', border: 'none',
            color: t.accent, fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
            textTransform: 'uppercase', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>Se detaljer <IcChev size={11} color={t.accent}/></button>
        </div>
      </Card>

      {/* CONTINUE WHERE YOU LEFT OFF */}
      <div style={{ marginTop: 28 }}>
        <SectionLabel t={t}>Fortsæt hvor du slap</SectionLabel>
        <Card t={t} padding={16} onClick={() => onOpenLesson('rock-groove-7')} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{
            width: 44, height: 44, borderRadius: '50%', background: t.accent,
            border: 'none', color: '#fff', cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(239,90,58,0.4)',
          }}><IcPlay size={16} fill color="#fff" /></button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Display t={t} size={17} style={{ lineHeight: 1.15 }}>Paradiddle Grooves</Display>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span>Lektion 12</span>
              <span style={{ fontFamily: t.mono, color: t.text, fontWeight: 600 }}>60%</span>
            </div>
            <div style={{ marginTop: 6 }}><Progress pct={60} t={t} h={4} /></div>
          </div>
        </Card>
      </div>

      {/* RECOMMENDED */}
      <div style={{ marginTop: 28 }}>
        <SectionLabel t={t}>Anbefalede til dig</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { title: 'Rytme & Timing', sub: 'Forbedr din timing', cat: 'practice', topic: 'rytme-timing' },
            { title: 'Fills & Grooves', sub: 'Udvid dit vokabular', cat: 'practice', topic: 'fills-grooves' },
            { title: 'Studio Kit', sub: 'Dit virtuelle trommesæt', cat: 'kit', topic: 'studio-kit' },
          ].map((r, i) => (
            <div key={i} onClick={() => onTab(r.cat)} style={{
              background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: t.accentSoft, color: t.accent, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {i === 0 ? <IcWave size={20} /> : i === 1 ? <IcMetro size={18} /> : <TabKit size={20} color={t.accent} sw={1.7} />}
              </div>
              <div style={{ flex: 1 }}>
                <Display t={t} size={16} style={{ lineHeight: 1.1 }}>{r.title}</Display>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>{r.sub}</div>
              </div>
              <IcChev size={14} color={t.textDim} />
            </div>
          ))}
        </div>
      </div>

      {/* AI Coach card */}
      <div style={{ marginTop: 28 }}>
        <SectionLabel t={t}>AI Coach</SectionLabel>
        <div onClick={onOpenCoach} style={{
          position: 'relative', overflow: 'hidden',
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: 20, padding: 18, cursor: 'pointer',
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -30, width: 150, height: 150,
            borderRadius: '50%', background: t.accent, filter: 'blur(70px)', opacity: 0.22,
          }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: t.accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(239,90,58,0.4)',
            }}><IcSpark size={20} color="#fff" /></div>
            <div style={{ flex: 1 }}>
              <Display t={t} size={18} style={{ lineHeight: 1.1 }}>Spørg din Coach</Display>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>Få hjælp · forklaring · øvelse</div>
            </div>
            <IcChev size={14} color={t.textDim} />
          </div>
        </div>
      </div>

      {/* small footer toggle */}
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setDark(!dark)} style={{
          background: 'transparent', border: `1px solid ${t.border}`, color: t.textMuted,
          padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
          fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6, fontFamily: t.font,
        }}>
          {dark ? <IcSun size={12} /> : <IcMoon size={12} />}
          {dark ? 'Skift til lyst tema' : 'Skift til mørkt tema'}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { tokens, SectionLabel, Card, Pill, Progress, CTA, Display, HomeScreen });
