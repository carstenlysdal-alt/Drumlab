// DrumLab Desktop — main views: Home, Practice, Track Detail

// ─────────────────────────────────────────────────────────────
// HOME DASHBOARD
// ─────────────────────────────────────────────────────────────
function HomeView({ t, dark, setDark, onView, onOpenTrack }) {
  return (
    <div style={{ padding: '36px 48px 60px', color: t.text, fontFamily: t.font }}>
      {/* greeting */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: t.textMuted, marginBottom: 10 }}>
            Onsdag · 20. maj
          </div>
          <DDisplay t={t} size={56}>Hej, Astrid</DDisplay>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setDark(!dark)} style={{
            width: 40, height: 40, borderRadius: '50%', background: 'transparent',
            border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{dark ? <IcSun size={16} /> : <IcMoon size={16} />}</button>
          <button style={{
            width: 40, height: 40, borderRadius: '50%', background: 'transparent',
            border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <IcBell size={16} />
            <div style={{ position: 'absolute', top: 8, right: 9, width: 6, height: 6, borderRadius: '50%', background: t.accent }} />
          </button>
        </div>
      </div>

      {/* Hero grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 16, marginBottom: 28 }}>
        {/* Daily goal */}
        <DCard t={t} padding={24} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <RadialProgress size={130} pct={73} color={t.accent} track={dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'} sw={10} t={t} label="73%" />
          <div style={{ flex: 1 }}>
            <DSection t={t}>Dagligt mål</DSection>
            <div style={{ fontFamily: t.mono, fontSize: 16, fontWeight: 600 }}>
              22 <span style={{ color: t.textMuted, fontWeight: 500 }}>/ 30 min</span>
            </div>
            <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 18, marginTop: 8, color: t.text, lineHeight: 1.2 }}>
              Fortsæt det gode arbejde
            </div>
          </div>
        </DCard>

        {/* Continue lesson hero */}
        <DCard t={t} padding={0} style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
            <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <DSection t={t}>Fortsæt hvor du slap</DSection>
                <DDisplay t={t} size={28} style={{ marginBottom: 4 }}>Paradiddle Grooves</DDisplay>
                <div style={{ fontSize: 12, color: t.textMuted, fontFamily: t.mono, letterSpacing: 0.5 }}>LEKTION 12 · 12 MIN TILBAGE</div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.textMuted, marginBottom: 6, fontFamily: t.mono, fontWeight: 600, letterSpacing: 0.5 }}>
                  <span>FREMSKRIDT</span>
                  <span>60%</span>
                </div>
                <DProgress pct={60} t={t} h={5} />
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <DCTA t={t} icon={<IcPlay size={11} fill color="#fff"/>} onClick={() => onOpenTrack('rytme-timing')}>Fortsæt</DCTA>
                  <DCTA t={t} variant="ghost">Detaljer</DCTA>
                </div>
              </div>
            </div>
            <div style={{
              width: 220, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: dark ? '#101012' : '#ebe7e0',
              borderLeft: `1px solid ${t.border}`,
            }}>
              <div style={{
                position: 'absolute', width: 220, height: 220,
                background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 65%)`,
              }} />
              <div style={{ position: 'relative' }}>
                <IllSnare size={180} color={t.accent} sw={1.4}/>
              </div>
            </div>
          </div>
        </DCard>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Streak', value: '12', sub: 'dage i træk', icon: <IcFlame size={16} color={t.accent} /> },
          { label: 'Denne uge', value: '4t 32m', sub: '6/7 dage', icon: <IcClock size={16} /> },
          { label: 'Niveau', value: 'Niv. 4', sub: '620 / 1000 XP', icon: <IcTrophy size={16} /> },
          { label: 'Forløb', value: '2 / 5', sub: 'færdige', icon: <TabPractice size={16} color={t.text} sw={1.6} /> },
        ].map((s, i) => (
          <DCard key={i} t={t} padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', border: `1px solid ${t.borderStrong}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text,
              }}>{s.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', color: t.textMuted }}>{s.label}</span>
            </div>
            <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 28, marginTop: 10, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>{s.sub}</div>
          </DCard>
        ))}
      </div>

      {/* Recommended */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
          <DDisplay t={t} size={28}>Anbefalede til dig</DDisplay>
          <button onClick={() => onView('practice')} style={{
            background: 'transparent', border: 'none', color: t.accent, cursor: 'pointer',
            fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 4, fontFamily: t.font,
          }}>Se alle <IcChev size={11} color={t.accent}/></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { id: 'rytme-timing', title: 'Rytme & Timing', sub: 'Forbedr din timing', count: '15 lektioner' },
            { id: 'fills-grooves', title: 'Fills & Grooves', sub: 'Udvid dit vokabular', count: '22 lektioner' },
            { id: 'jazz-brush', title: 'Jazz & Brushwork', sub: 'Subtil dynamik', count: '14 lektioner' },
          ].map(r => (
            <DCard key={r.id} t={t} padding={20} onClick={() => onOpenTrack(r.id)} style={{
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -20, right: -30, width: 130, height: 130,
                background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 65%)`,
              }} />
              <div style={{ position: 'absolute', top: 12, right: 14, opacity: 0.5 }}>
                <IllSticks size={70} color={t.accent} sw={1.5}/>
              </div>
              <div style={{ position: 'relative', paddingTop: 30 }}>
                <DSection t={t} color={t.accent}>{r.sub}</DSection>
                <DDisplay t={t} size={24} style={{ marginBottom: 14 }}>{r.title}</DDisplay>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: t.textMuted, fontFamily: t.mono, letterSpacing: 0.5 }}>{r.count.toUpperCase()}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', background: t.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><IcChev size={12} color="#fff" /></div>
                </div>
              </div>
            </DCard>
          ))}
        </div>
      </div>

      {/* Recent activity + Videos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        {/* Recent activity */}
        <div>
          <DSection t={t}>Seneste aktivitet</DSection>
          <DCard t={t} padding={0}>
            {[
              { time: 'I går', title: 'Half-time feel', sub: '11 min · 92 BPM', done: true },
              { time: 'I går', title: '4-takts fills med snare', sub: '14 min · 88 BPM', done: true },
              { time: '2 dage', title: 'Ghost notes på snare', sub: '12 min · 80 BPM', done: true },
              { time: '3 dage', title: 'Kick-variationer', sub: '9 min · 76 BPM', done: true },
            ].map((a, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: t.accent, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><IcCheck size={14} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{a.sub}</div>
                </div>
                <div style={{ fontSize: 10, color: t.textDim, fontFamily: t.mono, letterSpacing: 0.5, textTransform: 'uppercase' }}>{a.time}</div>
              </div>
            ))}
          </DCard>
        </div>

        {/* Videos */}
        <div>
          <DSection t={t}>Anbefalede videoer</DSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { title: 'Sådan holder du stikkerne korrekt', dur: '4:12', author: 'Mikkel Holm' },
              { title: 'Paradiddles fra nul', dur: '7:48', author: 'Sofie Krarup' },
              { title: 'Linear fills i 4/4', dur: '11:02', author: 'Daniel Lund' },
            ].map((v, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'center', padding: 10,
                background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, cursor: 'pointer',
              }}>
                <div style={{
                  width: 76, height: 50, borderRadius: 8, position: 'relative',
                  background: dark ? '#1a1a1c' : '#e8e3da',
                  overflow: 'hidden', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IllSticks size={42} color={t.accent} sw={1.4}/>
                  </div>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                  }}><IcPlay size={10} fill color="#fff" /></div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{v.author} · <span style={{ fontFamily: t.mono }}>{v.dur}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PRACTICE LIST
// ─────────────────────────────────────────────────────────────
function PracticeView({ t, dark, onOpenTrack }) {
  const [filter, setFilter] = React.useState('all');
  const tracks = window.practiceTracks;
  return (
    <div style={{ padding: '36px 48px 60px', color: t.text, fontFamily: t.font }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <DSection t={t}>Forløb og lektioner</DSection>
          <DDisplay t={t} size={48}>Øvelser</DDisplay>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Alle', 'I gang', 'Ny', 'Færdige'].map((f, i) => (
            <button key={f} onClick={() => setFilter(f.toLowerCase())} style={{
              padding: '8px 14px', borderRadius: 999, fontFamily: t.font,
              fontSize: 11, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase',
              background: (i === 0 && filter === 'all') || filter === f.toLowerCase() ? t.text : 'transparent',
              color: (i === 0 && filter === 'all') || filter === f.toLowerCase() ? t.bg : t.textMuted,
              border: `1px solid ${(i === 0 && filter === 'all') || filter === f.toLowerCase() ? t.text : t.border}`,
              cursor: 'pointer',
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {tracks.map(tr => (
          <DCard key={tr.id} t={t} padding={28} onClick={() => onOpenTrack(tr.id)} style={{
            position: 'relative', overflow: 'hidden', minHeight: 220,
          }}>
            <div style={{
              position: 'absolute', top: -30, right: -40, width: 220, height: 220,
              background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 65%)`,
            }} />
            <div style={{ position: 'absolute', top: 26, right: 26, opacity: 0.6 }}>
              {tr.ill === 'snare' ? <IllSnare size={120} color={t.accent} sw={1.3}/> : <IllSticks size={100} color={t.accent} sw={1.5}/>}
            </div>
            <div style={{ position: 'relative', maxWidth: 'calc(100% - 130px)' }}>
              <DSection t={t} color={t.accent}>{tr.subtitle}</DSection>
              <DDisplay t={t} size={32} style={{ marginBottom: 10 }}>{tr.title}</DDisplay>
              <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 14, color: t.text, opacity: 0.8, lineHeight: 1.5, marginBottom: 18 }}>
                {tr.blurb}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <DPill t={t}>{tr.lessonCount} lekt.</DPill>
                <DPill t={t}>{tr.level}</DPill>
                {tr.progress > 0 && <DPill t={t} tone="accent">{tr.progress}% i gang</DPill>}
              </div>
            </div>
          </DCard>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TRACK DETAIL
