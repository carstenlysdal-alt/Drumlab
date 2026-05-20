// DrumLab Desktop — tokens + shared components

const D_TOKENS = (dark = true) => ({
  bg: dark ? '#0a0a0a' : '#f4f1ec',
  sidebar: dark ? '#0f0f10' : '#ebe7e0',
  surface: dark ? '#141416' : '#ffffff',
  surface2: dark ? '#1c1c1f' : '#ebe7e0',
  surfaceElev: dark ? '#1f1f22' : '#ffffff',
  border: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,20,28,0.08)',
  borderStrong: dark ? 'rgba(255,255,255,0.12)' : 'rgba(20,20,28,0.14)',
  text: dark ? '#f4f1ec' : '#16161a',
  textMuted: dark ? '#8a8580' : '#6e6a62',
  textDim: dark ? '#56524c' : '#a8a39a',
  accent: '#ef5a3a',
  accentDeep: '#d94527',
  accentSoft: dark ? 'rgba(239,90,58,0.12)' : 'rgba(239,90,58,0.10)',
  accentText: dark ? '#f5b8a8' : '#a83419',
  good: '#5dd39e',
  goodSoft: 'rgba(93,211,158,0.13)',
  mono: 'ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace',
  font: '-apple-system, "SF Pro Text", system-ui, sans-serif',
  serif: '"DM Serif Display", "Playfair Display", Georgia, serif',
});

// ─────────────────────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────────────────────
function DSection({ children, t, color, style = {} }) {
  return (
    <div style={{
      fontFamily: t.font, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.8,
      textTransform: 'uppercase', color: color || t.textMuted, marginBottom: 14, ...style,
    }}>{children}</div>
  );
}

function DCard({ children, t, style = {}, onClick, padding = 24 }) {
  return (
    <div onClick={onClick} style={{
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 20, padding, cursor: onClick ? 'pointer' : 'default', ...style,
    }}>{children}</div>
  );
}

function DDisplay({ children, t, size = 36, style = {} }) {
  return (
    <div style={{
      fontFamily: t.serif, fontStyle: 'italic', fontSize: size,
      lineHeight: 1.0, color: t.text, letterSpacing: -0.4,
      whiteSpace: 'nowrap', ...style,
    }}>{children}</div>
  );
}

function DPill({ children, t, tone = 'default' }) {
  const c = tone === 'accent' ? { bg: t.accentSoft, fg: t.accentText }
       : tone === 'good' ? { bg: t.goodSoft, fg: t.good }
       : { bg: t.surface2, fg: t.textMuted };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, color: c.fg, padding: '5px 11px',
      borderRadius: 999, fontSize: 11, fontWeight: 600,
      fontFamily: t.font, letterSpacing: 0.3,
    }}>{children}</span>
  );
}

function DProgress({ pct, t, h = 6, color }) {
  return (
    <div style={{ width: '100%', height: h, background: t.surface2, borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color || t.accent, borderRadius: 999, transition: 'width 0.3s' }} />
    </div>
  );
}

