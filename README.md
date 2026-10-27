# ExploreOsaka（エクスプロア・オオサカ）

Erkundungs- und Slice-of-Life-Sprachlern-RPG im Stil der Level-5-Handheld-Spiele: zwei 4:3-Bildschirme, handgezeichnete Schauplätze in Ōsaka, Japanisch auf Niveau A1 / JLPT N5. Läuft im Browser auf Handy und PC und lässt sich als App installieren (PWA).

**Stand:** Demo mit Großregion 1 (Hokusetsu & Hanshin-Nord), 60 spielbare Etappen in 14 Strängen. Details in [STATUS.md](STATUS.md), Datenkorrekturen in [CHANGES.md](CHANGES.md).

## Starten

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Ausgabe in dist/
npm run validate   # Daten und Inhalte prüfen
npm run typecheck
```

`dist/` ist statisch und lässt sich direkt hosten, z. B. über GitHub Pages.

## Bilder neu erzeugen

Die Original-Artworks (rund 280 MB) liegen nicht im Repo. Aus den Originalen:

```bash
python3 tools/convert_screens.py <ordner-mit-Screen-JPGs> public/img
python3 tools/cut_sprites.py export <ordner-mit-SPRITE-JPGs> public/img/chars tools/sprite_map.json
```

## Bedienung

Touch oder Maus; Tastatur: Enter/Leertaste = weiter, 1–9 = Antwort, Esc = zurück, M = Karte, Q = Quests, V = Vokabeln, B = Tasche.
