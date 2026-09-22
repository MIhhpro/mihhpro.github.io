"""Editable SVG templates and PDF cards reconstructed from the owner's reference."""
from pathlib import Path
import base64
import shutil
import sys
from html import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

ROOT = Path(__file__).resolve().parents[2]
V18 = ROOT / 'V18'
ASSET = V18 / 'assets/business-card-reference.png'
SOURCE = Path('C:/Users/Ben/AppData/Local/Temp/codex-clipboard-427ce630-ab3e-41b8-89cc-5eb74325b89b.png')
if not ASSET.exists():
    shutil.copyfile(SOURCE, ASSET)
for name, file in [('Arial','arial.ttf'),('Bold','arialbd.ttf'),('BoldItalic','arialbi.ttf')]:
    pdfmetrics.registerFont(TTFont(name,'C:/Windows/Fonts/'+file))

RED, CHARCOAL, WHITE = '#C94238', '#303334', '#FFFFFF'
W,H = 900,500
SCALE = 90*mm/W
BLEED = 3*mm
PAGE = (96*mm,56*mm)
ops=[]

def poly(points,color): ops.append(('poly',points,color))
def text(s,x,y,size,font='Arial',color=CHARCOAL): ops.append(('text',s,x,y,size,font,color))
def rect(x,y,w,h,color): poly([(x,y),(x+w,y),(x+w,y+h),(x,y+h)],color)

# White field with angular red ribbons, matching the supplied card.
rect(-30,-30,960,560,WHITE)
poly([(480,67),(635,67),(834,530),(686,530)],'#DEAAA6')
poly([(453,50),(607,50),(813,530),(660,530)],'#D87771')
poly([(422,31),(576,31),(791,530),(638,530)],RED)
poly([(852,34),(930,34),(930,530),(652,530)],RED)

# Hungarian and UK flags, vector artwork.
rect(37,32,38,24,'#FFFFFF')
rect(37,32,38,8,'#B8393E'); rect(37,48,38,8,'#397C5B')
x,y,w,h=85,32,38,24
rect(x,y,w,h,'#253759')
poly([(x,y),(x+5,y),(x+w,y+h-3),(x+w,y+h),(x+w-5,y+h),(x,y+3)],WHITE)
poly([(x+w,y),(x+w-5,y),(x,y+h-3),(x,y+h),(x+5,y+h),(x+w,y+3)],WHITE)
poly([(x,y),(x+2.3,y),(x+w,y+h-1.5),(x+w,y+h),(x+w-2.3,y+h),(x,y+1.5)],'#B8393E')
poly([(x+w,y),(x+w-2.3,y),(x,y+h-1.5),(x,y+h),(x+2.3,y+h),(x+w,y+1.5)],'#B8393E')
rect(x+w/2-4.5,y,9,h,WHITE);rect(x,y+h/2-4.5,w,9,WHITE)
rect(x+w/2-2.6,y,5.2,h,'#B8393E');rect(x,y+h/2-2.6,w,5.2,'#B8393E')

text('MIHÁLY',35,111,39,'BoldItalic')
text('BENCE',35+pdfmetrics.stringWidth('MIHÁLY ', 'BoldItalic',39),111,39,'BoldItalic',RED)
text('AMIBEN SEGÍTHETEK',36,154,23,'BoldItalic')
rect(36,164,286,1.7,CHARCOAL)
services=['ALAKFORMÁLÁS','STREET WORKOUT','REHAB TÁMOGATÁS','TESTTARTÁSJAVÍTÁS','TARTÓS FOGYÁS']
for i,s in enumerate(services):
    yy=198+i*27
    for offset in [0,9]:
        xx=36+offset
        poly([(xx,yy-17),(xx+5,yy-17),(xx+13,yy-8),(xx+5,yy+1),(xx,yy+1),(xx+8,yy-8)],RED)
    text(s,66,yy,20,'Arial')

poly([(-30,376),(483,376),(458,480),(-30,480)],RED)
poly([(48,337),(302,337),(291,400),(38,400)],CHARCOAL)
text('KERESS BÁTRAN!',58,379,24,'Bold',WHITE)
text('mihaly.bence.fitness@gmail.com',36,438,21,'Arial',WHITE)

# Native vector clipping of the supplied photograph preserves the real portrait.
# No AI reconstruction, retouching or new facial details are included.
PORTRAIT=[
 ('M',643,62),('C',645,43,652,28,670,17),('C',680,12,696,9,708,9),
 ('C',725,12,739,20,750,32),('C',758,42,762,57,763,76),
 ('L',763,87),('C',771,91,770,109,766,122),('C',767,143,758,158,757,166),
 ('C',756,183,761,193,767,198),('C',786,211,808,214,829,225),
 ('C',854,232,861,252,867,273),('C',875,306,892,322,903,342),
 ('L',901,453),('C',896,464,875,475,849,478),('L',854,499),
 ('L',643,499),('C',634,488,624,472,618,451),
 ('C',610,433,607,415,603,402),('C',593,405,583,404,582,397),
 ('C',585,368,587,335,590,309),('C',592,283,591,259,601,240),
 ('C',611,230,632,226,647,218),('L',677,198),
 ('C',681,187,683,176,680,160),('C',678,147,674,134,669,125),
 ('C',659,126,654,113,654,104),('C',649,99,648,88,647,78),
 ('C',644,73,643,67,643,62),('Z',)
]
TRANSFORM=(-.03035,-.96525,.98253,-.00527,-121.52,729.64)

