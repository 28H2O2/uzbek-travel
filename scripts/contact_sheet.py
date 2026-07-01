#!/usr/bin/env python3
"""
功能：把一个候选图文件夹拼成一张带编号的联系表（contact sheet），便于快速肉眼筛选。
输入：候选图目录（image_search.py 产出的 candidates/<query>/ 里若干 candidate_NN.*）
输出：一张 PNG 网格图，每格左上角标 candidate 序号 + 文件名
如何运行：uv run --with pillow scripts/contact_sheet.py <candidates_dir> <out.png>
依赖：Pillow
在项目中的作用：/signs 路牌图人工策展时的效率工具（不进 bundle）。
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

def main() -> int:
    src = Path(sys.argv[1])
    out = Path(sys.argv[2])
    cols = int(sys.argv[3]) if len(sys.argv) > 3 else 4
    cell = 620          # 每格宽（px）
    pad = 8
    label_h = 26
    imgs = sorted([p for p in src.iterdir() if p.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp'}])
    if not imgs:
        print(f"no images in {src}", file=sys.stderr)
        return 1
    rows = (len(imgs) + cols - 1) // cols
    cell_h = cell * 3 // 4 + label_h  # 4:3 缩略 + 标签条
    sheet = Image.new('RGB', (cols * (cell + pad) + pad, rows * (cell_h + pad) + pad), (30, 28, 25))
    draw = ImageDraw.Draw(sheet)
    for i, p in enumerate(imgs):
        r, c = divmod(i, cols)
        x = pad + c * (cell + pad)
        y = pad + r * (cell_h + pad)
        try:
            im = Image.open(p).convert('RGB')
        except Exception as e:  # noqa: BLE001
            draw.text((x + 4, y + 4), f"{i+1} ERR {e}", fill=(255, 120, 120))
            continue
        tw, th = cell, cell * 3 // 4
        im.thumbnail((tw, th))
        ox = x + (tw - im.width) // 2
        oy = y + label_h + (th - im.height) // 2
        sheet.paste(im, (ox, oy))
        draw.rectangle([x, y, x + cell, y + label_h], fill=(210, 150, 60))
        draw.text((x + 6, y + 6), f"[{i+1}] {p.name}", fill=(20, 18, 15))
    sheet.save(out)
    print(f"wrote {out}  ({len(imgs)} imgs, {cols}x{rows})")
    return 0

if __name__ == '__main__':
    sys.exit(main())
