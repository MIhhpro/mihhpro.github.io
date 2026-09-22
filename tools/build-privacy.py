"""Build matching privacy reading pages from the paired content source."""
from pathlib import Path
from lxml import html
import importlib.util
import json
import re

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('languages', ROOT / 'tools/build-languages.py')
languages = importlib.util.module_from_spec(spec)
spec.loader.exec_module(languages)
data = json.loads((ROOT / 'tools/privacy-content.json').read_text(encoding='utf-8'))
for lang, template, filename in [('hu', 'aszf.html', 'adatkezeles.html'), ('en', 'terms.html', 'privacy-en.html')]:
    en = lang == 'en'
    title = 'Privacy notice' if en else 'Adatkezelési tájékoztató'
    intro = ('What happens to your details when you visit, get in touch or book a time.' if en else 'Mi történik az adataiddal, amikor böngészel, írsz nekem vagy időpontot foglalsz.')
    source = languages.strip_language_ui((ROOT / template).read_text(encoding='utf-8'))
    source = re.sub(r'<title>.*?</title>', f'<title>{title} | Mihály Bence</title>', source)
    source = re.sub(r'<meta name="description"[^>]*>', f'<meta name="description" content="{intro}">', source)
    label = 'On this page' if en else 'Oldal tartalma'
    toc = f'<nav class="section-nav" aria-label="{label}"><button class="section-nav-toggle" type="button" aria-expanded="false" aria-controls="section-nav-list" hidden>{label}<span class="section-nav-chevron" aria-hidden="true">⌃</span></button><p class="section-nav-heading">{label}</p><ol class="section-nav-list" id="section-nav-list">'
    for sid, heading, _ in [('overview', title, '')] + data[lang]:
        toc += f'<li><a href="#{sid}"><span class="section-nav-marker" aria-hidden="true"></span><span>{heading}</span></a></li>'
    toc += '</ol></nav>'
    review_title = 'Review copy — operational details to confirm' if en else 'Egyeztetési változat — pontosítandó működési részletekkel'
    review = ('This describes the website and the confirmed client communication channels. Deletion deadlines, app storage and recording settings, and provider arrangements still need confirmation before finalisation.' if en else 'Ez a tájékoztató a weboldalt és a megerősített ügyfélkommunikációs csatornákat mutatja be. A törlési határidők, az alkalmazások tárolási és rögzítési beállításai, valamint a szolgáltatói feltételek megerősítése még szükséges a véglegesítéshez.')
    main = f'<main id="main-content" tabindex="-1">{toc}<section class="legal-intro" id="overview" tabindex="-1" aria-labelledby="privacy-title"><h1 id="privacy-title">{title}</h1><p>{intro}</p><p>{"Prepared" if en else "Készült"}: {data["date"]}</p>'
    if data['status'] == 'review':
        main += f'<div class="legal-notice"><strong>{review_title}</strong><p>{review}</p></div>'
    main += '<div class="legal-actions"><button class="btn btn-outline" type="button" data-print-terms hidden>' + ('Print / save as PDF' if en else 'Nyomtatás / mentés PDF-ként') + '</button><a class="btn btn-ghost" href="privacy-' + lang + '.txt" download>' + ('Download text copy' if en else 'Szöveges példány letöltése') + '</a></div></section>'
    plain = [title, data['date']]
    if data['status'] == 'review':
        plain += [review_title, review]
    for number, (sid, heading, body) in enumerate(data[lang], 1):
        main += f'<section class="legal-section" id="{sid}" tabindex="-1" aria-labelledby="{sid}-title"><h2 id="{sid}-title">{number}. {heading}</h2>{body}</section>'
        fragment = html.fragment_fromstring(body, create_parent='div')
        plain += ['', f'{number}. {heading}', '']
        for child in fragment:
            plain.append(' '.join(child.text_content().split()))
            for link in child.xpath('.//a[starts-with(@href,"https://")]'):
                if 'mail.google.com' not in link.get('href'):
                    plain.append(link.get('href'))
    main += '</main>'
    source = re.sub(r'<main.*?</main>', lambda _: main, source, flags=re.S)
    source = languages.decorate(source, 'adatkezeles.html', 'privacy-en.html', lang)
    (ROOT / filename).write_text(source, encoding='utf-8')
    (ROOT / f'privacy-{lang}.txt').write_text('\n'.join(plain) + '\n', encoding='utf-8')
print('Built Hungarian/English privacy pages and downloadable copies.')