// ─────────────────────────────────────────────────────────────
function TrackView({ t, dark, trackId, onBack, onView }) {
  const track = window.practiceTracks.find(x => x.id === trackId) || window.practiceTracks[0];
  const lessons = [
    { n: 1, title: 'Indre puls — fod og hånd', dur: '6 min', done: true, bpm: 60 },
    { n: 2, title: 'Click på 2 & 4', dur: '8 min', done: true, bpm: 72 },
    { n: 3, title: 'Subdivisioner i 4/4', dur: '10 min', done: true, bpm: 80 },
    { n: 4, title: '16-dele hi-hat', dur: '12 min', done: false, active: true, bpm: 92 },
    { n: 5, title: 'Tempo-flytning', dur: '14 min', done: false, bpm: 100 },
    { n: 6, title: 'Polyrytme 3:2', dur: '15 min', done: false, locked: true, bpm: 92 },
    { n: 7, title: 'Polyrytme 4:3', dur: '16 min', done: false, locked: true, bpm: 92 },
    { n: 8, title: 'Skift mellem feels', dur: '14 min', done: false, locked: true, bpm: 100 },
  ];

  return (
    <div style={{ padding: '28px 48px 60px', color: t.text, fontFamily: t.font }}>
      {/* back */}
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', color: t.textMuted, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px 6px 0',
        fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
        fontFamily: t.font, marginBottom: 16,
      }}><IcBack size={12} /> Øvelser</button>

      {/* hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, marginBottom: 40 }}>
        <div>
          <DSection t={t} color={t.accent}>{track.subtitle}</DSection>
          <DDisplay t={t} size={72} style={{ marginBottom: 18, lineHeight: 0.95 }}>{track.title}</DDisplay>
          <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 18, color: t.text, opacity: 0.85, lineHeight: 1.5, maxWidth: 500, marginBottom: 28 }}>
            {track.blurb}
          </div>

          <div style={{ display: 'flex', gap: 14, marginBottom: 32 }}>
            <DCTA t={t} icon={<IcPlay size={12} fill color="#fff"/>} size="lg">
              {track.progress > 0 ? 'Fortsæt forløb' : 'Start forløb'}
            </DCTA>
            <DCTA t={t} variant="ghost" size="lg">Gem</DCTA>
          </div>

          <div style={{ display: 'flex', gap: 28 }}>
            {[
              { icon: <IcClock size={16} />, title: `${track.lessonCount} lektioner`, sub: track.level },
              { icon: <IcWave size={16} />, title: 'Interaktive øvelser', sub: 'Med live feedback' },
              { icon: <IcTrophy size={16} />, title: 'Fremgangssporing', sub: 'Se din udvikling' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  border: `1px solid ${t.borderStrong}`, color: t.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{f.icon}</div>
                <div>
                  <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 16, lineHeight: 1.1 }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* illustration */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute', width: 320, height: 320,
            background: `radial-gradient(circle, ${t.accentSoft} 0%, transparent 65%)`,
          }} />
          <div style={{ position: 'relative' }}>
            {track.ill === 'snare' ? <IllSnare size={280} color={t.accent} sw={1.4}/> : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: -10 }}>
                <IllSticks size={140} color={t.accent} sw={1.8}/>
                <IllSnare size={240} color={t.accent} sw={1.4} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* lessons list — editorial table */}
      <DSection t={t}>Lektioner i forløbet</DSection>
      <DCard t={t} padding={0}>
        <div style={{
          display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px 32px',
          padding: '14px 24px',
          borderBottom: `1px solid ${t.border}`,
          fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: t.textMuted,
          alignItems: 'center', gap: 16,
        }}>
          <span>#</span>
          <span>Titel</span>
          <span>Tempo</span>
          <span>Længde</span>
          <span></span>
        </div>
        {lessons.map((l, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px 32px',
            padding: '16px 24px',
            borderBottom: i < lessons.length - 1 ? `1px solid ${t.border}` : 'none',
            alignItems: 'center', gap: 16,
            opacity: l.locked ? 0.4 : 1, cursor: l.locked ? 'default' : 'pointer',
          }}>
            <div>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: l.done ? t.accent : l.active ? t.accentSoft : 'transparent',
                border: l.done || l.active ? 'none' : `1px solid ${t.borderStrong}`,
                color: l.done ? '#fff' : l.active ? t.accent : t.textMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: t.mono, fontSize: 12, fontWeight: 700,
              }}>
                {l.done ? <IcCheck size={14} /> : l.locked ? <IcLock size={12} /> : l.n}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 17, lineHeight: 1.15 }}>{l.title}</div>
              {l.active && <div style={{ marginTop: 4 }}><DPill t={t} tone="accent">I GANG · NÆSTE OP</DPill></div>}
            </div>
            <div style={{ fontFamily: t.mono, fontSize: 13, color: t.text, fontWeight: 500 }}>{l.bpm} <span style={{ color: t.textMuted, fontSize: 10 }}>BPM</span></div>
            <div style={{ fontFamily: t.mono, fontSize: 13, color: t.textMuted }}>{l.dur}</div>
            <div>{!l.locked && <IcChev size={14} color={t.textDim} />}</div>
          </div>
        ))}
      </DCard>
    </div>
  );
}

Object.assign(window, { HomeView, PracticeView, TrackView });
