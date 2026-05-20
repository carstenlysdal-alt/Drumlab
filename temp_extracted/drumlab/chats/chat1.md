# App Design System

_Started 2026-05-20 07:37 UTC_

---

## User

Jeg ønsker et profiessionelt, lean og ui-intuitivt design til denne app.

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: questions_v2]_

Jeg kan se du har vedhæftet en Google Doc-fil, men den indeholder kun en reference – ikke selve indholdet. Jeg kan ikke åbne Google Docs direkte. Kunne du enten:
- Kopiere indholdet ind som tekst, eller
- Eksportere som PDF og uploade?

I mellemtiden vil jeg gerne stille nogle spørgsmål for at give dig det bedst mulige design.

## User

Questions answered:
- platform: iOS (mobil)
- target_user: Musikstuderende / elev
- tone: Mørk og energisk (studio-vibe)
- color_direction: Begge dele med toggle
- key_features: Vise noder, øvelser, Youtube-videoer og læringsplaner, ligesom brugere skal kunne chatte og konferere med appen

- variations: Én polished retning
- interactions: Klikbar gennem hele flow'et
- language: Dansk

## Assistant

_[tool: list_files]_

_[tool: update_todos]_

Tak! Jeg har nok at gå i gang med. Min plan:

**Design system: "Studio Dark"** — varm amber accent (som en studie-lampe), Geist + Geist Mono som typografi, mørk som default men med toggle.

**Skærme:**
- Hjem · Lektioner · AI Coach · Profil (bottom tabs)
- Lektion detail med tabs (Noder · Video · Øvelser)
- Onboarding lille intro
- Fuld klikbar flow

Lad mig begynde.

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: write_file]_

Lad mig skrive selve appen. Jeg laver en samlet React-baseret prototype med fuld klikbar navigation.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: show_html]_

_[tool: done]_

_[tool: fork_verifier_agent]_

DrumLab er klar 🥁

**Stack:**
- iOS-prototype (402×874), Studio Dark default med toggle til lyst tema (i toppen af Hjem + i Profil)
- Bundtabs: **Hjem · Lektioner · Coach · Profil**
- Hjem: Dagens øvelse-hero med inline tromme­notation, streak/tid/niveau, aktiv læringsplan, værktøjer, anbefalede videoer
- Lektioner: progress på aktiv plan + 10 lektioner med done/active/locked states + andre planer
- Lektion detail: tabs **Noder · Video · Øvelser** med play/pause + BPM-kontrol (noterne animerer i takt når du trykker play)
- AI Coach: rigtig chat-UI med foreslåede prompts, beskedhistorik og send-funktion
- Profil: avatar, XP-bar, statistik, mærker, indstillinger

