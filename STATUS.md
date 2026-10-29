# ExploreOsaka – Projektstatus

Stand: Demo v0.4 – Regionen 1–4: „Hokusetsu & Hanshin-Nord“ (Screens 1–19 inkl. 2a/2b/2c), „Kita & Nakanoshima“ (20–29), „Chūō – Burgbezirk“ (30–36 inkl. 32a/32b) und „Minami & Bucht“ (37–52 inkl. 45a/45b).
Automatischer Komplett-Durchlauf (`tools/playtest.cjs`): **222/222 Etappen spielbar, keine Laufzeitfehler** (Handy- und PC-Layout).

### Neu in v0.4
- Region 4 mit 17 Screens und 10 Orten auf eigener Karte (Dōtonbori, Amerikamura, Namba, Kuromon, Den Den Town, Kyocera Dome, Taishō, Tempozan, Kindai).
- 85 neue Etappen in 20 Strängen; drei neue Stränge: Kuidaore (Essen), Subkultur & Sammler (komplett, 9/9), Osaka Tamashii (Händlergeist & Humor).
- Neue Mechanik SECRET_INGREDIENT_GUESS: Zutat erraten, jeder Fehltipp deckt einen weiteren Geschmackshinweis auf.
- DRINK_ETIQUETTE_CHOICE (Kanpai, Oshaku, Otōshi) als Situationsfragen mit Erklärung.
- Spielbeginn: Kenji erklärt in sechs Dialogboxen das Spielprinzip, danach folgen seine beiden Etappen im Zimmer (Wortschatz 1, Nachtleben 1) direkt hintereinander – nicht überspringbar. Das ist die einzige Ausnahme von der Strang-Auswahl.
- Faktenprüfung zu Region 3 eingearbeitet (Tokugawa-Mauersteine, Shin-Yodogawa 1896–1910 mit de Rijke).

### Neu in v0.3
- Region 3 mit 8 Screens und 6 Orten auf eigener Karte (Burggraben, Ōkawa, Uemachi-Hochebene).
- 15 neue Etappen (Geographie 5–7, Natur 5, Philosophie 10–12, Campus 13, Hiragana 11–12, Kanji 9–11) und der neue Strang „Wahrzeichen & Bildausschnitte“ (Etappen 1–2).
- Neue Mechanik FRAMING_PHOTO_CHALLENGE: Sucher auf dem oberen Bildschirm setzen, zoomen, auslösen; der fertige Abzug zeigt den gewählten Bildausschnitt.
- Mehrere Stränge bei derselben Figur laufen nicht mehr automatisch hintereinander: Nach jeder Etappe geht es zurück ins Erkunden, und hat eine Figur mehrere Stränge offen, wählt man beim Ansprechen aus einer Liste, worüber man spricht.
- Faktenprüfung zu Region 2 eingearbeitet (u. a. 808 Brücken / rund 200 tatsächliche Brücken, Yasui Dōton, 636 Tekijuku-Schüler, Kohlblatt beim Kushikatsu).

### Neu in v0.2
- Region 2 mit 10 Screens und 8 Orten auf einer eigenen Karte (Umschalter „Region“ in der Weltkarte).
- 62 neue Etappen, 4 neue Stränge (Bahnhöfe & Gleise, Café-Kultur, Literatur, Schnäppchen).
- Neue Mechaniken: Holen & Zurückbringen, Kartenquiz/Wegfindung, Ticketautomat, Espresso-Maschine, Chronologisch sortieren, Kanji-Raster, Dating-Etikette.
- Figuren in allen Screens beider Regionen neu skaliert und platziert (Größe an den Passanten im Bild gemessen, Füße auf freiem Boden). Prüfwerkzeug: `python3 tools/preview_slots.py <ordner> [screen-ids]` legt Raster und Testfiguren über die Hintergründe.

---

## 1. Umgesetzt

