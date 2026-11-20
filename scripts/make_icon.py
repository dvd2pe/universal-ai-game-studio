#!/usr/bin/env python3
"""Generate the launcher icon (indigo gradient + play glyph)."""
from PIL import Image, ImageDraw

W = H = 192
im = Image.new("RGB", (W, H))
d = ImageDraw.Draw(im)
for y in range(H):
    t = y / H
    r = int(0x1e + (0x4c - 0x1e) * t)
    g = int(0x1b + (0x1d - 0x1b) * t)
    b = int(0x4b + (0x95 - 0x4b) * t)
    d.line([(0, y), (W, y)], fill=(r, g, b))

# play triangle
d.polygon([(70, 55), (70, 137), (135, 96)], fill=(255, 255, 255))
# dpad dots
for cx, cy in [(38, 96), (160, 78), (160, 114)]:
    d.ellipse([cx - 7, cy - 7, cx + 7, cy + 7], fill=(230, 235, 255))

import os
os.makedirs("android/res/mipmap", exist_ok=True)
im.save("android/res/mipmap/ic_launcher.png")
print("icon written: android/res/mipmap/ic_launcher.png", im.size)
