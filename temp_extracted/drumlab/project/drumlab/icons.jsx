// DrumLab icons — minimal stroked line set + drum notation SVG
// All icons accept `size` and `color` props.

const Ic = ({ size = 22, color = 'currentColor', children, fill = false, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? color : 'none'} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const IcHome = (p) => <Ic {...p}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z"/></Ic>;
const IcBook = (p) => <Ic {...p}><path d="M4 4h7a3 3 0 0 1 3 3v13"/><path d="M20 4h-7a3 3 0 0 0-3 3v13"/><path d="M4 4v15h7"/><path d="M20 4v15h-7"/></Ic>;
const IcSpark = (p) => <Ic {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/></Ic>;
const IcUser = (p) => <Ic {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Ic>;
const IcPlay = (p) => <Ic {...p} fill><path d="M7 4l13 8-13 8V4z" stroke="none"/></Ic>;
const IcPause = (p) => <Ic {...p} fill><rect x="6" y="4" width="4" height="16" rx="1" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" stroke="none"/></Ic>;
const IcBack = (p) => <Ic {...p}><path d="M15 5l-7 7 7 7"/></Ic>;
const IcChev = (p) => <Ic {...p}><path d="M9 5l7 7-7 7"/></Ic>;
const IcChevDown = (p) => <Ic {...p}><path d="M5 9l7 7 7-7"/></Ic>;
const IcMore = (p) => <Ic {...p}><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></Ic>;
const IcCheck = (p) => <Ic {...p}><path d="M4 12l5 5L20 6"/></Ic>;
const IcLock = (p) => <Ic {...p}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Ic>;
const IcSun = (p) => <Ic {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Ic>;
const IcMoon = (p) => <Ic {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></Ic>;
const IcSend = (p) => <Ic {...p}><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></Ic>;
const IcPlus = (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>;
const IcMetro = (p) => <Ic {...p}><path d="M9 3h6l3 18H6L9 3z"/><path d="M12 14L7 7"/></Ic>;
const IcMic = (p) => <Ic {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 12a7 7 0 0 0 14 0M12 19v3"/></Ic>;
const IcTuner = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><path d="M12 12l4-6"/></Ic>;
const IcVideo = (p) => <Ic {...p}><rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l5-3v10l-5-3"/></Ic>;
const IcFlame = (p) => <Ic {...p}><path d="M12 2s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-3s-1 6 4 6 4-4 4-6c0-4-4-7-4-7z"/></Ic>;
const IcClock = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Ic>;
const IcTrophy = (p) => <Ic {...p}><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M5 6H3v2a3 3 0 0 0 3 3M19 6h2v2a3 3 0 0 1-3 3"/><path d="M10 13v3h4v-3M8 20h8"/></Ic>;
const IcBell = (p) => <Ic {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></Ic>;
const IcLogout = (p) => <Ic {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></Ic>;
const IcWave = (p) => <Ic {...p}><path d="M2 12h2l2-6 4 12 4-16 4 16 2-6h2"/></Ic>;
const IcCalendar = (p) => <Ic {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></Ic>;
const IcAttach = (p) => <Ic {...p}><path d="M21 11l-9 9a5 5 0 0 1-7-7l9-9a3 3 0 1 1 4 4l-9 9a1 1 0 0 1-2-2l8-8"/></Ic>;
const IcLoop = (p) => <Ic {...p}><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></Ic>;
const IcMin = (p) => <Ic {...p}><path d="M5 12h14"/></Ic>;

// ─────────────────────────────────────────────────────────────
// Drum notation — single bar of basic rock beat (4/4)
// hi-hat (x) above staff, snare on middle line, kick below
// ─────────────────────────────────────────────────────────────
function DrumNotation({ color = '#f5f5f7', width = 340, accent = '#f5a524', active = 2 }) {
  // staff lines at y = 30,40,50,60,70 (5 lines)
  const top = 28, lineGap = 9;
  const lines = [0, 1, 2, 3, 4].map(i => top + i * lineGap);
  const W = width;
  // 8 eighth notes positions
  const startX = 60;
  const endX = W - 18;
  const span = endX - startX;
  const xs = Array.from({ length: 8 }, (_, i) => startX + (span / 8) * (i + 0.5));

  return (
    <svg width={W} height={140} viewBox={`0 0 ${W} 140`} style={{ display: 'block' }}>
      {/* staff lines */}
      {lines.map((y, i) => (
        <line key={i} x1={14} y1={y} x2={W - 6} y2={y} stroke={color} strokeOpacity="0.5" strokeWidth="1" />
      ))}
      {/* start barline */}
      <line x1={14} y1={lines[0]} x2={14} y2={lines[4]} stroke={color} strokeOpacity="0.6" strokeWidth="1.5" />
      {/* end barline (thick) */}
      <line x1={W - 6} y1={lines[0]} x2={W - 6} y2={lines[4]} stroke={color} strokeOpacity="0.6" strokeWidth="1.5" />
      {/* time signature 4/4 */}
      <text x={22} y={lines[1] + 4} fill={color} fontSize="16" fontWeight="700" fontFamily="Georgia, serif">4</text>
      <text x={22} y={lines[3] + 4} fill={color} fontSize="16" fontWeight="700" fontFamily="Georgia, serif">4</text>

      {/* hi-hat x's above top line */}
      {xs.map((x, i) => {
        const isActive = i === active;
        return (
          <g key={`hh-${i}`} opacity={isActive ? 1 : 0.85}>
            <path d={`M${x-4},${top - 12} L${x+4},${top - 4} M${x+4},${top - 12} L${x-4},${top - 4}`} stroke={isActive ? accent : color} strokeWidth="1.8" strokeLinecap="round"/>
          </g>
        );
      })}

      {/* snare on beats 2,4 (xs[2], xs[6]) — middle line */}
      {[2, 6].map(i => {
        const x = xs[i];
        const isActive = i === active;
        return (
          <g key={`sn-${i}`}>
            <ellipse cx={x} cy={lines[2]} rx="5" ry="3.6" fill={isActive ? accent : color} transform={`rotate(-18 ${x} ${lines[2]})`}/>
          </g>
        );
      })}

      {/* kick on beats 1,3 (xs[0], xs[4]) — below staff */}
      {[0, 4].map(i => {
        const x = xs[i];
        const isActive = i === active;
        return (
          <ellipse key={`kk-${i}`} cx={x} cy={lines[4] + 12} rx="5" ry="3.6" fill={isActive ? accent : color} transform={`rotate(-18 ${x} ${lines[4] + 12})`}/>
        );
      })}

      {/* stems + beams connecting hi-hat eighths in pairs */}
      {xs.map((x, i) => (
        <line key={`stem-${i}`} x1={x + 4} y1={top - 8} x2={x + 4} y2={top - 28} stroke={color} strokeOpacity="0.8" strokeWidth="1.4"/>
      ))}
      {/* beams over pairs */}
      {[0, 2, 4, 6].map(i => (
        <line key={`beam-${i}`} x1={xs[i] + 4} y1={top - 28} x2={xs[i + 1] + 4} y2={top - 28} stroke={color} strokeOpacity="0.8" strokeWidth="3"/>
      ))}

      {/* beat numbers underneath */}
      {[0, 2, 4, 6].map((i, idx) => (
        <text key={`bn-${i}`} x={xs[i]} y={lines[4] + 36} fill={color} opacity="0.45" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="middle">{idx + 1}</text>
      ))}
    </svg>
  );
}

Object.assign(window, {
  IcHome, IcBook, IcSpark, IcUser, IcPlay, IcPause, IcBack, IcChev, IcChevDown,
  IcMore, IcCheck, IcLock, IcSun, IcMoon, IcSend, IcPlus, IcMetro, IcMic, IcTuner,
  IcVideo, IcFlame, IcClock, IcTrophy, IcBell, IcLogout, IcWave, IcCalendar, IcAttach,
  IcLoop, IcMin, DrumNotation,
});

// ─────────────────────────────────────────────────────────────
// Tab icons — bottom navigation (custom)
// ─────────────────────────────────────────────────────────────
function TabHome({ size = 24, color = 'currentColor', sw = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z"/>
    </svg>
  );
}
function TabPractice({ size = 24, color = 'currentColor', sw = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
      <path d="M3 12 L5 8 L7 16 L9 6 L11 18 L13 7 L15 17 L17 9 L19 14 L21 12"/>
    </svg>
  );
}
function TabKit({ size = 24, color = 'currentColor', sw = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
      <ellipse cx="8" cy="12" rx="4" ry="2"/>
      <ellipse cx="16" cy="10" rx="4" ry="2"/>
      <path d="M4 12v5M12 12v5M12 10v5M20 10v6"/>
    </svg>
  );
}
function TabUser({ size = 24, color = 'currentColor', sw = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21a8 8 0 0 1 16 0"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Line-art drum illustrations — primitives only
// ─────────────────────────────────────────────────────────────

// Single snare drum with crossed sticks above — coral line art on dark
function IllSnare({ size = 280, color = '#ef5a3a', sw = 1.4 }) {
  const W = size, H = size * 0.95;
  return (
    <svg width={W} height={H} viewBox="0 0 280 266" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {/* faint concentric rings on ground */}
      <ellipse cx="140" cy="220" rx="125" ry="22" opacity="0.18"/>
      <ellipse cx="140" cy="220" rx="95" ry="16" opacity="0.25"/>

      {/* crossed sticks above */}
      <line x1="60" y1="20" x2="170" y2="120" strokeWidth={sw + 0.6}/>
      <circle cx="60" cy="20" r="5"/>
      <line x1="220" y1="20" x2="110" y2="120" strokeWidth={sw + 0.6}/>
      <circle cx="220" cy="20" r="5"/>

      {/* snare body */}
      {/* top ellipse */}
      <ellipse cx="140" cy="142" rx="78" ry="16"/>
      {/* sides */}
      <line x1="62" y1="142" x2="62" y2="200"/>
      <line x1="218" y1="142" x2="218" y2="200"/>
      {/* bottom curve */}
      <path d="M62 200 Q140 230 218 200"/>
      {/* tension rods on top */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => {
        const x = 80 + i * 16.6;
        return <line key={i} x1={x} y1="138" x2={x} y2="150" opacity="0.7"/>;
      })}
      {/* side stripe */}
      <line x1="62" y1="170" x2="218" y2="170" opacity="0.55"/>
      <line x1="62" y1="180" x2="218" y2="180" opacity="0.35"/>
    </svg>
  );
}

// Drum kit — simple line composition
function IllKit({ size = 280, color = '#ef5a3a', sw = 1.3 }) {
  const W = size, H = size * 0.72;
  return (
    <svg width={W} height={H} viewBox="0 0 320 230" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {/* cymbals */}
      {/* hi-hat (left) */}
      <ellipse cx="50" cy="78" rx="34" ry="5"/>
      <line x1="50" y1="78" x2="50" y2="200" opacity="0.7"/>
      <line x1="40" y1="200" x2="60" y2="200"/>
      {/* crash (top right) */}
      <ellipse cx="260" cy="50" rx="42" ry="6" transform="rotate(-10 260 50)"/>
      <line x1="260" y1="50" x2="270" y2="200" opacity="0.7"/>
      <line x1="262" y1="200" x2="282" y2="200"/>
      {/* ride (far right) */}
      <ellipse cx="290" cy="105" rx="32" ry="5" transform="rotate(8 290 105)"/>

      {/* toms (center) */}
      <ellipse cx="120" cy="110" rx="26" ry="5"/>
      <path d="M94 110 v32 a26 5 0 0 0 52 0 v-32" />
      {/* tom 2 */}
      <ellipse cx="180" cy="110" rx="26" ry="5"/>
      <path d="M154 110 v32 a26 5 0 0 0 52 0 v-32" />

      {/* bass drum (front center) */}
      <ellipse cx="150" cy="170" rx="62" ry="14"/>
      <path d="M88 170 v18 a62 14 0 0 0 124 0 v-18" />
      {/* bass logo circle */}
      <ellipse cx="150" cy="172" rx="20" ry="4" opacity="0.6"/>

      {/* snare (front left) */}
      <ellipse cx="65" cy="148" rx="22" ry="5"/>
      <path d="M43 148 v22 a22 5 0 0 0 44 0 v-22" />
      <line x1="43" y1="170" x2="87" y2="172" opacity="0.5"/>
      {/* snare stand */}
      <line x1="65" y1="175" x2="50" y2="208" opacity="0.5"/>
      <line x1="65" y1="175" x2="80" y2="208" opacity="0.5"/>
    </svg>
  );
}

// Drum sticks — single pair, crossed
function IllSticks({ size = 80, color = '#ef5a3a', sw = 1.6 }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
      <line x1="6" y1="8" x2="92" y2="50"/>
      <circle cx="6" cy="8" r="3"/>
      <line x1="94" y1="8" x2="8" y2="50"/>
      <circle cx="94" cy="8" r="3"/>
    </svg>
  );
}

// Radial progress ring
function RadialProgress({ size = 110, pct = 75, color = '#ef5a3a', track = 'rgba(255,255,255,0.08)', sw = 8, label, sublabel, t }) {
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={sw} fill="none"/>
      <circle
        cx={size/2} cy={size/2} r={r}
        stroke={color} strokeWidth={sw} fill="none"
        strokeDasharray={c} strokeDashoffset={off}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      {label && (
        <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
              fill={t?.text || '#fff'} fontSize="22" fontWeight="700" fontFamily="ui-monospace, monospace">{label}</text>
      )}
    </svg>
  );
}

Object.assign(window, {
  TabHome, TabPractice, TabKit, TabUser,
  IllSnare, IllKit, IllSticks, RadialProgress,
});
