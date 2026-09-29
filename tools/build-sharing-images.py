"""Render bilingual sharing cards using the existing MB brand assets."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/social'
OUT.mkdir(parents=True, exist_ok=True)
SCALE = 2

def font(size):
    return ImageFont.truetype(str(ROOT / 'tools/fonts/BarlowCondensed-ExtraBold.ttf'), size * SCALE)

for lang, name, service, location in [
    ('hu', 'MIHÁLY BENCE', 'Személyi edzés · Online coaching', 'Victory Fitness Békásmegyer'),
    ('en', 'BENCE MIHÁLY', 'Personal training · Online coaching', 'Victory Fitness Békásmegyer'),
]:
    canvas = Image.new('RGB', (1200 * SCALE, 630 * SCALE), '#0c0b08')
    draw = ImageDraw.Draw(canvas)
    # Restrained warm shading, retaining the site's near-black appearance.
    for x in range(canvas.width):
        warmth = max(0, 1 - x / canvas.width)
        draw.line((x, 0, x, canvas.height), fill=(int(12+10*warmth), int(11+5*warmth), int(8+2*warmth)))
    draw.line((72*SCALE, 88*SCALE, 1128*SCALE, 88*SCALE), fill='#6f562c', width=2*SCALE)
    logo = Image.open(ROOT / 'assets/mb-logo-1024.png').convert('RGBA').resize((220*SCALE,220*SCALE),Image.Resampling.LANCZOS)
    canvas.paste(logo,(80*SCALE,205*SCALE),logo)
    for text, y, size, color in [
        (name, 190, 82, '#ffe89a'),
        (service, 302, 39, '#f5f0e8'),
        (location, 366, 30, '#b8ae9e'),
        ('mihalybence.com', 472, 28, '#d4a843'),
    ]:
        f=font(size)
        assert draw.textlength(text,font=f) <= 790*SCALE, text
        draw.text((350*SCALE,y*SCALE), text, font=f, fill=color)
    draw.line((350*SCALE, 451*SCALE, 460*SCALE,451*SCALE), fill='#c4612a',width=3*SCALE)
    canvas.resize((1200,630),Image.Resampling.LANCZOS).save(OUT/f'share-{lang}-v1.jpg',quality=94,subsampling=0,optimize=True)
    print(f'Created assets/social/share-{lang}-v1.jpg (1200 x 630).')