def report_path(c, commands):
    p=c.beginPath()
    for cmd,*v in commands:
        if cmd=='M': p.moveTo(*v)
        elif cmd=='L': p.lineTo(*v)
        elif cmd=='C': p.curveTo(*v)
        else: p.close()
    return p

def build(with_portrait, new_photo=False):
    stem='Mihaly-Bence-Nevjegy-'+('uj-portreval' if new_photo else ('portreval' if with_portrait else 'portre-nelkul'))
    pdf=ROOT/(stem+'.pdf')
    c=canvas.Canvas(str(pdf),pagesize=PAGE,pageCompression=1)
    c.setTitle('Mihály Bence – Névjegykártya'+(' – portréval' if with_portrait else ' – portré nélkül'))
    c.setAuthor('Mihály Bence')
    c.translate(BLEED,PAGE[1]-BLEED);c.scale(SCALE,-SCALE)
    svg=['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="90mm" height="50mm" viewBox="0 0 900 500">',
         '<title>Mihály Bence – szerkeszthető névjegykártya</title>',
         '<desc>90 × 50 mm. A nyomdai PDF 3 mm kifutót tartalmaz. '+('A tulajdonos új portréja, eltávolított fekete háttérrel.' if new_photo else 'A portré az eredeti, lefotózott kártyáról származik.')+'</desc>',
         '<g id="editable-card-layout">']
    for op in ops:
        if op[0]=='poly':
            _,pts,col=op
            c.setFillColor(HexColor(col));p=c.beginPath();p.moveTo(*pts[0])
            for pt in pts[1:]:p.lineTo(*pt)
            p.close();c.drawPath(p,fill=1,stroke=0)
            svg.append(f'<polygon points="{" ".join(f"{a},{b}" for a,b in pts)}" fill="{col}"/>')
        else:
            _,s,x,y,size,font,col=op
            c.saveState();c.translate(x,y);c.scale(1,-1);c.setFillColor(HexColor(col));c.setFont(font,size);c.drawString(0,0,s);c.restoreState()
            weight='700' if font!='Arial' else '400'
            italic='italic' if font=='BoldItalic' else 'normal'
            svg.append(f'<text x="{x}" y="{y}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}" font-style="{italic}" fill="{col}">{escape(s)}</text>')
    svg.append('</g>')
    if new_photo:
        photo=V18/'assets/business-card-portrait-hd-no-sunglasses.png'
        px,py,pw,ph=505,8,512,768
        c.saveState();c.translate(px,py+ph);c.scale(1,-1)
        c.drawImage(str(photo),0,0,width=pw,height=ph,mask='auto');c.restoreState()
        data=base64.b64encode(photo.read_bytes()).decode('ascii')
        svg.append(f'<g id="portrait"><image x="{px}" y="{py}" width="{pw}" height="{ph}" xlink:href="data:image/png;base64,{data}"/></g>')
    elif with_portrait:
        # Carry the shirt's bottom color into bleed, outside the original photo.
        c.setFillColor(HexColor('#353738'))
        p=c.beginPath();p.moveTo(642,498);p.lineTo(854,498);p.lineTo(861,530);p.lineTo(654,530);p.close()
        c.drawPath(p,fill=1,stroke=0)
        c.saveState();c.clipPath(report_path(c,PORTRAIT),fill=0,stroke=0)
        c.transform(*TRANSFORM);c.translate(0,1280);c.scale(1,-1)
        c.drawImage(str(ASSET),0,0,width=960,height=1280);c.restoreState()
        d=' '.join(cmd+' '+' '.join(map(str,v)) for cmd,*v in PORTRAIT)
        data=base64.b64encode(ASSET.read_bytes()).decode('ascii')
        svg.append(f'<defs><clipPath id="portrait-silhouette"><path d="{d}"/></clipPath></defs>')
        svg.append('<g id="portrait"><polygon points="642,498 854,498 861,530 654,530" fill="#353738"/>')
        svg.append(f'<g clip-path="url(#portrait-silhouette)"><image width="960" height="1280" transform="matrix({" ".join(map(str,TRANSFORM))})" xlink:href="data:image/png;base64,{data}"/></g></g>')
    svg.append('</svg>')
    c.showPage();c.save()
    r=PdfReader(str(pdf));w=PdfWriter();w.append_pages_from_reader(r);w.add_metadata(r.metadata)
    page=w.pages[0]
    page.trimbox=RectangleObject([BLEED,BLEED,93*mm,53*mm])
    page.bleedbox=RectangleObject([0,0,*PAGE])
    with pdf.open('wb') as f:w.write(f)
    # Trim-size raster previews are rendered from these scratch PDF copies.
    w.pages[0].cropbox=RectangleObject(page.trimbox)
    with (V18/'tmp/pdfs'/(stem+'-trim.pdf')).open('wb') as f:w.write(f)
    (ROOT/(stem+'.svg')).write_text('\n'.join(svg),encoding='utf-8')
    print(pdf)

if __name__=='__main__':
    if '--new-photo' in sys.argv:
        build(True, new_photo=True)
    else:
        build(True)
        build(False)