### Technik
- TypeScript, gebündelt mit esbuild (`npm run build` → `dist/`, `npm run dev` → Server auf Port 5173).
- Installierbare PWA: `manifest.webmanifest`, Service Worker (`public/sw.js`) mit Bild-Cache für Offline-Spiel. Registriert sich nur unter `https://`.
- Übersetzbar: Alle Oberflächentexte in `src/i18n/de.json`; alle Inhalte (Dialoge, Ortsnamen, NPC-Namen, Strangtitel) in `src/content/de/`. Für eine neue Sprache Ordner `content/en/` + `i18n/en.json` anlegen und in `src/i18n.ts` registrieren. Sprachneutrale Daten liegen getrennt in `src/data/`.
- Datenprüfung: `npm run validate` prüft Screens, Sprites, Sprecher, Posen, Antwort-Indizes, Kacheln.

### Darstellung
- Doppelbildschirm 4:3: im Hochformat übereinander (der untere Bildschirm nutzt die Resthöhe), im Querformat nebeneinander. Die Wahl erfolgt automatisch nach größter Bildfläche.
- Oberer Bildschirm: Artwork, Ortsschild (Japanisch + Deutsch), Figuren mit „!“-Blase, Stimmungsfilter (Morgen / Goldene Stunde / Nacht) per CSS-Overlay statt neuer Artworks.
- Unterer Bildschirm: Pergament-Dialogbox mit Navy/Gold-Namensschild, Porträt (Ausschnitt der Figur über der Box), Schreibmaschinen-Effekt.
- Schriften: Fredoka (Titel), Manrope (Text), Noto Sans JP (Japanisch) über Google Fonts.
- UI-Elemente (Dialogbox, Icons, „!“, Lupe, Karte) als CSS/SVG nachgebaut, da die gelieferten PNGs nicht freigestellt sind.

### Bilder (aufbereitet, Skripte in `tools/`)
- Alle 75 Screens (+ Variante 53-A/B, 4 Zusatz-Hintergründe) als WebP in 1600 px und 960 px (`tools/convert_screens.py`).
- Alle 7 Sprite-Sheets freigestellt und in einzelne Posen geschnitten (`tools/cut_sprites.py`, Zuordnung `tools/sprite_map.json`): 26 Figuren × 3 Posen (Aoi 5, Ren doppelt → `relaxed2` usw.).
- Posen-IDs je Figur nach Stimmung, z. B. Kenji `relaxed / talk / hyped`, Takada `think / explain / ponder`, Aoi `map / cheer / worried / happy / note`. Siehe `src/data/npcs.json`.
- Logo freigestellt, App-Icons 512/192/180 px, Titelbild aus „Logo mit Skyline“.

### Welt & Navigation
- Weltkarte (auf dem oberen Bildschirm), eine Karte pro Region (Region 1: 13 Orte, Region 2: 8 Orte, Region 3: 6 Orte, Region 4: 10 Orte), Umschalten per Region-Tab, freie Schnellreise, Markierung „hier“ und „besucht“, **keine Quest-Marker**.
- Wege zwischen Unter-Screens eines Ortes (z. B. Wohnheim: Flur ↔ Zimmer ↔ Küche) direkt im Erkunden-Menü.
- NPC-Platzierung: Slots A/B/C mit Werten pro Screen (x, Fußhöhe, Größe in % der Bildhöhe) in `src/data/world.json`, für alle Screens der Regionen 1–4 einzeln eingemessen.

### Quest-System
- Alle Stränge von Beginn an offen; Fortschritt über Etappen-Freischaltung.
- Concurrency nach GDD: höchstens 3 Figuren pro Screen, jede Figur nur einmal. Hat eine Figur Etappen aus mehreren Strängen, erscheint beim Ansprechen eine Auswahl der Stränge; nach jeder Etappe geht es zurück ins Erkunden (kein automatisches Weiterspielen). Überlauf wartet im Off-Screen-Puffer („Noch jemand wartet in der Nähe …“).
- Priorität: zuletzt bearbeiteter Strang → weiter fortgeschrittener Strang → feste Strangreihenfolge (`STRAND_ORDER` in `src/data.ts`).
- Eine Figur darf gleichzeitig auf mehreren Screens stehen.
- Tageszeit/Stimmung wechselt nur, wenn eine Etappe sie verlangt, erst beim Start des Gesprächs, und springt danach zurück.
- Routenwahl Romance (Aoi / Maya) → `BRANCH_ACTIVE_PARTNER` wird aufgelöst.
- Quest-Log: entdeckte Stränge (x / 25), Etappe x / Gesamtlänge, Sterne x / Maximum, letzter Hinweis, Hinweis „außerhalb der Demo“.

