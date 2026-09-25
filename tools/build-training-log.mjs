import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const root='C:/Users/Ben/Desktop/Page', tmp=root+'/tmp/training-log';
const require=createRequire(tmp+'/runtime.cjs');
const {Workbook,SpreadsheetFile,FileBlob}=await import(pathToFileURL(require.resolve('@oai/artifact-tool')));
import {execFileSync} from 'node:child_process';
const gold='#D4AA40', ink='#171610', muted='#726B5E', pale='#FFF5D9', line='#E8E3D9';
const text={hu:{s:['Áttekintés','Gyakorlatok','Kitöltési példa'],title:'EDZÉSNAPLÓ',sub:'Mihály Bence · 4 hetes edzéskövetés',start:'Kezdő dátum',goal:'Heti edzéscél',hint:'A halvány arany mezők kitölthetők. Add meg a kezdő dátumot és a heti edzéscélt.',hint2:'Egy sor egy befejezett edzés. A gyakorlatokat a Gyakorlatok lapon rögzítsd.',week:'hét',done:'Elvégzett',left:'Hátralévő',sessions:'BEFEJEZETT EDZÉSEK',headers:['Dátum','Időtartam (perc)','Edzés fókusza','Megjegyzés'],exTitle:'GYAKORLATOK',exHint:'Egy sor egy gyakorlat az adott napon. Eltérő súlyok vagy ismétlések esetén használj külön sorokat.',exHint2:'Saját testsúlynál a súly mező üresen maradhat. Időalapú gyakorlatnál az időt töltsd ki.',exHeads:['Dátum','Gyakorlat','Sorozat','Ismétlés / sorozat','Súly (kg)','Idő (perc)','Megjegyzés'],example:'KITÖLTÉSI PÉLDA',exampleHint:'Kitalált bejegyzések a kitöltés bemutatásához. Nem részei az összesítésnek.',example2:'A terhelést és a gyakorlatokat mindig a saját edzésterved alapján rögzítsd.',sessionExample:['Teljes test','A technika jól ment.'],ex:[['Guggolás kézisúllyal',3,10,8,null,'Azonos súly minden sorozatban.'],['Evezés csigán',3,12,15,null,'Kontrollált mozdulatok.'],['Szobakerékpár',null,null,null,10,'Kényelmes tempó.']],rule:'A körök legfeljebb 100%-ot mutatnak. A számok a célon felüli edzéseket is tartalmazzák.',new:'Új 4 hetes időszakhoz készíts másolatot az üres sablonból.',blank:'Add meg a dátumot és a célt.',total:'Összes edzés',minutes:'Összes perc'},en:{s:['Overview','Exercises','Worked example'],title:'TRAINING LOG',sub:'Mihály Bence · 4-week training tracker',start:'Start date',goal:'Weekly session goal',hint:'Pale gold cells are editable. Enter your start date and weekly session goal.',hint2:'One row per completed session. Record individual exercises on the Exercises sheet.',week:'Week',done:'Completed',left:'Remaining',sessions:'COMPLETED SESSIONS',headers:['Date','Duration (min)','Session focus','Notes'],exTitle:'EXERCISES',exHint:'One row per exercise on that date. Use separate rows when weights or repetitions differ.',exHint2:'Leave weight blank for bodyweight exercises. For timed exercises, record the duration.',exHeads:['Date','Exercise','Sets','Reps / set','Weight (kg)','Time (min)','Notes'],example:'WORKED EXAMPLE',exampleHint:'Fictional entries showing how to fill in the log. Excluded from your totals.',example2:'Record the exercises and loads from your own training plan.',sessionExample:['Full body','Technique felt comfortable.'],ex:[['Goblet squat',3,10,8,null,'Same weight for all sets.'],['Cable row',3,12,15,null,'Controlled movements.'],['Exercise bike',null,null,null,10,'Comfortable pace.']],rule:'Rings stop at 100%. The counts still include sessions completed above your goal.',new:'For a new 4-week period, save a copy of the empty template.',blank:'Enter a start date and goal.',total:'Total sessions',minutes:'Total minutes'}};
const palette={orange:'#B65C2D',beige:'#F2E9DC',paper:'#FCF9F4',peach:'#F9E2CF',ink:'#40352D',muted:'#847362',track:'#E4D6C4'};
function put(s,a,v){s.getRange(a).values=[[v]];}
function fx(s,a,v){s.getRange(a).formulas=[[v]];}
function merge(s,a,v){s.mergeCells(a);if(v!==undefined)put(s,a.split(':')[0],v);}
function fmt(s,a,f){s.getRange(a).format=f;}
for(const lang of ['hu','en']){
 const t=text[lang], path=root+`/mihaly-bence-training-log-${lang}${lang==="en"?"-checkboxes":""}.xlsx`;
 const w=await SpreadsheetFile.importXlsx(await FileBlob.load(tmp+`/pre-checkbox-${lang}.xlsx`));
 const o=w.worksheets.getItem(t.s[0]),e=w.worksheets.getItem(t.s[1]),x=w.worksheets.getItem(t.s[2]);
 // Completion is a tick list. Keep the optional start date only for week headings.
 o.getRange('B45:L106').unmerge();o.getRange('B45:L106').clear({applyTo:'all'});
 merge(o,'C5:F5',lang==='hu'?'Nem kötelező: éééé-hh-nn, pl. 2026-09-28':'Optional: yyyy-mm-dd, e.g. 2026-09-28');
 merge(o,'H5:L5',lang==='hu'?'Egész szám 1–7 között, pl. 2':'Whole number from 1–7, e.g. 2');
 fmt(o,'B5:L5',{font:{name:'Arial',size:10,color:palette.muted},rowHeight:24});
 put(o,'J6',2);o.getRange('J6').dataValidation={rule:{type:'whole',operator:'between',formula1:1,formula2:7}};
 put(o,'B8',lang==='hu'?'1. Állítsd be a heti célt.  2. Edzés után pipálj ki egy négyzetet az adott hétnél.':'1. Set your weekly goal.  2. After training, tick one box in that week.');
 const boxes=[],weekRefs=[];
 for(let i=0;i<4;i++){
  const top=i<2?14:28,left=i%2===0,a=left?'B':'H',b=left?'C':'I',c=left?'D':'J',r=4+3*i;
  o.getRange(`${a}${top+2}:${b}${top+11}`).unmerge();o.getRange(`${a}${top+2}:${b}${top+11}`).clear({applyTo:'contents'});
  fmt(o,`${a}${top+2}:${b}${top+11}`,{fill:palette.paper,font:{name:'Arial',size:11,bold:false,color:palette.ink},horizontalAlignment:'left'});
  for(let j=0;j<7;j++){
   const cell=`${a}${top+3+j}`,label=`${b}${top+3+j}`;boxes.push(cell);put(o,cell,false);put(o,label,lang==='hu'?`${j+1}. edzés`:`Session ${j+1}`);
   fmt(o,cell,{fill:palette.peach,font:{name:'Arial',size:14,color:palette.orange},horizontalAlignment:'center'});
   o.getRange(label).conditionalFormats.addCustom(`$${a}${top+3+j}=TRUE`,{font:{color:palette.orange,bold:true}});
  }
  fx(o,`R${r}`,'='+Array.from({length:7},(_,j)=>a+(top+3+j)).join('+'));
  fx(o,`R${r+1}`,`=IF(OR($J$6="",$J$6<1,$J$6>7),"",MAX($J$6-R${r},0))`);
  fx(o,`${c}${top+5}`,`=IF(OR($J$6="",$J$6<1,$J$6>7),"—",R${r}/$J$6)`);
  merge(o,`${a}${top+11}:${b}${top+11}`);fx(o,`${a}${top+11}`,`=IF(OR($J$6="",$J$6<1,$J$6>7),${lang==='hu'?'"Heti cél: 1–7"':'"Set goal: 1–7"'},R${r}&" / "&$J$6&${lang==='hu'?'" edzés kész"':'" sessions done"'})`);
  fmt(o,`${a}${top+11}:${b}${top+11}`,{font:{name:'Arial',size:10,bold:true,color:palette.orange},horizontalAlignment:'center'});
  fx(o,`P${r}`,`=IF(OR($J$6="",$J$6<1,$J$6>7),0,MIN(R${r},$J$6))`);fx(o,`P${r+1}`,`=IF(OR($J$6="",$J$6<1,$J$6>7),1,R${r+1})`);
  weekRefs.push({range:`${a}${top+3}:${a}${top+9}`,count:`R${r}`,pct:`${c}${top+5}`});
 }
 put(o,'R2',lang==='hu'?'Heti összesítés':'Weekly totals');fmt(o,'R2:R15',{font:{name:'Arial',size:10,color:palette.muted},columnWidthPx:130});
 fx(o,'B11','=SUM(R4,R7,R10,R13)');fx(o,'H11','=IF(OR($J$6="",$J$6<1,$J$6>7),"—",SUM(R5,R8,R11,R14))');
 put(o,'B43',lang==='hu'?'A részletes gyakorlatnapló opcionális. Új 4 héthez készíts másolatot az üres sablonból.':'The exercise log is optional. For a new 4-week block, copy the empty template.');
 merge(o,'B45:L45',lang==='hu'?'Pipálás: Excel Microsoft 365-ben nyisd meg a fájlt.':'Open in Excel for Microsoft 365 to use the checkboxes.');fmt(o,'B45:L45',{font:{name:'Arial',size:10,color:palette.muted}});
 // Optional details use session labels, not dates. Show exact examples beside every field.
 put(e,'B5',lang==='hu'?'Opcionális részletek. Csak akkor töltsd ki, ha a gyakorlatokat is szeretnéd követni.':'Optional detail. Fill this in only if you want to track individual exercises.');
 put(e,'B6',lang==='hu'?'Egy sor = egy gyakorlat. Másold az alábbi mintát; csak a saját értékeidet írd be.':'One row = one exercise. Follow the examples below and enter your own values.');
 put(e,'B8',lang==='hu'?'Hét / edzés':'Week / session');e.getRange('B9:B308').setNumberFormat('@');
 e.getRange('B7:H7').values=[[lang==='hu'?'Pl. 1. hét / 1.':'E.g. W1 / S1',lang==='hu'?'Pl. Guggolás':'E.g. Squat',lang==='hu'?'Pl. 3':'E.g. 3',lang==='hu'?'Pl. 10':'E.g. 10',lang==='hu'?'Pl. 8':'E.g. 8',lang==='hu'?'Pl. 10':'E.g. 10',lang==='hu'?'Pl. Könnyű volt':'E.g. Felt comfortable']];fmt(e,'B7:H7',{font:{name:'Arial',size:10,italic:true,color:palette.muted},rowHeight:26});
 e.getRange('F9:G308').setNumberFormat('0.##');
 // Replace the example's dated session with an actual checked box and a plain session label.
 put(x,'B6',lang==='hu'?'Heti cél: 2. Egy pipa = 1 kész edzés = 50%. A dátumot nem kell megadnod.':'Weekly goal: 2. One tick = 1 completed session = 50%. No date entry needed.');
 put(x,'B10',lang==='hu'?'Kész':'Done');put(x,'B11',true);fmt(x,'B11',{font:{name:'Arial',size:14,color:palette.orange},horizontalAlignment:'center',fill:palette.peach});x.getRange('B11').setNumberFormat('General');
 put(x,'C10',lang==='hu'?'Hét / edzés':'Week / session');put(x,'C11',lang==='hu'?'1. hét / 1. edzés':'Week 1 / Session 1');
 put(x,'B16',lang==='hu'?'Hét / edzés':'Week / session');x.getRange('B17:B19').setNumberFormat('@');x.getRange('B17:B19').values=[[lang==='hu'?'1. hét / 1.':'W1 / S1']];
 // Representative checkbox changes: check, uncheck, goal limits and date-independent updates.
 put(o,'B17',true);w.recalculate();if(o.getRange('D19').values[0][0]!==0.5)throw new Error('One checkbox must show 50%');
 put(o,'B18',true);w.recalculate();if(o.getRange('D19').values[0][0]!==1)throw new Error('Two checkboxes must show 100%');
 put(o,'B17',false);w.recalculate();if(o.getRange('D19').values[0][0]!==0.5)throw new Error('Uncheck must subtract');
 put(o,'J6',1);w.recalculate();if(o.getRange('D19').values[0][0]!==1)throw new Error('Goal 1 failed');
 put(o,'J6',7);for(const a of boxes)put(o,a,true);w.recalculate();if(o.getRange('B11').values[0][0]!==28||o.getRange('H11').values[0][0]!==0)throw new Error('All four weeks failed');
 put(o,'J6',0);w.recalculate();if(o.getRange('D19').values[0][0]!=='—')throw new Error('Invalid goal guard failed');
 put(o,'J6',2);for(const a of boxes)put(o,a,false);w.recalculate();
 console.log(lang,(await w.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!',options:{useRegex:true,maxResults:10}})).ndjson);
 await(await SpreadsheetFile.exportXlsx(w)).save(path);
 execFileSync('C:/Users/Ben/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',[root+'/V19/tools/finish-training-log.py',path]);
 const final=await SpreadsheetFile.importXlsx(await FileBlob.load(path));const fo=final.worksheets.getItem(t.s[0]);put(fo,'B17',true);final.recalculate();if(fo.getRange('D19').values[0][0]!==0.5)throw new Error('Exported checkbox value must update ring');
 for(const [i,s]of t.s.entries()){const png=await final.render({sheetName:s,range:i===0?'A1:M45':i===1?'A1:H14':'A1:H24',scale:1.3,format:'png'});await fs.writeFile(tmp+`/${lang}-checkbox-${i}.png`,new Uint8Array(await png.arrayBuffer()));}
 await fs.rename(path+'.inspect.ndjson',tmp+`/${lang}-checkbox.inspect.ndjson`).catch(()=>{});console.log('Updated '+path);
}