**Designsystem:** varm amber (#f5a524) som signaturfarve, JetBrains Mono til BPM/tal, SF Pro til UI. Trommenotation tegnet som ægte 4/4-takt (kick/snare/hi-hat).

Verifier checker layoutet på tværs af alle skærme nu — venter rapport. Sig endelig til hvis du vil have noget tunet (farve, copy, ekstra skærme som onboarding/optag-flow, eller skifte til lys default).

## User

Verifier agent check completed

## Assistant

_[tool: str_replace_edit]_

Now wrap the device in a scaler in app.jsx:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now fix the wrapping issues:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Fix Lessons progress card and lesson detail Kapitler spacing:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Fix er pushet:

- **Hele enheden skalerer nu** til viewportet (transform: scale med ResizeObserver) — tab-bar er altid synlig
- Statistik-værdier på Profil får `nowrap` ("12 dage", "48 timer" osv. holder sig på én linje)
- Hjem-statistik: kortere labels ("uge" i stedet for "denne uge") + nowrap
- Lektioner progress: "X af Y lektioner" på én linje
- "Kapitler" sektionslabel under videoen har nu margin top

Verifier dobbeltchecker nu. Sig til hvis du har feedback på selve designet — eller hvis du vil have mig til at tilføje fx onboarding-flow, søgning, optage-skærm, eller justere amber-tonen.

## User

Verifier agent check completed

## Assistant

Verifier er grøn ✅ — alle fix bekræftet. DrumLab er klar at klikke igennem.

## User

Mere som dette

## Assistant

_[tool: update_todos]_

Den retning forstår jeg fuldt ud — editorial, kohlsort baggrund, coral accent, **DM Serif Display** italic til hero-typografi, hand-sketched linje-illustrationer, og en **Trommesæt** fane. Lad mig pivotere designet.

_[tool: str_replace_edit]_

_[tool: write_file]_

Now let me rewrite the screens with the new editorial design. Starting with tokens + Home:Now the Practice (Øvelser) screen — reframed around topics like the reference:

_[tool: write_file]_

_[tool: write_file]_

Now Studio Kit (Trommesæt) screen + updated Coach + Profile:

_[tool: write_file]_

_[tool: write_file]_

Now update the HTML to load the new screens file + import DM Serif Display:

_[tool: write_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Pivoteret til editorial-stil 🔥

**Hvad er ændret efter referencen:**

- **Farver** – byttet amber ud med coral (#ef5a3a), ren sort baggrund (#0a0a0a)
- **Typografi** – DM Serif Display *italic* til hero-overskrifter, ALL CAPS labels med wide tracking
- **Onboarding splash** – DrumLab. brand + crossed sticks + snare line-art + KOM I GANG (vises kun ved første besøg, persisteres i localStorage)
- **Navigation** – 4 tabs: **Hjem · Øvelser · Trommesæt · Profil** (Coach er flyttet til en sparkle-knap i toppen)
- **Hjem** – Radial 73% Dagligt Mål, Fortsæt hvor du slap, Anbefalede tracks, AI Coach kort
- **Øvelser** – Track-kort (Rytme & Timing, Fills & Grooves osv.) → detail med centreret illustration + features + lektionsliste + sticky CTA
- **Trommesæt** – Studio Kit overview + interaktiv 3×3 pad-view med små web-audio toner og glow når man trykker
- **Illustrationer** – håndtegnede line-art (snare, drum kit, sticks) i coral

Verifier tester alle skærme nu. Du kan altid trigge onboarding igen med `localStorage.clear()` i konsollen.

## User

Man ksal ikke kunne scrolle op under uret og batteri på iphone. Den skal stoppe i toppen

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Også sikre at iOS-statusbaren altid ligger ovenpå overlays:

_[tool: str_replace_edit]_

_[tool: done]_

Fix:

- **Indholdet starter nu under statusbaren** (top: 62px) i stedet for at scrolle bagved den
- **Statusbaren har solid baggrund** der matcher app-temaet
- **Z-index hævet** så ur/batteri/dynamic island altid ligger øverst — også over overlays som Lektion/Coach/Trommesæt

Prøv at scrolle på Hjem — toppen klipper rent nu.

## User

Lav et lækkert ui på desktop, som resonerer med mobilen.

## Assistant

_[tool: copy_starter_component]_

Lad mig bygge en desktop-version med samme editorial vibe. Først macOS-rammen:

_[tool: read_file]_

_[tool: write_file]_

Lad mig designe en desktop-version med samme editorial DNA. Layout: macOS-window med sidebar + main + AI Coach-panel.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: write_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Desktop-versionen er klar — same coral, same DM Serif Display italics, samme illustrations DNA — bare layet ud til store skærme.

**Struktur:**
- macOS-vindue (1440×900) med traffic lights
- **Sidebar** (248px): brand, søg, nav (Hjem · Øvelser · Trommesæt · Bibliotek · Profil), aktiv lektion-kort, bruger
- **Main**: editorial layout per view
- **AI Coach panel** (380px) højre side — kollapsibel til floating bubble

**Views:**
- **Hjem** – Stor *"Hej, Astrid"*, Dagligt mål-radial + Fortsæt-kort med snare-illustration side-om-side, 4-kolonne stats-strip, Anbefalede tracks (3-grid), Seneste aktivitet + Videoer
- **Øvelser** – 2-kolonne grid af track-kort med filter chips
- **Track Detail** – Hero med stor italic titel + illustration på højre, features, og en *tabel* over lektioner (#, titel, BPM, længde)
- **Trommesæt** – Stort kit-illustration, 3×3 pads med tastatur-shortcuts (H G C S T Y F R Space), mixer-panel med sliders + kit-vælger
- **Bibliotek** – 3-kolonne grid med noder/videoer/optagelser
- **Profil** – Stor avatar + italic navn, XP-bar, stats, aktivitets-heatmap (12 uger), mærker, indstillinger

Verifier tjekker alle views nu. Sig endelig til hvis du vil have justeret layout, farver, eller tilføjet noget specifikt (fx kalender, øvelsesplan editor, exports).

## User

Verifier agent check completed

## Assistant

_[tool: str_replace_edit]_

Fix Studio Kit pad labels + "Maple Studio Kit" overlay:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Fix practice card pills wrapping:

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Fix pushet — alle italic display-overskrifter er nu `whiteSpace: nowrap` by default, pad-labels og kit-overlay tilsvarende, og praksis-kortenes pills bruger flexWrap med kortere tekst. Verifier dobbeltchecker.

## User

Verifier agent check completed

