// DrumLab — Øvelser (Practice) + LessonDetail + Onboarding

const practiceTracks = [
  {
    id: 'rytme-timing',
    title: 'Rytme & Timing',
    subtitle: 'Forbedr din timing',
    blurb: 'Styrk din indre puls og få bedre kontrol over rytme, tempo og dynamik.',
    lessonCount: 15,
    level: 'Fra begynder til øvet',
    ill: 'sticks',
    progress: 27,
  },
  {
    id: 'fills-grooves',
    title: 'Fills & Grooves',
    subtitle: 'Udvid dit vokabular',
    blurb: 'Byg et bibliotek af fills og pocket grooves du kan trække i hvilken som helst situation.',
    lessonCount: 22,
    level: 'Niveau 3 og op',
    ill: 'snare',
    progress: 12,
  },
  {
    id: 'jazz-brush',
    title: 'Jazz & Brushwork',
    subtitle: 'Subtil dynamik',
    blurb: 'Lær brushteknikker, swing-feel og dynamisk kontrol i jazztraditionen.',
    lessonCount: 14,
    level: 'Niveau 5+',
    ill: 'sticks',
    progress: 0,
  },
  {
    id: 'odd-time',
    title: 'Skæve taktarter',
    subtitle: 'Ud over 4/4',
    blurb: 'Naviger 5/8, 7/8 og 11/16 — fra polyrytmer til moderne progrock.',
    lessonCount: 12,
    level: 'Niveau 6+',
    ill: 'snare',
    progress: 0,
  },
];

