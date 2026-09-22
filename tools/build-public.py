"""Create a fresh, allowlisted upload folder without internal project records.

Usage: python tools/build-public.py [new-output-directory]
Existing output directories are refused, so obsolete files cannot survive a rebuild.
This copies files locally; it never publishes or deletes anything.
"""
from pathlib import Path
from urllib.parse import urlsplit, unquote
from lxml import html
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT = (Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / 'output' / 'V19-public').resolve()
ALLOWED = {'.html', '.css', '.js', '.webp', '.woff2', '.ico', '.png', '.jpg', '.jpeg', '.svg', '.txt', '.pdf'}
assert not OUT.exists(), f'Use a fresh output directory: {OUT}'
assert OUT != ROOT and not OUT.is_relative_to(ROOT), 'Keep output outside website sources'
assert OUT.is_relative_to(ROOT.parent), 'Keep output inside the Page workspace'
pending = list(ROOT.glob('*.html'))
pending += [ROOT / 'assets/fonts/inter-OFL.txt', ROOT / 'assets/fonts/barlowcondensed-OFL.txt']
selected = set()

def reference(value, source):
    uri = urlsplit(value.strip())
    if uri.scheme or uri.netloc or not uri.path:
        return
    path = ((ROOT if uri.path.startswith('/') else source.parent) / unquote(uri.path.lstrip('/'))).resolve()
    if path == ROOT:
        path /= 'index.html'
    assert path.is_relative_to(ROOT), f'Outside source tree: {value}'
    assert path.is_file(), f'Missing asset: {value} in {source.name}'
    rel = path.relative_to(ROOT)
    assert rel.parts[0] not in {'tools', 'tests', 'tmp', '.review'}, f'Private dependency: {rel}'
    assert path.suffix.lower() in ALLOWED, f'Unapproved public type: {rel}'
    pending.append(path)

while pending:
    path = pending.pop().resolve()
    if path in selected:
        continue
    selected.add(path)
    if path.suffix == '.html':
        doc = html.fromstring(path.read_text(encoding='utf-8'))
        for el in doc.iter():
            if not isinstance(el.tag, str) or el.tag == 'base':
                continue
            for attr in ['href', 'src', 'data-full-src']:
                if el.get(attr):
                    reference(el.get(attr), path)
            for candidate in el.get('srcset', '').split(','):
                if candidate.strip():
                    reference(candidate.strip().split()[0], path)
    elif path.suffix == '.css':
        for ref in re.findall(r'url\(\s*[\"\']?([^\)\"\']+)', path.read_text(encoding='utf-8')):
            reference(ref.strip(), path)

for path in sorted(selected):
    target = OUT / path.relative_to(ROOT)
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, target)
(OUT / '.nojekyll').write_text('', encoding='utf-8')
(OUT / 'CNAME').write_text('mihalybence.com\n', encoding='utf-8')
assert not list(OUT.rglob('*.md'))
print(f'Prepared {len(selected)} referenced public files plus CNAME/.nojekyll in {OUT}')
print(f'Total bytes: {sum(p.stat().st_size for p in OUT.rglob("*") if p.is_file()):,}')
print('No Markdown, working directories or unreferenced source photographs included. Not deployed.')
