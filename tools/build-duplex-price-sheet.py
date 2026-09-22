"""Create matching HU front / EN back A4 price sheets for duplex printing."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DictionaryObject, NameObject

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parent / 'mihaly-bence-prices-a4-double-sided.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont('Display', str(ROOT/'tools/fonts/BarlowCondensed-ExtraBold.ttf')))
pdfmetrics.registerFont(TTFont('Body', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Bold', 'C:/Windows/Fonts/arialbd.ttf'))
W, H = A4
LEFT, RIGHT = 43, W-43
INK, MUTED, GOLD, COPPER = '#f5f0e8', '#c7bdad', '#d4a843', '#c4612a'
C = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
C.setTitle('Mihály Bence | A4 price list | Hungarian front and English back')
C.setAuthor('Mihály Bence')
C.setSubject('Matching single-language price sheets for double-sided printing')

def rect(x, top, width, height, fill, stroke=None, radius=0):
    C.setFillColor(HexColor(fill))
    C.setStrokeColor(HexColor(stroke or fill))
    C.setLineWidth(.65)
    if radius:
        C.roundRect(x, H-top-height, width, height, radius, stroke=bool(stroke), fill=1)
    else:
        C.rect(x, H-top-height, width, height, stroke=bool(stroke), fill=1)

def text(s, x, baseline, size=12, font='Body', color=INK, align='left'):
    C.setFillColor(HexColor(color))
    C.setFont(font, size)
    getattr(C, 'drawRightString' if align=='right' else 'drawString')(x, H-baseline, s)

def line(top):
    C.setStrokeColor(HexColor('#55432b'))
    C.setLineWidth(.6)
    C.line(LEFT, H-top, RIGHT, H-top)

def section(label, top):
    rect(LEFT, top-13, 3, 16, COPPER)
    text(label, LEFT+12, top, 19, 'Display', GOLD)

for lang in ('hu', 'en'):
    hu = lang=='hu'
    def choose(a, b):
        return a if hu else b

    rect(20, 20, W-40, H-40, '#100f0c')
    rect(20, 20, W-40, 4, COPPER)
    rect(20, 20, (W-40)*.63, 4, GOLD)
    C.drawImage(str(ROOT/'assets/mb-logo-1024.png'), LEFT, H-111, 69, 69, mask='auto')
    text(choose('MIHÁLY BENCE', 'BENCE MIHÁLY'), 128, 75, 31, 'Display')
    text(choose('Személyi edző', 'Personal trainer'), 129, 98, 13, color=MUTED)
    text(choose('ÁRLISTA', 'PRICE LIST'), LEFT, 164, 48, 'Display', GOLD)

    rect(LEFT, 186, RIGHT-LEFT, 54, '#211b10', '#806333', 6)
    text(choose('Konzultáció', 'Introductory consultation'), LEFT+14, 219, 16, 'Bold')
    text(choose('INGYENES', 'FREE'), RIGHT-14, 220, 28, 'Display', GOLD, 'right')

    section(choose('SZEMÉLYI EDZÉS', 'PERSONAL TRAINING'), 272)
    gap=12
    cw=(RIGHT-LEFT-gap)/2
    for x, label, amount, unit in [
        (LEFT, choose('Egy alkalom','Single session'), '11 000 Ft', choose('/ alkalom','/ session')),
        (LEFT+cw+gap, choose('10 alkalmas csomag','10-session package'), '100 000 Ft', choose('/ 10 alkalom','/ 10 sessions'))]:
        rect(x, 286, cw, 88, '#1a1711', '#55432b', 6)
        text(label, x+14, 309, 13, 'Bold')
        text(amount, x+14, 343, 32, 'Display', GOLD)
        text(unit, x+14, 362, 11, color=MUTED)

    section(choose('EDZÉSPROGRAM', 'TRAINING PROGRAM'), 407)
    text(choose('Személyre szabott edzésterv','Personalised training plan'), LEFT, 435, 13, 'Bold')
    text(choose('4 hetes program','4-week programme'), LEFT, 456, 12, color=MUTED)
    text('19 900 Ft', RIGHT, 439, 32, 'Display', GOLD, 'right')
    text(choose('egyszeri díj','one-time fee'), RIGHT, 458, 11, color=MUTED, align='right')
    line(480)

    section(choose('ONLINE COACHING', 'ONLINE COACHING'), 511)
    text(choose('Havidíjas csomagok','Monthly packages'), RIGHT, 510, 11, color=MUTED, align='right')
    for label, top, amount, desc in [
        ('BASIC', 541, '29 900', choose('Edzésterv, heti 1 coachinghívás','Training plan, 1 coaching call/week')),
        ('PLUS', 611, '39 900', choose('Edzésterv, heti 2 coachinghívás','Training plan, 2 coaching calls/week'))]:
        text(label, LEFT, top, 22, 'Display')
        text(amount+' Ft', RIGHT, top+1, 30, 'Display', GOLD, 'right')
        text(choose('/ hó','/ month'), RIGHT, top+20, 11, color=MUTED, align='right')
        text(desc, LEFT, top+21, 12)
        text(choose('és a program módosítása.','and plan adjustments.'), LEFT, top+38, 12, color=MUTED)
        line(top+44)

    text('PREMIUM', LEFT, 681, 22, 'Display')
    text('49 900 Ft', RIGHT, 682, 30, 'Display', GOLD, 'right')
    text(choose('/ hó','/ month'), RIGHT, 701, 11, color=MUTED, align='right')
    for i, s in enumerate(choose(
        ['Edzésterv, heti 2 coachinghívás, korlátlan üzenetváltás,',
         'videós technikaellenőrzés és folyamatos igazítás.'],
        ['Training plan, 2 coaching calls/week, unlimited messaging,',
         'video form checks and ongoing adjustments.'])):
        text(s, LEFT, 718+i*17, 11.4, color=INK if i==0 else MUTED)
    line(750)
    text(choose('A terembelépőt és a csomagfeltételeket kezdés előtt egyeztetjük.',
                'Gym entry and package terms are agreed before starting.'), LEFT, 770, 9.3, color=MUTED)
    text('mihalybence.com', LEFT, 798, 20, 'Display', GOLD)
    text('mihaly.bence.fitness@gmail.com', RIGHT, 797, 10, align='right')
    C.linkURL('https://mihalybence.com/', (LEFT,H-803,LEFT+160,H-780), relative=0)
    C.linkURL('mailto:mihaly.bence.fitness@gmail.com', (RIGHT-175,H-803,RIGHT,H-784), relative=0)
    C.showPage()
C.save()

# Viewer hints supplement the explicit printing instructions; printer settings prevail.
writer=PdfWriter(clone_from=str(OUT))
writer._root_object[NameObject('/ViewerPreferences')]=DictionaryObject({
    NameObject('/Duplex'):NameObject('/DuplexFlipLongEdge'),
    NameObject('/PrintScaling'):NameObject('/None')})
with OUT.open('wb') as f:
    writer.write(f)
r=PdfReader(OUT)
assert len(r.pages)==2
for i, p in enumerate(r.pages):
    assert abs(float(p.mediabox.width)-W)<.01 and abs(float(p.mediabox.height)-H)<.01
    content=p.extract_text()
    for value in ['11 000 Ft','100 000 Ft','19 900 Ft','29 900 Ft','39 900 Ft','49 900 Ft', 'INGYENES' if i==0 else 'FREE']:
        assert value in content, (i, value)
    assert ('ÁRLISTA' if i==0 else 'PRICE LIST') in content
    assert ('PRICE LIST' if i==0 else 'ÁRLISTA') not in content
print(f'Created and checked two A4 pages: {OUT}')
