"""Schneidet ein 3x3-Raster (9 Nahaufnahmen) in einzelne Bilder.
Aufruf: python3 tools/cut_grid.py <rasterbild> <name1> ... <name9>
Leere Namen ('-') werden übersprungen. Ausgabe: public/img/closeups/<name>.webp
Danach die Namen in art.ts → CLOSEUP_IMG eintragen."""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

OUT = Path(__file__).resolve().parent.parent / 'public/img/closeups'
im = Image.open(sys.argv[1]).convert('RGB')
names = sys.argv[2:]
a = np.asarray(im).astype(int)
mask = ndimage.binary_closing(a.min(axis=2) < 232, iterations=6)
lab, _ = ndimage.label(mask)
H = im.height
objs = [s for s in ndimage.find_objects(lab) if (s[0].stop - s[0].start) * (s[1].stop - s[1].start) > im.width * H * 0.015]
# nach Zeile (Mitte im Drittel) und dann nach Spalte sortieren
objs.sort(key=lambda s: (int(((s[0].start + s[0].stop) / 2) / (H / 3)), s[1].start))
if len(objs) != 9:
    sys.exit(f'{len(objs)} Bilder erkannt statt 9 – Raster bitte prüfen')
OUT.mkdir(parents=True, exist_ok=True)
for n, s in zip(names, objs):
    if n == '-':
        continue
    cut = im.crop((s[1].start, s[0].start, s[1].stop, s[0].stop))
    # gerahmte Bilder: Rahmenlinie abschneiden
    edge = np.asarray(cut.convert('L'))
    if edge[:, :4].mean() < 200 or edge[:4, :].mean() < 200:
        cut = cut.crop((8, 8, cut.width - 8, cut.height - 8))
    cut.thumbnail((720, 720))
    cut.save(OUT / f'{n}.webp', 'WEBP', quality=82)
    print(n, cut.size)
