// Pocket Drummer Academy — Curriculum Data
// 6 niveauer, 8 søjler, 10 moduler

export interface CurriculumLevel {
  id: number;
  name: string;
  subtitle: string;
  duration: string;
  xpRequired: number;
  color: string;
  description: string;
  objectives: string[];
  finalGoal: string;
}

export interface CurriculumPillar {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface CurriculumLesson {
  id: string;
  moduleId: string;
  title: string;
  duration: number; // minutes
  level: number;
  premium: boolean;
  format: ('video' | 'notation' | 'playalong' | 'challenge')[];
  bpm?: { min: number; max: number };
  skills: string[];
  completed?: boolean;
}

export interface CurriculumModule {
  id: string;
  number: number;
  name: string;
  pillarId: string;
  levelMin: number;
  levelMax: number;
  description: string;
  lessons: CurriculumLesson[];
}

// ─── 6 NIVEAUER ───────────────────────────────────────────────

export const LEVELS: CurriculumLevel[] = [
  {
    id: 0,
    name: 'Første møde',
    subtitle: 'Absolut begynder',
    duration: '2–4 uger',
    xpRequired: 0,
    color: '#5dd39e',
    description: 'Gør dig tryg ved instrumentet.',
    objectives: [
      'Trommesættets dele og navne',
      'Korrekt siddestilling og greb',
      'Tæl 1-2-3-4 og følg en puls',
      'Spil dit første beat',
      'Spil med en simpel backing track',
    ],
    finalGoal: 'Spil et simpelt 4/4-beat: stortromme på 1 og 3, lilletromme på 2 og 4, hi-hat i fjerdedele.',
  },
  {
    id: 1,
    name: 'Begynder',
    subtitle: '0–6 måneders erfaring',
    duration: '2–4 måneder',
    xpRequired: 200,
    color: '#60a5fa',
    description: 'Grundlæggende kontrol, timing og selvtillid.',
    objectives: [
      'Basale rockbeats og fills',
      'Grundlæggende lilletrommeteknik og rudiments',
      'Metronomtræning',
      'Simple noder og taktforståelse',
      'Spil til play-alongs og sangform',
    ],
    finalGoal: 'Spil en simpel sangform: intro, vers, omkvæd, fill og afslutning.',
  },
  {
    id: 2,
    name: 'Let øvet',
    subtitle: '6–18 måneders erfaring',
    duration: '4–8 måneder',
    xpRequired: 600,
    color: '#a78bfa',
    description: 'Udvid repertoire, koordination og musikalsk sikkerhed.',
    objectives: [
      'Groove-varianter, ghost notes og accenter',
      'Shuffle- og funkfigurer',
      'Åbne/lukkede hi-hat-mønstre',
      'Dynamik og lengere play-alongs',
      'Første genrebaserede moduler',
    ],
    finalGoal: 'Spil stabile grooves i flere stilarter og tilpas dig en backing track uden at miste formen.',
  },
  {
    id: 3,
    name: 'Mellemniveau',
    subtitle: '1,5–3 års erfaring',
    duration: '6–12 måneder',
    xpRequired: 1400,
    color: '#f59e0b',
    description: 'Bliv en anvendelig bandtrommeslager.',
    objectives: [
      'Avanceret koordination og lineære grooves',
      'Halftime, doubletime og synkoper',
      'Genrebevidsthed og dynamisk opbygning',
      'Læsning af trommenoder og charts',
      'Spil i et band og forstå form',
    ],
    finalGoal: 'Spil med i et band, læs simple charts og lever musikalske grooves i flere genrer.',
  },
  {
    id: 4,
    name: 'Øvet',
    subtitle: '3–6 års erfaring',
    duration: '12–18 måneder',
    xpRequired: 3000,
    color: '#ef5a3a',
    description: 'Stilistisk sikkerhed, teknisk overskud og personlig lyd.',
    objectives: [
      'Avancerede rudiments på trommesæt',
      'Odd groupings og polyrytmiske idéer',
      'Avanceret funk, jazz, latin og rock',
      'Improvisation og soloopbygning',
      'Professionel studie- og livesituation',
    ],
    finalGoal: 'Spil stilistisk overbevisende, variér grooves musikalsk og improvisér inden for en given form.',
  },
  {
    id: 5,
    name: 'Avanceret',
    subtitle: 'Meget øvede trommeslagere',
    duration: 'Løbende',
    xpRequired: 6000,
    color: '#e879f9',
    description: 'Forfin musikalitet, teknisk frihed og kunstnerisk identitet.',
    objectives: [
      'Avanceret independence og metric modulation',
      'Polyrhythmik og avanceret jazz',
      'Moderne gospel/fusion og odd meters',
      'Avanceret solo- og fraseringsarbejde',
      'Analyse af professionelle trommeslagere',
    ],
    finalGoal: 'Udvikl dit eget trommesprog og brug teknikken frit i musikalsk sammenhæng.',
  },
];

// ─── 8 SØJLER ─────────────────────────────────────────────────

export const PILLARS: CurriculumPillar[] = [
  { id: 'technique', name: 'Lilletrommeteknik', icon: '🥁', description: 'Fundamentet. Hænder, greb, slagtyper, rudiments og dynamik.' },
  { id: 'timing', name: 'Timing & Metronom', icon: '⏱', description: 'Timing er en musikalsk disciplin — trænes fra første dag.' },
  { id: 'coordination', name: 'Koordination', icon: '🧠', description: 'Hænder og fødder uafhængigt, men musikalsk samlet.' },
  { id: 'grooves', name: 'Trommesæt & Grooves', icon: '🎶', description: 'Beats, fills, formforståelse, tempo og genrebevidsthed.' },
  { id: 'fills', name: 'Fills & Overgange', icon: '⚡', description: 'Fills der fører musikken videre — ikke bare hurtige.' },
  { id: 'notation', name: 'Nodelæsning', icon: '📄', description: 'Noder som et kort over musikken — praktisk, ikke akademisk.' },
  { id: 'genres', name: 'Genrer & Stilforståelse', icon: '🌍', description: 'Forstå hvorfor trommer lyder forskelligt i various sammenhænge.' },
  { id: 'playalong', name: 'Play-along Academy', icon: '🎧', description: 'Her bliver øvelser til musik med backing tracks og call-response.' },
];

// ─── 10 MODULER MED LEKTIONER ─────────────────────────────────

export const MODULES: CurriculumModule[] = [
  {
    id: 'mod-01',
    number: 1,
    name: 'Kom i gang',
    pillarId: 'technique',
    levelMin: 0,
    levelMax: 0,
    description: 'Dine allerførste skridt som trommeslager.',
    lessons: [
      { id: 'l-01-01', moduleId: 'mod-01', title: 'Velkommen til trommerne', duration: 5, level: 0, premium: false, format: ['video'], skills: ['intro'] },
      { id: 'l-01-02', moduleId: 'mod-01', title: 'Trommesættets dele og navne', duration: 8, level: 0, premium: false, format: ['video', 'notation'], skills: ['anatomy'] },
      { id: 'l-01-03', moduleId: 'mod-01', title: 'Sådan sidder du korrekt', duration: 6, level: 0, premium: false, format: ['video'], skills: ['posture'] },
      { id: 'l-01-04', moduleId: 'mod-01', title: 'Sådan holder du stikkerne', duration: 8, level: 0, premium: false, format: ['video'], skills: ['grip'] },
      { id: 'l-01-05', moduleId: 'mod-01', title: 'Din første puls — tæl til fire', duration: 10, level: 0, premium: false, format: ['video', 'notation'], bpm: { min: 60, max: 80 }, skills: ['pulse', 'counting'] },
      { id: 'l-01-06', moduleId: 'mod-01', title: 'Dit første beat', duration: 12, level: 0, premium: false, format: ['video', 'notation', 'playalong'], bpm: { min: 60, max: 80 }, skills: ['coordination', 'beat'] },
      { id: 'l-01-07', moduleId: 'mod-01', title: 'Din første fill', duration: 10, level: 0, premium: false, format: ['video', 'notation'], bpm: { min: 60, max: 75 }, skills: ['fills'] },
      { id: 'l-01-08', moduleId: 'mod-01', title: 'Din første play-along', duration: 15, level: 0, premium: false, format: ['playalong'], bpm: { min: 70, max: 80 }, skills: ['playalong', 'form'] },
    ],
  },
  {
    id: 'mod-02',
    number: 2,
    name: 'Lilletrommeskolen',
    pillarId: 'technique',
    levelMin: 1,
    levelMax: 3,
    description: 'Rudiments, kontrol og dynamik — fundamentet for alt andet.',
    lessons: [
      { id: 'l-02-01', moduleId: 'mod-02', title: 'Single Strokes — RLRL', duration: 10, level: 1, premium: false, format: ['video', 'notation'], bpm: { min: 60, max: 110 }, skills: ['singles', 'technique'] },
      { id: 'l-02-02', moduleId: 'mod-02', title: 'Double Strokes — RRLL', duration: 10, level: 1, premium: false, format: ['video', 'notation'], bpm: { min: 60, max: 100 }, skills: ['doubles', 'technique'] },
      { id: 'l-02-03', moduleId: 'mod-02', title: 'Paradiddle — RLRR LRLL', duration: 12, level: 1, premium: false, format: ['video', 'notation'], bpm: { min: 60, max: 90 }, skills: ['paradiddle'] },
      { id: 'l-02-04', moduleId: 'mod-02', title: 'Accenter og dynamik', duration: 10, level: 1, premium: true, format: ['video', 'notation'], bpm: { min: 60, max: 90 }, skills: ['accents', 'dynamics'] },
      { id: 'l-02-05', moduleId: 'mod-02', title: 'Flams', duration: 10, level: 2, premium: true, format: ['video', 'notation'], bpm: { min: 60, max: 90 }, skills: ['flams'] },
      { id: 'l-02-06', moduleId: 'mod-02', title: 'Drags', duration: 10, level: 2, premium: true, format: ['video', 'notation'], bpm: { min: 60, max: 90 }, skills: ['drags'] },
      { id: 'l-02-07', moduleId: 'mod-02', title: 'Rudiments som fills', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 100 }, skills: ['rudiments', 'fills'] },
      { id: 'l-02-08', moduleId: 'mod-02', title: 'Rudiments på hele sættet', duration: 15, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 80, max: 110 }, skills: ['rudiments', 'coordination'] },
    ],
  },
  {
    id: 'mod-03',
    number: 3,
    name: 'Groove-laboratoriet',
    pillarId: 'grooves',
    levelMin: 1,
    levelMax: 4,
    description: 'Fra basalt rockbeat til avancerede groove-varianter.',
    lessons: [
      { id: 'l-03-01', moduleId: 'mod-03', title: 'Basic Rockbeat', duration: 12, level: 1, premium: false, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 100 }, skills: ['rock', 'beat', 'coordination'] },
      { id: 'l-03-02', moduleId: 'mod-03', title: '8.-dels groove', duration: 12, level: 1, premium: false, format: ['video', 'notation', 'playalong'], bpm: { min: 80, max: 110 }, skills: ['8th-notes', 'groove'] },
      { id: 'l-03-03', moduleId: 'mod-03', title: '16.-dels groove', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 95 }, skills: ['16th-notes', 'groove'] },
      { id: 'l-03-04', moduleId: 'mod-03', title: 'Bass drum-variationer', duration: 10, level: 2, premium: true, format: ['video', 'notation'], bpm: { min: 70, max: 100 }, skills: ['kick', 'variation'] },
      { id: 'l-03-05', moduleId: 'mod-03', title: 'Ghost notes i grooven', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 95 }, skills: ['ghost-notes', 'dynamics'] },
      { id: 'l-03-06', moduleId: 'mod-03', title: 'Halftime og doubletime', duration: 12, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 75, max: 100 }, skills: ['halftime', 'doubletime'] },
      { id: 'l-03-07', moduleId: 'mod-03', title: 'Lineære grooves', duration: 15, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 95 }, skills: ['linear', 'groove'] },
      { id: 'l-03-08', moduleId: 'mod-03', title: 'Groove og dynamik', duration: 12, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 100 }, skills: ['dynamics', 'musicality'] },
    ],
  },
  {
    id: 'mod-04',
    number: 4,
    name: 'Fills & Overgange',
    pillarId: 'fills',
    levelMin: 1,
    levelMax: 4,
    description: 'Fills der fører musikken videre.',
    lessons: [
      { id: 'l-04-01', moduleId: 'mod-04', title: 'Hvad er et fill?', duration: 8, level: 1, premium: false, format: ['video', 'notation'], skills: ['fills', 'form'] },
      { id: 'l-04-02', moduleId: 'mod-04', title: 'Fill på lilletromme', duration: 10, level: 1, premium: false, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 90 }, skills: ['fills', 'snare'] },
      { id: 'l-04-03', moduleId: 'mod-04', title: 'Fill rundt på tammer', duration: 10, level: 1, premium: false, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 90 }, skills: ['fills', 'toms'] },
      { id: 'l-04-04', moduleId: 'mod-04', title: 'Fill med crash på 1', duration: 10, level: 1, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 100 }, skills: ['fills', 'crash', 'form'] },
      { id: 'l-04-05', moduleId: 'mod-04', title: '16.-dels fills', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 95 }, skills: ['fills', '16th-notes'] },
      { id: 'l-04-06', moduleId: 'mod-04', title: 'Triplet fills', duration: 12, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 100 }, skills: ['fills', 'triplets'] },
      { id: 'l-04-07', moduleId: 'mod-04', title: 'Fills over to takter', duration: 12, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 95 }, skills: ['fills', 'phrasing'] },
      { id: 'l-04-08', moduleId: 'mod-04', title: 'Linear fills', duration: 15, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 95 }, skills: ['fills', 'linear'] },
    ],
  },
  {
    id: 'mod-05',
    number: 5,
    name: 'Koordination',
    pillarId: 'coordination',
    levelMin: 1,
    levelMax: 5,
    description: 'Hjertet i trommespil — gradvist uafhængige lag.',
    lessons: [
      { id: 'l-05-01', moduleId: 'mod-05', title: 'Hænder og fødder — lag for lag', duration: 10, level: 1, premium: false, format: ['video', 'notation'], bpm: { min: 60, max: 80 }, skills: ['coordination', 'independence'] },
      { id: 'l-05-02', moduleId: 'mod-05', title: 'Hi-hat og stortromme', duration: 10, level: 1, premium: false, format: ['video', 'notation'], bpm: { min: 60, max: 90 }, skills: ['hihat', 'kick'] },
      { id: 'l-05-03', moduleId: 'mod-05', title: 'Ghost notes i koordination', duration: 12, level: 2, premium: true, format: ['video', 'notation'], bpm: { min: 65, max: 90 }, skills: ['ghost-notes', 'independence'] },
      { id: 'l-05-04', moduleId: 'mod-05', title: 'Hi-hat foot på 2 og 4', duration: 10, level: 3, premium: true, format: ['video', 'notation'], bpm: { min: 70, max: 95 }, skills: ['hihat-foot', 'independence'] },
      { id: 'l-05-05', moduleId: 'mod-05', title: 'Ride-bækken og comping', duration: 12, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 75, max: 110 }, skills: ['ride', 'comping', 'jazz'] },
      { id: 'l-05-06', moduleId: 'mod-05', title: 'Firevejskoordination', duration: 15, level: 4, premium: true, format: ['video', 'notation'], bpm: { min: 60, max: 90 }, skills: ['4-way', 'independence'] },
      { id: 'l-05-07', moduleId: 'mod-05', title: 'Latin independence', duration: 15, level: 4, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 80, max: 120 }, skills: ['latin', 'independence'] },
      { id: 'l-05-08', moduleId: 'mod-05', title: 'Avancerede ostinatoer', duration: 15, level: 5, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 100 }, skills: ['ostinato', 'independence'] },
    ],
  },
  {
    id: 'mod-06',
    number: 6,
    name: 'Timing & Tempo',
    pillarId: 'timing',
    levelMin: 0,
    levelMax: 4,
    description: 'Timing er en musikalsk disciplin — ikke en teknisk detalje.',
    lessons: [
      { id: 'l-06-01', moduleId: 'mod-06', title: 'Spil med metronom — fjerdedele', duration: 10, level: 0, premium: false, format: ['video', 'notation', 'playalong'], bpm: { min: 60, max: 80 }, skills: ['metronome', 'pulse'] },
      { id: 'l-06-02', moduleId: 'mod-06', title: 'Metronom på 2 og 4', duration: 10, level: 1, premium: false, format: ['video', 'playalong'], bpm: { min: 70, max: 90 }, skills: ['metronome', 'backbeat'] },
      { id: 'l-06-03', moduleId: 'mod-06', title: 'Fill uden tempo-tab', duration: 10, level: 1, premium: true, format: ['video', 'notation', 'challenge'], bpm: { min: 70, max: 90 }, skills: ['timing', 'fills'] },
      { id: 'l-06-04', moduleId: 'mod-06', title: 'Gap click — metronomen forsvinder', duration: 12, level: 2, premium: true, format: ['video', 'challenge'], bpm: { min: 70, max: 95 }, skills: ['internal-pulse', 'timing'] },
      { id: 'l-06-05', moduleId: 'mod-06', title: 'Shuffle-feel og triplet-puls', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 100 }, skills: ['shuffle', 'feel'] },
      { id: 'l-06-06', moduleId: 'mod-06', title: 'Spil foran/på/bag beatet', duration: 10, level: 2, premium: true, format: ['video', 'playalong'], skills: ['feel', 'groove'] },
      { id: 'l-06-07', moduleId: 'mod-06', title: 'Metric displacement', duration: 15, level: 4, premium: true, format: ['video', 'notation'], bpm: { min: 70, max: 95 }, skills: ['displacement', 'advanced'] },
    ],
  },
  {
    id: 'mod-07',
    number: 7,
    name: 'Noder & Læsning',
    pillarId: 'notation',
    levelMin: 1,
    levelMax: 4,
    description: 'Noder som et kort over musikken.',
    lessons: [
      { id: 'l-07-01', moduleId: 'mod-07', title: 'Trommenotation — oversigt', duration: 8, level: 1, premium: false, format: ['video', 'notation'], skills: ['notation', 'reading'] },
      { id: 'l-07-02', moduleId: 'mod-07', title: 'Fjerdedele og ottendedele', duration: 10, level: 1, premium: false, format: ['video', 'notation'], bpm: { min: 60, max: 90 }, skills: ['notation', 'rhythm'] },
      { id: 'l-07-03', moduleId: 'mod-07', title: 'Sekstendedele og pauser', duration: 10, level: 1, premium: true, format: ['video', 'notation'], bpm: { min: 60, max: 90 }, skills: ['notation', '16th-notes'] },
      { id: 'l-07-04', moduleId: 'mod-07', title: 'Læs og spil — 4-takters groove', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 95 }, skills: ['notation', 'reading', 'groove'] },
      { id: 'l-07-05', moduleId: 'mod-07', title: 'Charts og sangform', duration: 12, level: 3, premium: true, format: ['video', 'notation', 'playalong'], skills: ['charts', 'form'] },
      { id: 'l-07-06', moduleId: 'mod-07', title: 'PDF-download og print', duration: 5, level: 2, premium: true, format: ['notation'], skills: ['pdf'] },
    ],
  },
  {
    id: 'mod-08',
    number: 8,
    name: 'Genrer',
    pillarId: 'genres',
    levelMin: 1,
    levelMax: 5,
    description: 'Rock, funk, jazz, latin, blues, hip-hop og mere.',
    lessons: [
      { id: 'l-08-01', moduleId: 'mod-08', title: 'Rock — grundbeat og dynamik', duration: 12, level: 1, premium: false, format: ['video', 'notation', 'playalong'], bpm: { min: 80, max: 120 }, skills: ['rock', 'genre'] },
      { id: 'l-08-02', moduleId: 'mod-08', title: 'Pop — stabilt og diskret', duration: 12, level: 1, premium: false, format: ['video', 'notation', 'playalong'], bpm: { min: 72, max: 110 }, skills: ['pop', 'genre'] },
      { id: 'l-08-03', moduleId: 'mod-08', title: 'Funk — 16.-dels groove og ghost notes', duration: 15, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 80, max: 105 }, skills: ['funk', 'ghost-notes'] },
      { id: 'l-08-04', moduleId: 'mod-08', title: 'Blues shuffle', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 70, max: 110 }, skills: ['blues', 'shuffle'] },
      { id: 'l-08-05', moduleId: 'mod-08', title: 'Jazz — swing ride og comping', duration: 15, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 100, max: 160 }, skills: ['jazz', 'swing', 'comping'] },
      { id: 'l-08-06', moduleId: 'mod-08', title: 'Bossa nova og latin', duration: 15, level: 3, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 100, max: 140 }, skills: ['latin', 'bossa'] },
      { id: 'l-08-07', moduleId: 'mod-08', title: 'Hip-hop og R&B feel', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 75, max: 100 }, skills: ['hip-hop', 'groove', 'feel'] },
      { id: 'l-08-08', moduleId: 'mod-08', title: 'Metal og punkbeat', duration: 12, level: 2, premium: true, format: ['video', 'notation', 'playalong'], bpm: { min: 120, max: 180 }, skills: ['metal', 'punk', 'speed'] },
    ],
  },
  {
    id: 'mod-09',
    number: 9,
    name: 'Play-along Academy',
    pillarId: 'playalong',
    levelMin: 1,
    levelMax: 5,
    description: 'Øvelser bliver til musik. Det centrale i appen.',
    lessons: [
      { id: 'l-09-01', moduleId: 'mod-09', title: 'Simple Rock 80 BPM', duration: 10, level: 1, premium: false, format: ['playalong'], bpm: { min: 80, max: 80 }, skills: ['playalong', 'rock'] },
      { id: 'l-09-02', moduleId: 'mod-09', title: 'Pop Ballad 72 BPM', duration: 10, level: 1, premium: false, format: ['playalong'], bpm: { min: 72, max: 72 }, skills: ['playalong', 'pop'] },
      { id: 'l-09-03', moduleId: 'mod-09', title: 'Funk Groove 95 BPM', duration: 12, level: 2, premium: true, format: ['playalong'], bpm: { min: 95, max: 95 }, skills: ['playalong', 'funk'] },
      { id: 'l-09-04', moduleId: 'mod-09', title: 'Blues Shuffle 110 BPM', duration: 12, level: 2, premium: true, format: ['playalong'], bpm: { min: 110, max: 110 }, skills: ['playalong', 'blues'] },
      { id: 'l-09-05', moduleId: 'mod-09', title: 'Jazz Swing 140 BPM', duration: 12, level: 3, premium: true, format: ['playalong'], bpm: { min: 140, max: 140 }, skills: ['playalong', 'jazz'] },
      { id: 'l-09-06', moduleId: 'mod-09', title: 'Bossa Nova 120 BPM', duration: 12, level: 3, premium: true, format: ['playalong'], bpm: { min: 120, max: 120 }, skills: ['playalong', 'latin'] },
      { id: 'l-09-07', moduleId: 'mod-09', title: 'Hip-hop Loop 88 BPM', duration: 10, level: 2, premium: true, format: ['playalong'], bpm: { min: 88, max: 88 }, skills: ['playalong', 'hip-hop'] },
    ],
  },
  {
    id: 'mod-10',
    number: 10,
    name: 'Kreativitet & Improvisation',
    pillarId: 'grooves',
    levelMin: 3,
    levelMax: 5,
    description: 'Find dit eget trommesprog.',
    lessons: [
      { id: 'l-10-01', moduleId: 'mod-10', title: 'Call and response', duration: 12, level: 3, premium: true, format: ['video', 'challenge'], skills: ['improvisation', 'musicality'] },
      { id: 'l-10-02', moduleId: 'mod-10', title: 'Lav dit eget fill', duration: 12, level: 3, premium: true, format: ['video', 'challenge'], skills: ['improvisation', 'fills', 'creativity'] },
      { id: 'l-10-03', moduleId: 'mod-10', title: 'Variér et beat', duration: 10, level: 3, premium: true, format: ['video', 'notation', 'playalong'], skills: ['variation', 'musicality'] },
      { id: 'l-10-04', moduleId: 'mod-10', title: 'Byg en solo over fire takter', duration: 15, level: 4, premium: true, format: ['video', 'challenge'], skills: ['solo', 'phrasing'] },
      { id: 'l-10-05', moduleId: 'mod-10', title: 'Din egen trommestemme', duration: 20, level: 5, premium: true, format: ['video', 'challenge', 'playalong'], skills: ['identity', 'musicality', 'improvisation'] },
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────

export function getLessonsByLevel(levelId: number): CurriculumLesson[] {
  return MODULES.flatMap(m => m.lessons).filter(l => l.level === levelId);
}

export function getModulesByLevel(levelId: number): CurriculumModule[] {
  return MODULES.filter(m => m.levelMin <= levelId && m.levelMax >= levelId);
}

export function getTotalLessons(): number {
  return MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
}

export function getFreeLessons(): CurriculumLesson[] {
  return MODULES.flatMap(m => m.lessons).filter(l => !l.premium);
}
