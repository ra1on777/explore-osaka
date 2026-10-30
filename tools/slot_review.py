"""Übersicht aller Figuren-Slots mit Namen (z. B. 19-A) als PDF zum Durchsehen.
Aufruf: python3 tools/slot_review.py <ausgabe.pdf>"""
import json, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
world = json.loads((ROOT / "src/data/world.json").read_text())
names = json.loads((ROOT / "src/content/de/world.json").read_text())["screens"]
REF = {"A": "KENJI_DORM_MATE/relaxed", "B": "STUDENT_HANDAI_MEDIC/clipboard", "C": "PROF_TAKADA_MENTOR/think"}
F = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
FS = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 15)
W = 800
BG = {"cafe": "gen_bg_cafe_modern_blur", "zug": "gen_bg_commuter_train_osaka_blur",
      "izakaya": "gen_bg_izakaya_warm_blur_v2", "regen": "loading_screen_dotonbori_rain"}
BG_SLOTS = {"cafe": [[31, 2, 58], [63, 6, 54]], "zug": [[44, 3, 60], [64, 9, 52]],
            "izakaya": [[30, 1, 60], [60, 3, 56]], "regen": [[46, 2, 56], [64, 4, 50]]}

def place(bg, d, fig_path, x, b, h, label, col):
    H = bg.height
    fig = Image.open(ROOT / f"public/img/chars/{fig_path}.webp").convert("RGBA")
    fh = round(H * h / 100); fig = fig.resize((round(fig.width * fh / fig.height), fh))
    px = round(W * x / 100 - fig.width / 2); py = round(H - H * b / 100 - fh)
    bg.alpha_composite(fig, (px, py))
    tw = d.textlength(label, font=F); lx = max(2, min(W - tw - 10, W * x / 100 - tw / 2)); ly = max(2, py - 30)
    d.rounded_rectangle([lx - 5, ly, lx + tw + 5, ly + 28], 6, fill=col)
    d.text((lx, ly + 2), label, font=F, fill="white")

def tile_screen(sid):
    s = world["screens"][sid]; file = (s.get("variants") or [sid])[0]
    bg = Image.open(ROOT / f"public/img/screens/{file}@s.webp").convert("RGBA")
    bg = bg.resize((W, round(bg.height * W / bg.width))); d = ImageDraw.Draw(bg)
    cols = {"A": (200, 40, 40), "B": (30, 110, 200), "C": (40, 150, 60)}
    for k in "ABC":
        sl = {**world["slotDefaults"][k], **s.get("slots", {}).get(k, {})}
        place(bg, d, REF[k], sl["x"], sl["bottom"], sl["h"], f"{sid}-{k}", cols[k])
    d.rectangle([0, bg.height - 24, W, bg.height], fill=(0, 0, 0))
    d.text((6, bg.height - 21), f"Screen {sid} – {names.get(sid, '')}", font=FS, fill="white")
    return bg.convert("RGB")

def tile_bg(key):
    im = Image.open(ROOT / f"public/img/bg/{BG[key]}@s.webp").convert("RGBA")
    H = 600; s = max(W / im.width, H / im.height); im = im.resize((round(im.width * s), round(im.height * s)))
    l = (im.width - W) // 2; t = (im.height - H) // 2; im = im.crop((l, t, l + W, t + H)); d = ImageDraw.Draw(im)
    for i, (sl, ref, col) in enumerate(zip(BG_SLOTS[key], ["KENJI_DORM_MATE/relaxed", "STUDENT_HANDAI_MEDIC/clipboard"], [(200, 40, 40), (30, 110, 200)])):
        place(im, d, ref, *sl, f"bg-{key}-{i + 1}", col)
    d.rectangle([0, H - 24, W, H], fill=(0, 0, 0))
    d.text((6, H - 21), f"Innenraum {key} – 1 = Hauptfigur, 2 = zweite Figur", font=FS, fill="white")
    return im.convert("RGB")

tiles = [tile_screen(s) for s in world["screens"]] + [tile_bg(k) for k in BG]
pages = []
for i in range(0, len(tiles), 4):
    pg = Image.new("RGB", (2 * W + 10, 2 * 600 + 10), "white")
    for j, t in enumerate(tiles[i:i + 4]):
        pg.paste(t.resize((W, 600)), ((j % 2) * (W + 10), (j // 2) * 610))
    pages.append(pg)
pages[0].save(sys.argv[1], save_all=True, append_images=pages[1:], resolution=110, quality=80)
print(len(tiles), "Bilder,", len(pages), "Seiten")