### Sterne
- 3 Sterne je Etappe mit Prüfung, jeder Fehler −1, minimal 0. Wiederholen, bis die Aufgabe gelöst ist; Scheitern gibt es nicht.
- Reine Dialoge und die Routenwahl geben keine Sterne und zählen nicht zum Maximum.
- Mehrere Aufgaben in einer Etappe teilen sich die 3 Sterne.
- Abgeschlossene Etappen lassen sich nicht wiederholen.

### Mechaniken (implementiert)
| Mechanik | Umsetzung |
|---|---|
| DIALOGUE_PURE | Dialog |
| DIALOGUE_RECALL | je nach Frage Auswahl oder Texteingabe |
| KNOWLEDGE_MULTIPLE_CHOICE | 4 Optionen, Erklärung nach richtiger Antwort |
| ESTIMATION_INPUT | Schieberegler + Zahlenfeld, ±10 % Toleranz, Hinweis „zu hoch/zu niedrig“ |
| POINT_AND_CLICK_INSPECT | Tippen auf den oberen Bildschirm; Treffer öffnet eine Nahaufnahme (SVG). Fehltipps weit daneben kosten einen Stern, knapp daneben nicht |
| FETCH_AND_RETURN | Auftrag annehmen → am Zielort liegt der Gegenstand im Bild (Lupe) und in der Liste „Hier liegt etwas“ → einstecken (Tasche, Nahaufnahme) → beim Auftraggeber abgeben. Keine Sterne |
| HIRAGANA_ROMAJI_TILE_MATCH | Kachel-Paare Kana ↔ Rōmaji in Runden |
| KATAKANA_SIGN_DECIPHER | Schild lesen, Silben in Reihenfolge antippen |
| VOCAB_ITEM_SLOT_IN | Wort antippen, dann passendes Ding/Person |
| SENTENCE_BUILDER_PUZZLE | Bausteine in Reihenfolge, Ablenker-Kacheln |
| ROUTE_BRANCH_CHOICE | Entscheidung, gespeichert als Flag |
| GEO_MAP_QUIZ / WAYFINDING_MAP | Karte auf dem oberen Bildschirm, Punkt antippen; mehrere Runden (Kanäle, Monorail-Netz, Umeda-Ausgänge) |
| TICKET_VENDING_MINIGAME | Fahrpreistafel in Kana lesen → Preisknopf drücken → Münzen einwerfen, Wechselgeld-Anzeige |
| ESPRESSO_EXTRACTION_TWEAK | Mahlgrad, Temperatur, Anpressdruck einstellen; jeder misslungene Bezug mit Geschmacks-Rückmeldung kostet einen Stern |
| BOOK_CHRONO_SORT | Karten in die richtige Reihenfolge tippen, Prüfen/Zurücknehmen |
| KANJI_RADICAL_STROKE_PICK | Kanji-Raster: deutsche Bedeutung → passendes Zeichen antippen |
| DATING_ETIQUETTE_CHOICE | Situationsfragen mit Erklärung; Texte je nach Partnerin (Aoi/Maya) |
| SECRET_INGREDIENT_GUESS | Gericht als Nahaufnahme, Antwortauswahl; jeder Fehltipp kostet einen Stern und deckt den nächsten Hinweis auf |
| DRINK_ETIQUETTE_CHOICE | Situationsfragen in der Izakaya/Bar mit Erklärung |
| FRAMING_PHOTO_CHALLENGE | Sucher (4:3, Drittel-Raster) per Tippen setzen, Zoom 1–6×, Auslösen; Rückmeldung „nicht im Bild / angeschnitten / zu weit / zu nah“, jeder Fehlversuch kostet einen Stern |

