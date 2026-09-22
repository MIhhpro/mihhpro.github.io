from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'Mihaly-Bence-Szabalyzat-kiegeszitett.pdf'
pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold', 'C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='ArialBold')
W, H = 695, 990
M, CW = 44, 607
BG, PANEL, BORDER = '#150F09', '#251C10', '#59401E'
WHITE, TEXT, GOLD, MUTED = '#F3EFE7', '#D0C5B5', '#E2AF45', '#A99A84'
c = canvas.Canvas(str(OUT), pagesize=(W,H), pageCompression=1)
c.setTitle('Mihály Bence – Személyi edzés szabályzat – egyeztetési változat')
c.setAuthor('Mihály Bence')
c.setSubject('Felkészülés, biztonság, együttműködés és vendégjogok')
style = ParagraphStyle('body', fontName='Arial', fontSize=12.3, leading=17.5, textColor=HexColor(TEXT))

def txt(s,x,y,size=12,color=TEXT,bold=False):
    c.setFillColor(HexColor(color)); c.setFont('ArialBold' if bold else 'Arial',size)
    c.drawString(x,H-y-size*.82,s)

def circle_text(s,cx,cy,size):
    # Capitals and numerals sit above the baseline: center their cap height,
    # rather than the full line box, on the circle's actual center.
    cap_height=pdfmetrics.getFont('ArialBold').face.capHeight*size/1000
    c.setFillColor(HexColor(GOLD)); c.setFont('ArialBold',size)
    c.drawCentredString(cx,H-cy-cap_height/2,s)

def para(s,x,y,width,size=12.3,color=TEXT):
    st=ParagraphStyle('p',parent=style,fontSize=size,leading=size*1.43,textColor=HexColor(color))
    p=Paragraph(s,st); _,height=p.wrap(width,1000)
    p.drawOn(c,x,H-y-height)
    return height

def panel(x,y,w,h,accent=False):
    c.setFillColor(HexColor('#2C1E10' if accent else PANEL))
    c.setStrokeColor(HexColor('#A87930' if accent else BORDER)); c.setLineWidth(.65)
    c.roundRect(x,H-y-h,w,h,11,fill=1,stroke=1)

def card(n,title,body,y,accent=False):
    width=CW-76
    p=Paragraph(body,style); _,ph=p.wrap(width,1000)
    h=max(105,ph+67)
    panel(M,y,CW,h,accent)
    c.setStrokeColor(HexColor(GOLD)); c.setLineWidth(.8)
    c.circle(M+25,H-y-30,12,fill=0,stroke=1)
    circle_text(f'{n:02}',M+25,y+30,10.2)
    txt(title,M+49,y+20,14.2,WHITE,True)
    para(body,M+49,y+47,width)
    return y+h+13

def callout(title,body,y):
    p=Paragraph(body,style); _,ph=p.wrap(CW-36,1000)
    h=ph+55
    panel(M,y,CW,h,True)
    txt(title,M+18,y+15,11.2,GOLD,True)
    para(body,M+18,y+35,CW-36)
    return y+h

def start(num,title1,title2,intro):
    c.setFillColor(HexColor(BG)); c.rect(0,0,W,H,fill=1,stroke=0)
    for i in range(80):
        t=i/79
        c.setFillColorRGB(.89-.20*t,.68-.36*t,.25-.08*t)
        c.rect(i*W/80,H-5,W/80+1,5,fill=1,stroke=0)
    c.setStrokeColor(HexColor(GOLD)); c.setLineWidth(1.2)
    c.circle(M+18,H-52,18,fill=0,stroke=1)
    circle_text('MB',M+18,52,14)
    txt('MIHÁLY BENCE',M+47,39,16,WHITE,True)
    txt('SZEMÉLYI EDZŐ',M+47,60,8.5,MUTED)
    txt('SZABÁLYZAT',W-M-83,43,9,MUTED,True)
    txt(title1,M,104,33,WHITE,True)
    txt(title2,M,145,33,GOLD,True)
    para(intro,M,198,CW,12.4)
    c.setStrokeColor(HexColor(BORDER)); c.line(M,57,W-M,57)
    txt('EGYEZTETÉSI VÁLTOZAT  •  2026.09.20.',M,945,8,MUTED)
    txt(f'{num:02} / 04',W-M-42,945,9,MUTED)
    return 258

