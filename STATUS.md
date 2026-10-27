# ExploreOsaka – Projektstatus

Stand: Demo v0.1 (Großregion 1 „Hokusetsu & Hanshin-Nord“, Screens 1–19 inkl. 2a/2b/2c).
Automatischer Komplett-Durchlauf (`tools/playtest.cjs`): **60/60 Etappen spielbar, keine Laufzeitfehler** (Handy- und PC-Layout).

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
- Weltkarte (auf dem oberen Bildschirm) mit 13 Orten der Region 1, freie Schnellreise, Markierung „hier“ und „besucht“, **keine Quest-Marker**.
- Wege zwischen Unter-Screens eines Ortes (z. B. Wohnheim: Flur ↔ Zimmer ↔ Küche) direkt im Erkunden-Menü.
- NPC-Platzierung: generische Slots A/B/C mit Überschreibungen pro Screen (x, Fußhöhe, Größe) in `src/data/world.json` für 1, 2a, 2b, 2c, 5, 9, 11, 13, 15, 17.

### Quest-System
- Alle Stränge von Beginn an offen; Fortschritt über Etappen-Freischaltung.
- Concurrency nach GDD: höchstens 3 Figuren pro Screen, jede Figur nur einmal (Multi-Quest-Merge: Quests derselben Figur folgen nacheinander ohne Szenenwechsel), Überlauf wartet im Off-Screen-Puffer („Noch jemand wartet in der Nähe …“).
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
| FETCH_AND_RETURN | Engine-Unterstützung (Item wird nach Abgabe aus der Tasche entfernt), in Region 1 aber keine Fetch-Etappe |
| HIRAGANA_ROMAJI_TILE_MATCH | Kachel-Paare Kana ↔ Rōmaji in Runden |
| KATAKANA_SIGN_DECIPHER | Schild lesen, Silben in Reihenfolge antippen |
| VOCAB_ITEM_SLOT_IN | Wort antippen, dann passendes Ding/Person |
| SENTENCE_BUILDER_PUZZLE | Bausteine in Reihenfolge, Ablenker-Kacheln |
| ROUTE_BRANCH_CHOICE | Entscheidung, gespeichert als Flag |

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

### Inhalte der Demo (60 Etappen in 14 Strängen)
| Strang | Etappen in der Demo | Ende in der Demo führt nach |
|---|---|---|
| Geographie | 1–3 | 26 Kitahama |
| Natur & Stille | 1–3 | 26 Kitahama |
| Nachtleben | 1 | 39 Amerikamura |
| Philosophie & Glaube | 1–6 | 24 Nakanoshima Center |
| Kultur Japan | 1–2 | 65 Sumiyoshi Taisha |
| Kansai Pride | 1–5 | 24 Nakanoshima Center |
| Fußball-Derby | 1–8 | 47 Kyocera Dome |
| Campus-Atlas | 1–7 | 24 Nakanoshima Center |
| Romance | 1–2 | 26 Kitahama |
| Hiragana | 1–5 | 20 Bahnhof Ōsaka |
| Katakana | 1–5 | 20 Bahnhof Ōsaka |
| Kanji | 1 | 20 Bahnhof Ōsaka |
| Wortschatz | 1–7 | 20 Bahnhof Ōsaka |
| Konversation | 1–5 | 20 Bahnhof Ōsaka |

Elf Stränge beginnen außerhalb von Region 1 und kommen in der Demo noch nicht vor.
Dialoge: Ø 5,5 Zeilen je Etappe (min. 5, max. 7), dazu kommen die Aufgabentexte.

---

## 2. Offen / vereinfacht (Platzhalter)

### Thematische Minigames → derzeit als Auswahl-Runden im Thema
- SOCCER_1V1_TACTIC_MATCH (Fußball 2, 6, 7): Situation lesen → eine der 4 Aktionen wählen.
- PENALTY_TIMING_STOP (Fußball 4): Torwart lesen → Ecke wählen (kein Timing-Balken).
- HANAFUDA_MATCH_MINI (Kultur Japan 2): Monat → Pflanze, mit einfacher SVG-Karte.
- KARUTA_TOUCH_SLAP (Kansai 4): Satz → Bedeutung, mit 8-Sekunden-Zeitbalken.
- SILHOUETTE_IDENTIFY (Natur 2): Blatt-Umriss → Baum.
- Noch gar nicht umgesetzt (keine Etappe in Region 1): ESPRESSO_EXTRACTION_TWEAK, SECRET_INGREDIENT_GUESS, DRINK_ETIQUETTE_CHOICE, DATING_ETIQUETTE_CHOICE, FRAMING_PHOTO_CHALLENGE, BOOK_CHRONO_SORT, SHOGI_ONE_MOVE_PUZZLE, KANJI_RADICAL_STROKE_PICK, WAYFINDING_MAP, TICKET_VENDING_MINIGAME, GEO_MAP_QUIZ, FINAL_CONFESSION_CHOICE, ITEM_SUBMISSION.

### Grafik
- Platzhalter-Figuren: Kater Goro (gezeichnete SVG-Katze), Ryōsuke / STUDENT_KANDAI_LAW (Silhouette). Ebenfalls ohne Sprite: TORI_TETSU_TAKUMI, STUDENT_KWANSEI_REP, STUDENT_OTEMON_BIZ, STUDENT_OMU_LEAD.
- Inspect-Nahaufnahmen (Kolk, goldenes Gesicht, Infotafel, Tiger, Spielplan, Gedenkstein, Lageplan, Banner) sind einfache Vektorzeichnungen und können durch Artworks ersetzt werden (`src/ui/art.ts` → `closeups`).
- Partikeleffekte (Blüten, Regen, Laub) aus dem GDD fehlen noch.
- Screen 53: Variante B ist als Standard eingetragen, A als Alternative (`variants` in `world.json`); die Rotation selbst ist noch nicht gebaut, da Region 5 außerhalb der Demo liegt.
- Screens 11–17 haben nur halbe Auflösung (bewusst so belassen).
- Weltkarte ist schematisch gezeichnet (keine echte Kartengrundlage).

### Inhalte
- Regionen 2–6: Bilder fertig konvertiert, aber keine Ortsdaten (japanische Schilder, Slots, Hotspots) und keine Dialoge.
- 382 von 442 Etappen ohne Dialogtexte.
- Der Kanji-Strang muss ab Etappe 6 auf N5-Zeichen umgestellt werden (im Bundle stehen u. a. 森, 城, 社, 神, 鳥, 道, 地, 図, 館, 医, 院, 寺, 心, 作, 工, 物, 店, 肉). Die Hentaigana-Etappe (Hiragana 12) muss inhaltlich ersetzt werden.
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
