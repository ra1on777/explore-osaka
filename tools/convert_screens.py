"""Konvertiert die Original-Artworks (JPG, ~4 MB) in komprimierte WebP-Dateien.

Aufruf: python3 tools/convert_screens.py <quellordner> <zielordner>
Erwartet Dateinamen wie "Screen 1.jpg", "Screen 2a.jpg", "Screen 53 Variant A.jpg"
(auch mit vorangestellten Upload-Präfixen wie "1234abcd-Screen_1.jpg").
Erzeugt je Screen zwei Größen: <id>.webp (1600 px) und <id>@s.webp (960 px).
"""
import re
import sys
from pathlib import Path

from PIL import Image

SIZES = {"": 1600, "@s": 960}
QUALITY = 76


def screen_id(name: str):
    m = re.search(r"Screen[ _](\d+[a-c]?)(?:[ _]Variant[ _]([AB]))?\.jpg$", name)
    if not m:
        return None
    sid = m.group(1)
    if m.group(2):
        sid += "-" + m.group(2).lower()
    return sid


def secondary_id(name: str):
    m = re.search(r"((?:GEN_BG|LOADING_SCREEN)_[A-Z0-9_]+)\.jpg$", name)
    return m.group(1).lower() if m else None


def main(src: str, dst: str):
    out = Path(dst)
    out.mkdir(parents=True, exist_ok=True)
    for f in sorted(Path(src).iterdir()):
        sid = screen_id(f.name)
        prefix = "screens"
        if sid is None:
            sid = secondary_id(f.name)
            prefix = "bg"
        if sid is None:
            continue
        im = Image.open(f).convert("RGB")
        for suffix, width in SIZES.items():
            h = round(im.height * width / im.width)
            target = out / prefix / f"{sid}{suffix}.webp"
            target.parent.mkdir(parents=True, exist_ok=True)
            im.resize((width, h), Image.LANCZOS).save(target, "WEBP", quality=QUALITY, method=6)
        print(prefix, sid)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