def finish(y):
    assert y<=912, f'Content reaches footer: {y}'
    c.showPage()

y=start(1,'MIELŐTT ELKEZDJÜK','A KÖZÖS SZABÁLYOK',
    'A biztonságos, eredményes edzés közös felelősség. Kérem, olvassa el az alábbiakat az első alkalom előtt, és jelezze, ha bármelyik pont kérdést vet fel.')
y=card(1,'Felszerelés minden alkalomra',
    '<b>Kötelező:</b> tiszta váltócipő, mozgáshoz megfelelő sportöltözet és törölköző. Hozzon ivóvizet is. A szükséges felszerelés nélkül az edzés nem kezdhető meg. Könnyű, jól tolerált harapnivaló igény szerint hozható.',y)
y=card(2,'Étkezés és folyadék',
    'Kerülje a nagy, nehéz étkezést közvetlenül edzés előtt; hagyjon időt az emésztésre. Egy kisebb étkezés vagy könnyű harapnivaló időzítése az egyéni toleranciához igazodhat. <b>Nem elvárás az éhgyomri edzés.</b> Ivószünet bármikor kérhető.',y)
y=card(3,'Az aktuális állapotát ismernem kell',
    'Edzés előtt jelezze a terhelést érintő sérülést, betegséget, fájdalmat, friss beavatkozást, várandósságot vagy orvosi korlátozást, valamint ezek változását. A biztonság szempontjából lényeges kérdésekre adjon pontos választ; teljes kórtörténetet nem kérek.',y)
y=card(4,'Érkezés, késés és lemondás',
    'Az egyeztetett kezdésre érkezzen edzésre készen. Késést, távolmaradást vagy módosítási igényt minél előbb jelezzen a megbeszélt csatornán. <b>24 óránál rövidebb határidővel történő lemondáskor az érintett, előre kifizetett alkalom díja nem jár vissza.</b> Ez nem a teljes bérletre vonatkozik. A további feltételeket a külön írásos megállapodás rendezi; a kötelező jogszabályi jogok fennmaradnak.',y)
finish(y)

y=start(2,'AZ EGÉSZSÉG','AZ ELSŐ',
    'A panaszokat és a terhelést befolyásoló gyógyszerszedést még a bemelegítés előtt jelezze. Bizonytalan helyzetben módosítjuk vagy elhalasztjuk az edzést.')
y=card(5,'Fájdalomcsillapító és edzés',
    '<b>Tilos fájdalomcsillapítóval elfedett fájdalmon keresztül erőltetni az edzést.</b> Ha edzés előtt fájdalomcsillapítót vett be, vagy edzés közben lenne rá szüksége, előbb szóljon. Az új vagy romló panaszt nem terheljük tovább; szükség esetén orvosi egyeztetésig halasztunk. <b>Előírt gyógyszert az edzés kedvéért ne hagyjon el és ne módosítson.</b>',y,True)
y=card(6,'Alkohol, tudatmódosítók, álmosító szerek',
    'Alkohol vagy más tudatmódosító szer hatása alatt, illetve fennmaradó tünetekkel – például másnaposan – nem tartható edzés. Ugyanez érvényes gyógyszer okozta álmosság, szédülés, lassult reakció vagy bizonytalan mozgás esetén. Altatónál, nyugtatónál a két óra elteltével sem feltétlenül szűnik meg a hatás.',y)
y=card(7,'Betegen inkább pihenjen',
    'Láz, akut rosszullét, hányás, hasmenés vagy fertőző betegség gyanúja esetén ne jöjjön edzeni; jelezze a távolmaradást. Betegség vagy sérülés után a visszatérést az állapotához és az esetleges orvosi útmutatáshoz igazítjuk.',y)
y=callout('ÁLLJON MEG, ÉS AZONNAL SZÓLJON!',
    'Új, éles vagy fokozódó fájdalom, szédülés, ájulásérzés, mellkasi panasz vagy szokatlan nehézlégzés esetén szakítsa meg a gyakorlatot. <b>Erős mellkasi fájdalom, súlyos nehézlégzés vagy eszméletvesztés esetén segítséget kérünk és hívjuk a 112-t.</b>',y)
