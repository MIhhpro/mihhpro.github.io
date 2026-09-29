"""Verify crawler-readable localized metadata and exported image dependencies."""
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html
from PIL import Image
import sys

ROOT = Path(__file__).resolve().parents[1]
if len(sys.argv) > 1:
    ROOT = Path(sys.argv[1]).resolve()
count=0
for path in ROOT.glob('*.html'):
    doc=html.fromstring(path.read_text(encoding='utf-8'))
    def meta(key):
        values=doc.xpath('//meta[@property=$key or @name=$key]/@content',key=key)
        assert len(values)==1,(path.name,key,values)
        return values[0]
    if path.name in ('404.html','404-en.html'):
        assert not doc.xpath('//meta[starts-with(@property,"og:")] | //link[@rel="canonical"]'),path.name
        continue
    lang=doc.get('lang')
    assert meta('og:title')==doc.xpath('string(//title)')==meta('twitter:title')
    assert meta('og:description')==doc.xpath('string(//meta[@name="description"]/@content)')==meta('twitter:description')
    expected='https://mihalybence.com/'+('' if path.name=='index.html' else path.name)
    assert meta('og:url')==expected and doc.xpath('//link[@rel="canonical"]/@href')==[expected]
    assert meta('og:locale')==('hu_HU' if lang=='hu' else 'en_GB')
    assert meta('og:image')==meta('twitter:image')==f'https://mihalybence.com/assets/social/share-{lang}-v1.jpg'
    assert meta('twitter:card')=='summary_large_image'
    assert meta('og:image:alt') and meta('twitter:image:alt')
    image_path=ROOT/urlsplit(meta('og:image')).path.lstrip('/')
    with Image.open(image_path) as image:
        assert image.size==(int(meta('og:image:width')),int(meta('og:image:height')))==(1200,630)
        assert image.format=='JPEG'
    count+=1
assert count==22,count
print(f'PASS: {count} pages with localized sharing metadata, canonical URLs and existing 1200x630 JPEG images; 404s excluded.')
