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


def main(out: str, ids: list[str]):
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
