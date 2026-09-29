"""Page-specific static Open Graph and large-image card metadata."""
from html import escape
from lxml import html
import re

ORIGIN = 'https://mihalybence.com'

def render(source, page, lang):
    source = re.sub(r'<meta\b[^>]*(?:property|name)="(?:og:|twitter:)[^"]*"[^>]*>\s*', '', source)
    source = re.sub(r'<link\b[^>]*rel="canonical"[^>]*>\s*', '', source)
    if page in ('404.html', '404-en.html'):
        return source
    doc = html.fromstring(source)
    title = doc.xpath('string(//title)')
    description = doc.xpath('string(//meta[@name="description"]/@content)')
    url = ORIGIN + ('/' if page == 'index.html' else '/' + page)
    image = f'{ORIGIN}/assets/social/share-{lang}-v1.jpg'
    alt = ('Mihály Bence – személyi edzés és online coaching, arany MB logó fekete háttéren.' if lang == 'hu'
           else 'Bence Mihály – personal training and online coaching, gold MB logo on a black background.')
    tags = [('og:type','website'), ('og:site_name','Mihály Bence'), ('og:title',title),
            ('og:description',description), ('og:url',url),
            ('og:locale','hu_HU' if lang == 'hu' else 'en_GB'),
            ('og:locale:alternate','en_GB' if lang == 'hu' else 'hu_HU'),
            ('og:image',image), ('og:image:secure_url',image), ('og:image:type','image/jpeg'),
            ('og:image:width','1200'), ('og:image:height','630'), ('og:image:alt',alt),
            ('twitter:card','summary_large_image'), ('twitter:title',title),
            ('twitter:description',description), ('twitter:image',image), ('twitter:image:alt',alt)]
    markup = f'<link rel="canonical" href="{escape(url,quote=True)}">\n'
    for key,value in tags:
        attr = 'property' if key.startswith('og:') else 'name'
        markup += f'<meta {attr}="{key}" content="{escape(value,quote=True)}">\n'
    return source.replace('</head>',markup+'</head>')
