"""Build the approved brochure in Hungarian, or pass en for the English edition."""
from pathlib import Path
import json
import sys
from io import BytesIO
from math import cos, sin, pi
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[1]
LANG=sys.argv[1] if len(sys.argv)>1 else 'hu'
assert LANG in ('hu','en'), LANG
TRANSLATIONS=json.loads((ROOT/'tools/training-brochure-en.json').read_text(encoding='utf-8')) if LANG=='en' else {}
def tr(s):
    if LANG=='en' and s not in TRANSLATIONS:
        assert s=='mihaly.bence.fitness@gmail.com' or all(c in '0123456789 /' for c in s), ('Missing translation',s)
    return TRANSLATIONS.get(s,s)
OUT=ROOT.parent/('mihaly-bence-training-guide-en.pdf' if LANG=='en' else 'mihaly-bence-edzes-utmutato.pdf')
OUT.parent.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('Display',str(ROOT/'tools/fonts/BarlowCondensed-ExtraBold.ttf')))
pdfmetrics.registerFont(TTFont('Body','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Bold','C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold',italic='Body',boldItalic='Bold')
W,H=720,1000
L,R=44,676
BG,INK,MUTED,GOLD,COPPER='#100f0c','#f5f0e8','#c7bdad','#d4a843','#c4612a'
C=canvas.Canvas(str(OUT),pagesize=(W,H),pageCompression=1)
C.setTitle(tr('Így zajlik a személyi edzés | Mihály Bence'))
C.setAuthor(tr('Mihály Bence'))
C.setSubject(tr('Személyi edzés lépésről lépésre - digitális ügyféltájékoztató'))
C.setCreator(tr('Mihály Bence'))

def rect(x,t,w,h,fill,stroke=None,radius=0):
    C.setFillColor(HexColor(fill)); C.setStrokeColor(HexColor(stroke or fill)); C.setLineWidth(.8)
    if radius: C.roundRect(x,H-t-h,w,h,radius,stroke=bool(stroke),fill=1)
    else: C.rect(x,H-t-h,w,h,stroke=bool(stroke),fill=1)

def text(s,x,y,size=14,font='Body',color=INK,align='left'):
    s=tr(s)
    C.setFillColor(HexColor(color)); C.setFont(font,size)
    getattr(C,{'left':'drawString','right':'drawRightString','center':'drawCentredString'}[align])(x,H-y,s)

def para(s,x,t,w,max_h,size=14.5,color=MUTED,leading=21):
    s=tr(s)
    p=Paragraph(s,ParagraphStyle('body',fontName='Body',fontSize=size,leading=leading,textColor=HexColor(color)))
    _,h=p.wrap(w,max_h)
    assert h<=max_h,(s,h,max_h)
    p.drawOn(C,x,H-t-h)

def circle(x,y,r,fill=None,stroke=GOLD,width=1):
    C.setLineWidth(width); C.setStrokeColor(HexColor(stroke))
    C.setFillColor(HexColor(fill or BG)); C.circle(x,H-y,r,stroke=1,fill=bool(fill))

def path(start,segments,color=COPPER,width=2):
    C.setLineWidth(width); C.setLineCap(1); C.setStrokeColor(HexColor(color))
    p=C.beginPath(); p.moveTo(start[0],H-start[1])
    for s in segments:
        if len(s)==2: p.lineTo(s[0],H-s[1])
        else: p.curveTo(s[0],H-s[1],s[2],H-s[3],s[4],H-s[5])
    C.drawPath(p,stroke=1,fill=0)

def arrow(x,y,angle,color=GOLD):
    a=angle*pi/180
    for delta in (-.55,.55):
        path((x-7*cos(a+delta),y-7*sin(a+delta)),[(x,y)],color,1.7)

def background(page):
    rect(0,0,W,H,BG)
    for i in range(7):
        path((W-220+i*20,-20),[(W-100+i*12,100,W+120,100,W+15,310+i*22)],'#302316',.7)
    rect(0,0,W,5,COPPER); rect(0,0,448,5,GOLD)
    C.drawImage(str(ROOT/'assets/mb-logo-1024.png'),L,H-84,48,48,mask='auto')
    text('MIHÁLY BENCE',105,58,23,'Display')
    text('SZEMÉLYI EDZŐ',106,77,9.5,'Bold',MUTED)
    text('SZEMÉLYI EDZÉS',R,58,10,'Bold',MUTED,'right')
    path((L,966),[(R,966)],'#413424',.7)
    text(f'{page:02} / 02',R,986,10,'Body',MUTED,'right')

def icon(kind,x,y):
    if kind=='warm':
        path((x-16,y+10),[(x-8,y-8,x+4,y+17,x+15,y-12)],GOLD,2)
        arrow(x+15,y-12,-65)
        path((x-17,y+18),[(x+17,y+18)],COPPER,1.3)
    elif kind=='align':
        for dy in (-12,0,12): circle(x+(4 if dy==0 else 0),y+dy,3,BG,GOLD,1.6)
        path((x,y-9),[(x+4,y-3)],COPPER,1.5)
        path((x+4,y+3),[(x,y+9)],COPPER,1.5)
        path((x-14,y-16),[(x-14,y+16)],GOLD,1)
        path((x+17,y-16),[(x+17,y+16)],GOLD,1)
    elif kind=='target':
        circle(x,y,17,None,GOLD,1.5); circle(x,y,9,None,COPPER,1.5); circle(x,y,2,GOLD,GOLD)
    elif kind=='cardio':
        path((x-22,y),[(x-12,y),(x-5,y-14),(x+3,y+15),(x+11,y-4),(x+16,y),(x+24,y)],GOLD,2)

def training_journey():
    text('A KÖZÖS MUNKA MENETE',L,414,28,'Display',GOLD)
    path((318,520),[(350,500,370,540,399,520)],GOLD,2.5); arrow(397,521,-30)
    path((676,520),[(708,520,708,775,676,775)],COPPER,2.5); arrow(678,775,180)
    path((402,775),[(370,755,350,795,321,775)],GOLD,2.5); arrow(323,776,210)
    steps=[
        ('01',44,438,'Konzultáció','20 PERC',
         'Ön elmondja, mit szeretne elérni. Én bemutatom a közös munka menetét, és megválaszolom a kérdéseit.'),
        ('02',402,438,'Állapotfelmérés','MEGFIGYELÉS ÉS FELMÉRÉS',
         'Megfigyelem a mozgását, és felmérem a kiinduló állapotát. Ez segít abban, hogy az edzéstervet az Ön igényeihez igazítsam.'),
        ('03',402,691,'Az első 4 edzés','AZ ALAPOK ELSAJÁTÍTÁSA',
         'Megtanuljuk a hengerezést (SMR), a bemelegítést, az alapvető mozgásmintákat és a kardiógépek használatát.'),
        ('04',44,691,'A további edzések','FÓKUSZBAN AZ ÖN CÉLJAI',
         'A megtanult alapokra építve egyre célzottabban dolgozunk az Ön céljaiért. A gyakorlatokat és a terhelést a haladásához igazítom.')]
    for n,x,t,title,subtitle,body in steps:
        rect(x,t,274,185,'#211b12','#70552c',13)
        circle(x+28,t+29,15,BG,GOLD,1)
        text(n,x+28,t+35,15,'Display',GOLD,'center')
        text(title,x+52,t+35,23,'Display')
        text(subtitle,x+18,t+65,10.4,'Bold',GOLD)
        para(body,x+18,t+82,238,92,14,INK,20)
    text('Ez a közös út. A következő oldalon egy edzés felépítését mutatom be.',L,908,13,color=MUTED)
    text('ÍGY ÉPÜL FEL EGY EDZÉS',L,940,13,'Bold',GOLD)
    path((260,935),[(285,935)],GOLD,1.5); arrow(285,935,0)
    C.linkRect('', 'details', (L,H-947,300,H-917),relative=0,thickness=0)

background(1)
text('AZ ELSŐ LÉPÉSTŐL',L,151,43,'Display')
text('AZ ÖN EDZÉSÉIG',L,201,43,'Display',GOLD)
para('A konzultációtól az alapok elsajátításán át az Ön céljaira összpontosító edzésekig.',L,227,350,70,16,INK,23)
rect(L,314,320,38,'#292010','#6b532d',19)
text('KEZDŐKÉNT IS JÓ HELYEN JÁR',L+17,339,16,'Display',GOLD)
px,py,pw,ph=442,116,234,257
C.saveState()
clip=C.beginPath(); clip.roundRect(px,H-py-ph,pw,ph,16)
C.clipPath(clip,stroke=0,fill=0)
portrait=BytesIO()
Image.open(ROOT/'assets/professional.png').convert('RGB').save(portrait,format='JPEG',quality=88,optimize=True)
portrait.seek(0)
C.drawImage(ImageReader(portrait),px,H-py-ph-43,pw,351)
C.restoreState()
C.setLineWidth(1); C.setStrokeColor(HexColor('#846631'))
C.roundRect(px,H-py-ph,pw,ph,16,stroke=1,fill=0)
rect(456,331,206,29,BG,radius=14)
text('SZEMÉLYES FIGYELEM',559,350,12,'Bold',GOLD,'center')
training_journey()
C.showPage()

background(2)
C.bookmarkPage('details')
text('AZ EDZÉS',L,147,45,'Display')
text('NÉGY RÉSZE',L,198,45,'Display',GOLD)
para('Minden szakasznak megvan a szerepe. A gyakorlatokat és a terhelést az Ön céljaihoz és aktuális állapotához igazítom.',L,221,612,49,15.5,INK,22)
stages=[
    ('Bemelegítés','warm','Fokozatosan ráhangolódunk a mozgásra, és felkészülünk az edzés terhelésére.'),
    ('Korrekció','align','A mozgás minőségén és a gyakorlatok helyes kivitelezésén dolgozunk, az Ön egyéni igényeihez igazítva.'),
    ('Célspecifikus edzés','target','Az Ön céljait szolgáló gyakorlatokat végzünk. Ha szeretné, többféle eszközt és gyakorlatot is kipróbálhat.'),
    ('Kardió','cardio','Az edzés végén levezető jellegű kardió következik, amely az állóképesség fejlesztését is szolgálja.')]
for i in range(3):
    y=327+i*115
    path((64,y+19),[(27,y+45,100,y+75,64,y+96)],COPPER,2)
for i,(title,kind,body) in enumerate(stages):
    top=285+i*115
    rect(100,top,576,103,'#1b1812','#51402a',14)
    circle(64,top+42,20,BG,GOLD,1.5)
    text(f'{i+1:02}',64,top+49,22,'Display',GOLD,'center')
    text(title,120,top+29,25,'Display')
    icon(kind,638,top+29)
    para(body,120,top+42,465,52,14.5,MUTED,20)
rect(L,756,632,94,'#292010','#7b6033',15)
text('AZ ÖN TEMPÓJÁBAN',L+20,784,23,'Display',GOLD)
para('Nem szükséges előzetes edzéstapasztalat. A <b>heti 2 edzés</b> jó kiindulópont lehet; a gyakoriságot és az edzéstervet az Ön életéhez és terhelhetőségéhez igazítjuk.',L+20,798,591,43,13.5,INK,19)
text('KEZDJÜK EGY BESZÉLGETÉSSEL',L,885,25,'Display')
text('Mondja el a céljait, a következő lépést együtt tervezzük meg.',L,909,13,color=MUTED)
text('mihaly.bence.fitness@gmail.com',L,939,16,'Bold',GOLD)
C.showPage(); C.save()
r=PdfReader(OUT)
assert len(r.pages)==2
content='\n'.join(p.extract_text() for p in r.pages)
for s in ('Bemelegítés','Korrekció','Célspecifikus edzés','Kardió','20 PERC','heti 2 edzés'): assert tr(s) in content,s
for s in ('11 000','100 000','10 000','Ft','kifizetés','3 hónap','KONZULTÁCIÓT SZERETNÉK'): assert s not in content,s
assert content.count('mihaly.bence.fitness@gmail.com')==1
assert content.count('@')==1
assert 'mihalybence.com' not in content
for p in r.pages:
    assert float(p.mediabox.width)==W and float(p.mediabox.height)==H
    for a in p.get('/Annots',[]):
        assert 'mailto:' not in str(a.get_object())
        assert 'mihalybence.com' not in str(a.get_object())
print(f'Created and checked two digital pages: {OUT} ({OUT.stat().st_size:,} bytes)')
