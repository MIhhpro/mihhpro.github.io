"""Finish chart colors/transparency and preserve Artifact Tool's native checkboxes.

Artifact Tool exports boolean cells with Microsoft's featurePropertyBag checkbox
metadata automatically. Preserve that metadata; do not add duplicate package parts.
"""
import sys, zipfile, re
from lxml import etree as E

path=sys.argv[1]
with zipfile.ZipFile(path) as f:
    parts={n:f.read(n) for n in f.namelist()}
S='http://schemas.openxmlformats.org/spreadsheetml/2006/main'
F='http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag'
R='http://schemas.openxmlformats.org/package/2006/relationships'
C='http://schemas.openxmlformats.org/package/2006/content-types'
for n in parts:
    if '/charts/' not in n or not n.endswith('.xml'): continue
    xml=parts[n].decode()
    xml=re.sub(r'<c:dPt>.*?</c:dPt>','',xml)
    xml=re.sub(r'<c:spPr>.*?</c:spPr>','<c:spPr><a:noFill xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"/><a:ln xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:noFill/></a:ln></c:spPr>',xml)
    points=''.join('<c:dPt><c:idx val="'+str(i)+'"/><c:spPr><a:solidFill xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:srgbClr val="'+color+'"/></a:solidFill></c:spPr></c:dPt>' for i,color in enumerate(['B65C2D','E4D6C4']))
    xml=xml.replace('<c:cat>',points+'<c:cat>')
    xml=re.sub(r'<c:firstSliceAng[^>]*/>|<c:holeSize[^>]*/>','',xml)
    xml=xml.replace('</c:doughnutChart>','<c:firstSliceAng val="270"/><c:holeSize val="75"/></c:doughnutChart>')
    xml=re.sub(r'<c:numCache>.*?</c:numCache>','<c:numCache><c:formatCode>0</c:formatCode><c:ptCount val="2"/><c:pt idx="0"><c:v>0</c:v></c:pt><c:pt idx="1"><c:v>2</c:v></c:pt></c:numCache>',xml)
    parts[n]=xml.encode()
wb=E.fromstring(parts['xl/workbook.xml']);old=wb.find(f'{{{S}}}calcPr')
if old is not None: wb.remove(old)
E.SubElement(wb,f'{{{S}}}calcPr',calcMode='auto',fullCalcOnLoad='1',forceFullCalc='1')
parts['xl/workbook.xml']=E.tostring(wb,encoding='UTF-8',xml_declaration=True)
with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as f:
    for n,b in parts.items(): f.writestr(n,b)
print('Native checkbox metadata retained; four native charts styled.')

