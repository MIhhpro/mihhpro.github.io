"""Static social cards/footer links; empty owner URLs remain explicit placeholders."""
from pathlib import Path
from html import escape
from urllib.parse import urlsplit
import json
import re

ROOT = Path(__file__).resolve().parents[1]
PLATFORMS = {
    'instagram': ('Instagram', 'instagram.com', '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"></rect><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"></circle><circle cx="17.5" cy="6.5" r="1.1"></circle>'),
    'facebook': ('Facebook', 'facebook.com', '<path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z"></path>'),
    'tiktok': ('TikTok', 'tiktok.com', '<path d="M16 2c.3 2.5 1.7 4 4 4.3v3.5a9 9 0 0 1-4-1.2v7a6.4 6.4 0 1 1-5.5-6.3v3.6a2.9 2.9 0 1 0 2 2.7V2z"></path>'),
}


def strip_generated(source):
    source = re.sub(r'<nav class="footer-social".*?</nav>\s*', '', source, flags=re.S)
    return re.sub(r'(<div class="social-grid" data-social-cards>).*?(</div>)', r'\1\2', source, flags=re.S)


def render(source, lang):
    profiles = json.loads((ROOT / 'tools/social-profiles.json').read_text(encoding='utf-8'))
    assert set(profiles) == set(PLATFORMS), 'Only Instagram, Facebook and TikTok are approved.'
    en = lang == 'en'
    soon = 'Profile coming soon' if en else 'A profil hamarosan elérhető'
    open_label = 'Open profile' if en else 'Profil megnyitása'
    new_tab = 'opens in a new tab' if en else 'új lapon nyílik meg'
    cards, buttons = [], []
    for key, (name, domain, paths) in PLATFORMS.items():
        profile = profiles[key]
        url, handle = profile['url'].strip(), profile['handle'].strip()
        if url:
            parsed = urlsplit(url)
            assert parsed.scheme == 'https' and parsed.hostname in (domain, 'www.' + domain), f'Unexpected {name} profile URL'
            assert not parsed.username and not parsed.password and parsed.path not in ('', '/'), f'Use the actual {name} profile URL'
        icon = f'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">{paths}</svg>'
        label = escape(f'{name} — {new_tab if url else soon}', quote=True)
        attrs = f'href="{escape(url, quote=True)}" target="_blank" rel="noopener noreferrer"' if url else 'role="link" aria-disabled="true"'
        tag = 'a' if url else 'span'
        status = escape(handle or open_label) if url else ('Profile coming soon' if en else 'Hamarosan')
        cards.append(f'<{tag} class="social-card" {attrs} aria-label="{label}"><span class="social-card-top"><span class="social-icon">{icon}</span><span class="social-arrow" aria-hidden="true">↗</span></span><span class="social-name">{name}</span><span class="social-profile">{status}</span></{tag}>')
        buttons.append(f'<{tag} class="social-button" {attrs} aria-label="{label}" title="{label}">{icon}</{tag}>')
    source = strip_generated(source)
    source = source.replace('<div class="social-grid" data-social-cards></div>', '<div class="social-grid" data-social-cards>' + ''.join(cards) + '</div>')
    footer = '<nav class="footer-social" aria-label="' + ('Social media' if en else 'Közösségi média') + '">' + ''.join(buttons) + '</nav>\n  '
    source = source.replace('<nav class="footer-legal"', footer + '<nav class="footer-legal"', 1)
    source = re.sub(r'<link[^>]+href="social\.css[^\"]*"[^>]*>\s*', '', source)
    return source.replace('</head>', '<link rel="stylesheet" href="social.css?v=20.1">\n</head>')
