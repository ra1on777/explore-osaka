"""Stellt die Sprite-Sheets frei (weißer Hintergrund -> transparent) und schneidet
jede Figur-Pose als eigene Datei aus.

Schritt 1 (Analyse): python3 tools/cut_sprites.py analyse <quellordner> <ausgabe>
   -> legt je Sheet alle gefundenen Figuren als poses/<sheet>_<n>.png ab und eine
      Übersicht (index.json mit Bounding-Boxen).
Schritt 2 (Export):  python3 tools/cut_sprites.py export <quellordner> <ausgabe> tools/sprite_map.json
   -> schreibt public/img/chars/<CHAR_ID>/<pose>.webp gemäß der Zuordnung.
"""
import json
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

WHITE_T = 232          # ab diesem Wert (alle Kanäle) gilt ein Pixel als "fast weiß"
MIN_FIG_H = 0.18       # Mindesthöhe einer Figur relativ zur Sheet-Höhe
OUT_H = 640            # Zielhöhe der exportierten Pose


def sheet_id(name):
    m = re.search(r"SPRITE(\d+)\.jpg$", name)
    return int(m.group(1)) if m else None


def remove_bg(im: Image.Image):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    near_white = (a.min(axis=2) >= WHITE_T)
    lab, _ = ndimage.label(near_white)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
    border.discard(0)
    bg = np.isin(lab, list(border))
    # Weiche Kante: Hintergrund um 1 px wachsen lassen, dann Alpha weichzeichnen
    bg = ndimage.binary_dilation(bg, iterations=1)
    alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.8))
    rgba = im.convert("RGBA")
    rgba.putalpha(alpha_img)
    return rgba, ~bg


def figures(fg_mask, h):
    lab, n = ndimage.label(ndimage.binary_closing(fg_mask, iterations=3))
    out = []
    for i, sl in enumerate(ndimage.find_objects(lab), start=1):
        if sl is None:
            continue
        hh = sl[0].stop - sl[0].start
        if hh >= MIN_FIG_H * h:
            out.append((sl[1].start, sl[0].start, sl[1].stop, sl[0].stop, i))
    # Lesereihenfolge: erst Zeile (oben/unten), dann x
    mid = h / 2
    out.sort(key=lambda b: (0 if (b[1] + b[3]) / 2 < mid else 1, b[0]))
    return out, lab


def analyse(src, dst):
    dst = Path(dst)
    (dst / "poses").mkdir(parents=True, exist_ok=True)
    index = {}
    for f in sorted(Path(src).iterdir()):
        sid = sheet_id(f.name)
        if sid is None:
            continue
        im = Image.open(f)
        rgba, fg = remove_bg(im)
        boxes, lab = figures(fg, im.height)
        index[sid] = []
        for n, (x0, y0, x1, y1, li) in enumerate(boxes):
            crop = rgba.crop((x0, y0, x1, y1))
            # alles außerhalb dieser Komponente transparent (Nachbarfiguren/Schriften)
            m = (lab[y0:y1, x0:x1] == li)
            m = ndimage.binary_dilation(m, iterations=2)
            al = np.asarray(crop.getchannel("A")).copy()
            al[~m] = 0
            crop.putalpha(Image.fromarray(al))
            crop.save(dst / "poses" / f"{sid}_{n}.png")
            index[sid].append([x0, y0, x1, y1])
        print(sid, len(boxes))
    (dst / "index.json").write_text(json.dumps(index))


def export(src, dst, mapping):
    dst = Path(dst)
    mp = json.loads(Path(mapping).read_text())
    for f in sorted(Path(src).iterdir()):
        sid = sheet_id(f.name)
        if sid is None or str(sid) not in mp:
            continue
        im = Image.open(f)
        rgba, fg = remove_bg(im)
        boxes, lab = figures(fg, im.height)
        for n, target in mp[str(sid)].items():
            if not target:
                continue
            char, pose = target.split("/")
            x0, y0, x1, y1, li = boxes[int(n)]
            crop = rgba.crop((x0, y0, x1, y1))
            m = ndimage.binary_dilation(lab[y0:y1, x0:x1] == li, iterations=2)
            al = np.asarray(crop.getchannel("A")).copy()
            al[~m] = 0
            crop.putalpha(Image.fromarray(al))
            scale = OUT_H / crop.height
            crop = crop.resize((round(crop.width * scale), OUT_H), Image.LANCZOS)
            out = dst / char / f"{pose}.webp"
            out.parent.mkdir(parents=True, exist_ok=True)
            crop.save(out, "WEBP", quality=82, method=6)
            print(char, pose, crop.size)


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "analyse":
        analyse(sys.argv[2], sys.argv[3])
    else:
        export(sys.argv[2], sys.argv[3], sys.argv[4])
