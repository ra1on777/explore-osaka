"""Vorschau der NPC-Slots: setzt Beispielfiguren so in die Screens, wie das Spiel sie darstellt
(x = Mitte in %, bottom = Fußhöhe in % vom unteren Rand, h = Figurenhöhe in % der Bildhöhe).

Aufruf: python3 tools/preview_slots.py <ausgabeordner> [screen-ids ...]
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
world = json.loads((ROOT / "src/data/world.json").read_text())
REF = {"A": "KENJI_DORM_MATE/relaxed", "B": "STUDENT_HANDAI_MEDIC/clipboard", "C": "PROF_TAKADA_MENTOR/think"}
W = 800


def render(sid: str) -> Image.Image:
    s = world["screens"][sid]
    file = (s.get("variants") or [sid])[0]
    bg = Image.open(ROOT / f"public/img/screens/{file}@s.webp").convert("RGBA")
    bg = bg.resize((W, round(bg.height * W / bg.width)))
    H = bg.height
    d = ImageDraw.Draw(bg)
    for k in range(1, 10):
        d.line([(W * k // 10, 0), (W * k // 10, H)], fill=(255, 0, 255, 70))
        d.line([(0, H * k // 10), (W, H * k // 10)], fill=(255, 0, 255, 70))
    for key in "ABC":
        slot = {**world["slotDefaults"][key], **(s.get("slots", {}).get(key, {}))}
        fig = Image.open(ROOT / f"public/img/chars/{REF[key]}.webp").convert("RGBA")
        fh = round(H * slot["h"] / 100)
        fig = fig.resize((round(fig.width * fh / fig.height), fh))
        x = round(W * slot["x"] / 100 - fig.width / 2)
        y = round(H - H * slot["bottom"] / 100 - fh)
        bg.alpha_composite(fig, (x, y))
        d.text((x + 4, y + fh + 2 if y + fh + 14 < H else y + fh - 14), key, fill="yellow")
    d.rectangle([0, 0, 46, 16], fill="black")
    d.text((4, 2), "S" + sid, fill="white")
    return bg


def feet(sid: str) -> Image.Image:
    """Ausschnitt um die Fußpunkte jedes Slots (ohne Figur), um den Untergrund zu prüfen."""
    s = world["screens"][sid]
    file = (s.get("variants") or [sid])[0]
    bg = Image.open(ROOT / f"public/img/screens/{file}.webp").convert("RGB")
    W2, H2 = bg.size
    row = Image.new("RGB", (3 * 260 + 60, 200), "black")
    d0 = ImageDraw.Draw(row)
    d0.text((4, 4), "S" + sid, fill="white")
    for i, key in enumerate("ABC"):
        slot = {**world["slotDefaults"][key], **(s.get("slots", {}).get(key, {}))}
        fh = H2 * slot["h"] / 100
        cx = W2 * slot["x"] / 100
        fy = H2 - H2 * slot["bottom"] / 100
        half = fh * 0.32
        top = min(int(fy - fh * 0.35), H2 - 20)
        box = (int(cx - half), top, int(cx + half), max(top + 20, int(min(H2, fy + fh * 0.12))))
        crop = bg.crop(box)
        crop = crop.resize((260, max(1, round(crop.height * 260 / max(1, crop.width)))))
        d = ImageDraw.Draw(crop)
        sx = 260 / (box[2] - box[0])
        ly = (fy - box[1]) * sx
        d.line([(0, ly), (260, ly)], fill=(255, 0, 0), width=1)
        for dx in (-0.09, 0.09):
            px = (cx + dx * fh - box[0]) * sx
            d.ellipse([px - 5, ly - 5, px + 5, ly + 5], outline=(255, 255, 0), width=2)
        row.paste(crop.crop((0, 0, 260, 190)), (60 + i * 260, 5))
        d0.text((60 + i * 260 + 4, 6), key, fill="yellow")
    return row


def main(out: str, ids: list[str]):
    if ids and ids[0] == "--feet":
        ids = ids[1:] or [k for k, v in world["screens"].items() if v.get("jp")]
        Path(out).mkdir(parents=True, exist_ok=True)
        for i in range(0, len(ids), 6):
            rows = [feet(x) for x in ids[i:i + 6]]
            sheet = Image.new("RGB", (rows[0].width, 200 * len(rows)), "black")
            for j, r in enumerate(rows):
                sheet.paste(r, (0, j * 200))
            sheet.save(Path(out) / f"feet_{i // 6:02d}.jpg", quality=85)
            print(Path(out) / f"feet_{i // 6:02d}.jpg", ids[i:i + 6])
        return
    Path(out).mkdir(parents=True, exist_ok=True)
    ids = ids or [k for k, v in world["screens"].items() if v.get("jp")]
    for i in range(0, len(ids), 4):
        part = [render(s) for s in ids[i:i + 4]]
        sheet = Image.new("RGB", (W * 2, part[0].height * 2), "white")
        for j, im in enumerate(part):
            sheet.paste(im, ((j % 2) * W, (j // 2) * part[0].height))
        sheet.save(Path(out) / f"slots_{i // 4:02d}.jpg", quality=80)
        print(Path(out) / f"slots_{i // 4:02d}.jpg", ids[i:i + 4])


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2:])
