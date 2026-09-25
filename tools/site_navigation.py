"""One navigation map for every public HU/EN page; 404 remains a recovery page."""
import re
from html import escape

# Each link supplies its Hungarian/English route and label.
HOME = ('index.html', 'index-en.html', 'Főoldal', 'Home')
CONTACT = ('contact.html', 'contact-en.html', 'Kapcsolat', 'Contact')
PERSONAL = ('szemelyi-edzes.html', 'personal-training-en.html', 'Személyi edzés', 'Personal training')
ONLINE = ('online-coaching.html', 'online-coaching-en.html', 'Online coaching', 'Online coaching')
RESOURCES = ('segedletek.html', 'resources-en.html', 'Segédletek', 'Free resources')
DIRECT = [HOME, PERSONAL, ONLINE, RESOURCES, CONTACT]
GROUPS = [
    ('Szolgáltatások', 'Services', [
        ('services.html', 'services-en.html', 'Összes szolgáltatás és árak', 'All services and prices'),
        ('services.html#osszehasonlitas', 'services-en.html#osszehasonlitas', 'Online csomagok összehasonlítása', 'Compare online plans'),
        ('elso-alkalom.html', 'first-visit-en.html', 'Az első alkalom', 'Your first session'),
    ]),
    ('Rólam', 'About', [
        ('about.html', 'about-en.html', 'Történetem és szakmai hátterem', 'My story and qualifications'),
        ('about.html#galeria', 'about-en.html#galeria', 'Galéria', 'Gallery'),
        ('sikerek.html', 'progress-en.html', 'Sikerek', 'Progress stories'),
    ]),
]

def render_navigation(source, page, lang):
    en = lang == 'en'
    def link(item):
        href, label = item[1 if en else 0], item[3 if en else 2]
        active = ' aria-current="page"' if href == page else ''
        return f'<a href="{href}"{active}>{escape(label)}</a>'
    desktop = ''.join(link(item) for item in [HOME, PERSONAL, ONLINE])
    mobile = desktop
    for hu, english, items in GROUPS:
        title = english if en else hu
        links = ''.join(link(item) for item in items)
        active = ' is-current-group' if any(item[1 if en else 0].split('#')[0] == page for item in items) else ''
        desktop += f'<details class="nav-dropdown{active}"><summary>{escape(title)}<span class="nav-chevron" aria-hidden="true">⌄</span></summary><div class="nav-dropdown-panel">{links}</div></details>'
        mobile += f'<div class="mobile-nav-group"><p>{escape(title)}</p>{links}</div>'
    desktop += link(RESOURCES) + link(CONTACT)
    mobile += link(RESOURCES) + link(CONTACT)
    desktop = '<nav class="nav-links" aria-label="'+('Main navigation' if en else 'Fő navigáció')+'">'+desktop+'</nav>'
    mobile = '<nav class="mobile-menu" id="mobile-navigation" aria-label="'+('Mobile navigation' if en else 'Mobil navigáció')+'">'+mobile+'</nav>'
    source = re.sub(r'<nav class="nav-links".*?</nav>', lambda _: desktop, source, flags=re.S)
    source = re.sub(r'<nav class="mobile-menu".*?</nav>', lambda _: mobile, source, flags=re.S)
    source = re.sub(r'<link[^>]+href="navigation\.css[^\"]*"[^>]*>\s*', '', source)
    source = re.sub(r'<script src="navigation\.js[^\"]*"[^>]*></script>\s*', '', source)
    source = source.replace('</head>', '<link rel="stylesheet" href="navigation.css?v=19.1">\n</head>')
    return source.replace('</body>', '<script src="navigation.js?v=19.1"></script>\n</body>')
