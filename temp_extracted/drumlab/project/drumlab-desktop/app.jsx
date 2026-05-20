// DrumLab Desktop — App shell

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

function TitleBar({ t, dark }) {
  return (
    <div style={{
      height: 44, flexShrink: 0,
      background: t.sidebar,
      borderBottom: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', padding: '0 14px', gap: 14,
      position: 'relative',
    }}>
      <MacTrafficLights />
      <div style={{ flex: 1, textAlign: 'center', fontFamily: t.font, fontSize: 13, fontWeight: 600, color: t.textMuted, letterSpacing: 0.3 }}>
        DrumLab
      </div>
      <div style={{ width: 60 }} />
    </div>
  );
}

function App() {
  const [dark, setDark] = React.useState(true);
  const [view, setView] = React.useState('home');
  const [trackId, setTrackId] = React.useState(null);
  const [coachOpen, setCoachOpen] = React.useState(true);

  const t = D_TOKENS(dark);
  const W = 1440, H = 900;
  const scale = useFitScale(W, H, 20);

  const openTrack = (id) => setTrackId(id);
  const closeTrack = () => setTrackId(null);

  // when changing view, close track
  const onView = (id) => { setTrackId(null); setView(id); };

  // Determine current view
  let mainContent;
  if (trackId) {
    mainContent = <TrackView t={t} dark={dark} trackId={trackId} onBack={closeTrack} onView={onView} />;
  } else if (view === 'home') {
    mainContent = <HomeView t={t} dark={dark} setDark={setDark} onView={onView} onOpenTrack={openTrack} />;
  } else if (view === 'practice') {
    mainContent = <PracticeView t={t} dark={dark} onOpenTrack={openTrack} />;
  } else if (view === 'kit') {
    mainContent = <KitView t={t} dark={dark} />;
  } else if (view === 'profile') {
    mainContent = <ProfileView t={t} dark={dark} setDark={setDark} />;
  } else if (view === 'library') {
    mainContent = <LibraryView t={t} dark={dark} />;
  }

  // Hide coach panel when on Kit (replaced by mixer)
  const hideCoach = view === 'kit' && !trackId;

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
      <div style={{
        width: W, height: H, borderRadius: 14, overflow: 'hidden',
        background: t.bg, color: t.text,
        boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
        fontFamily: t.font, display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}>
        <TitleBar t={t} dark={dark} />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <Sidebar t={t} view={view} onView={onView} dark={dark} />

          <div style={{ flex: 1, overflow: 'auto', background: t.bg, position: 'relative' }}>
            {mainContent}
          </div>

          {!hideCoach && (
            <CoachPanel t={t} dark={dark} open={coachOpen} onToggle={() => setCoachOpen(!coachOpen)} />
          )}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