// ─────────────────────────────────────────────────────────────
// Øvelser overview
// ─────────────────────────────────────────────────────────────
function PracticeScreen({ t, dark, onOpenTrack }) {
  return (
    <div style={{ color: t.text, fontFamily: t.font, padding: '4px 0 40px' }}>
      {/* header */}
      <div style={{ padding: '4px 20px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Display t={t} size={22}>Øvelser</Display>
        <button style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcMore size={18} /></button>
      </div>

      {/* tracks list */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {practiceTracks.map((tr) => (
          <div key={tr.id} onClick={() => onOpenTrack(tr.id)} style={{
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 22, padding: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }}>
            <SectionLabel t={t}>{tr.subtitle}</SectionLabel>
            <Display t={t} size={26} style={{ marginBottom: 8 }}>{tr.title}</Display>
            <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5, marginBottom: 14, fontFamily: t.serif, fontStyle: 'italic' }}>
              {tr.blurb}
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: t.accentSoft,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><IcClock size={14} color={t.accent} /></div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{tr.lessonCount} lektioner</div>
                  <div style={{ fontSize: 10, color: t.textMuted }}>{tr.level}</div>
                </div>
              </div>
            </div>
            {tr.progress > 0 ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.textMuted, marginBottom: 4, fontFamily: t.mono, letterSpacing: 0.5 }}>
                  <span>I GANG</span>
                  <span>{tr.progress}%</span>
                </div>
                <Progress pct={tr.progress} t={t} h={4} />
              </div>
            ) : (
              <CTA t={t}>Start forløb</CTA>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Track Detail — full screen, like the "Rytme & Timing" reference
// ─────────────────────────────────────────────────────────────
function TrackDetail({ t, dark, trackId, onClose, onOpenLesson, onOpenCoach }) {
  const track = practiceTracks.find(x => x.id === trackId) || practiceTracks[0];
  const lessonList = [
    { n: 1, title: 'Indre puls — fod og hånd', dur: '6 min', done: true },
    { n: 2, title: 'Click på 2 & 4', dur: '8 min', done: true },
    { n: 3, title: 'Subdivisioner i 4/4', dur: '10 min', done: true },
    { n: 4, title: '16-dele hi-hat', dur: '12 min', done: false, active: true },
    { n: 5, title: 'Tempo-flytning', dur: '14 min', done: false },
    { n: 6, title: 'Polyrytme 3:2', dur: '15 min', done: false, locked: true },
    { n: 7, title: 'Polyrytme 4:3', dur: '16 min', done: false, locked: true },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: t.bg, zIndex: 100,
      display: 'flex', flexDirection: 'column', color: t.text, fontFamily: t.font,
      animation: 'slideUp 0.3s ease-out', overflow: 'hidden',
    }}>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

      <div style={{ height: 62 }} />

      {/* header */}
      <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcBack size={16} /></button>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: t.textMuted }}>Forløb</div>
        <button style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcMore size={18} /></button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 40px' }}>
        {/* illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 180, height: 130 }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 65%)`,
              borderRadius: '50%',
            }} />
            <div style={{ position: 'relative' }}>
              <IllSticks size={120} color={t.accent} sw={1.7}/>
            </div>
          </div>
        </div>

        {/* title block */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <Display t={t} size={34} style={{ marginBottom: 6 }}>{track.title}</Display>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: t.accent }}>{track.subtitle}</div>
        </div>

        {/* blurb */}
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: t.serif, fontStyle: 'italic', fontSize: 15, color: t.text, opacity: 0.85, lineHeight: 1.45 }}>
          {track.blurb}
        </div>

        {/* features */}
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { icon: <IcClock size={18} />, title: `${track.lessonCount} lektioner`, sub: track.level },
            { icon: <IcWave size={18} />, title: 'Interaktive øvelser', sub: 'Spil med og få feedback' },
            { icon: <IcTrophy size={18} />, title: 'Fremgangssporing', sub: 'Se din udvikling over tid' },
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

        {/* lesson list (collapsed but visible) */}
        <div style={{ marginTop: 28 }}>
          <SectionLabel t={t}>Lektioner</SectionLabel>
          <div style={{
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 18, overflow: 'hidden',
          }}>
            {lessonList.map((l, i) => (
              <div key={i} onClick={() => !l.locked && onOpenLesson(`${track.id}-${l.n}`)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderBottom: i < lessonList.length - 1 ? `1px solid ${t.border}` : 'none',
                opacity: l.locked ? 0.45 : 1,
                cursor: l.locked ? 'default' : 'pointer',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: l.done ? t.accent : l.active ? t.accentSoft : 'transparent',
                  border: l.done || l.active ? 'none' : `1px solid ${t.borderStrong}`,
                  color: l.done ? '#fff' : l.active ? t.accent : t.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: t.mono, fontSize: 11, fontWeight: 700,
                }}>
                  {l.done ? <IcCheck size={13} /> : l.locked ? <IcLock size={11} /> : l.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{l.title}</div>
                  <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2, fontFamily: t.mono, letterSpacing: 0.5 }}>{l.dur.toUpperCase()}</div>
                </div>
                {l.active && <Pill t={t} tone="accent">I GANG</Pill>}
                {!l.locked && <IcChev size={14} color={t.textDim} />}
              </div>
            ))}
          </div>
        </div>

        {/* ask AI */}
        <div onClick={onOpenCoach} style={{
          marginTop: 18, padding: 14, borderRadius: 16,
          border: `1px solid ${t.border}`, background: t.surface,
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
        }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.accent, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IcSpark size={16} color="#fff" />
          </div>
          <div style={{ flex: 1, fontSize: 13 }}>
            <span style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 15 }}>Spørg AI Coach</span>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>Få hjælp med dette forløb</div>
          </div>
          <IcChev size={14} color={t.textDim} />
        </div>
      </div>

      {/* sticky CTA */}
      <div style={{
        padding: '12px 20px 30px', borderTop: `1px solid ${t.border}`,
        background: t.bg,
      }}>
        <CTA t={t} onClick={() => onOpenLesson(`${track.id}-4`)} icon={<IcPlay size={13} fill color="#fff"/>}>
          {track.progress > 0 ? 'Fortsæt forløb' : 'Start forløb'}
        </CTA>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Lesson Detail — drum notation + tabs