finish(y)

y=start(3,'EDZÉS KÖZBEN','FIGYELÜNK EGYMÁSRA',
    'A szabályok a közösen végzett személyi edzésre vonatkoznak. Az edzőterem mindenkori házirendjét is be kell tartani.')
y=card(8,'Egyeztetett gyakorlat, biztonságos terhelés',
    'Kövesse a megbeszélt technikát, terhelést és pihenőidőt. Ne hagyja ki a bemelegítést, és ne emeljen önállóan a súlyon vagy a nehézségen. Ismeretlen eszköz beállításához és használatához kérjen segítséget. Bizonytalan helyzetben előbb kérdezzen.',y)
y=card(9,'Ép eszközök, szabad közlekedőutak',
    'Hibásnak tűnő eszközt ne használjon: álljon meg, és jelezze az edzőnek vagy a terem munkatársának. Ne próbálja megjavítani. Használat után az eszközöket biztonságosan tegye vissza; a táskát és a palackot a közlekedőutaktól távol helyezze el.',y)
y=card(10,'Higiénia és figyelem',
    'Használjon törölközőt az érintett felületeken, és tisztítsa az eszközöket a terem előírásai szerint. A hosszú hajat fogja össze, a beakadó ékszert vegye le. Gyakorlat végzése közben ne telefonozzon. Kiömlött folyadékot és más veszélyforrást azonnal jelezzen.',y)
y=card(11,'Tisztelet és felvételek',
    'Egymás határait és méltóságát tiszteletben tartjuk; zaklatásnak, megalázásnak vagy fenyegetésnek nincs helye. Másról felvétel csak előzetes beleegyezéssel, a terem szabályai szerint készülhet. Vendégről készült kép vagy videó közzétételéhez külön, önkéntes írásos engedély szükséges; az arcot akkor is kitakarom.',y)
finish(y)

y=start(4,'JOGOK ÉS','KÖTELEZETTSÉGEK',
    'A jó együttműködéshez világos határok és kölcsönös visszajelzés kell. A biztonságos edzés feltételeiről mindkét félnek gondoskodnia kell.')
y=card(12,'Ön bármikor szólhat, kérdezhet és megállhat',
    'Kérhet pihenőt, magyarázatot vagy másik gyakorlatot, és bármikor megszakíthatja az edzést. Fizikai érintéssel történő korrekcióhoz előzetesen engedélyt kérek; ezt visszautasíthatja. Az eszközhasználat a terem szabályaihoz, az állapotához és a biztonságos használat feltételeihez igazodik.',y)
y=card(13,'Az edző vállalásai és szakmai határai',
    'Érthetően elmagyarázom a feladatokat, figyelem a végrehajtást és az állapotához igazítom a terhelést. Veszélyes helyzetben megszakítom az edzést és szükség esetén segítséget kérek. Nem állítok fel orvosi diagnózist és nem módosítok gyógyszerelést; indokolt esetben megfelelő egészségügyi szakemberhez irányítom.',y)
y=card(14,'Fiatalkorúak, adatok és megállapodások',
    'A 14–17 éves vendégeknél szülő vagy törvényes képviselő által aláírt megállapodás szükséges. Csak a biztonságos edzéshez szükséges egészségi információkat egyeztetjük, bizalmasan. Ez a szabályzat nem helyettesíti az adatkezelési tájékoztatót, a szükséges külön hozzájárulást vagy a szolgáltatási megállapodást.',y)
y=callout('KÖZÖS FELELŐSSÉG • KÉRDÉS ÉS VISSZAJELZÉS',
    'A lényeges információk elhallgatása veszélyeztetheti az edzést, de nem jelent automatikus felelősségmentességet az edzőnek vagy a teremnek. A szabályzat a jogszabály szerinti jogokat nem korlátozza. Kérdését vagy panaszát személyesen, illetve itt jelezheti:<br/><b>mihaly.bence.fitness@gmail.com</b>',y)
finish(y)
c.save()
print(OUT)