### Sprache
- Hepburn mit Makron; N5-Grenze; Kansai-ben nur als markierte Ausnahme (Karuta-Etappe).
- Lesehilfe „Rōmaji anzeigen“ abschaltbar. Bei Lesetests (z. B. „Welches Zeichen ist u?“) wird nie Rōmaji gezeigt.
- Antippbare Furigana-Wörter im Fließtext (selten, `[[漢字|かな|rōmaji|Deutsch]]`) → landen im Vokabelheft.
- Vokabelheft (nur Nachschlagen), automatisch befüllt mit den Wörtern der Sprach-Etappen.
- Name frei eingebbar, optional in Katakana (eigene Kana-Tastatur). Ohne Katakana wird in japanischen Sätzen der lateinische Name verwendet.

### Speichern & Sonstiges
- 3 Speicherplätze im Browser (`localStorage`), Autosave nach jeder Etappe und Reise (abschaltbar), manuelles Speichern und Laden, Export/Import als JSON-Datei, Warnung vor ungespeichertem Fortschritt beim Verlassen.
- Einstellungen (global): Lesehilfe, Sound, Autosave, Textgeschwindigkeit.
- Synthetische Soundeffekte (WebAudio, keine Dateien).
- Bedienung per Touch, Maus und Tastatur: Enter/Leertaste = weiter, 1–9 = Antworten, Esc = zurück, M/Q/V/B = Karte/Quests/Vokabeln/Tasche.
- `prefers-reduced-motion` wird respektiert.

### Inhalte der Demo (222 Etappen in 22 Strängen)
| Strang | Etappen in der Demo | Ende in der Demo führt nach |
|---|---|---|
| Geographie | 1–8 | 65 Sumiyoshi Taisha |
| Natur & Stille | 1–6 | 57 Tenshiba |
| Nachtleben | 1–9 | 53 Shinsekai |
| Philosophie & Glaube | 1–12 | 58 Shitennō-ji |
| Kultur Japan | 1–2 | 65 Sumiyoshi Taisha |
| Kansai Pride | 1–9 | 53 Shinsekai |
| Fußball-Derby | 1–11 | 57 Tenshiba |
| Campus-Atlas | 1–15 | 60 OMU Sugimoto |
| Romance | 1–20 | 57 Tenshiba |
| Hiragana | 1–16 | 53 Shinsekai |
| Katakana | 1–18 | 56b Abeno Harukas |
| Kanji | 1–15 | 58 Shitennō-ji |
| Wortschatz | 1–16 | 53 Shinsekai |
| Konversation | 1–18 | 53 Shinsekai |
| Bahnhöfe & Gleise | 1–8 | 53 Shinsekai |
| Café-Kultur | 1–7 | 57 Tenshiba |
| Schnäppchen | 1–5 | 56b Abeno Harukas |
| Literatur | 1–7 | 59 Shitennō-ji |
| Wahrzeichen | 1–4 | 54 Tsūtenkaku |
| Kuidaore | 1–3 | 53 Shinsekai |
| Subkultur & Sammler | 1–9 | – (abgeschlossen) |
| Osaka Tamashii | 1–4 | 53 Shinsekai |

Drei Stränge (Stadtentwicklung, Tempelpfade, Schreine) beginnen in Region 5/6 und kommen noch nicht vor.
Dialoge: Ø 5,3 Zeilen je Etappe (min. 4, max. 8), dazu kommen die Aufgabentexte.

---

## 2. Offen / vereinfacht (Platzhalter)

### Thematische Minigames → derzeit als Auswahl-Runden im Thema
- SOCCER_1V1_TACTIC_MATCH (Fußball 2, 6, 7): Situation lesen → eine der 4 Aktionen wählen.
- PENALTY_TIMING_STOP (Fußball 4): Torwart lesen → Ecke wählen (kein Timing-Balken).
- HANAFUDA_MATCH_MINI (Kultur Japan 2): Monat → Pflanze, mit einfacher SVG-Karte.
- KARUTA_TOUCH_SLAP (Kansai 4, 7): Satz/Hinweis → Karte, mit 8-Sekunden-Zeitbalken.
- SILHOUETTE_IDENTIFY (Natur 2): Blatt-Umriss → Baum.
- Noch gar nicht umgesetzt (keine Etappe in den Regionen 1–4): SHOGI_ONE_MOVE_PUZZLE, FINAL_CONFESSION_CHOICE, ITEM_SUBMISSION.
- KANJI_RADICAL_STROKE_PICK ist als Kanji-Raster umgesetzt (Bedeutung → Zeichen), ohne echtes Strich- oder Radikal-Zerlegen.

