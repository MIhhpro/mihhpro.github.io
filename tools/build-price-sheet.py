"""Create the bilingual A4 print price sheet from the approved V18 prices."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parent / 'mihaly-bence-prices-a4-hu-en.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont('Display', str(ROOT / 'tools/fonts/BarlowCondensed-ExtraBold.ttf')))
pdfmetrics.registerFont(TTFont('Body', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Bold', 'C:/Windows/Fonts/arialbd.ttf'))
W, H = A4
C = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
C.setTitle('Mihály Bence | Árlista / Price list')
C.setAuthor('Mihály Bence')
C.setSubject('Hungarian and English A4 service price sheet')
C.setCreator('Mihály Bence price sheet')
INK, MUTED, GOLD, COPPER = '#f5f0e8', '#c7bdad', '#d4a843', '#c4612a'
LEFT, RIGHT = 43, W - 43

def rect(x, top, width, height, fill, stroke=None, radius=0):
    C.setFillColor(HexColor(fill))
    C.setStrokeColor(HexColor(stroke or fill))
    C.setLineWidth(.65)
    if radius:
        C.roundRect(x, H-top-height, width, height, radius, stroke=bool(stroke), fill=1)
    else:
        C.rect(x, H-top-height, width, height, stroke=bool(stroke), fill=1)

def text(s, x, baseline, size=11, font='Body', color=INK, align='left'):
    C.setFillColor(HexColor(color))
    C.setFont(font, size)
    getattr(C, {'left':'drawString','right':'drawRightString','center':'drawCentredString'}[align])(x, H-baseline, s)

def line(top, x=LEFT, end=RIGHT, color='#55432b'):
    C.setStrokeColor(HexColor(color))
    C.setLineWidth(.6)
    C.line(x, H-top, end, H-top)

def section(hu, en, top):
    rect(LEFT, top-11, 3, 14, COPPER)
    text(hu, LEFT+11, top, 16, 'Display', GOLD)
    width = pdfmetrics.stringWidth(hu, 'Display', 16)
    text('/  '+en, LEFT+width+20, top, 10, 'Body', MUTED)

# Seven-millimetre white print margin; all essential content is 15 mm from edges.
rect(20, 20, W-40, H-40, '#100f0c')
rect(20, 20, W-40, 4, COPPER)
rect(20, 20, (W-40)*.63, 4, GOLD)
C.drawImage(str(ROOT/'assets/mb-logo-1024.png'), LEFT, H-111, 69, 69, mask='auto')
text('MIHÁLY BENCE', 128, 74, 29, 'Display')
text('Személyi edző  /  Personal trainer', 129, 97, 11, color=MUTED)
text('ÁRLISTA', LEFT, 159, 43, 'Display', GOLD)
text('/  PRICE LIST', 202, 159, 24, 'Display', MUTED)

rect(LEFT, 181, RIGHT-LEFT, 54, '#211b10', '#806333', 6)
text('Konzultáció', LEFT+14, 203, 14, 'Bold')
text('Introductory consultation', LEFT+14, 221, 10.5, color=MUTED)
text('INGYENES', RIGHT-14, 205, 23, 'Display', GOLD, 'right')
text('FREE', RIGHT-14, 223, 10, 'Bold', MUTED, 'right')

section('SZEMÉLYI EDZÉS', 'PERSONAL TRAINING', 260)
gap=12
cw=(RIGHT-LEFT-gap)/2
for x, hu, en, amount, unit in [
    (LEFT, 'Egy alkalom', 'Single session', '11 000 Ft', '/ alkalom  / session'),
    (LEFT+cw+gap, '10 alkalmas csomag', '10-session package', '100 000 Ft', '/ 10 alkalom  / 10 sessions')]:
    rect(x, 273, cw, 88, '#1a1711', '#55432b', 6)
    text(hu, x+14, 294, 12, 'Bold')
    text(en, x+14, 310, 10, color=MUTED)
    text(amount, x+14, 341, 27, 'Display', GOLD)
    text(unit, x+14, 354, 8.5, color=MUTED)

section('EDZÉSPROGRAM', 'TRAINING PROGRAM', 387)
text('Training Program', LEFT, 414, 14, 'Bold')
text('Személyre szabott, 4 hetes edzésterv', LEFT, 433, 10.5)
text('Personalised 4-week training plan', LEFT, 449, 10.5, color=MUTED)
text('19 900 Ft', RIGHT, 421, 29, 'Display', GOLD, 'right')
text('egyszeri díj / one-time fee', RIGHT, 441, 9, color=MUTED, align='right')
line(466)

section('ONLINE COACHING', 'HAVIDÍJAS / MONTHLY', 492)

def coaching(name, top, amount, hu, en):
    text(name, LEFT, top, 18, 'Display')
    text(amount+' Ft', RIGHT, top+1, 26, 'Display', GOLD, 'right')
    text('/ hó  / month', RIGHT, top+17, 9, color=MUTED, align='right')
    text(hu, LEFT, top+20, 10.2)
    text(en, LEFT, top+36, 10.2, color=MUTED)

coaching('BASIC', 521, '29 900', 'Edzésterv + heti 1 hívás + programmódosítás',
         'Training plan + 1 call/week + plan adjustments')
line(570)
coaching('PLUS', 591, '39 900', 'Edzésterv + heti 2 hívás + programmódosítás',
         'Training plan + 2 calls/week + plan adjustments')
line(640)
text('PREMIUM', LEFT, 661, 18, 'Display')
text('49 900 Ft', RIGHT, 662, 26, 'Display', GOLD, 'right')
text('/ hó  / month', RIGHT, 678, 9, color=MUTED, align='right')
text('Edzésterv, heti 2 hívás, korlátlan üzenetváltás,', LEFT, 681, 10.2)
text('videós technikaellenőrzés és folyamatos igazítás.', LEFT, 695, 10.2)
text('Training plan, 2 calls/week, unlimited messaging,', LEFT, 711, 10.2, color=MUTED)
text('video form checks and ongoing adjustments.', LEFT, 725, 10.2, color=MUTED)
line(739)

text('A terembelépőt és a csomagfeltételeket kezdés előtt egyeztetjük.', LEFT, 754, 8.5, color=MUTED)
text('Gym entry and package terms are agreed before starting.', LEFT, 767, 8.5, color=MUTED)
text('mihalybence.com', LEFT, 794, 19, 'Display', GOLD)
text('mihaly.bence.fitness@gmail.com', RIGHT, 793, 10, color=INK, align='right')
C.linkURL('https://mihalybence.com/', (LEFT,H-799,LEFT+155,H-778), relative=0)
C.linkURL('mailto:mihaly.bence.fitness@gmail.com', (RIGHT-175,H-799,RIGHT,H-780), relative=0)
C.showPage()
C.save()

r=PdfReader(OUT)
assert len(r.pages)==1
p=r.pages[0]
assert abs(float(p.mediabox.width)-W)<.01 and abs(float(p.mediabox.height)-H)<.01
content=p.extract_text()
for value in ['11 000 Ft','100 000 Ft','19 900 Ft','29 900 Ft','39 900 Ft','49 900 Ft','INGYENES','FREE','Mihály']:
    assert value in content or value.upper() in content, value
print(f'Created and checked: {OUT}')
