"""Create the approved bilingual A4 price list plus its matching English-only page."""
import re
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
PRICE_SIZE = 24
PRICE_FONT = 'Bold'  # Arial has equal-width numerals for consistent price columns.
PRICE_CENTER = RIGHT - 75

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

def price(amount, row_top, row_bottom, unit):
    # Center the complete amount/unit block within its row and price column.
    price_cap = pdfmetrics.getFont(PRICE_FONT).face.capHeight * PRICE_SIZE / 1000
    unit_descent = -pdfmetrics.getDescent('Body', 9)
    baseline = (row_top+row_bottom)/2 + (price_cap-17-unit_descent)/2
    text(amount, PRICE_CENTER, baseline, PRICE_SIZE, PRICE_FONT, GOLD, 'center')
    text(unit, PRICE_CENTER, baseline+17, 9, color=MUTED, align='center')

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
text('INGYENES', PRICE_CENTER, 205, 23, 'Display', GOLD, 'center')
text('FREE', PRICE_CENTER, 223, 10, 'Bold', MUTED, 'center')

section('SZEMÉLYI EDZÉS', 'PERSONAL TRAINING', 260)
gap=12
cw=(RIGHT-LEFT-gap)/2
for x, hu, en, amount, unit in [
    (LEFT, 'Egy alkalom', 'Single session', '11 000 Ft', '/ alkalom  / session'),
    (LEFT+cw+gap, '10 alkalmas csomag', '10-session package', '100 000 Ft', '/ 10 alkalom  / 10 sessions')]:
    rect(x, 273, cw, 88, '#1a1711', '#55432b', 6)
    text(hu, x+14, 294, 12, 'Bold')
    text(en, x+14, 310, 10, color=MUTED)
    text(amount, x+14, 341, PRICE_SIZE, PRICE_FONT, GOLD)
    text(unit, x+14, 354, 8.5, color=MUTED)

section('EDZÉSPROGRAM', 'TRAINING PROGRAM', 387)
text('Training Program', LEFT, 414, 14, 'Bold')
text('Személyre szabott, 4 hetes edzésterv', LEFT, 433, 10.5)
text('Personalised 4-week training plan', LEFT, 449, 10.5, color=MUTED)
price('19 900 Ft', 401, 456, 'egyszeri díj / one-time fee')
line(466)

section('ONLINE COACHING', 'HAVIDÍJAS / MONTHLY', 492)

def coaching(name, top, amount, hu, en, row_top, row_bottom):
    text(name, LEFT, top, 18, 'Display')
    price(amount+' Ft', row_top, row_bottom, '/ hó  / month')
    text(hu, LEFT, top+20, 10.2)
    text(en, LEFT, top+36, 10.2, color=MUTED)

coaching('BASIC', 521, '29 900', 'Edzésterv + heti 1 hívás + programmódosítás',
         'Training plan + 1 call/week + plan adjustments', 504, 570)
line(570)
coaching('PLUS', 591, '39 900', 'Edzésterv + heti 2 hívás + programmódosítás',
         'Training plan + 2 calls/week + plan adjustments', 570, 640)
line(640)
text('PREMIUM', LEFT, 661, 18, 'Display')
price('49 900 Ft', 640, 739, '/ hó  / month')
text('Edzésterv, heti 2 hívás, korlátlan üzenetváltás,', LEFT, 681, 10.2)
text('videós technikaellenőrzés és folyamatos igazítás.', LEFT, 695, 10.2)
text('Training plan, 2 calls/week, unlimited messaging,', LEFT, 711, 10.2, color=MUTED)
text('video form checks and ongoing adjustments.', LEFT, 725, 10.2, color=MUTED)
line(739)

text('A terembelépőt és a csomagfeltételeket kezdés előtt egyeztetjük.', LEFT, 754, 8.5, color=MUTED)
text('Gym entry and package terms are agreed before starting.', LEFT, 767, 8.5, color=MUTED)
contact = 'mihaly.bence.fitness@gmail.com'
text(contact, LEFT, 794, 19, 'Display', GOLD)
contact_width = pdfmetrics.stringWidth(contact, 'Display', 19)
C.linkURL('mailto:'+contact, (LEFT,H-799,LEFT+contact_width,H-778), relative=0)
C.showPage()