function DCTA({ children, t, onClick, variant = 'primary', icon, size = 'md', wide = false }) {
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';
  const sizes = {
    sm: { pad: '8px 16px', fs: 11, ls: 1.4 },
    md: { pad: '13px 22px', fs: 12, ls: 1.6 },
    lg: { pad: '16px 26px', fs: 13, ls: 1.8 },
  }[size];
  return (
    <button onClick={onClick} style={{
      padding: sizes.pad, borderRadius: 999,
      width: wide ? '100%' : 'auto',
      background: isPrimary ? t.accent : isGhost ? 'transparent' : t.surface,
      color: isPrimary ? '#fff' : t.text,
      border: isPrimary ? 'none' : isGhost ? 'none' : `1px solid ${t.borderStrong}`,
      fontFamily: t.font, fontSize: sizes.fs, fontWeight: 700,
      letterSpacing: sizes.ls, textTransform: 'uppercase',
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      boxShadow: isPrimary ? '0 6px 20px rgba(239,90,58,0.32)' : 'none',
      transition: 'transform 0.1s',
    }}>
      {icon}{children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Brand wordmark
// ─────────────────────────────────────────────────────────────
function Wordmark({ t, size = 22 }) {
  return (
    <div style={{
      fontFamily: t.serif, fontStyle: 'italic', fontSize: size,
      letterSpacing: -0.5, color: t.text, display: 'flex', alignItems: 'baseline',
    }}>
      DrumLab<span style={{ color: t.accent, fontStyle: 'normal' }}>.</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────
function Sidebar({ t, view, onView, dark }) {
  const items = [
    { id: 'home', label: 'Hjem', Icon: TabHome },
    { id: 'practice', label: 'Øvelser', Icon: TabPractice },
    { id: 'kit', label: 'Trommesæt', Icon: TabKit },
    { id: 'library', label: 'Bibliotek', Icon: IcBook },
    { id: 'profile', label: 'Profil', Icon: TabUser },
  ];

  return (
    <div style={{
      width: 248, height: '100%', flexShrink: 0,
      background: t.sidebar,
      borderRight: `1px solid ${t.border}`,
      display: 'flex', flexDirection: 'column',
      padding: '20px 16px 16px',
    }}>
      <div style={{ padding: '4px 8px 22px' }}>
        <Wordmark t={t} size={24} />
      </div>

      {/* Search */}
      <div style={{
        background: t.surface, border: `1px solid ${t.border}`,
        borderRadius: 12, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 22,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.textDim} strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
        </svg>
        <input placeholder="Søg lektioner, sange…" style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          color: t.text, fontFamily: t.font, fontSize: 13,
        }}/>
        <span style={{
          fontFamily: t.mono, fontSize: 10, color: t.textDim,
          padding: '2px 6px', borderRadius: 4, border: `1px solid ${t.border}`,
        }}>⌘K</span>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => {
          const active = view === it.id;
          return (
            <button key={it.id} onClick={() => onView(it.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
              background: active ? t.accentSoft : 'transparent',
              border: 'none', borderRadius: 10, cursor: 'pointer',
              color: active ? t.accent : t.text, fontFamily: t.font,
              fontSize: 14, fontWeight: active ? 600 : 500, textAlign: 'left',
            }}>
              <it.Icon size={18} color={active ? t.accent : t.textMuted} sw={active ? 1.8 : 1.5} />
              <span>{it.label}</span>
              {active && <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: t.accent }} />}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      {/* I gang card */}
      <div style={{
        background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14,
        padding: 14, marginBottom: 12,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', color: t.textMuted }}>I gang</div>
        <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 16, marginTop: 6, lineHeight: 1.15 }}>
          Paradiddle Grooves
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: t.textMuted, fontFamily: t.mono, fontWeight: 600 }}>
          <span>LEKTION 12</span>
          <span>60%</span>
        </div>
        <div style={{ marginTop: 4 }}><DProgress pct={60} t={t} h={3} /></div>
      </div>

      {/* User chip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: 8,
        borderRadius: 12, cursor: 'pointer',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: t.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: t.serif, fontStyle: 'italic', fontSize: 14,
        }}>AL</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Astrid Lind</div>
          <div style={{ fontSize: 11, color: t.textMuted }}>Niveau 4 · Pro</div>
        </div>
        <IcChev size={12} color={t.textDim} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AI Coach right panel
// ─────────────────────────────────────────────────────────────
function CoachPanel({ t, dark, open, onToggle }) {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    { role: 'ai', text: 'Hej Astrid 👋\nJeg har set, du arbejder med 16-dele hi-hat. Hvordan går det?' },
    { role: 'user', text: 'Det er svært at holde tempo når jeg tilføjer kick.' },
    { role: 'ai', text: 'Klassisk udfordring. Prøv:\n\n1. Sæt metronomen til 70 BPM\n2. Spil KUN hi-hat 16-dele i 8 takter\n3. Tilføj så kick på 1\n\nFokuser bevidst på at hånden IKKE accelererer.' },
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
      setMessages([...next, { role: 'ai', text: 'God idé — jeg har et 4-trins forløb der starter i 60 BPM. Vil du starte nu?' }]);
    }, 800);
  };

  if (!open) {
    return (
      <div style={{
        position: 'absolute', right: 16, bottom: 16,
      }}>
        <button onClick={onToggle} style={{
          width: 56, height: 56, borderRadius: '50%',
          background: t.accent, border: 'none', color: '#fff', cursor: 'pointer',
          boxShadow: '0 10px 28px rgba(239,90,58,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcSpark size={22} color="#fff" /></button>
      </div>
    );
  }

  return (
    <div style={{
      width: 380, height: '100%', flexShrink: 0,
      background: t.bg, borderLeft: `1px solid ${t.border}`,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '20px 20px 14px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: t.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(239,90,58,0.35)',
        }}><IcSpark size={18} color="#fff" /></div>
        <div style={{ flex: 1 }}>
          <DDisplay t={t} size={20}>AI Coach</DDisplay>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.good }} />
            <span style={{ fontSize: 11, color: t.textMuted }}>Online · husker dit niveau</span>
          </div>
        </div>
        <button onClick={onToggle} style={{
          width: 32, height: 32, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.textMuted, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg></button>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '18px 20px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
            <div style={{
              maxWidth: '85%',
              padding: '11px 14px', borderRadius: 18,
              borderBottomRightRadius: m.role === 'user' ? 6 : 18,
              borderBottomLeftRadius: m.role === 'ai' ? 6 : 18,
              background: m.role === 'user' ? t.accent : t.surface,
              color: m.role === 'user' ? '#fff' : t.text,
              border: m.role === 'ai' ? `1px solid ${t.border}` : 'none',
              fontSize: 13.5, lineHeight: 1.5, whiteSpace: 'pre-wrap',
            }}>{m.text}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 16px 4px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['Forklar synkoper', 'Vis paradiddle', 'Dagens øvelse'].map((s, i) => (
          <button key={i} onClick={() => setInput(s)} style={{
            flexShrink: 0, padding: '6px 11px', borderRadius: 999,
            background: 'transparent', border: `1px solid ${t.border}`,
            color: t.textMuted, fontSize: 11, fontWeight: 500, cursor: 'pointer',
            fontFamily: t.font, whiteSpace: 'nowrap',
          }}>{s}</button>
        ))}
      </div>

      <div style={{ padding: '10px 16px 16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: 999, padding: '4px 4px 4px 14px',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Stil et spørgsmål…"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: t.font, fontSize: 13.5, color: t.text, padding: '8px 0',
            }}
          />
          <button onClick={send} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: input.trim() ? t.accent : t.surface2,
            border: 'none', color: input.trim() ? '#fff' : t.textDim,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IcSend size={14} /></button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { D_TOKENS, DSection, DCard, DDisplay, DPill, DProgress, DCTA, Wordmark, Sidebar, CoachPanel });

// ─────────────────────────────────────────────────────────────
// Practice tracks data
// ─────────────────────────────────────────────────────────────
const practiceTracks = [
  {
    id: 'rytme-timing',
    title: 'Rytme & Timing',
    subtitle: 'Forbedr din timing',
    blurb: 'Styrk din indre puls og få bedre kontrol over rytme, tempo og dynamik. Et forløb der bygger din timing fra bunden — fra subdivisioner til polyrytmer.',
    lessonCount: 15,
    level: 'Begynder til øvet',
    ill: 'sticks',
    progress: 27,
  },
  {
    id: 'fills-grooves',
    title: 'Fills & Grooves',
    subtitle: 'Udvid dit vokabular',
    blurb: 'Byg et bibliotek af fills og pocket grooves du kan trække i hvilken som helst situation — fra rock og funk til linear playing.',
    lessonCount: 22,
    level: 'Niveau 3 og op',
    ill: 'snare',
    progress: 12,
  },
  {
    id: 'jazz-brush',
    title: 'Jazz & Brushwork',
    subtitle: 'Subtil dynamik',
    blurb: 'Lær brushteknikker, swing-feel og dynamisk kontrol i jazztraditionen. Med fokus på lyttearbejde og subtile detaljer.',
    lessonCount: 14,
    level: 'Niveau 5+',
    ill: 'sticks',
    progress: 0,
  },
  {
    id: 'odd-time',
    title: 'Skæve taktarter',
    subtitle: 'Ud over 4/4',
    blurb: 'Naviger 5/8, 7/8 og 11/16 — fra polyrytmer til moderne progrock og fusion.',
    lessonCount: 12,
    level: 'Niveau 6+',
    ill: 'snare',
    progress: 0,
  },
];

window.practiceTracks = practiceTracks;