### Grafik
- Platzhalter-Figuren (Silhouette mit „?“): Ryōsuke / STUDENT_KANDAI_LAW, Tori / TORI_TETSU_TAKUMI, Haruto / STUDENT_KWANSEI_REP, Mio / STUDENT_OTEMON_BIZ; Kater Goro als gezeichnete SVG-Katze. Noch ohne Sprite und noch nicht im Spiel: STUDENT_OMU_LEAD.
- Nahaufnahmen (Kolk, goldenes Gesicht, Infotafel, Tiger, Spielplan, Gedenkstein, Lageplan, Banner, Espresso, Ladenschild, Linienplan, Buchrücken, Bildband, Holzdruck, Torschild, Uhrturm, Wörterbuch, Register, Graureiher, Schwarzes Brett, Namensstein Ōtemae, Löwenzähne, Seil, Flyer, Shīsā, Spielmodule, Tour-Shirt, Bausatz, Mützenregal, Omamori, Momiji, Filter, Katsuobushi, Artbook, Bunraku-Heft, Kunstrasenschuhe, Comic, Wagashi, Takoyaki-Teller) und die Quizkarten (Kanäle, Monorail, Umeda-Ausgänge, Bucht von Ōsaka) sind einfache Vektorzeichnungen und können durch Artworks ersetzt werden (`src/ui/art.ts` → `closeups`).
- Partikeleffekte (Blüten, Regen, Laub) aus dem GDD fehlen noch.
- Screen 53: Variante B ist als Standard eingetragen, A als Alternative (`variants` in `world.json`); die Rotation selbst ist noch nicht gebaut, da Region 5 außerhalb der Demo liegt.
- Screens 11–17 haben nur halbe Auflösung (bewusst so belassen).
- Weltkarte ist schematisch gezeichnet (keine echte Kartengrundlage).

### Inhalte
- Regionen 5–6: Bilder fertig konvertiert, aber keine Ortsdaten (japanische Schilder, Slots, Hotspots) und keine Dialoge.
- 220 von 442 Etappen ohne Dialogtexte.
- Kanji-Strang bis Etappe 15 auf N5 umgestellt (siehe `CHANGES.md`). Ab Etappe 16 stehen im Bundle noch Nicht-N5-Zeichen (u. a. 寺, 心, 神, 鳥, 地, 図, 館, 医, 院, 作, 工). Die Hentaigana-Etappe (Hiragana 12) ist ersetzt durch alte Schreibweisen (ゑ/ゐ, Schilder von rechts nach links).
- Die gelieferten Sachquellen-PDFs decken nur Bundle 04 ab (beide Dateien identisch). Für Region 1 wurden die „200 Fakten“ und Allgemeinwissen genutzt; zu prüfen siehe `CHANGES.md` → „Zur Faktenprüfung“.

### Technik
- Vokabelheft ohne Wiederholungsfunktion (SRS), wie vereinbart.
- Kein Hilfesystem für schwere Hinweise, wie vereinbart.
- Keine Musik, keine Sprachausgabe.
- Play-Store-Paket (z. B. Capacitor/TWA) noch nicht eingerichtet.
- Markenrechte (Logos auf Screen 10/11/16/17, Markennamen in Texten) für eine Veröffentlichung noch nicht bereinigt.
- Speicherstände liegen nur im Browser; Export/Import als Sicherung.

---

## 3. Ablage

```
src/data/        sprachneutrale Daten (Quests im Bundle-Format, Welt, NPCs)
src/content/de/  deutsche Inhalte (Dialoge, Orte, Namen)
src/i18n/de.json Oberflächentexte
src/ui/          Darstellung (Szene, Dialog, Aufgaben, Menüs, Vektorgrafiken)
public/img/      aufbereitete Bilder
tools/           Bild-Pipeline, Build, Validierung, automatischer Durchlauf
```
