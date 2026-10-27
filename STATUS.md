# ExploreOsaka – Projektstatus

Stand: Demo v0.2 – Region 1 „Hokusetsu & Hanshin-Nord“ (Screens 1–19 inkl. 2a/2b/2c) und Region 2 „Kita & Nakanoshima“ (Screens 20–29).
Automatischer Komplett-Durchlauf (`tools/playtest.cjs`): **122/122 Etappen spielbar, keine Laufzeitfehler** (Handy- und PC-Layout).

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
- Weltkarte (auf dem oberen Bildschirm), eine Karte pro Region (Region 1: 13 Orte, Region 2: 8 Orte), Umschalten per Region-Tab, freie Schnellreise, Markierung „hier“ und „besucht“, **keine Quest-Marker**.
- Wege zwischen Unter-Screens eines Ortes (z. B. Wohnheim: Flur ↔ Zimmer ↔ Küche) direkt im Erkunden-Menü.
- NPC-Platzierung: Slots A/B/C mit Werten pro Screen (x, Fußhöhe, Größe in % der Bildhöhe) in `src/data/world.json`, für alle Screens der Regionen 1 und 2 einzeln eingemessen.

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

### Inhalte der Demo (122 Etappen in 18 Strängen)
| Strang | Etappen in der Demo | Ende in der Demo führt nach |
|---|---|---|
| Geographie | 1–4 | 35 Museum of History |
| Natur & Stille | 1–4 | 30 Burg Ōsaka |
| Nachtleben | 1 | 39 Amerikamura |
| Philosophie & Glaube | 1–9 | 35 Museum of History |
| Kultur Japan | 1–2 | 65 Sumiyoshi Taisha |
| Kansai Pride | 1–7 | 35 Museum of History |
| Fußball-Derby | 1–8 | 47 Kyocera Dome |
| Campus-Atlas | 1–12 | 36 Otemon Gakuin |
| Romance | 1–7 | 39 Amerikamura |
| Hiragana | 1–10 | 30 Burg Ōsaka |
| Katakana | 1–9 | 39 Amerikamura |
| Kanji | 1–8 | 30 Burg Ōsaka |
| Wortschatz | 1–11 | 37 Dōtonbori |
| Konversation | 1–10 | 37 Dōtonbori |
| Bahnhöfe & Gleise | 1–7 | 41 Namba Parks |
| Café-Kultur | 1–4 | 40 Amerikamura |
| Schnäppchen | 1–3 | 43 Kuromon-Markt |
| Literatur | 1–6 | 51 Kindai |

Sieben Stränge beginnen außerhalb der Regionen 1–2 und kommen in der Demo noch nicht vor.
Dialoge: Ø 5,6 Zeilen je Etappe (min. 5, max. 8), dazu kommen die Aufgabentexte.

---

## 2. Offen / vereinfacht (Platzhalter)

### Thematische Minigames → derzeit als Auswahl-Runden im Thema
- SOCCER_1V1_TACTIC_MATCH (Fußball 2, 6, 7): Situation lesen → eine der 4 Aktionen wählen.
- PENALTY_TIMING_STOP (Fußball 4): Torwart lesen → Ecke wählen (kein Timing-Balken).
- HANAFUDA_MATCH_MINI (Kultur Japan 2): Monat → Pflanze, mit einfacher SVG-Karte.
- KARUTA_TOUCH_SLAP (Kansai 4, 7): Satz/Hinweis → Karte, mit 8-Sekunden-Zeitbalken.
- SILHOUETTE_IDENTIFY (Natur 2): Blatt-Umriss → Baum.
- Noch gar nicht umgesetzt (keine Etappe in den Regionen 1–2): SECRET_INGREDIENT_GUESS, DRINK_ETIQUETTE_CHOICE, FRAMING_PHOTO_CHALLENGE, SHOGI_ONE_MOVE_PUZZLE, FINAL_CONFESSION_CHOICE, ITEM_SUBMISSION.
- KANJI_RADICAL_STROKE_PICK ist als Kanji-Raster umgesetzt (Bedeutung → Zeichen), ohne echtes Strich- oder Radikal-Zerlegen.

### Grafik
- Platzhalter-Figuren (Silhouette mit „?“): Ryōsuke / STUDENT_KANDAI_LAW, Tori / TORI_TETSU_TAKUMI, Haruto / STUDENT_KWANSEI_REP; Kater Goro als gezeichnete SVG-Katze. Noch ohne Sprite und noch nicht im Spiel: STUDENT_OTEMON_BIZ, STUDENT_OMU_LEAD.
- Nahaufnahmen (Kolk, goldenes Gesicht, Infotafel, Tiger, Spielplan, Gedenkstein, Lageplan, Banner, Espresso, Ladenschild, Linienplan, Buchrücken, Bildband, Holzdruck, Torschild, Uhrturm, Wörterbuch, Register) und die Quizkarten (Kanäle, Monorail, Umeda-Ausgänge) sind einfache Vektorzeichnungen und können durch Artworks ersetzt werden (`src/ui/art.ts` → `closeups`).
- Partikeleffekte (Blüten, Regen, Laub) aus dem GDD fehlen noch.
- Screen 53: Variante B ist als Standard eingetragen, A als Alternative (`variants` in `world.json`); die Rotation selbst ist noch nicht gebaut, da Region 5 außerhalb der Demo liegt.
- Screens 11–17 haben nur halbe Auflösung (bewusst so belassen).
- Weltkarte ist schematisch gezeichnet (keine echte Kartengrundlage).

### Inhalte
- Regionen 3–6: Bilder fertig konvertiert, aber keine Ortsdaten (japanische Schilder, Slots, Hotspots) und keine Dialoge.
- 320 von 442 Etappen ohne Dialogtexte.
- Kanji-Strang bis Etappe 8 auf N5 umgestellt (siehe `CHANGES.md`). Ab Etappe 9 stehen im Bundle noch Nicht-N5-Zeichen (u. a. 城, 社, 神, 鳥, 道, 地, 図, 館, 医, 院, 寺, 心, 作, 工, 物, 店, 肉). Die Hentaigana-Etappe (Hiragana 12) muss inhaltlich ersetzt werden.
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
