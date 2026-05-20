// DrumLab — App shell: device frame, tab bar, navigation

function TabBar({ tab, onTab, t, dark }) {
  const tabs = [
    { id: 'home', label: 'Hjem', icon: TabHome },
    { id: 'practice', label: 'Øvelser', icon: TabPractice },
    { id: 'kit', label: 'Trommesæt', icon: TabKit },
    { id: 'profile', label: 'Profil', icon: TabUser },
  ];

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
      paddingBottom: 24, paddingTop: 14, paddingLeft: 0, paddingRight: 0,
      background: dark
        ? 'linear-gradient(to top, rgba(10,10,10,1) 50%, rgba(10,10,10,0.85) 80%, rgba(10,10,10,0))'
        : 'linear-gradient(to top, rgba(244,241,236,1) 50%, rgba(244,241,236,0.85) 80%, rgba(244,241,236,0))',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 4px',
      }}>
        {tabs.map(tt => {
          const active = tab === tt.id;
          const Icon = tt.icon;
          return (
            <button key={tt.id} onClick={() => onTab(tt.id)} style={{
              flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              padding: '6px 0', fontFamily: t.font,
              color: active ? t.accent : t.textMuted,
            }}>
              <Icon size={24} color={active ? t.accent : t.textMuted} sw={active ? 1.8 : 1.4} />
              <span style={{
                fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: 0.2,
              }}>{tt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StatusBarOverlay({ dark }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30 }}>
      <IOSStatusBar dark={dark} />
    </div>
  );
}

function useFitScale(w, h, margin = 24) {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const calc = () => {
      const s = Math.min(
        (window.innerWidth - margin * 2) / w,
        (window.innerHeight - margin * 2) / h,
        1
      );
      setScale(s > 0 ? s : 1);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [w, h, margin]);
  return scale;
}

function App() {
  const [dark, setDark] = React.useState(true);
  const [tab, setTab] = React.useState('home');
  const [trackId, setTrackId] = React.useState(null);
  const [lessonId, setLessonId] = React.useState(null);
  const [coachOpen, setCoachOpen] = React.useState(false);
  const [padsOpen, setPadsOpen] = React.useState(false);
  const [onboarded, setOnboarded] = React.useState(() => {
    try { return localStorage.getItem('drumlab-onboarded') === '1'; } catch { return false; }
  });

  const t = tokens(dark);
  const scale = useFitScale(402, 874);

  const contentRef = React.useRef(null);
  React.useEffect(() => { if (contentRef.current) contentRef.current.scrollTop = 0; }, [tab]);

  const STATUS_BAR = 62;

  const completeOnboarding = () => {
    try { localStorage.setItem('drumlab-onboarded', '1'); } catch {}
    setOnboarded(true);
  };

  return (
    <div className="device-scaler" style={{ transform: `scale(${scale})` }}>
    <div style={{
      width: 402, height: 874, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.4)',
      fontFamily: t.font, WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 320,
      }} />

      {/* Page background */}
      <div style={{
        position: 'absolute', inset: 0, background: t.bg, transition: 'background 0.3s',
      }} />

      {/* Status bar (sits on top with opaque bg so content scrolls UNDER it visually, but content area is clipped below) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: STATUS_BAR, zIndex: 300,
        background: t.bg,
      }}>
        <IOSStatusBar dark={dark} />
      </div>

      {/* Content area — starts BELOW status bar, so scrolling never reveals content behind clock/battery */}
      <div ref={contentRef} style={{
        position: 'absolute', top: STATUS_BAR, left: 0, right: 0, bottom: 0,
        overflow: 'auto', paddingBottom: 100,
      }}>
        {tab === 'home' && <HomeScreen t={t} dark={dark} setDark={setDark}
          onOpenLesson={(id) => setLessonId(id)}
          onTab={(id) => id === 'practice' ? setTab('practice') : id === 'kit' ? setTab('kit') : setTab(id)}
          onOpenCoach={() => setCoachOpen(true)} />}
        {tab === 'practice' && <PracticeScreen t={t} dark={dark} onOpenTrack={(id) => setTrackId(id)} />}
        {tab === 'kit' && <StudioKitScreen t={t} dark={dark} onOpenPads={() => setPadsOpen(true)} />}
        {tab === 'profile' && <ProfileScreen t={t} dark={dark} setDark={setDark} />}
      </div>

      {/* Tab bar */}
      <TabBar tab={tab} onTab={setTab} t={t} dark={dark} />

      {/* Track detail overlay */}
      {trackId && (
        <TrackDetail t={t} dark={dark} trackId={trackId}
          onClose={() => setTrackId(null)}
          onOpenLesson={(id) => setLessonId(id)}
          onOpenCoach={() => { setTrackId(null); setCoachOpen(true); }} />
      )}

      {/* Lesson detail overlay */}
      {lessonId && (
        <LessonDetail t={t} dark={dark} lessonId={lessonId}
          onClose={() => setLessonId(null)}
          onOpenCoach={() => { setLessonId(null); setCoachOpen(true); }} />
      )}

      {/* Coach overlay */}
      {coachOpen && (
        <CoachScreen t={t} dark={dark} onClose={() => setCoachOpen(false)} />
      )}

      {/* Pad view overlay */}
      {padsOpen && (
        <KitPadView t={t} dark={dark} onClose={() => setPadsOpen(false)} />
      )}

      {/* Onboarding (covers everything) */}
      {!onboarded && (
        <Onboarding t={t} dark={dark} onStart={completeOnboarding} />
      )}

      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 70,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 139, height: 5, borderRadius: 100,
          background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.3)',
        }} />
      </div>
    </div>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
