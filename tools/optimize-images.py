"""Build responsive delivery copies. Original PNG photographs remain untouched."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'responsive'
OUT.mkdir(exist_ok=True)
original_bytes = largest_bytes = 0
for source in sorted((ROOT / 'assets').glob('*.png')):
    with Image.open(source) as raw:
        photo = ImageOps.exif_transpose(raw).convert('RGB')
        widths = sorted({min(width, photo.width) for width in (320, 640, 960, 1440)})
        original_bytes += source.stat().st_size
        for width in widths:
            size = (width, round(photo.height * width / photo.width))
            resized = photo.resize(size, Image.Resampling.LANCZOS) if size != photo.size else photo
            target = OUT / f'{source.stem}-{width}.webp'
            resized.save(target, 'WEBP', quality=86, method=6)
        largest_bytes += target.stat().st_size
        print(f'{source.name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes (largest delivery copy)')
print(f'TOTAL: {original_bytes:,} -> {largest_bytes:,} bytes; {100 * (1 - largest_bytes / original_bytes):.1f}% smaller')