# English-only second page: same geometry, colours and price alignment.
rect(20, 20, W-40, H-40, '#100f0c')
rect(20, 20, W-40, 4, COPPER)
rect(20, 20, (W-40)*.63, 4, GOLD)
C.drawImage(str(ROOT/'assets/mb-logo-1024.png'), LEFT, H-111, 69, 69, mask='auto')
text('MIHÁLY BENCE', 128, 74, 29, 'Display')
text('Personal trainer', 129, 97, 11, color=MUTED)
text('PRICE LIST', LEFT, 159, 43, 'Display', GOLD)

rect(LEFT, 181, RIGHT-LEFT, 54, '#211b10', '#806333', 6)
text('Consultation', LEFT+14, 203, 14, 'Bold')
text('Introductory consultation', LEFT+14, 221, 10.5, color=MUTED)
text('FREE', PRICE_CENTER, 205, 23, 'Display', GOLD, 'center')

def english_section(title, top, subtitle=None):
    rect(LEFT, top-11, 3, 14, COPPER)
    text(title, LEFT+11, top, 16, 'Display', GOLD)
    if subtitle:
        width = pdfmetrics.stringWidth(title, 'Display', 16)
        text('/  '+subtitle, LEFT+width+20, top, 10, color=MUTED)

english_section('PERSONAL TRAINING', 260)
for x, title, amount, unit in [
    (LEFT, 'Single session', '11 000 Ft', '/ session'),
    (LEFT+cw+gap, '10-session package', '100 000 Ft', '/ 10 sessions')]:
    rect(x, 273, cw, 88, '#1a1711', '#55432b', 6)
    text(title, x+14, 294, 12, 'Bold')
    text('Personal training', x+14, 310, 10, color=MUTED)
    text(amount, x+14, 341, PRICE_SIZE, PRICE_FONT, GOLD)
    text(unit, x+14, 354, 8.5, color=MUTED)

english_section('TRAINING PROGRAM', 387)
text('Training Program', LEFT, 414, 14, 'Bold')
text('Personalised training plan', LEFT, 433, 10.5)
text('4-week programme', LEFT, 449, 10.5, color=MUTED)
price('19 900 Ft', 401, 456, 'one-time fee')
line(466)

english_section('ONLINE COACHING', 492, 'MONTHLY')
for name, top, amount, calls, row_top, row_bottom in [
    ('BASIC', 521, '29 900 Ft', '1 call/week', 504, 570),
    ('PLUS', 591, '39 900 Ft', '2 calls/week', 570, 640)]:
    text(name, LEFT, top, 18, 'Display')
    price(amount, row_top, row_bottom, '/ month')
    text('Training plan + '+calls, LEFT, top+20, 10.2)
    text('Includes plan adjustments', LEFT, top+36, 10.2, color=MUTED)
line(570)
line(640)
text('PREMIUM', LEFT, 661, 18, 'Display')
price('49 900 Ft', 640, 739, '/ month')
text('Training plan + 2 calls/week', LEFT, 681, 10.2)
text('Unlimited messaging', LEFT, 695, 10.2)
text('Video form checks', LEFT, 711, 10.2, color=MUTED)
text('Ongoing plan adjustments', LEFT, 725, 10.2, color=MUTED)
line(739)

text('Gym entry and package terms are agreed before starting.', LEFT, 754, 8.5, color=MUTED)
text(contact, LEFT, 794, 19, 'Display', GOLD)
C.linkURL('mailto:'+contact, (LEFT,H-799,LEFT+contact_width,H-778), relative=0)
C.showPage()
C.save()

r=PdfReader(OUT)
assert len(r.pages)==2
for p in r.pages:
    assert abs(float(p.mediabox.width)-W)<.01 and abs(float(p.mediabox.height)-H)<.01
    content=p.extract_text()
    assert set(re.findall(r'[\w.+-]+@[\w.-]+', content)) == {'mihaly.bence.fitness@gmail.com'}
    assert content.count('mihaly.bence.fitness@gmail.com') == 1
    assert 'mihalybence.com' not in content
    for annotation in p.get('/Annots', []):
        uri = str(annotation.get_object().get('/A', {}).get('/URI', ''))
        if uri.startswith('mailto:'):
            assert uri == 'mailto:mihaly.bence.fitness@gmail.com'
    for value in ['11 000 Ft','100 000 Ft','19 900 Ft','29 900 Ft','39 900 Ft','49 900 Ft','FREE','Mihály']:
        assert value in content or value.upper() in content, value
assert 'INGYENES' in r.pages[0].extract_text()
assert all(s not in r.pages[1].extract_text() for s in ['INGYENES', 'alkalom', 'Edzésterv', 'ÁRLISTA'])
print(f'Created and checked: {OUT}')