// ─────────────────────────────────────────────────────────────
function LessonDetail({ t, dark, lessonId, onClose, onOpenCoach }) {
  const [tab, setTab] = React.useState('noder');
  const [playing, setPlaying] = React.useState(false);
  const [bpm, setBpm] = React.useState(92);
  const [beat, setBeat] = React.useState(0);

  React.useEffect(() => {
    if (!playing) return;
    const interval = (60 / bpm) * 500;
    const id = setInterval(() => setBeat(b => (b + 1) % 8), interval);
    return () => clearInterval(id);
  }, [playing, bpm]);

  const exercises = [
    { title: 'Spil takten i 60 BPM', detail: '8 takter uden stop', done: true },
    { title: 'Øg til 80 BPM', detail: '8 takter uden stop', done: true },
    { title: 'Spil i 92 BPM', detail: 'Måltempo · 16 takter', done: false },
    { title: 'Spil med metronom på 2 & 4', detail: '32 takter uden fejl', done: false },
    { title: 'Optag og evaluér', detail: '1 fuld take', done: false },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: t.bg, zIndex: 110,
      display: 'flex', flexDirection: 'column', color: t.text, fontFamily: t.font,
      animation: 'slideUp 0.3s ease-out', overflow: 'hidden',
    }}>
      <div style={{ height: 62 }} />

      <div style={{ padding: '0 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcBack size={16} /></button>
        <div style={{ textAlign: 'center', flex: 1, padding: '0 12px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, textTransform: 'uppercase' }}>Lektion 04</div>
          <Display t={t} size={16} style={{ marginTop: 2 }}>16-dele hi-hat</Display>
        </div>
        <button style={{
          width: 38, height: 38, borderRadius: '50%', background: 'transparent',
          border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IcMore size={18} /></button>
      </div>

      {/* tab switcher */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', background: t.surface, borderRadius: 999, padding: 4, border: `1px solid ${t.border}` }}>
          {[
            { id: 'noder', label: 'Noder' },
            { id: 'video', label: 'Video' },
            { id: 'ovelser', label: 'Øvelser' },
          ].map(tt => (
            <button key={tt.id} onClick={() => setTab(tt.id)} style={{
              flex: 1, padding: '8px 12px', borderRadius: 999, border: 'none',
              background: tab === tt.id ? t.accent : 'transparent',
              color: tab === tt.id ? '#fff' : t.textMuted,
              fontWeight: tab === tt.id ? 700 : 500, fontSize: 12,
              letterSpacing: tab === tt.id ? 1.5 : 0.3, textTransform: tab === tt.id ? 'uppercase' : 'none',
              fontFamily: t.font, cursor: 'pointer',
            }}>{tt.label}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '20px 16px 24px' }}>
        {tab === 'noder' && (
          <div>
            <div style={{
              background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 20, padding: '18px 8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 12px 12px', alignItems: 'center' }}>
                <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>Takt 1 af 8</div>
                <Pill t={t} tone="accent">4/4 · {bpm} BPM</Pill>
              </div>
              <DrumNotation width={340} color={t.text} accent={t.accent} active={playing ? beat : 99} />
              <DrumNotation width={340} color={t.text} accent={t.accent} active={99} />
            </div>

            <div style={{
              marginTop: 14, background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 20, padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button style={{
                    width: 40, height: 40, borderRadius: '50%', background: t.surface2,
                    border: 'none', color: t.text, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><IcLoop size={16} /></button>
                  <div>
                    <div style={{ fontFamily: t.mono, fontSize: 22, fontWeight: 600 }}>{bpm}</div>
                    <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>BPM</div>
                  </div>
                </div>

                <button onClick={() => setPlaying(!playing)} style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: t.accent, border: 'none', color: '#fff',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 10px 28px rgba(239,90,58,0.45)',
                }}>
                  {playing ? <IcPause size={22} fill color="#fff" /> : <IcPlay size={22} fill color="#fff" />}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => setBpm(Math.max(40, bpm - 4))} style={{
                    width: 36, height: 36, borderRadius: '50%', background: t.surface2,
                    border: 'none', color: t.text, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><IcMin size={14} /></button>
                  <button onClick={() => setBpm(Math.min(220, bpm + 4))} style={{
                    width: 36, height: 36, borderRadius: '50%', background: t.surface2,
                    border: 'none', color: t.text, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><IcPlus size={14} /></button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 22, fontFamily: t.serif, fontStyle: 'italic', fontSize: 14, color: t.text, opacity: 0.8, lineHeight: 1.5, textAlign: 'center', padding: '0 12px' }}>
              "Hold venstre hånd afslappet. Tæl højt 1-e-og-a mens du spiller — det hjælper med at sætte 16-delene præcist."
            </div>
          </div>
        )}

        {tab === 'video' && (
          <div>
            <div style={{
              aspectRatio: '16/9', borderRadius: 18, position: 'relative',
              background: dark ? '#1a1a1c' : '#e8e3da',
              border: `1px solid ${t.border}`, overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IllKit size={260} color={t.accent} sw={1.2}/>
              </div>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: t.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                boxShadow: '0 8px 32px rgba(239,90,58,0.5)', zIndex: 2,
              }}><IcPlay size={24} fill color="#fff" /></div>
              <div style={{
                position: 'absolute', bottom: 10, left: 12, right: 12, zIndex: 2,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <Pill t={t} tone="default">YouTube</Pill>
                <div style={{
                  background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '3px 8px',
                  borderRadius: 6, fontSize: 11, fontFamily: t.mono, fontWeight: 600,
                }}>12:48</div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <Display t={t} size={20}>16-dele hi-hat</Display>
              <Display t={t} size={20} style={{ opacity: 0.5 }}>— forklaret enkelt</Display>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 8, letterSpacing: 0.5 }}>Mikkel Holm · Drum School DK · 124k visninger</div>
            </div>

            <div style={{ marginTop: 24 }}>
              <SectionLabel t={t}>Kapitler</SectionLabel>
              <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
                {[
                  { time: '0:00', title: 'Introduktion' },
                  { time: '1:42', title: 'Højre hånd alene' },
                  { time: '4:18', title: 'Tilføj kick og snare' },
                  { time: '7:55', title: 'Spil med click' },
                  { time: '10:30', title: 'Almindelige fejl' },
                ].map((c, i, arr) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px',
                    borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer',
                  }}>
                    <div style={{ fontFamily: t.mono, fontSize: 12, fontWeight: 600, color: t.accent, width: 44 }}>{c.time}</div>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{c.title}</div>
                    <IcPlay size={11} color={t.textDim} fill />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'ovelser' && (
          <div>
            <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 15, color: t.text, opacity: 0.8, lineHeight: 1.5, marginBottom: 18, textAlign: 'center', padding: '0 16px' }}>
              Fem trin der bygger dig op til at spille grooven flydende i måltempo.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {exercises.map((ex, i) => {
                const isNext = !ex.done && exercises.findIndex(e => !e.done) === i;
                return (
                  <div key={i} style={{
                    background: t.surface, border: `1px solid ${isNext ? t.accent : t.border}`,
                    borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 14,
                    cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      border: ex.done ? 'none' : `1.5px solid ${t.borderStrong}`,
                      background: ex.done ? t.accent : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: ex.done ? '#fff' : t.textMuted, fontFamily: t.mono, fontWeight: 700,
                      fontSize: 12, flexShrink: 0,
                    }}>
                      {ex.done ? <IcCheck size={14} /> : i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{ex.title}</div>
                      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{ex.detail}</div>
                    </div>
                    <IcChev size={14} color={t.textDim} />
                  </div>
                );
              })}
            </div>

            <div onClick={onOpenCoach} style={{
              marginTop: 22, background: t.accentSoft, border: `1px solid ${t.accent}`,
              borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: t.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><IcSpark size={18} color="#fff" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 15, color: t.accentText }}>Spørg AI Coach</div>
                <div style={{ fontSize: 11, color: t.accentText, opacity: 0.85, marginTop: 1 }}>Få hjælp til denne lektion</div>
              </div>
              <IcChev size={14} color={t.accentText} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Onboarding / Splash
// ─────────────────────────────────────────────────────────────
function Onboarding({ t, dark, onStart }) {
  const [step, setStep] = React.useState(0);
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200, background: t.bg,
      color: t.text, fontFamily: t.font, padding: '90px 28px 32px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* brand mark */}
      <div>
        <div style={{
          fontFamily: t.serif, fontStyle: 'italic', fontSize: 56, letterSpacing: -1,
          lineHeight: 1, display: 'flex', alignItems: 'baseline',
        }}>
          DrumLab<span style={{ color: t.accent, fontStyle: 'normal' }}>.</span>
        </div>
        <div style={{
          fontFamily: t.font, fontSize: 12, fontWeight: 700, letterSpacing: 2.4,
          textTransform: 'uppercase', color: t.textMuted, marginTop: 6,
        }}>Spil. Øv. Udvikl dig.</div>
      </div>

      {/* illustration */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flex: 1 }}>
        <div style={{
          position: 'absolute', width: 280, height: 280,
          background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 70%)`,
          borderRadius: '50%', filter: 'blur(10px)',
        }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IllSticks size={130} color={t.accent} sw={1.8} />
          <div style={{ marginTop: -10 }}>
            <IllSnare size={250} color={t.accent} sw={1.5} />
          </div>
        </div>
      </div>

      <div>
        <Display t={t} size={22} style={{ textAlign: 'center', marginBottom: 10 }}>
          Din rejse begynder her
        </Display>
        <div style={{
          fontFamily: t.serif, fontStyle: 'italic', fontSize: 15, color: t.text, opacity: 0.7,
          textAlign: 'center', lineHeight: 1.4, marginBottom: 24, padding: '0 12px',
        }}>
          Uanset dit niveau, hjælper vi dig med at blive en bedre trommeslager.
        </div>

        <CTA t={t} onClick={onStart}>Kom i gang</CTA>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={onStart} style={{
            background: 'transparent', border: 'none', color: t.textMuted, cursor: 'pointer',
            fontSize: 11, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase',
            fontFamily: t.font,
          }}>Har du allerede en konto? Log ind</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { practiceTracks, PracticeScreen, TrackDetail, LessonDetail, Onboarding });
