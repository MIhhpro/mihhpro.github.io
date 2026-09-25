"""All public destinations stay reachable in both navigation layouts/languages."""
from pathlib import Path
import sys
from lxml import html
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root/'tools'))
from site_navigation import GROUPS,DIRECT,CONTACT,PERSONAL,ONLINE,RESOURCES
for page in root.glob('*.html'):
    doc=html.fromstring(page.read_text(encoding='utf-8'))
    en=doc.get('lang')=='en'
    index=1 if en else 0
    items=DIRECT+[item for _,_,group in GROUPS for item in group]
    expected={item[index] for item in items}
    for selector in ['//nav[@class="nav-links"]','//nav[@class="mobile-menu"]']:
        nav=doc.xpath(selector)[0]
        assert set(nav.xpath('.//a/@href')) == expected,page.name
        current=nav.xpath('.//a[@aria-current="page"]/@href')
        assert current == ([page.name] if page.name in expected else []),(page.name,current)
        assert nav.xpath('.//a/@href')[-1] == CONTACT[index],page.name
        assert nav.xpath('./a[@href=$href]',href=PERSONAL[index]),page.name
        assert nav.xpath('./a[@href=$href]',href=ONLINE[index]),page.name
        assert nav.xpath('.//a[starts-with(@href,$href)]/@href',href=RESOURCES[index]) == [RESOURCES[index]],page.name
        assert not nav.xpath('.//a[@href="aszf.html" or @href="terms.html" or @href="adatkezeles.html" or @href="privacy-en.html"]'),page.name
    assert doc.xpath('//nav[@class="footer-legal"]/a[@href=$href]',href='privacy-en.html' if en else 'adatkezeles.html'),page.name
    assert doc.xpath('//nav[@class="footer-legal"]/a[@href=$href]',href='terms.html' if en else 'aszf.html'),page.name
    nav=doc.xpath('//nav[@class="nav-links"]')[0]
    assert len(nav)==7,page.name
    for item in nav.xpath('./details'):
        assert item.xpath('./summary') and item.xpath('./div/a'),page.name
    assert doc.xpath('//script[@src="navigation.js?v=19.1"]'),page.name
    assert doc.xpath('//link[@href="navigation.css?v=19.1"]'),page.name
print('PASS: 24 pages; seven main items, direct training/coaching links, one resources link, Contact last, legal links only in footer, and correct localized current-page markers.')
