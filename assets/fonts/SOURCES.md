# Local website fonts

Vendored 2026-09-22 from Google's official Fonts CSS endpoint and fonts.gstatic.com. These are the same Inter variable (100–900) and Barlow Condensed (500, 600, 700, 800, 900) families used previously. Latin and Latin Extended preserve Hungarian accents, including ő and ű, and English. Other scripts fall back to the visitor's system font.

`manifest.json` records each exact source URL and size. Both families use the SIL Open Font License; the unmodified licences are retained in `inter-OFL.txt` and `barlowcondensed-OFL.txt`. Do not remove licences from public font distribution. `fonts.css` at the website root declares the subsets and `font-display: swap`. Only used subsets/weights download; the two common Latin files are preloaded.

The website no longer requests Google Fonts. These files and their licences are public assets; this source note is internal documentation. A future font update must keep the same coverage, preserve licensing and recheck typography in both languages.
