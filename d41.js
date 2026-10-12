(function(){
/* Peace to Pacific: side elevation of the Control Room concept. Scroll rides seven real stops on the BC Hydro system, north to south.
   World units are metres. Structures every 300 m, a stop every 900 m (stop k sits at structure 3k). Structures 0-12 are 500 kV lattice
   towers (flat arrangement, twin bundle), 13-15 are steel poles, and from structure 15 the circuit continues as underground cable.
   The sag, clearance and weather model is illustrative only. */
const SP=300,SD=900,NS=7,NTW=16,UGX=4500,MINC=7,E0=-11,BOT=24,SEG=24,A5=23,P5=32.5,A2=17,P2=27.5;
const FM='"DM Mono",ui-monospace,monospace',FC='"Barlow Condensed","Arial Narrow",sans-serif';
const DK=[[10,17,28],[27,49,82],[168,95,76],[243,172,107]],NT=[[3,6,13],[7,15,31],[13,26,48],[30,48,80]],ST=[[9,11,16],[20,24,33],[38,43,54],[70,76,88]],GS=[0,.5,.8,1];
const STOPS=[
  {n:'Site C',s:'SITE C',l:'Peace River, about 7 km southwest of Fort St. John',
   f:'1,100 MW from six generating units; first unit October 2024, sixth and final unit August 2025. Two 500 kV lines, about 75 km, connect it to Peace Canyon substation.',
   x:'Jasmine has worked on Site C twice: as a 2023 co-op on the Owner\'s Engineering Team, and on a Site C Project Engineering rotation as an EIT.'},
  {n:'Kelly Lake Substation',s:'KELLY LAKE',l:'just south of Clinton',
   f:'Peace-region power arrives here on three 500 kV lines running about 600 km from Hudson\'s Hope.'},
  {n:'Nicola Substation',s:'NICOLA',l:'near Merritt',
   f:'Columbia-system power reaches the coast through Nicola. It is the start of the 247 km Interior to Lower Mainland line.'},
  {n:'Ruby Creek',s:'RUBY CREEK',l:'near Agassiz, in the Fraser Valley',
   f:'A 500 kV series capacitor station built as part of the Interior to Lower Mainland project.'},
  {n:'Meridian Substation',s:'MERIDIAN',l:'Coquitlam',
   f:'End of the 500 kV, 247 km single-circuit Interior to Lower Mainland line (642 structures), in service 17 December 2015.'},
  {n:'Horne Payne Substation',s:'HORNE PAYNE',l:'Burnaby',
   f:'A 230 kV underground cable runs from here to downtown Vancouver.'},
  {n:'Cathedral Square',s:'CATHEDRAL SQUARE',l:'downtown Vancouver',
   f:'An underground substation operating since 1984.'}
];
const FACTS=[['18,000+ km','of transmission lines and submarine cables'],['69 to 500 kV','transmission voltages'],['292','substations'],['About 22,000','steel towers, and 100,000 wood poles'],['70–80%','of the electricity is used in the Lower Mainland and on Vancouver Island; most generation is in the northern and southern Interior']];
/* landscape parameters per stop, blended along the route */
const GA=[.75,.5,1,.6,.8,.3,0],TD=[.8,.3,.26,.95,.8,.4,.1],HD=[0,0,0,0,.8,.9,0];
const FA=[.2,.14,.19,.46,.36,.3,.33],FJ=[.15,0,0,1,.7,.6,.8],NA=[.12,.08,.14,.36,.24,.1,.05],NJ=[.1,0,0,.85,.4,.1,0];
const WA=[1,0,0,.55,0,0,1],WX=[1,0,0,.5,0,0,0],AU=[1,.25,0,0,0,0,0],SN=[0,0,0,.75,.45,.5,.7];
const FCOL=[[40,66,98],[60,62,88],[62,72,88],[34,58,88],[32,56,84],[36,58,90],[40,62,98]];
const NCOL=[[20,40,60],[46,43,55],[41,49,47],[14,34,48],[14,32,44],[18,32,50],[18,30,50]];
const KIND=[0,1,2,0,0,3,3];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const sm=v=>{v=clamp(v,0,1);return v*v*(3-2*v)};
const mix=(a,b,k)=>a.map((v,i)=>v+(b[i]-v)*k);
const rgb=a=>'rgb('+a.map(v=>Math.round(v)).join(',')+')';
const rnd=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
const rg=(a,x)=>{const p=clamp(x/SD,0,NS-1.000001),i=Math.floor(p),f=sm(p-i);return a[i]+(a[i+1]-a[i])*f};
const rgc=(a,x)=>{const p=clamp(x/SD,0,NS-1.000001),i=Math.floor(p);return mix(a[i],a[i+1],sm(p-i))};
/* Real ground elevation along the route (BC Transmission Lines geometry, NASA SRTM heights), compressed to fit the scene:
   RE = true metres every 25 m of scene, TB = scene metres at each structure (1 scene m = 40 real m, relative to Site C). The ground runs straight between structures and keeps its small local undulation. */
const RE=[412,670,722,736,677,878,931,935,897,1021,994,801,881,841,770,783,735,669,666,676,706,678,734,709,670,655,816,906,883,873,955,1012,1056,1143,1109,1424,1092,1087,1532,1572,1339,1150,1009,629,587,951,970,854,632,540,974,1164,1337,1517,1587,1438,1291,1142,1198,1239,1207,1380,1384,1425,1446,1467,1210,846,801,1056,1055,908,758,1011,949,855,1170,1242,1173,1305,1278,1206,1222,1178,985,1199,1086,1273,1238,1344,1406,1601,1193,853,647,712,685,935,367,454,637,673,835,948,738,1000,651,536,233,435,545,213,228,130,133,465,168,84,202,320,907,979,647,558,823,585,249,125,184,249,146,240,499,435,241,171,102,138,92,3,43,394,341,280,316,324,380,453,401,237,185,206,196,117,80,137,132,145,172,274,186,13,0,15,52,76,60,8,9,17,23,17,11,4,3,48,91,70,27,20,26,26,35,34,37,34,24,21,26,30,34,40,47,36,46,58,63,50,44,39,36,33,17,15,13,10,10,11,12,22,22,20,18,11,10,13,31];
const TB=[0,10.98,6.93,17,7.38,21.42,8.65,17.4,8,-4.47,7.65,-0.8,-2.4,-6.91,-9.93,-9.65,-9.26,-9.98,-9.53];
const gbase=x=>{const u=clamp(x/SP,0,TB.length-1.000001),i=Math.floor(u);return TB[i]+(TB[i+1]-TB[i])*(u-i)};
const relev=x=>{const u=clamp(x/25,0,RE.length-1.000001),i=Math.floor(u);return RE[i]+(RE[i+1]-RE[i])*(u-i)};
const gnd=x=>{const y=x+300;return gbase(x)+(4.5*Math.sin(y/190+.9)+3*Math.sin(y/83+2.1)+1.5*Math.sin(y/37+.5))*rg(GA,x)*(1-sm((x-UGX)/350))};
const fmtT=v=>(v<0?'−':'')+Math.abs(v);
const tcOf=(load,amb)=>amb+55*(load/100)*(load/100);
const sagOf=(tc,iceK)=>7+.07*(tc-15)+3*iceK;
/* phase j at structure i: [horizontal offset, height above ground], both in metres. Phase 0 is the lowest. */
const PH=(i,j)=>i<=12?[(1-j)*9.5,A5]:[j===1?-2.6:2.6,A2+3.5*j];
const peakOf=i=>i<=12?P5:P2;
const sfOf=i=>i>=12?.62:1;
/* lowest phase, no galloping: minimum ground clearance on span cs */
const minClr=(cs,sag)=>{const p=gnd(cs*SP)+PH(cs,0)[1],r=gnd((cs+1)*SP)+PH(cs+1,0)[1],sg=sag*sfOf(cs);let mc=1e9,mu=.5;
  for(let k=1;k<60;k++){const u=k/60,c=p+(r-p)*u-4*sg*u*(1-u)-gnd((cs+u)*SP);if(c<mc){mc=c;mu=u}}
  return [mc,mu]};
const nearTw=x=>{const i=Math.round(x/SP);return i>=0&&i<NTW?Math.abs(x-i*SP):999};
const TREES=[];
for(let k=0;k<300;k++){
  const tx=-700+k*22+rnd(k)*16,si=clamp(Math.round(tx/SD),0,NS-1),kd=KIND[si];
  if(rnd(k+7)>rg(TD,tx)||nearTw(tx)<26||(tx>-670&&tx<-40)||Math.abs(tx-5400)<70)continue;
  const big=kd===0?1+.35*sm(1-Math.abs(tx-2700)/900):1;
  TREES.push({x:tx,k:kd,h:(kd===3?2.6+rnd(k+50)*1.6:kd===0?3.4+rnd(k+50)*3.2:3.6+rnd(k+50)*2.4)*big,p:rnd(k+90)*6.28,s:rnd(k+130)});
}
const HOUSES=[];
for(let k=0;k<34;k++){
  const hx=3230+k*46+rnd(k+400)*20;
  if(hx>4780||rnd(k+420)>rg(HD,hx)||nearTw(hx)<32)continue;
  HOUSES.push({x:hx,w:8+rnd(k+440)*5,h:3+rnd(k+460)*1.4,lit:rnd(k+480),k:k});
}
const LAMPS=[];
for(let lx=3545;lx<5760;lx+=90){if(nearTw(lx)>22&&Math.abs(lx-5400)>60)LAMPS.push(lx)}
const mkCity=(seed,n,span,h0,h1)=>{const a=[];for(let k=0;k<n;k++){const r=rnd(seed+k),r2=rnd(seed+k+40),r3=rnd(seed+k+80);
  a.push({o:-span+2*span*(k+.5)/n+(r-.5)*span/n*.7,bw:17+r2*19,hf:h0+(h1-h0)*r3*r3,k:seed+k,t:rnd(seed+k+120)<.3?2:0})}return a};
const DOWN=mkCity(300,20,430,.2,.58),SUB=mkCity(500,14,400,.05,.17);
DOWN[11].t=1;DOWN[11].hf=.68;DOWN[11].bw=10;
SUB[3].hf=.3;SUB[3].bw=12;SUB[9].hf=.26;SUB[9].bw=12;SUB[12].hf=.22;SUB[12].bw=13;
const gauge=(k,label,min,max,zones,val)=>{
  const cx=60,cy=58,A0=-105,SW=210,rad=d=>d*Math.PI/180;
  const pt=(d,r)=>(cx+r*Math.sin(rad(d))).toFixed(1)+' '+(cy-r*Math.cos(rad(d))).toFixed(1);
  const ang=v=>A0+SW*(v-min)/(max-min);
  const arc=(v0,v1,r)=>{const a=ang(v0),b=ang(v1);return 'M'+pt(a,r)+'A'+r+' '+r+' 0 '+(b-a>180?1:0)+' 1 '+pt(b,r)};
  let tk='';for(let i=0;i<=20;i++){const d=A0+SW*i/20;tk+='M'+pt(d,39)+'L'+pt(d,i%5===0?32.5:36)}
  return '<figure class="gg" id="bcprofile-g-'+k+'"><svg viewBox="0 0 120 74" aria-hidden="true" focusable="false"><path class="tr" d="'+arc(min,max,45)+'"/>'
    +zones.map(z=>'<path class="'+z[2]+'" d="'+arc(z[0],z[1],45)+'"/>').join('')
    +'<path class="tk" d="'+tk+'"/><text class="sc" x="31" y="67" text-anchor="middle">'+min+'</text><text class="sc" x="89" y="67" text-anchor="middle">'+max+'</text>'
    +'<g class="nd" id="bcprofile-n-'+k+'" transform="rotate('+A0+' 60 58)"><path d="M60 65L60 19"/><circle cx="60" cy="58" r="3.6"/></g></svg>'
    +'<b id="bcprofile-v-'+k+'">'+val+'</b><figcaption>'+label+'</figcaption></figure>'};

DESIGNS.push({id:'bcprofile',name:'Peace to Pacific',note:'Side view: ride the BC grid from Site C to downtown Vancouver',bg:'#0a111c',
css:`
.bcprofile{--bg:#0a111c;--pan:#0f1b2c;--pan2:#16263c;--card:rgba(17,31,50,.82);--line:#24405f;--fg:#e9f0f8;--mut:#9fb3c9;--amb:#ffc24d;--cy:#58d8ff;--red:#ff5a4d;--grn:#58e0a0;--ink:#070d16;--sh:clamp(240px,36vh,400px);background:var(--bg);color:var(--fg);color-scheme:dark;font:400 17px/1.6 Barlow,system-ui,sans-serif;padding-bottom:60px;background-image:linear-gradient(rgba(88,216,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(88,216,255,.03) 1px,transparent 1px);background-size:44px 44px}
.bcprofile :focus-visible{outline:2px solid var(--cy);outline-offset:3px}
.bcprofile .vh{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.bcprofile .hero{padding-top:clamp(22px,5vh,56px);padding-bottom:22px}
.bcprofile .ey{font:500 12px/1.4 "DM Mono",ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--amb)}
.bcprofile h1{font:700 clamp(56px,11.5vw,138px)/.88 "Barlow Condensed","Arial Narrow",sans-serif;text-transform:uppercase;margin-top:12px;overflow:hidden;padding-bottom:.06em}
.bcprofile h1 .ch{animation:bcprofileUp .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i)*45ms)}
@keyframes bcprofileUp{from{transform:translateY(110%) rotate(8deg);opacity:0}}
.bcprofile .tg{max-width:52ch;margin-top:14px;color:var(--fg)}
.bcprofile .cue{margin-top:14px;font:400 12px/1.5 "DM Mono",ui-monospace,monospace;letter-spacing:.06em;color:var(--mut)}
.bcprofile .cue::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amb);box-shadow:0 0 10px 2px var(--amb);margin-right:10px;animation:bcprofileBeat 1.4s ease-in-out infinite}
@keyframes bcprofileBeat{50%{transform:scale(.55);opacity:.6}}
.bcprofile .pin{position:sticky;top:var(--bcprofile-top,46px);z-index:20;background:var(--bg)}
.bcprofile .pin::after,.bcprofile .con::after{content:"";position:absolute;left:0;right:0;top:100%;height:30px;background:linear-gradient(var(--bg),transparent);pointer-events:none}
.bcprofile .con::after{display:none}
.bcprofile .scene{position:relative;height:var(--sh);background:var(--bg);cursor:crosshair;border-block:1px solid var(--line)}
.bcprofile .scene canvas{display:block;width:100%;height:100%}
.bcprofile .scene::before{content:"";position:absolute;inset:0;box-shadow:inset 0 0 70px rgba(3,7,13,.6);pointer-events:none}
.bcprofile .who{position:absolute;left:10px;top:8px;z-index:2;max-width:calc(100% - 20px);padding:7px 11px 8px;background:rgba(6,12,21,.72);border:1px solid rgba(120,160,205,.34);border-left:3px solid var(--amb);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);pointer-events:none}
.bcprofile .who b{display:block;font:700 19px/1 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.09em;text-transform:uppercase;color:var(--fg);white-space:nowrap}
.bcprofile .who span{display:block;margin-top:4px;font:500 10.5px/1.25 "DM Mono",ui-monospace,monospace;letter-spacing:.04em;color:var(--mut)}
.bcprofile .hud{position:absolute;left:12px;right:12px;bottom:8px;display:flex;flex-wrap:wrap;gap:5px;pointer-events:none;font:500 11px/1 "DM Mono",ui-monospace,monospace}
.bcprofile .hud span{padding:5px 7px;background:rgba(5,10,18,.78);border:1px solid var(--line);color:var(--fg);white-space:nowrap;font-variant-numeric:tabular-nums}
.bcprofile .hud span:first-child{color:var(--amb)}
.bcprofile .hud span.bad{border-color:var(--red);color:var(--red)}
.bcprofile .cap{background:#0c1626;border-bottom:1px solid var(--line)}
.bcprofile .cpi{max-width:1280px;margin-inline:auto;padding:8px 16px 9px}
.bcprofile .c1{display:flex;align-items:baseline;gap:10px;white-space:nowrap;overflow:hidden;font:500 11px/1.4 "DM Mono",ui-monospace,monospace;letter-spacing:.05em;color:var(--mut)}
.bcprofile .c1 .cno{flex:none;color:var(--ink);background:var(--amb);padding:2px 6px;letter-spacing:.08em}
.bcprofile .c1 b{flex:none;font:700 17px/1.1 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--amb)}
.bcprofile .c1 .cl{min-width:0;overflow:hidden;text-overflow:ellipsis}
.bcprofile .c1 .nx{flex:none;margin-left:auto;color:var(--cy)}
.bcprofile .cf{margin-top:3px;font-size:14px;line-height:1.38;height:calc(2*1.38em);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;color:var(--fg)}
.bcprofile .cap.sw .cf,.bcprofile .cap.sw .cl{animation:bcprofileCap .55s ease-out}
@keyframes bcprofileCap{from{opacity:0;transform:translateY(7px)}}
.bcprofile .con{position:relative;z-index:19;background:linear-gradient(#111f33,#0b1524);border-bottom:1px solid var(--line);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 18px 30px -24px #000}
.bcprofile .ci{max-width:1280px;margin-inline:auto;padding:12px 16px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px 20px;align-items:start}
.bcprofile .gs{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.bcprofile .gg{margin:0;padding:6px 4px 7px;background:var(--ink);border:1px solid var(--line);border-radius:6px;text-align:center;transition:border-color .3s,box-shadow .3s,opacity .3s}
.bcprofile .gg svg{display:block;width:100%;max-width:150px;height:auto;margin-inline:auto;transition:opacity .3s}
.bcprofile .gg .tr,.bcprofile .gg .zr,.bcprofile .gg .za,.bcprofile .gg .tk{fill:none}
.bcprofile .gg .tr{stroke:#1d3350;stroke-width:5}
.bcprofile .gg .zr{stroke:var(--red);stroke-width:5}
.bcprofile .gg .za{stroke:var(--amb);stroke-width:5}
.bcprofile .gg .tk{stroke:var(--mut);stroke-width:1}
.bcprofile .gg .sc{font:500 7px "DM Mono",ui-monospace,monospace;fill:var(--mut)}
.bcprofile .gg .nd path{stroke:var(--fg);stroke-width:2;stroke-linecap:round}
.bcprofile .gg .nd circle{fill:var(--amb)}
.bcprofile .gg b{display:block;margin-top:1px;font:500 15px/1.15 "DM Mono",ui-monospace,monospace;font-variant-numeric:tabular-nums;white-space:nowrap;transition:color .3s}
.bcprofile .gg figcaption{font:600 11px/1.25 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.13em;text-transform:uppercase;color:var(--mut)}
.bcprofile .gg.bad{border-color:var(--red);box-shadow:0 0 18px -4px var(--red)}
.bcprofile .gg.bad b{color:var(--red)}
.bcprofile .gg.na svg{opacity:.3}
.bcprofile .gg.na b{color:var(--cy);font-size:12px;line-height:17px;letter-spacing:.04em}
.bcprofile .cs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px;align-content:start;min-width:0}
.bcprofile .fd{min-width:0}
.bcprofile .lb{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.bcprofile .fd label{font:600 12px/1.2 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);cursor:pointer}
.bcprofile .fd output{font:500 12px/1.2 "DM Mono",ui-monospace,monospace;color:var(--amb);font-variant-numeric:tabular-nums;white-space:nowrap}
.bcprofile .fd input[type=range]{-webkit-appearance:none;appearance:none;display:block;width:100%;height:26px;margin:2px 0 0;background:transparent;cursor:pointer;--p:50%;--c:var(--amb)}
.bcprofile .fd input[type=range]::-webkit-slider-runnable-track{height:8px;border-radius:4px;background:linear-gradient(90deg,var(--c) var(--p),var(--line) var(--p))}
.bcprofile .fd input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;margin-top:-6px;border-radius:50%;background:var(--c);border:3px solid var(--ink);box-shadow:0 0 12px var(--c)}
.bcprofile .fd input[type=range]::-moz-range-track{height:8px;border-radius:4px;background:var(--line)}
.bcprofile .fd input[type=range]::-moz-range-progress{height:8px;border-radius:4px;background:var(--c)}
.bcprofile .fd input[type=range]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:var(--c);border:3px solid var(--ink);box-shadow:0 0 12px var(--c)}
.bcprofile .fd input[type=range]:focus-visible{outline:2px solid var(--fg);outline-offset:2px;border-radius:6px}
.bcprofile .bt{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:7px 8px}
.bcprofile .ck{display:flex;align-items:center;gap:8px;margin-right:4px}
.bcprofile .ck input{width:20px;height:20px;margin:0;accent-color:var(--cy);cursor:pointer;flex:none}
.bcprofile .ck label{color:var(--fg)}
.bcprofile .bt button{padding:8px 11px;border:1px solid var(--line);background:var(--pan);color:var(--fg);font:600 13px/1 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;transition:transform .2s,box-shadow .2s,border-color .2s,background .2s,color .2s}
.bcprofile .bt button:hover{transform:translateY(-2px);border-color:var(--amb)}
.bcprofile .bt button[aria-pressed=true]{background:var(--amb);border-color:var(--amb);color:var(--ink)}
.bcprofile .bt .zp{margin-left:auto;background:transparent;border-color:var(--cy);color:var(--cy)}
.bcprofile .bt .zp:hover{border-color:var(--cy);box-shadow:0 8px 22px -8px var(--cy)}
.bcprofile .pl{flex:1 1 100%;font:600 11px/1 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.bcprofile .lg{min-width:0;background:var(--ink);border:1px solid var(--line);border-radius:6px;padding:8px 10px 9px}
.bcprofile .lh{display:flex;align-items:center;gap:10px;margin-bottom:7px;font:600 12px/1 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.bcprofile .lh b{font:500 12px/1 "DM Mono",ui-monospace,monospace;letter-spacing:0;color:var(--cy);font-variant-numeric:tabular-nums}
.bcprofile .lh .hz{color:var(--mut)}
.bcprofile .lamp{margin-left:auto;font:500 11px/1 "DM Mono",ui-monospace,monospace;letter-spacing:.06em;padding:5px 8px;border:1px solid var(--grn);color:var(--grn);white-space:nowrap}
.bcprofile .lamp::before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor;margin-right:7px}
.bcprofile .lamp[data-s=al]{border-color:var(--red);color:var(--red);animation:bcprofileBlink 1s ease-in-out infinite}
.bcprofile .lamp[data-s=wn]{border-color:var(--amb);color:var(--amb)}
.bcprofile .lamp[data-s=sg]{border-color:var(--fg);color:var(--fg)}
.bcprofile .lamp[data-s=ug]{border-color:var(--cy);color:var(--cy)}
@keyframes bcprofileBlink{50%{box-shadow:0 0 0 5px rgba(255,90,77,.22)}}
.bcprofile .lg ol{height:102px;overflow:hidden;font:400 10.5px/17px "DM Mono",ui-monospace,monospace;color:var(--mut)}
.bcprofile .lg li{display:flex;gap:8px;white-space:nowrap}
.bcprofile .lg li:first-child{color:var(--fg);animation:bcprofileLog .45s ease-out}
.bcprofile .lg time{flex:none;color:var(--cy);opacity:.8}
.bcprofile .lg li span{min-width:0;overflow:hidden;text-overflow:ellipsis}
.bcprofile .lg li.al span{color:var(--red)}
.bcprofile .lg li.wn span{color:var(--amb)}
.bcprofile .lg li.ok span{color:var(--grn)}
@keyframes bcprofileLog{from{opacity:0;transform:translateX(-10px)}}
.bcprofile .jn{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:6px}
.bcprofile .jl{font:600 11px/1 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);margin-right:4px}
.bcprofile .jn button{display:flex;align-items:baseline;gap:7px;padding:6px 10px;border:1px solid var(--line);background:var(--pan);color:var(--fg);font:600 14px/1 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;transition:border-color .2s,background .2s,color .2s,transform .2s}
.bcprofile .jn button small{font:500 10px/1 "DM Mono",ui-monospace,monospace;letter-spacing:.04em;color:var(--mut)}
.bcprofile .jn button:hover{border-color:var(--amb);transform:translateY(-2px)}
.bcprofile .jn button[aria-current=true]{background:var(--amb);border-color:var(--amb);color:var(--ink)}
.bcprofile .jn button[aria-current=true] small{color:var(--ink)}
.bcprofile .nt{flex:1 1 100%;font:400 11px/1.5 "DM Mono",ui-monospace,monospace;color:var(--mut)}
.bcprofile .fx{border-bottom:1px solid var(--line);background:rgba(9,17,29,.7)}
.bcprofile .fxi{max-width:1280px;margin-inline:auto;padding:14px 16px 16px}
.bcprofile .fx h2{font:600 12px/1.3 "DM Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--amb)}
.bcprofile .fx ul{display:grid;grid-template-columns:repeat(4,minmax(0,1fr)) minmax(0,2fr);gap:10px 18px;margin-top:10px}
.bcprofile .fx li{border-left:2px solid var(--line);padding-left:11px;font-size:14px;line-height:1.35;color:var(--mut)}
.bcprofile .fx li b{display:block;font:700 26px/1.05 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.02em;color:var(--fg);white-space:nowrap}
.bcprofile .main{padding-top:30px}
.bcprofile section.sec{padding-block:26px 28px;scroll-margin-top:calc(var(--bcprofile-pin,400px) + 18px)}
.bcprofile .np{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;padding:12px 40px 12px 14px;margin-bottom:18px;background:linear-gradient(var(--pan2),var(--pan));border:1px solid var(--line);border-left:4px solid var(--line);transition:border-color .4s,opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
.bcprofile .np::after{content:"";position:absolute;right:14px;top:50%;width:9px;height:9px;margin-top:-4.5px;border-radius:50%;background:var(--line);transition:background .4s,box-shadow .4s}
.bcprofile .np.on{border-left-color:var(--amb)}
.bcprofile .np.on::after{background:var(--amb);box-shadow:0 0 12px 2px var(--amb)}
.bcprofile .no{font:500 12px/1 "DM Mono",ui-monospace,monospace;letter-spacing:.1em;background:var(--amb);color:var(--ink);padding:6px 8px;white-space:nowrap}
.bcprofile .np h2{font:700 clamp(34px,5.4vw,58px)/.95 "Barlow Condensed","Arial Narrow",sans-serif;text-transform:uppercase}
.bcprofile .st{margin-left:auto;text-align:right;font:500 13px/1.35 "DM Mono",ui-monospace,monospace;letter-spacing:.05em;color:var(--mut)}
.bcprofile .st b{font-weight:500;color:var(--cy);text-transform:uppercase}
.bcprofile h3{font:600 23px/1.15 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.01em}
.bcprofile .bd small{display:block;font:500 11px/1.4 "DM Mono",ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--cy);margin-bottom:6px}
.bcprofile .bd article,.bcprofile .edu li,.bcprofile .sk>div,.bcprofile .off li{background:var(--card);border:1px solid var(--line);padding:20px;transition:transform .25s,border-color .25s,box-shadow .25s}
.bcprofile .bd article:hover,.bcprofile .edu li:hover,.bcprofile .sk>div:hover,.bcprofile .off li:hover{transform:translateY(-4px);border-color:var(--amb);box-shadow:0 16px 30px -20px var(--amb)}
.bcprofile .cols{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:26px;align-items:start}
.bcprofile .cols p+p{margin-top:14px}
.bcprofile .edu{display:grid;gap:12px;color:var(--mut);font-size:16px}
.bcprofile .edu h3{color:var(--fg)}
.bcprofile .edu li{border-top:2px solid var(--cy)}
.bcprofile .xp{display:grid;gap:14px}
.bcprofile .xp article>p{font-weight:600;color:var(--amb)}
.bcprofile .xp ul{margin-top:10px;display:grid;gap:6px;font-size:16px;color:var(--mut)}
.bcprofile .xp li{position:relative;padding-left:18px}
.bcprofile .xp li::before{content:"";position:absolute;left:0;top:.74em;width:9px;height:2px;background:var(--amb)}
.bcprofile .aw{margin-top:14px;padding:12px 16px;border:1px dashed var(--amb);color:var(--amb);font-size:15px}
.bcprofile .pg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.bcprofile .pg article{border-top:2px solid var(--amb)}
.bcprofile .pg p{margin-top:8px;font-size:16px;color:var(--mut)}
.bcprofile .sk{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;align-items:start}
.bcprofile .sk>div{border-top:2px solid var(--cy)}
.bcprofile .tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.bcprofile .tags li{font:400 12px/1.2 "DM Mono",ui-monospace,monospace;border:1px solid var(--line);background:var(--ink);padding:5px 8px;transition:border-color .2s,color .2s}
.bcprofile .tags li:hover{border-color:var(--cy);color:var(--cy)}
.bcprofile .off{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}
.bcprofile .off li{border-left:3px solid var(--amb)}
.bcprofile .off b{display:none}
.bcprofile .off span{display:block;margin-top:2px;font-size:15px;color:var(--mut)}
.bcprofile .ct{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:16px}
.bcprofile .em{flex:1 1 100%;font:500 clamp(18px,4.2vw,40px)/1.2 "DM Mono",ui-monospace,monospace;color:var(--amb);overflow-wrap:anywhere}
.bcprofile .cp,.bcprofile .li{display:inline-block;border:1px solid var(--amb);background:var(--amb);color:var(--ink);padding:11px 16px;text-decoration:none;font:600 15px/1 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.12em;text-transform:uppercase;transition:transform .2s,box-shadow .2s}
.bcprofile .li{background:transparent;border-color:var(--cy);color:var(--cy)}
.bcprofile .cp:hover,.bcprofile .li:hover{transform:translateY(-3px);box-shadow:0 10px 24px -10px currentColor}
.bcprofile .cp:hover{box-shadow:0 10px 24px -10px var(--amb)}
.bcprofile .ft{margin-top:34px;padding-top:16px;border-top:1px solid var(--line);font:400 12px/1.6 "DM Mono",ui-monospace,monospace;color:var(--mut)}
@media (min-width:1100px){
.bcprofile .ci{grid-template-columns:minmax(0,410px) minmax(0,1fr) minmax(0,320px)}
.bcprofile .gs{grid-column:auto}
}
@media (min-width:1340px){
.bcprofile .cs{grid-template-columns:repeat(4,minmax(0,1fr))}
}
@media (min-width:1100px) and (min-height:900px){
.bcprofile{--sh:clamp(210px,27vh,320px)}
.bcprofile .con{position:sticky;top:calc(var(--bcprofile-top,46px) + var(--bcprofile-ph,330px) - 1px)}
.bcprofile .con::after{display:block}
.bcprofile .pin::after,.bcprofile .hud{display:none}
}
@media (max-width:1000px){
.bcprofile .fx ul{grid-template-columns:repeat(2,minmax(0,1fr))}
.bcprofile .fx li:last-child{grid-column:1/-1}
}
@media (max-width:820px){
.bcprofile{--sh:clamp(170px,30vh,250px)}
.bcprofile .ci,.bcprofile .cols,.bcprofile .pg,.bcprofile .sk{grid-template-columns:minmax(0,1fr)}
.bcprofile .c1 .nx,.bcprofile .cf .xt{display:none}
.bcprofile .cf{font-size:13px;height:calc(3*1.38em);-webkit-line-clamp:3}
.bcprofile .cpi{padding:7px 12px 8px}
.bcprofile .st{margin-left:0;text-align:left;flex-basis:100%}
.bcprofile .who b{font-size:16px}
.bcprofile .who span{font-size:9.5px;letter-spacing:0}
.bcprofile .who{padding:6px 9px 7px}
}
@media (max-width:820px) and (max-height:500px){
.bcprofile{--sh:34vh}
.bcprofile .cf{height:1.38em;-webkit-line-clamp:1}
.bcprofile .who span{display:none}
}
@media (max-width:520px){
.bcprofile .gs{grid-template-columns:repeat(2,minmax(0,1fr))}
.bcprofile .ci{padding:12px}
.bcprofile .bd article,.bcprofile .edu li,.bcprofile .sk>div,.bcprofile .off li{padding:16px}
.bcprofile .np{padding-right:34px}
.bcprofile .bt .zp{margin-left:0}
.bcprofile .fx li b{font-size:23px}
.bcprofile .hud{left:8px;right:8px;bottom:6px;gap:4px;font-size:10.5px;flex-wrap:nowrap}
.bcprofile .hud span{padding:5px 6px}
.bcprofile .hud span:nth-child(2),.bcprofile .hud span:nth-child(3){display:none}
}
@media (max-height:500px){
.bcprofile{--sh:clamp(120px,42vh,200px)}
.bcprofile .cf{display:none}
.bcprofile .cpi{padding:5px 12px 6px}
}
@media (pointer:coarse){
.bcprofile .fd input[type=range]{height:38px}
.bcprofile .fd input[type=range]::-webkit-slider-thumb{width:26px;height:26px;margin-top:-9px}
.bcprofile .fd input[type=range]::-moz-range-thumb{width:22px;height:22px}
.bcprofile button{min-height:42px}
.bcprofile .ck input{width:26px;height:26px}
}
`,
html(P,U){
  const tc=tcOf(40,15),sag=sagOf(tc,0),mc=minClr(0,sag)[0],S=STOPS;
  return `
<header class="w hero">
<p class="ey">${P.role} · ${P.spec} · ${P.loc}</p>
<h1>${U.split(P.name)}</h1>
<p class="tg">${P.tag}</p>
<p class="cue">Scroll to ride seven real stops on the BC Hydro system, north to south. Tap or click the sky for a lightning strike.</p>
</header>
<div class="pin">
<div class="scene"><canvas aria-hidden="true"></canvas>
<div class="who"><b>${P.name}</b><span>${P.role} · ${P.spec}</span></div>
<div class="hud" aria-hidden="true"><span id="bcprofile-h-kv">500 kV</span><span id="bcprofile-h-load">LOAD 40%</span><span id="bcprofile-h-temp">${Math.round(tc)} °C</span><span id="bcprofile-h-sag">SAG ${sag.toFixed(1)} m</span><span id="bcprofile-h-clr">CLR ${mc.toFixed(1)} m</span><span id="bcprofile-h-el">ELEV 412 m</span></div>
</div>
<div class="cap" id="bcprofile-cap"><div class="cpi">
<p class="c1"><span class="cno" id="bcprofile-c-no">STOP 1/${NS}</span><b id="bcprofile-c-n">${S[0].s}</b><span class="cl" id="bcprofile-c-l">${S[0].l}</span><span class="nx" id="bcprofile-c-x">Next stop: ${S[1].n}</span></p>
<p class="cf"><span id="bcprofile-c-f">${S[0].f}</span><span class="xt" id="bcprofile-c-e"> ${S[0].x}</span></p>
</div></div>
</div>
<section class="con" aria-label="Line model console"><div class="ci">
<div class="gs">
${gauge('load','Line load',0,100,[[80,95,'za'],[95,100,'zr']],'40 %')}
${gauge('temp','Conductor temp',-30,100,[[60,75,'za'],[75,100,'zr']],Math.round(tc)+' °C')}
${gauge('sag','Sag',0,20,[[12,20,'za']],sag.toFixed(1)+' m')}
${gauge('clr','Ground clearance',0,25,[[0,MINC,'zr']],mc.toFixed(1)+' m')}
</div>
<div class="cs" role="group" aria-label="Line conditions">
<div class="fd"><div class="lb"><label for="bcprofile-load">Line load</label><output id="bcprofile-o-load" for="bcprofile-load">40%</output></div><input type="range" id="bcprofile-load" min="0" max="100" step="1" value="40"></div>
<div class="fd"><div class="lb"><label for="bcprofile-amb">Ambient</label><output id="bcprofile-o-amb" for="bcprofile-amb">15 °C</output></div><input type="range" id="bcprofile-amb" min="-30" max="40" step="1" value="15"></div>
<div class="fd"><div class="lb"><label for="bcprofile-wind">Wind</label><output id="bcprofile-o-wind" for="bcprofile-wind">20 km/h</output></div><input type="range" id="bcprofile-wind" min="0" max="100" step="1" value="20"></div>
<div class="fd"><div class="lb"><label for="bcprofile-time">Day to midnight</label></div><input type="range" id="bcprofile-time" min="0" max="100" step="1" value="50"></div>
<div class="bt" role="group" aria-label="Weather presets"><span class="pl">BC weather presets</span>
<button type="button" id="bcprofile-p-heat" data-p="heat" aria-pressed="false">Heat dome (June 2021)</button>
<button type="button" id="bcprofile-p-river" data-p="river" aria-pressed="false">Atmospheric river (Nov 2021)</button>
<button type="button" id="bcprofile-p-arctic" data-p="arctic" aria-pressed="false">Arctic outflow</button>
<button type="button" id="bcprofile-p-clear" data-p="clear" aria-pressed="true">Clear evening</button></div>
<div class="bt"><div class="fd ck"><input type="checkbox" id="bcprofile-ice"><label for="bcprofile-ice">Ice load</label></div>
<button type="button" class="zp" id="bcprofile-strike">Lightning strike</button></div>
</div>
<div class="lg"><div class="lh"><span>Event log</span><b id="bcprofile-clock">T+00:00</b><b class="hz">60 Hz</b><span class="lamp" id="bcprofile-st" role="status" data-s="ok">NORMAL</span></div>
<ol id="bcprofile-log" aria-label="Event log, newest first"></ol></div>
<nav class="jn" aria-label="Sections"><span class="jl">Stops on the system</span>${P.nav.map((n,i)=>`<button type="button" data-go="${n[1]}"><small>${S[i+1].s}</small>${n[0]}</button>`).join('')}
<p class="nt">The ${MINC} m clearance line is an illustrative limit. Real clearances are set by CSA C22.3 No. 1, Overhead systems.</p></nav>
</div></section>
<aside class="fx" aria-label="System facts"><div class="fxi">
<h2>The system these stops sit on, in BC Hydro's public figures</h2>
<ul>${FACTS.map(f=>`<li><b>${f[0]}</b>${f[1]}</li>`).join('')}</ul>
</div></aside>
<div class="w main">
${P.nav.map((n,i)=>`<section id="s-${n[1]}" class="sec"><header class="np rv"><span class="no">STOP ${i+2}/${NS}</span><h2>${n[0]}</h2><p class="st"><b>${S[i+1].n}</b> · ${S[i+1].l}</p><p class="vh">${S[i+1].f}</p></header><div class="bd rv" style="--i:1">${U.sec(P,n[1])}</div></section>`).join('')}
<footer class="ft"><p>Personal portfolio. Not a BC Hydro publication. Scene and sliders are an illustrative model, not design values; stops are real places, routes are simplified. Ground elevation follows the real route profile, compressed to fit: route from BC Transmission Lines, Province of British Columbia (contains information licensed under the Open Government Licence – British Columbia), heights from NASA SRTM.</p></footer>
</div>`},
mount(root,U,P){
  /* slider fill: paint the track up to the thumb, and shift from cool to hot as the value rises */
  const rng=[...root.querySelectorAll('.fd input[type=range]')],tint=p=>p<.5?'#58d8ff':p<.8?'#ffc24d':'#ff5a4d';
  const paintRng=()=>rng.forEach(r=>{if(r._v===r.value)return;r._v=r.value;const mn=+r.min||0,mx=r.max===''?100:+r.max,p=mx>mn?(r.value-mn)/(mx-mn):0;r.style.setProperty('--p',(p*100).toFixed(1)+'%');r.style.setProperty('--c',tint(p))});
  rng.forEach(r=>U.on(r,'input',paintRng));U.raf(paintRng);paintRng();
  /* generated scene art: one far panorama per stop, the Site C dam, trees and clouds. Each piece falls back to the drawn shapes until its image has loaded.
     tinted() returns the image darkened for the current night and weather level, cached per level so nothing is recomposited per frame. */
  const DY=[[52,122,204],[98,166,226],[156,204,240],[216,234,247]];
  const ART={},PK=[.46,.34,.44,.76,.56,.44,.42],TK=[[0,3],[0,1],[1,1],[2,2]],SINK=.3,OV=.12,VAR=[0,1,2,3,4,5].map(i=>['pano-'+i,'pano-'+i+'b','pano-'+i+'c','pano-'+i+'d'].filter(n=>n!=='pano-4b')),wipeCv=document.createElement('canvas');
  ['pano-0','pano-1','pano-2','pano-3','pano-4','pano-5'].reduce((a,n)=>a.concat([n,n+'b',n+'c',n+'d']),[]).filter(n=>n!=='pano-4b').concat(['pano-6','dam','tree-0','tree-1','tree-2','tree-3','cloud-0','cloud-1','cloud-2']).forEach(n=>{const im=new Image();im.src='art/'+n+'.webp';ART[n]={im:im,cv:null,key:''}});
  const artOk=n=>{const a=ART[n];return !!a&&a.im.complete&&a.im.naturalWidth>0};
  /* subtle life per stop: fireflies on the Nicola grassland, snow glint at Ruby Creek, house and tower lights from Coquitlam to downtown.
     Light positions are sampled once from each panorama (dark building pixels, bright snow pixels, or window holes) so they sit on the artwork. */
  const LS={2:{n:16,y0:.55,y1:.97,t:'any',col:'216,255,154'},3:{n:26,y0:0,y1:.45,t:'bright',l:520,col:'255,255,255'},4:{n:30,y0:.62,y1:.98,t:'dark',l:240,col:'255,214,138'},5:{n:60,y0:.08,y1:.8,t:'dark',l:230,col:'255,214,138'},6:{n:170,y0:.08,y1:.97,t:'hole',col:'255,214,138'}},LG={};
  const getLights=(nm,i)=>{if(LG[nm]!==undefined)return LG[nm];const sp=LS[i];if(!sp)return LG[nm]=null;
    try{const im=ART[nm].im,cw=sp.t==='hole'?550:220,ch=Math.round(cw*im.naturalHeight/im.naturalWidth),cs=document.createElement('canvas');cs.width=cw;cs.height=ch;
      const g=cs.getContext('2d');g.drawImage(im,0,0,cw,ch);const px=g.getImageData(0,0,cw,ch).data,out=[],A=(xx,yy)=>xx<0||yy<0||xx>=cw||yy>=ch?0:px[(yy*cw+xx)*4+3],sd=nm.length*7+nm.charCodeAt(nm.length-1);
      for(let t=1;out.length<sp.n*3&&t<sp.n*90;t++){const u=rnd(t*1.37+sd*31),v=sp.y0+(sp.y1-sp.y0)*(1-SINK*(i===6?0:1))*rnd(t*2.11+sd*17),xx=Math.floor(u*cw),yy=Math.floor(v*ch),o=(yy*cw+xx)*4,lum=px[o]+px[o+1]+px[o+2];
        if(sp.t==='hole'){if(A(xx,yy)>90||A(xx,yy-5)<200||A(xx,yy+5)<200||A(xx-5,yy)<200||A(xx+5,yy)<200)continue}
        else{if(px[o+3]<200)continue;if(sp.t==='dark'&&lum>sp.l)continue;if(sp.t==='bright'&&lum<sp.l)continue}
        out.push(u,v,rnd(t*3.3+sd))}
      return LG[nm]=out}catch(e){return LG[nm]=null}};
  const tinted=(n,a1,a2)=>{const a=ART[n],q1=Math.min(8,Math.round(a1*10)),q2=Math.min(8,Math.round(a2*10)),key=q1+'|'+q2;
    if(a.key!==key||!a.cv){const cv2=a.cv||(a.cv=document.createElement('canvas'));cv2.width=a.im.naturalWidth;cv2.height=a.im.naturalHeight;const g=cv2.getContext('2d');
      g.globalCompositeOperation='source-over';g.clearRect(0,0,cv2.width,cv2.height);g.drawImage(a.im,0,0);g.globalCompositeOperation='source-atop';
      if(q1){g.fillStyle='rgba(7,13,25,'+(q1/10)+')';g.fillRect(0,0,cv2.width,cv2.height)}if(q2){g.fillStyle='rgba(15,18,26,'+(q2/10)+')';g.fillRect(0,0,cv2.width,cv2.height)}
      a.key=key}
    return a.cv};
  const q=s=>root.querySelector(s),qa=s=>[...root.querySelectorAll(s)];
  const pin=q('.pin'),scene=q('.scene'),cv=q('.scene canvas'),con=q('.con'),who=q('.who'),cap=q('#bcprofile-cap'),s=U.fit(cv),x=s.ctx;
  const names=['Start'].concat(P.nav.map(n=>n[0]));
  const secs=qa('section.sec'),nps=qa('.np'),jbs=qa('.jn button'),pbs=qa('button[data-p]');
  const inL=q('#bcprofile-load'),inA=q('#bcprofile-amb'),inW=q('#bcprofile-wind'),inI=q('#bcprofile-ice'),inN=q('#bcprofile-time');
  const bStrike=q('#bcprofile-strike'),logEl=q('#bcprofile-log'),lamp=q('#bcprofile-st'),gClr=q('#bcprofile-g-clr'),gSag=q('#bcprofile-g-sag');
  const el={};['v-load','v-temp','v-sag','v-clr','h-kv','h-load','h-temp','h-sag','h-clr','h-el','o-load','o-amb','o-wind','clock','c-no','c-n','c-l','c-x','c-f','c-e'].forEach(k=>{el[k]=q('#bcprofile-'+k)});
  const seen={},put=(k,v)=>{if(seen[k]!==v){seen[k]=v;el[k].textContent=v}};
  const T0=performance.now(),clock=()=>(performance.now()-T0)/1000;
  const stars=Array.from({length:90},()=>[Math.random(),Math.random()*.6,Math.random()*1.3+.4]);

  /* state */
  let load=+inL.value,amb=+inA.value,wind=+inW.value,ice=inI.checked,night=Math.max(0,inN.value/50-1),day=Math.max(0,1-inN.value/50),rain=false,preset='clear';
  let Tc=tcOf(load,amb),iceK=ice?1:0,windC=wind,nightC=night,dayC=day,curr=load/100,gloomK=0,rainK=0,heatK=0,snowK=0;
  let cam=0,tgt=0,active=-1,sx=1.2,sy=3.5,pinH=400,phase=0,chipW=240,chipH=52;
  let brk=0,recloseAt=0,surgeUntil=0,bolt=null;
  let badVis=null,badLog=false,badSince=-1,band=(load>=95)+(load>=80)+(load>=50),hot=tcOf(load,amb)>=75,windHi=wind>=70,evalAt=-1,stSeen='',ugSeen=null;
  const G=[{k:'load',min:0,max:100},{k:'temp',min:-30,max:100},{k:'sag',min:0,max:20},{k:'clr',min:0,max:25}];
  G.forEach(g=>{g.el=q('#bcprofile-n-'+g.k);g.v=g.min;g.vel=0;g.a=null});

  /* event log */
  const logs=[];
  const fmt=t=>{t=Math.max(0,Math.floor(t));return 'T+'+String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};
  const log=(m,lv)=>{logs.unshift({t:fmt(clock()),m:m,l:lv||''});if(logs.length>6)logs.length=6;
    logEl.innerHTML=logs.map(e=>'<li'+(e.l?' class="'+e.l+'"':'')+'><time>'+e.t+'</time><span>'+e.m+'</span></li>').join('')};

  /* active stop: nav state, section nameplates and the caption strip */
  const setActive=a=>{const first=active<0;active=a;const S=STOPS[a];
    jbs.forEach((b,i)=>{if(i===a-1)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
    nps.forEach((n,i)=>n.classList.toggle('on',i===a-1));
    put('c-no','STOP '+(a+1)+'/'+NS);put('c-l',S.l);put('c-f',S.f);put('c-e',S.x?' '+S.x:'');
    put('c-x',a<NS-1?'Next stop: '+STOPS[a+1].n:'Last stop on the tour');
    if(first){put('c-n',S.s);return}
    seen['c-n']=S.s;U.flap(el['c-n'],S.s);
    cap.classList.remove('sw');void cap.offsetWidth;cap.classList.add('sw');
    log('STOP '+(a+1)+'/'+NS+': '+S.n.toUpperCase())};

  /* scroll position -> camera target; stop k is centred when section k sits just under the pinned block */
  const measure=()=>{const bar=document.querySelector('.bar'),top=bar?Math.floor(bar.getBoundingClientRect().height):46;
    root.style.setProperty('--bcprofile-top',top+'px');
    const ph=pin.offsetHeight;root.style.setProperty('--bcprofile-ph',ph+'px');
    pinH=top+ph+(getComputedStyle(con).position==='sticky'?con.offsetHeight:0);
    root.style.setProperty('--bcprofile-pin',pinH+'px');
    chipW=who.offsetLeft+who.offsetWidth+10;chipH=who.offsetTop+who.offsetHeight+6};
  const track=()=>{const sY=window.scrollY||0,max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),A=[0];let prev=0;
    secs.forEach((e,k)=>{let a=e.getBoundingClientRect().top+sY-pinH-18;a=Math.min(a,max-(secs.length-1-k)*2);a=Math.max(a,prev+1);A.push(a);prev=a});
    let k=0;while(k<A.length-2&&sY>=A[k+1])k++;
    const f=clamp((sY-A[k])/(A[k+1]-A[k]),0,1);
    tgt=(k+sm((f-.1)/.8))*SD};

  const strike=wx=>{const c=clock();
    if(wx==null){const half=s.w/2/sx,base=active*3,o=[base];
      if(SP<half-24){o.push(base-1,base+1)}
      const i=o[Math.random()*o.length|0];wx=active>=NS-1?cam+(Math.random()-.5)*260:clamp(i,0,NTW-1)*SP+(Math.random()-.5)*170}
    const ug=wx>UGX+150,i=clamp(Math.round(wx/SP),0,NTW-1),tx=ug?wx+(Math.random()-.5)*60:i*SP,n=10,main=[[wx,0]];
    for(let k=1;k<n;k++){const a=k/n;main.push([wx+(tx-wx)*a+(Math.random()-.5)*42*(1-a*.6),a])}
    main.push([tx,1]);
    const b0=main[3+(Math.random()*3|0)],dir=Math.random()<.5?-1:1,br=[b0];
    for(let k=1;k<5;k++)br.push([b0[0]+dir*k*13+(Math.random()-.5)*11,b0[1]+k*.06]);
    bolt={p:[main,br],t0:c,i:i,ug:ug,tx:tx};
    if(ug){log('LIGHTNING DOWNTOWN: CABLE UNAFFECTED','wn')}
    else{log('LIGHTNING STRIKE: STRUCTURE '+(i+1),'al');
      if(brk!==1){brk=1;log('BREAKER TRIP','al')}
      recloseAt=c+.9}
    if(U.reduced){frame(0,0);[480,940,2450].forEach(ms=>U.later(ms,()=>frame(0,0)))}};

  const tag=(txt,px,py,col,al)=>{x.font='500 11px '+FM;const tw=x.measureText(txt).width;
    let bx=al==='c'?px-tw/2:al==='r'?px-tw:px;bx=clamp(bx,6,Math.max(6,s.w-tw-6));
    x.fillStyle='rgba(5,10,18,.86)';x.fillRect(bx-4,py-8,tw+8,16);
    x.fillStyle=col;x.textAlign='left';x.textBaseline='middle';x.fillText(txt,bx,py+.5)};
  const dim=(px,y1,y2,col,txt,al)=>{const d=y2>y1?1:-1;
    x.strokeStyle=col;x.fillStyle=col;x.lineWidth=1.4;x.shadowColor=col;x.shadowBlur=9;x.beginPath();
    x.moveTo(px-6,y1);x.lineTo(px+6,y1);x.moveTo(px-6,y2);x.lineTo(px+6,y2);x.moveTo(px,y1);x.lineTo(px,y2);x.stroke();
    if(Math.abs(y2-y1)>18){x.beginPath();x.moveTo(px,y1);x.lineTo(px-3.5,y1+d*7);x.lineTo(px+3.5,y1+d*7);x.closePath();
      x.moveTo(px,y2);x.lineTo(px-3.5,y2-d*7);x.lineTo(px+3.5,y2-d*7);x.closePath();x.fill()}
    x.shadowBlur=0;tag(txt,al==='r'?px-11:px+11,(y1+y2)/2,col,al)};
  /* ridge profile: smooth rolling hills blended towards sharp ridged peaks by jag */
  const rn=(u,jag)=>{const a=.5+.5*(Math.sin(u*3.1)+.6*Math.sin(u*7.3+1)+.3*Math.sin(u*15.7+2))/1.9;if(jag<.01)return a;
    const b=(1-Math.abs(Math.sin(u*4.3+.4)))*.62+(1-Math.abs(Math.sin(u*10.9+1.7)))*.38;return a+(b*b*1.15-a)*jag};

  function frame(_,dt){
    const w=s.w,h=s.h;if(w<20||h<20)return;
    dt=dt||0;const c=clock(),live=!U.reduced,ez=r=>live?1-Math.exp(-dt*r):1;

    /* breaker sequence */
    if(brk===1&&c>=recloseAt){brk=2;surgeUntil=c+1.4;log('AUTO-RECLOSE OK','ok')}
    else if(brk===2&&c>=surgeUntil){brk=0;log('SUPPLY RESTORED','ok')}

    /* coupled model */
    const tcT=tcOf(load,amb);
    cam+=(tgt-cam)*ez(6);if(Math.abs(tgt-cam)<.05)cam=tgt;
    Tc+=(tcT-Tc)*ez(1.8);iceK+=((ice?1:0)-iceK)*ez(4);windC+=(wind-windC)*ez(4);nightC+=(night-nightC)*ez(5);dayC+=(day-dayC)*ez(5);
    gloomK+=((rain?1:ice&&amb<-5?.4:0)-gloomK)*ez(1.6);rainK+=((rain?1:0)-rainK)*ez(1.6);heatK+=(clamp((amb-30)/10,0,1)-heatK)*ez(1.6);snowK+=((ice&&amb<0?1:0)-snowK)*ez(1.2);
    curr+=((brk===1?0:load/100)-curr)*ez(7);
    const sag=sagOf(Tc,iceK);
    sx=clamp(w/600,.7,1.9);sy=clamp((h-BOT-chipH-30)/(P5+2-E0),1.6,5.6);
    const a=clamp(Math.round(cam/SD),0,NS-1);if(a!==active)setActive(a);
    const camE=gbase(cam),BD=gbase(5400),X=wx=>w/2+(wx-cam)*sx,Y=e=>h-BOT-(e-E0-camE)*sy,wl=cam-w/2/sx,wr=cam+w/2/sx,u1=sy;
    const dark=Math.max(nightC,gloomK*.8);
    const gA=live?windC/100*1.9:0;
    const gal=(n,u)=>gA*(.7*Math.sin(Math.PI*u)*Math.sin(c*2.1+n*1.7)+.45*Math.sin(2*Math.PI*u)*Math.sin(c*3.3+n));
    const ug=cam>UGX+150,cs=clamp(Math.round((cam-SP/2)/SP),0,NTW-2);

    /* sky, aurora, stars, moon */
    x.setLineDash([]);x.globalAlpha=1;x.shadowBlur=0;x.lineCap='butt';x.lineJoin='round';
    const gy0=h-BOT+E0*sy+14,sk=x.createLinearGradient(0,0,0,gy0);
    GS.forEach((p,i)=>sk.addColorStop(p,rgb(mix(mix(mix(DK[i],DY[i],dayC),NT[i],nightC),ST[i],gloomK*.85))));
    x.fillStyle=sk;x.fillRect(0,0,w,h);
    const aur=rg(AU,cam)*nightC*(1-gloomK);
    if(aur>.02){const tt=live?c:0;
      for(let b=0;b<2;b++){const y0=gy0*(.1+b*.1),hh=gy0*(.34-b*.06),ag=x.createLinearGradient(0,y0-gy0*.05,0,y0+hh+gy0*.08);
        ag.addColorStop(0,'rgba(120,255,190,0)');ag.addColorStop(.62,b?'rgba(110,235,255,.5)':'rgba(96,255,170,.6)');ag.addColorStop(1,'rgba(96,255,170,0)');
        x.globalAlpha=clamp(aur*(b?.34:.5),0,1);x.fillStyle=ag;x.beginPath();
        for(let i=0;i<=w+12;i+=12){const yy=y0+gy0*.045*Math.sin(i/110+tt*.22+b*2)+gy0*.03*Math.sin(i/47-tt*.31+b);i?x.lineTo(i,yy):x.moveTo(i,yy)}
        for(let i=w+12;i>=0;i-=12)x.lineTo(i,y0+hh+gy0*.06*Math.sin(i/90+tt*.27+b*1.3)+gy0*.03*Math.sin(i/31+tt*.4));
        x.closePath();x.fill()}
      x.globalAlpha=1}
    x.fillStyle='#ffffff';
    for(const st of stars){x.globalAlpha=clamp((.3+.3*Math.sin(c*1.6*(live?1:0)+st[0]*40))*(1+nightC*1.3)*(1-gloomK)*(1-dayC),0,1);
      x.fillRect((((st[0]*w-cam*.01)%w)+w)%w,st[1]*gy0,st[2],st[2])}
    x.globalAlpha=1;
    if(nightC>.05){x.globalAlpha=clamp(nightC*(1-gloomK)*.92,0,1);x.fillStyle='#e3ecff';x.shadowColor='#bcd3ff';x.shadowBlur=26;
      x.beginPath();x.arc(w*.84-cam*.004,Math.max(22,gy0*.2),Math.min(11,h*.035),0,7);x.fill();x.shadowBlur=0;x.globalAlpha=1}

    if(dayC>.03){const sxp=w*.78-cam*.004,syp=Math.max(26,gy0*(.16+.5*(1-dayC))),sr=Math.min(15,h*.05);x.globalAlpha=clamp(dayC*(1-gloomK*.8),0,1);
      const sg2=x.createRadialGradient(sxp,syp,sr*.4,sxp,syp,sr*5);sg2.addColorStop(0,'rgba(255,246,214,.55)');sg2.addColorStop(1,'rgba(255,246,214,0)');x.fillStyle=sg2;x.fillRect(sxp-sr*5,syp-sr*5,sr*10,sr*10);
      x.fillStyle='#fff7dc';x.beginPath();x.arc(sxp,syp,sr,0,7);x.fill();x.globalAlpha=1}
    /* life in the sky: drifting clouds, a shooting star on clear nights, an aircraft on approach near Vancouver */
    {const ca=(.1+.1*gloomK)*(1-nightC*.55),tt=live?c:0;x.fillStyle='rgba(206,220,240,'+ca+')';
      for(let k=0;k<5;k++){const span=w+360,cx=(((rnd(k+700)*span+tt*(4+rnd(k+710)*5+windC*.12)-cam*sx*.03)%span)+span)%span-180,cy=gy0*(.12+rnd(k+720)*.3),cw=70+rnd(k+730)*90,chh=7+rnd(k+740)*8;
        if(artOk('cloud-'+(k%3))){const ci=ART['cloud-'+(k%3)].im,cw2=cw*1.7,ch2=cw2*ci.naturalHeight/ci.naturalWidth;x.globalAlpha=clamp((.34+.3*gloomK+.5*dayC)*(1-nightC*.6),0,1);x.drawImage(ci,cx-cw2/2,cy-ch2/2,cw2,ch2);x.globalAlpha=1;continue}
        for(let m=0;m<4;m++){const r=cw*(.22+.1*rnd(k*9+m+750));x.beginPath();x.ellipse(cx+(m-1.5)*cw*.3,cy-(m%2)*chh*.5,r,chh*(.8+.4*rnd(k+m+760)),0,0,7);x.fill()}}}
    if(live&&nightC>.5&&gloomK<.3){const T=9,ph=(c%T)/T;if(ph<.07){const k=Math.floor(c/T),u=ph/.07,ax=w*(.15+rnd(k+800)*.6)+140*u,ay=gy0*(.08+rnd(k+810)*.25)+46*u;
      const tg=x.createLinearGradient(ax-60,ay-20,ax,ay);tg.addColorStop(0,'rgba(255,255,255,0)');tg.addColorStop(1,'rgba(255,255,255,'+(.9*(1-u))+')');x.strokeStyle=tg;x.lineWidth=1.6;x.beginPath();x.moveTo(ax-60,ay-20);x.lineTo(ax,ay);x.stroke()}}
    if(live&&cam>2900&&gloomK<.6){const T=26,u=(c%T)/T,px=w*1.1-u*w*1.25,py=gy0*(.16+.05*Math.sin(u*3));x.fillStyle='rgba(220,230,245,'+(.5+.3*(1-nightC))+')';x.fillRect(px,py,9,1.6);x.fillRect(px+5,py-2.4,2,2.4);
      if(Math.sin(c*7)>.2){x.fillStyle='#ff4b3e';x.shadowColor='#ff4b3e';x.shadowBlur=8;x.beginPath();x.arc(px,py+.8,1.5,0,7);x.fill();x.shadowBlur=0}}

    /* parallax ridges: shape, height and colour blend between stops; the far ridge grows the Lions near downtown */
    const shade=cl=>rgb(mix(mix(mix(cl,[92,128,138],dayC*.5),[9,17,30],nightC*.82),[15,18,26],gloomK*.75));
    const lions=sm((cam-4350)/800),snow=rg(SN,cam),Lx=w*.33+(5400-cam)*sx*.1,Lk=clamp(h/300,.6,1.3);
    const ridge=(base,amp,wl2,par,jag,col,far)=>{const tops=far&&snow>.03?[]:null;x.beginPath();x.moveTo(0,h);
      for(let i=0;i<=w+6;i+=6){const v=rn((i+cam*sx*par)/wl2,jag);let yy=base-amp*v;
        if(far&&lions>.01){const d1=Math.max(0,1-Math.abs(i-Lx+15*Lk)/(19*Lk)),d2=Math.max(0,1-Math.abs(i-Lx-15*Lk)/(21*Lk)),bp=Math.pow(d1,1.5)+.9*Math.pow(d2,1.5),hump=Math.max(0,1-Math.abs(i-Lx)/(90*Lk));
          yy=Math.min(yy,base-amp*.62)*lions*hump+yy*(1-lions*hump)-lions*h*.1*bp;if(tops&&bp>.25)tops.push(i,yy,1)}
        if(tops&&v>.74)tops.push(i,yy,v);
        x.lineTo(i,yy)}
      x.lineTo(w+6,h);x.fillStyle=col;x.fill();
      if(tops&&tops.length){x.strokeStyle='rgba(214,228,246,'+(snow*(.55-.3*nightC))+')';x.lineWidth=1.6;x.beginPath();let lp=-99;
        for(let k=0;k<tops.length;k+=3){const px=tops[k],py=tops[k+1]+1;px-lp>7?x.moveTo(px,py):x.lineTo(px,py);lp=px}x.stroke()}};
    let artFar=false;
    {const pp=clamp(cam/SD,0,NS-1.000001),pi=Math.floor(pp),pf=sm(pp-pi),na=nightC*.72,ga=gloomK*.6;
      if(artOk('pano-'+pi)&&artOk('pano-'+Math.min(5,pi+1))&&(pi<5||(artOk('pano-5')&&artOk('pano-6')))){artFar=true;
        /* far background: each region is a run of unique panoramas laid edge to edge. Every tile's left edge is feathered over its neighbour, so there is no seam and nothing is mirrored.
           The next region wipes in from the direction of travel through a soft gradient, instead of dissolving over the whole sky. */
        const tt2=live?c:0,base=gy0+h*.06;
        for(const nm in ART){if(nm.charCodeAt(0)!==112)continue;const ri=+nm.charAt(5);if(ri!==pi&&ri!==pi+1&&!(pi+1===6&&ri===5)&&ART[nm].cv){ART[nm].cv=null;ART[nm].key=''}}
        const lights=(g,nm,i,x0,PW,top,PH)=>{const L=getLights(nm,i);if(!L||!L.length)return;const sp=LS[i],soft=i===2||i===3,sz=i===6?Math.max(1.6,PW*.0062):soft?1.7:2.2;g.fillStyle='rgb('+sp.col+')';
          for(let k=0;k<L.length;k+=3){const r=L[k+2],fl=.5+.5*Math.sin(tt2*(.6+r*2.4)+r*40),on=soft?fl*fl:(r<.72?1:fl>.5?1:.12);
            g.globalAlpha=clamp(on*(i===3?.8*(1-nightC*.5):i===2?.9*(.3+.7*dark)*(1-dayC):(.4+.6*dark)*(1-dayC*.85)),0,1);g.fillRect(x0+L[k]*PW-sz/2,top+L[k+1]*PH-sz/2,sz,i===6?sz*1.25:sz)}
          g.globalAlpha=1};
        const mist=(g,top,vh)=>{for(let m=0;m<3;m++){const mw=w*.75,span=w+mw,mx=(((rnd(m+40)*span+tt2*(5+m*3))%span)+span)%span-mw,gr=g.createLinearGradient(mx,0,mx+mw,0);
          gr.addColorStop(0,'rgba(205,218,236,0)');gr.addColorStop(.5,'rgba(205,218,236,'+(.2*(1-nightC*.4))+')');gr.addColorStop(1,'rgba(205,218,236,0)');g.fillStyle=gr;g.fillRect(mx,top+vh*(.5+.15*m),mw,Math.max(5,vh*.09))}};
        const tiles=(g,i)=>{const V=VAR[i].filter(artOk);if(!V.length)return;const vh=gy0*PK[i],PH=vh/(1-SINK),top=base-vh,cvs=V.map(n=>tinted(n,na,ga)),ws=cvs.map(cv2=>PH*cv2.width/cv2.height);
          let per=0;for(const ww of ws)per+=ww*(1-OV);const off=(((cam*sx*.1)%per)+per)%per;
          for(let t=0,tx=-off-per;tx<w;t++){const k=t%V.length;if(tx+ws[k]>0){g.drawImage(cvs[k],tx,top,ws[k],PH);lights(g,V[k],i,tx,ws[k],top,PH)}tx+=ws[k]*(1-OV)}
          if(i===0||i===1||i===3)mist(g,top,vh)};
        const region=(g,i)=>{if(i<6){tiles(g,i);return}tiles(g,5);
          const cvp=tinted('pano-6',na,ga),PH=gy0*PK[6],PW=PH*cvp.width/cvp.height,px6=w/2-PW/2+(5400-cam)*sx*.1;g.drawImage(cvp,px6,base-PH,PW,PH);lights(g,'pano-6',6,px6,PW,base-PH,PH)};
        const pw=sm(clamp((pp-pi-.18)/.64,0,1));
        if(pw>.997)region(x,pi+1);else{region(x,pi);
          if(pw>.003){const dpx=cv.width/w,sw=w*.4,xb=w-pw*(w+sw);if(wipeCv.width!==cv.width||wipeCv.height!==cv.height){wipeCv.width=cv.width;wipeCv.height=cv.height}
            const g=wipeCv.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-over';g.globalAlpha=1;g.clearRect(0,0,wipeCv.width,wipeCv.height);g.setTransform(dpx,0,0,dpx,0,0);
            region(g,pi+1);g.globalCompositeOperation='destination-in';const mg=g.createLinearGradient(xb,0,xb+sw,0);mg.addColorStop(0,'rgba(0,0,0,0)');mg.addColorStop(1,'rgba(0,0,0,1)');g.fillStyle=mg;g.fillRect(0,0,w,h);
            g.globalCompositeOperation='source-over';x.drawImage(wipeCv,0,0,w,h)}}}
      else ridge(gy0-h*.02,h*rg(FA,cam),620,.1,rg(FJ,cam),shade(rgc(FCOL,cam)),true)}
    ridge(gy0+h*.02,h*rg(NA,cam),430,.28,rg(NJ,cam),shade(rgc(NCOL,cam)),false);
    if(heatK>.02){x.fillStyle='rgba(255,150,70,'+(.13*heatK*(1-nightC*.6))+')';x.fillRect(0,0,w,gy0)}
    if(gloomK>.02){const cg=x.createLinearGradient(0,0,0,h*.7);cg.addColorStop(0,'rgba(9,11,16,'+(.72*gloomK)+')');cg.addColorStop(1,'rgba(9,11,16,0)');x.fillStyle=cg;x.fillRect(0,0,w,h*.7)}

    /* a flock crossing in front of the ridges, by day and at dusk */
    if(live){const ba=clamp(1-nightC*1.4,0,1)*(1-gloomK);if(ba>.05){x.strokeStyle='rgba(8,14,24,'+(.85*ba)+')';x.lineWidth=1.3;x.beginPath();
      const T=34,u=(c%T)/T,fx=-80+u*(w+160),fy=gy0*(.34+.08*Math.sin(u*5));
      for(let k=0;k<7;k++){const r=Math.floor((k+1)/2),sd=k%2?1:-1,bx=fx-r*13+rnd(k+900)*4,by=fy+sd*r*7+2*Math.sin(c*2+k),fl=3.2*Math.sin(c*9+k*1.3);
        x.moveTo(bx-5,by-fl);x.lineTo(bx,by);x.lineTo(bx+5,by-fl)}
      x.stroke()}}

    /* skylines: generic suburban blocks, then downtown with a pod-topped tower */
    const litP=.2+.45*dark,vis=[];
    const city=(list,anchor,par,col,keep)=>{const baseY=Y(BD)+5,maxH=gy0*.9,sh0=(anchor-cam)*par;let any=false;
      x.fillStyle=col;x.beginPath();
      for(const b of list){const cx=w/2+(sh0+b.o)*sx,bw=b.bw*sx,bh=b.hf*maxH;if(cx+bw*1.4<0||cx-bw*1.4>w)continue;any=true;
        if(b.t===1){const pw=bw*.56,py=baseY-bh*.84,ry=Math.max(3.5,bh*.04);x.rect(cx-pw/2,baseY-bh*.84,pw,bh*.84+6);
          x.moveTo(cx+bw*1.25,py);x.ellipse(cx,py,bw*1.25,ry,0,0,7);x.rect(cx-bw*.5,py-ry-bh*.03,bw,bh*.03+1);x.rect(cx-1,baseY-bh,2,bh*.16)}
        else{x.rect(cx-bw/2,baseY-bh,bw,bh+6);if(b.t===2)x.rect(cx-bw*.3,baseY-bh*1.1,bw*.6,bh*.1+1)}
        if(keep)vis.push(cx,bw,b.k)}
      if(!any)return;x.fill();
      x.fillStyle='rgba(255,214,138,'+(.5+.4*dark)+')';x.beginPath();
      for(const b of list){const cx=w/2+(sh0+b.o)*sx,bw=b.bw*sx,bh=b.hf*maxH;if(cx+bw<0||cx-bw>w)continue;
        if(b.t===1){const py=baseY-bh*.84;x.rect(cx-bw*1.05,py-1,bw*2.1,2);continue}
        const nc=Math.min(7,Math.floor((bw-4)/6)),nr=Math.min(24,Math.floor((bh-6)/9)),x0=cx-nc*3+1.5;
        for(let r=0;r<nr;r++)for(let k=0;k<nc;k++){if(rnd(b.k*7.3+r*3.1+k*1.7)<litP)x.rect(x0+k*6,baseY-bh+5+r*9,3,4)}}
      x.fill()};
    if(cam>3200&&!artFar){const cc=shade([26,42,66]);city(SUB,4500,.5,cc,false);city(DOWN,5400,.6,shade([30,46,72]),true)}

    /* Site C: earthfill dam, concrete spillway and powerhouse silhouette */
    if(X(-40)>0&&artOk('dam')){
      /* the dam sits on the lowest ground under it, scaled so the powerhouse roof meets the take-off gantry where the line leaves the station */
      const cvd=tinted('dam',nightC*.45,gloomK*.5);let g0=99;for(let q=-420;q<=-40;q+=20)g0=Math.min(g0,gnd(q));
      const db=Y(g0)+6,ry=Y(10.5),dh=Math.max(30,(db-ry)/.7),dw=dh*cvd.width/cvd.height,dx0=X(-85)-dw*.86,tt=live?c:0;
      x.drawImage(cvd,dx0,db-dh,dw,dh);
      const gx=dx0+dw*.365,gw=dw*.33,gh=dh*.6,gt=db-gh;
      x.globalCompositeOperation='lighter';x.fillStyle='rgba(255,170,90,'+(.05+.08*(.5+.5*Math.sin(tt*2.3)))+')';x.fillRect(gx,gt,gw,gh);x.globalCompositeOperation='source-over';
      x.strokeStyle='rgba(236,246,255,.45)';x.lineWidth=1;x.setLineDash([6,6]);x.lineDashOffset=-tt*34;x.beginPath();
      for(let k=0;k<5;k++)for(let m=0;m<3;m++){const px=gx+gw*(k+.28+m*.2)/5;x.moveTo(px,gt+gh*.2);x.lineTo(px,db)}x.stroke();x.setLineDash([]);x.lineDashOffset=0;
      x.fillStyle='rgba(20,32,50,.85)';for(let k=0;k<7;k++){if(Math.sin(tt*(.5+rnd(k+70)*1.6)+k*9)>.86)x.fillRect(dx0+dw*(.762+k*.0272)-1,db-dh*.455,dw*.019+2,dh*.11)}
      x.fillStyle=rgb(mix([18,28,44],[52,72,104],dark*.7));x.beginPath();x.rect(X(-98),Y(14.6),1.8,ry-Y(14.6)+2);x.rect(X(-72),Y(14.6),1.8,ry-Y(14.6)+2);x.rect(X(-100),Y(14.6),30*sx,1.8);x.fill()}
    else if(X(-40)>0){const d=(wx,e)=>[X(wx),Y(e)],dp=[[-660,-9],[-560,13],[-330,13],[-330,15],[-176,15],[-176,10.5],[-62,10.5],[-62,-9]];
      x.fillStyle=shade([44,60,84]);x.beginPath();dp.forEach((p,i)=>{const t=d(p[0],p[1]);i?x.lineTo(t[0],t[1]):x.moveTo(t[0],t[1])});x.closePath();x.fill();
      x.beginPath();for(let k=0;k<6;k++){const t=d(-326+k*29,18.6);x.rect(t[0],t[1],5*sx,3.6*sy+1)}x.rect(X(-98),Y(14.6),1.6,4.1*sy);x.rect(X(-72),Y(14.6),1.6,4.1*sy);x.rect(X(-100),Y(14.6),30*sx,1.6);x.fill();
      const gl=.3+.5*dark,pu=live?.85+.15*Math.sin(c*2.3):1;
      x.fillStyle='rgba(255,206,130,'+(gl*pu)+')';x.shadowColor='#ffc24d';x.shadowBlur=14;x.beginPath();
      for(let k=0;k<5;k++){const t=d(-321+k*29,14.4);x.rect(t[0]+1,t[1],24*sx-2,4.6*sy)}x.fill();x.shadowBlur=0;
      x.strokeStyle='rgba(214,236,255,'+(.2+.18*dark)+')';x.lineWidth=1;x.beginPath();
      for(let k=0;k<5;k++)for(let m=0;m<4;m++){const px=X(-319+k*29+m*6),o=live?((c*26+m*7+k*3)%9):0;x.moveTo(px,Y(9.6));x.lineTo(px,Y(-8))}
      x.setLineDash([7,5]);x.lineDashOffset=live?-c*30:0;x.stroke();x.setLineDash([]);x.lineDashOffset=0;
      x.fillStyle='rgba(255,214,138,'+(.5+.4*dark)+')';x.beginPath();for(let k=0;k<7;k++)x.rect(X(-168+k*15),Y(7.6),5*sx,1.5*sy);x.fill()}

    /* trees by region, houses and street lights */
    const tcol=rgb(mix(mix(mix([9,16,27],[38,64,56],dayC*.9),[4,8,14],dark),[7,10,15],gloomK*.4)),steel=rgb(mix(mix([7,12,20],[40,52,66],dayC),[52,72,104],dark*.7));
    if(artOk('tree-0')&&artOk('tree-1')&&artOk('tree-2')&&artOk('tree-3')){
      /* generated tree sprites, each pivoting at its base so it still sways with the wind */
      for(let ti=0;ti<TREES.length;ti++){const tr=TREES[ti];if(tr.x<wl-40||tr.x>wr+40)continue;
        const cvt=tinted('tree-'+TK[tr.k][ti%2],dark*.5,gloomK*.4),px=X(tr.x),gy=Y(gnd(tr.x))+2,th=tr.h*sy*1.5,tw=th*cvt.width/cvt.height;
        const sw=live?Math.sin(c*(1.3+tr.s)+tr.p)*(.014+windC*.0013):0;
        x.save();x.translate(px,gy);x.rotate(sw);x.drawImage(cvt,-tw/2,-th,tw,th);x.restore()}}
    else{x.fillStyle=tcol;x.beginPath();
    for(const tr of TREES){if(tr.x<wl-20||tr.x>wr+20)continue;
      const px=X(tr.x),gy=Y(gnd(tr.x))+1,th=tr.h*sy*1.2,sw=live?Math.sin(c*(1.3+tr.s)+tr.p)*(.4+windC*.06)*th/22:0;
      if(tr.k===0){const tw=Math.max(3,th*.28);x.moveTo(px-tw,gy);x.lineTo(px+tw,gy);x.lineTo(px+sw*.5,gy-th*.62);x.closePath();
        x.moveTo(px-tw*.72,gy-th*.36);x.lineTo(px+tw*.72,gy-th*.36);x.lineTo(px+sw,gy-th);x.closePath()}
      else if(tr.k===1){const tw=Math.max(2,th*.15);x.rect(px-.8,gy-th*.5,1.6,th*.5);x.moveTo(px-tw,gy-th*.4);x.lineTo(px+tw,gy-th*.4);x.lineTo(px+sw,gy-th);x.closePath()}
      else if(tr.k===2){const r=Math.max(3,th*.3);x.rect(px-1,gy-th*.6,2,th*.6);x.moveTo(px+sw*.6+r,gy-th*.68);x.ellipse(px+sw*.6,gy-th*.68,r,th*.34,0,0,7)}
      else{const r=Math.max(3,th*.36);x.rect(px-.8,gy-th*.5,1.6,th*.5);x.moveTo(px+sw*.5+r,gy-th*.66);x.arc(px+sw*.5,gy-th*.66,r,0,7)}}
    x.fill()}
    if(wr>3200&&wl<4800){x.fillStyle=tcol;x.beginPath();
      for(const hs of HOUSES){if(hs.x<wl-20||hs.x>wr+20)continue;const px=X(hs.x),gy=Y(gnd(hs.x))+2,hw=hs.w*sy*.5,hh=hs.h*sy;
        x.rect(px-hw,gy-hh,hw*2,hh);x.moveTo(px-hw-2,gy-hh);x.lineTo(px,gy-hh-hw*.62);x.lineTo(px+hw+2,gy-hh);x.closePath()}
      x.fill();x.fillStyle='rgba(255,214,138,'+(.45+.45*dark)+')';x.beginPath();
      for(const hs of HOUSES){if(hs.x<wl-20||hs.x>wr+20||hs.lit>.35+.4*dark)continue;const px=X(hs.x),gy=Y(gnd(hs.x))+2,hw=hs.w*sy*.5,hh=hs.h*sy;
        x.rect(px-hw*.55,gy-hh*.72,Math.max(2,hw*.34),Math.max(2,hh*.34));if(hs.k%2)x.rect(px+hw*.2,gy-hh*.72,Math.max(2,hw*.34),Math.max(2,hh*.34))}
      x.fill()}
    if(wr>3500){x.strokeStyle=steel;x.lineWidth=1.1;x.beginPath();
      for(const lx of LAMPS){if(lx<wl-10||lx>wr+10)continue;const px=X(lx),gy=Y(gnd(lx));x.moveTo(px,gy);x.lineTo(px,gy-7*sy);x.lineTo(px+2.2*sy,gy-7.4*sy)}
      x.stroke();x.fillStyle='#ffd98a';x.shadowColor='#ffc24d';x.shadowBlur=10;x.globalAlpha=.4+.6*dark;x.beginPath();
      for(const lx of LAMPS){if(lx<wl-10||lx>wr+10)continue;const px=X(lx)+2.2*sy,py=Y(gnd(lx))-7.2*sy;x.moveTo(px+2,py);x.arc(px,py,2,0,7)}
      x.fill();x.shadowBlur=0;x.globalAlpha=1}

    /* terrain silhouette */
    x.fillStyle=tcol;
    x.beginPath();x.moveTo(0,h);for(let px=0;px<=w+4;px+=4)x.lineTo(px,Y(gnd(cam+(px-w/2)/sx)));x.lineTo(w+4,h);x.closePath();x.fill();
    x.strokeStyle='rgba(150,185,225,.2)';x.lineWidth=1;x.beginPath();
    for(let px=0;px<=w+4;px+=4){const gy=Y(gnd(cam+(px-w/2)/sx));px?x.lineTo(px,gy):x.moveTo(px,gy)}x.stroke();
    /* snow settling on the ground */
    if(snowK>.03){x.strokeStyle='rgba(232,242,252,'+(.85*snowK)+')';x.lineWidth=1+2.2*snowK;x.beginPath();
      for(let px=0;px<=w+4;px+=4){const gy=Y(gnd(cam+(px-w/2)/sx))+1;px?x.lineTo(px,gy):x.moveTo(px,gy)}x.stroke()}
    /* headlights on the roads through Coquitlam, Burnaby and downtown */
    if(live&&wr>3300){x.shadowColor='#ffe6a8';x.shadowBlur=8;
      for(let k=0;k<6;k++){const dir=k%2?1:-1,span=2100,wxc=3300+((((rnd(k+950)*span+dir*c*(14+rnd(k+960)*10))%span)+span)%span);if(wxc<wl-10||wxc>wr+10)continue;
        const px=X(wxc),py=Y(gnd(wxc))-2.2;x.fillStyle=dir>0?'#ffe6a8':'#ff5a4d';x.beginPath();x.arc(px+dir*4,py-.4,1.3,0,7);x.fill()}
      x.shadowBlur=0}

    /* illustrative clearance envelope, overhead sections only */
    {const xe=Math.min(w+4,X(UGX));if(xe>0){x.strokeStyle='rgba(255,90,77,.34)';x.setLineDash([6,6]);x.lineDashOffset=cam*sx;x.beginPath();
      for(let px=Math.max(0,Math.floor(X(0)));px<=xe;px+=4){const cy=Y(gnd(cam+(px-w/2)/sx)+MINC);x.lineTo(px,cy)}x.stroke();x.setLineDash([]);x.lineDashOffset=0}}

    /* conductors: three phases (twin bundle on the 500 kV towers) plus shield wires */
    const i0=Math.max(0,Math.floor(wl/SP)-1),i1=Math.min(NTW-1,Math.ceil(wr/SP)),hotK=clamp((curr*100-60)/40,0,1);
    const ccol=rgb(mix(mix([7,12,20],[52,72,104],dark*.7),[255,128,44],hotK*.92));
    const np=load<3?0:1+Math.round(load/100*3),pts=[];
    phase+=dt*(.05+curr*.62)*(brk===2?5:1)*(brk===1?0:1);
    const wires=pass=>{for(let i=i0;i<i1;i++){const x0=X(i*SP),x1=X((i+1)*SP),g0=gnd(i*SP),g1=gnd((i+1)*SP),sg=sag*sfOf(i),lat=i<12,la=i<=12,lb=i+1<=12;
      if(pass||la||lb){const sd=pass?1:-1,ax=x0+(la?sd*6*u1:0),bx=x1+(lb?sd*6*u1:0),ea=g0+peakOf(i),eb=g1+peakOf(i+1);
        x.strokeStyle=steel;x.globalAlpha=pass?.75:.5;x.lineWidth=.9;x.beginPath();
        for(let k=0;k<=SEG;k++){const u=k/SEG,py=Y(ea+(eb-ea)*u-4*sg*.42*u*(1-u)+gal(i+9,u)*.5),px=ax+(bx-ax)*u;k?x.lineTo(px,py):x.moveTo(px,py)}x.stroke()}
      for(let j=0;j<3;j++){if((j===2)!==(pass===0))continue;
        const pa=PH(i,j),pb=PH(i+1,j),ax=x0+pa[0]*u1,bx=x1+pb[0]*u1,ea=g0+pa[1],eb=g1+pb[1],n=i*3+j;
        const el2=u=>ea+(eb-ea)*u-4*sg*u*(1-u)+gal(n,u);
        const tr=dy=>{for(let k=0;k<=SEG;k++){const u=k/SEG,px=ax+(bx-ax)*u,py=Y(el2(u))+dy;k?x.lineTo(px,py):x.moveTo(px,py)}};
        x.globalAlpha=pass?1:.62;
        if(iceK>.02){x.beginPath();tr(0);x.strokeStyle='rgba(196,228,246,'+(.8*iceK)+')';x.lineWidth=(lat?3:1.2)+2.6*iceK;x.stroke()}
        if(hotK>.12&&pass){x.shadowColor='#ff8a2c';x.shadowBlur=9*hotK}
        x.strokeStyle=ccol;x.beginPath();
        if(lat){tr(-1.3);tr(1.3);for(let k=1;k<6;k++){const u=k/6,px=ax+(bx-ax)*u,py=Y(el2(u));x.moveTo(px,py-2.4);x.lineTo(px,py+2.4)}x.lineWidth=1}
        else{tr(0);x.lineWidth=1.4}
        x.stroke();x.shadowBlur=0;
        for(let k=0;k<np;k++){const u=(((phase+j*.17+k/np+i*.13)%1)+1)%1;pts.push(ax+(bx-ax)*u,Y(el2(u)))}}}
      x.globalAlpha=1};
    wires(0);

    /* structures: 500 kV lattice towers with a flat conductor arrangement, then steel poles; the active stop glows */
    const lattice=(cx,gy)=>{const u=u1,bw=4.6*u,ww=1.5*u,n=4,wy=19*u;x.beginPath();
      for(let i=0;i<n;i++){const p=i/n,r=(i+1)/n,wa=bw+(ww-bw)*p,wb=bw+(ww-bw)*r,ya=gy-wy*p,yb=gy-wy*r;
        x.moveTo(cx-wa,ya);x.lineTo(cx-wb,yb);x.moveTo(cx+wa,ya);x.lineTo(cx+wb,yb);x.moveTo(cx-wa,ya);x.lineTo(cx+wb,yb);x.moveTo(cx+wa,ya);x.lineTo(cx-wb,yb);x.moveTo(cx-wb,yb);x.lineTo(cx+wb,yb)}
      const yb2=gy-26.4*u,yt=gy-27.7*u,aw=11*u;
      x.moveTo(cx-ww,gy-wy);x.lineTo(cx-6*u,yb2);x.moveTo(cx+ww,gy-wy);x.lineTo(cx+6*u,yb2);
      x.moveTo(cx-ww,gy-wy);x.lineTo(cx-3.4*u,yt);x.moveTo(cx+ww,gy-wy);x.lineTo(cx+3.4*u,yt);
      x.moveTo(cx-aw,yb2);x.lineTo(cx+aw,yb2);x.lineTo(cx+aw,yt);x.lineTo(cx-aw,yt);x.closePath();
      for(let k=0;k<10;k++){const xa=cx-aw+k*aw/5,xb=xa+aw/5;x.moveTo(xa,k%2?yt:yb2);x.lineTo(xb,k%2?yb2:yt)}
      for(let sd=-1;sd<=1;sd+=2){x.moveTo(cx+sd*7.2*u,yt);x.lineTo(cx+sd*6*u,gy-P5*u);x.lineTo(cx+sd*4.8*u,yt)}
      for(let j=0;j<3;j++){const ox=cx+(1-j)*9.5*u;x.moveTo(ox-1.4*u,yb2);x.lineTo(ox,gy-(A5+.2)*u);x.lineTo(ox+1.4*u,yb2)}
      x.stroke()};
    const pole=(cx,gy)=>{const u=u1;x.beginPath();x.moveTo(cx-.55*u,gy);x.lineTo(cx-.2*u,gy-P2*u);x.lineTo(cx+.2*u,gy-P2*u);x.lineTo(cx+.55*u,gy);x.closePath();
      for(let j=0;j<3;j++){const sd=j===1?-1:1,e=A2+3.5*j;x.moveTo(cx,gy-(e+.7)*u);x.quadraticCurveTo(cx+sd*1.6*u,gy-(e+1.9)*u,cx+sd*2.6*u,gy-(e+1.5)*u);x.lineTo(cx+sd*2.6*u,gy-e*u)}
      x.stroke()};
    const at=active*3;
    for(let i=i0;i<=i1;i++){const cx=X(i*SP);if(cx<-14*u1||cx>w+14*u1)continue;const gy=Y(gnd(i*SP)),dr=i<=12?lattice:pole;
      if(i===at){const pu=live?.5+.5*Math.sin(c*3):.6;
        x.strokeStyle='rgba(255,194,77,'+(.5+.4*pu)+')';x.lineWidth=2;x.beginPath();x.ellipse(cx,gy+2,6*u1+3*pu,5,0,0,7);x.stroke();
        x.strokeStyle='#ffc24d';x.lineWidth=1.7;x.shadowColor='#ffc24d';x.shadowBlur=14+6*pu;dr(cx,gy);x.shadowBlur=0}
      else{x.strokeStyle=steel;x.lineWidth=i<=12?1.3:1.6;dr(cx,gy)}}
    wires(1);

    /* downleads from the first tower to the powerhouse */
    if(X(0)>-40&&X(-100)<w){x.strokeStyle=ccol;x.lineWidth=1;x.globalAlpha=.85;x.beginPath();const g0=gnd(0);
      for(let j=0;j<3;j++){const ax=X(0)+PH(0,j)[0]*u1,ay=Y(g0+A5),bx=X(-96+j*11),by=Y(14.6);x.moveTo(ax,ay);x.quadraticCurveTo((ax+bx)/2,Math.max(ay,by)+2.5*sy,bx,by)}
      x.stroke();x.globalAlpha=1}

    /* cable termination at the last pole, then the underground cable into the below-ground substation */
    if(wr>UGX-60){const gT=gnd(UGX),cxT=X(UGX),gyT=Y(gT),on=active===NS-1,pu=live?.5+.5*Math.sin(c*3):.6,cyD=e=>Y(e-4);
      x.strokeStyle=ccol;x.lineWidth=1;x.beginPath();
      for(let j=0;j<3;j++){const p=PH(15,j),ax=cxT+p[0]*u1,ay=gyT-p[1]*u1,bx=cxT+(6+2.4*j)*u1,by=gyT-8.6*u1;x.moveTo(ax,ay);x.quadraticCurveTo((ax+bx)/2+2*u1,(ay+by)/2+3*u1,bx,by)}
      x.stroke();
      x.strokeStyle=steel;x.lineWidth=1.2;x.beginPath();x.moveTo(cxT+4.6*u1,gyT);x.lineTo(cxT+4.6*u1,gyT-5*u1);x.lineTo(cxT+12.2*u1,gyT-5*u1);x.lineTo(cxT+12.2*u1,gyT);x.stroke();
      x.strokeStyle=rgb(mix([150,170,196],[196,214,236],dark));x.lineWidth=Math.max(2.4,.8*u1);x.setLineDash([1.6,1.4]);x.beginPath();
      for(let j=0;j<3;j++){const bx=cxT+(6+2.4*j)*u1;x.moveTo(bx,gyT-8.6*u1);x.lineTo(bx,gyT-5*u1)}x.stroke();x.setLineDash([]);
      const col=brk===1?'#6f8098':'#58d8ff',bxL=X(5355),bxR=X(5445),byT=Y(BD-2.2),byB=Y(BD-10);
      x.strokeStyle=col;x.lineWidth=1.2;x.globalAlpha=.8;x.beginPath();
      for(let j=0;j<3;j++){const bx=cxT+(6+2.4*j)*u1;x.moveTo(bx,gyT-5*u1);x.lineTo(bx,cyD(gT)-(2-j)*1.5);x.lineTo(cxT+12.2*u1,cyD(gT))}x.stroke();x.globalAlpha=1;
      x.shadowColor=col;x.shadowBlur=brk===1?0:9;x.lineWidth=2;x.setLineDash([9,6]);x.lineDashOffset=live?-phase*90:0;x.beginPath();
      for(let wx2=UGX+12.2*u1/sx;wx2<5355;wx2+=30){const px=X(wx2),py=cyD(gnd(wx2));wx2>UGX+12.2*u1/sx?x.lineTo(px,py):x.moveTo(px,py)}
      x.lineTo(bxL,cyD(gnd(5355)));x.stroke();x.setLineDash([]);x.lineDashOffset=0;x.shadowBlur=0;
      if(np){const nq=np*3;for(let k=0;k<nq;k++){const u=(((phase*.4+k/nq)%1)+1)%1,wx2=UGX+20+u*(5355-UGX-20);pts.push(X(wx2),cyD(gnd(wx2)))}}
      if(bxL<w+10){const ac=on?'rgba(255,194,77,'+(.75+.25*pu)+')':'rgba(255,194,77,.6)';
        x.fillStyle='rgba(255,194,77,'+(on?.12+.05*pu:.07)+')';x.fillRect(bxL,byT,bxR-bxL,byB-byT);
        x.strokeStyle=ac;x.lineWidth=on?1.8:1.3;if(on){x.shadowColor='#ffc24d';x.shadowBlur=12+6*pu}x.strokeRect(bxL,byT,bxR-bxL,byB-byT);x.shadowBlur=0;
        const bwd=(bxR-bxL)/7,bh2=(byB-byT)*.46;x.lineWidth=1;x.beginPath();
        for(let k=0;k<3;k++)x.rect(bxL+bwd*(1+k*2),byB-bh2-2,bwd,bh2);x.moveTo(bxL,byT+(byB-byT)*.26);x.lineTo(bxR-bwd*.5,byT+(byB-byT)*.26);
        for(let k=0;k<3;k++){const px=bxL+bwd*(1.5+k*2);x.moveTo(px,byT+(byB-byT)*.26);x.lineTo(px,byB-bh2-2)}x.stroke();
        x.fillStyle=tcol;x.strokeStyle=steel;x.beginPath();x.rect(X(5376),Y(BD)-2.2*u1,3*u1,2.2*u1);x.rect(X(5418),Y(BD)-1.6*u1,4*u1,1.6*u1);x.fill();x.stroke();
        x.font='500 9px '+FM;x.textAlign='center';x.textBaseline='bottom';const lt=x.measureText('BELOW-GROUND SUBSTATION').width<w*.6?'BELOW-GROUND SUBSTATION':'SUBSTATION';
        x.fillStyle='rgba(255,214,138,.85)';x.fillText(lt,clamp((bxL+bxR)/2,60,w-60),byT-3)}
      if(cxT>-80&&cxT<w+40){x.font='500 9px '+FM;x.textAlign='left';x.textBaseline='top';x.fillStyle='rgba(205,220,238,.7)';x.fillText('CABLE TERMINATION',cxT+14*u1,gyT-7*u1)}}

    /* current pulses */
    if(pts.length){const sg=brk===2,off=brk===1,pr=sg?3.1:2.3;
      x.globalAlpha=off?.3:1;x.fillStyle=sg?'#ffffff':off?'#7d8da3':hotK>.5?'#fff0d6':'#ffe3a3';
      if(!off){x.shadowColor=sg?'#ffffff':hotK>.5?'#ff9a3c':'#ffc24d';x.shadowBlur=sg?20:13}
      x.beginPath();for(let k=0;k<pts.length;k+=2){x.moveTo(pts[k]+pr,pts[k+1]);x.arc(pts[k],pts[k+1],pr,0,7)}x.fill();
      x.shadowBlur=0;x.globalAlpha=1}

    /* night beacons on the lattice towers */
    if(dark>.3&&i0<=12){x.globalAlpha=clamp((dark-.3)/.7*(live?.2+.8*(.5+.5*Math.sin(c*4.5)):.8),0,1);x.fillStyle='#ff3b30';x.shadowColor='#ff3b30';x.shadowBlur=16;x.beginPath();
      for(let i=i0;i<=Math.min(12,i1);i++){for(let sd=-1;sd<=1;sd+=2){const cx=X(i*SP)+sd*6*u1,ty=Y(gnd(i*SP)+P5)-3;x.moveTo(cx+2.6,ty);x.arc(cx,ty,2.6,0,7)}}x.fill();x.globalAlpha=1;x.shadowBlur=0}

    /* sag and clearance on the overhead span nearest the camera */
    const m=minClr(cs,sag),mc=m[0],mu=m[1],isBad=!ug&&mc<MINC,sagS=sag*sfOf(cs);
    if(!ug){const pa=PH(cs,0),pb=PH(cs+1,0),xa=X(cs*SP)+pa[0]*u1,xb=X((cs+1)*SP)+pb[0]*u1,ea=gnd(cs*SP)+pa[1],eb=gnd((cs+1)*SP)+pb[1],n=cs*3,ev=u=>ea+(eb-ea)*u-4*sagS*u*(1-u)+gal(n,u);
      const cyc='#58d8ff',cc=isBad?(live&&Math.sin(c*9)>0?'#ff8a80':'#ff5a4d'):cyc;
      x.strokeStyle='rgba(88,216,255,.55)';x.lineWidth=1;x.setLineDash([3,4]);x.beginPath();x.moveTo(xa,Y(ea));x.lineTo(xb,Y(eb));x.stroke();x.setLineDash([]);
      dim((xa+xb)/2,Y((ea+eb)/2),Y(ev(.5)),cyc,'sag '+sagS.toFixed(1)+' m','r');
      const px=xa+(xb-xa)*mu;
      dim(px,Y(ev(mu)),Y(gnd((cs+mu)*SP)),cc,mc.toFixed(1)+' m','l')}

    /* foreground water: the Peace at Site C, Fraser flats at Ruby Creek, harbour reflections downtown */
    const wt=rg(WA,cam);
    if(wt>.02){const wh=wt*(BOT*.95+rg(WX,cam)*4*sy),yw=h-wh,tt=live?c:0,wgr=x.createLinearGradient(0,yw,0,h);
      wgr.addColorStop(0,rgb(mix(mix(mix([58,84,118],[104,158,204],dayC),[16,28,48],nightC),[30,36,48],gloomK*.8)));wgr.addColorStop(1,rgb(mix(mix([14,26,44],[36,82,128],dayC),[5,10,19],dark)));
      x.fillStyle=wgr;x.beginPath();x.moveTo(0,h);for(let i=0;i<=w+10;i+=10)x.lineTo(i,yw+1.2*Math.sin(i/23+tt*1.4));x.lineTo(w+10,h);x.closePath();x.fill();
      x.strokeStyle='rgba(190,216,246,.34)';x.lineWidth=1;x.beginPath();for(let i=0;i<=w+10;i+=10){const yy=yw+1.2*Math.sin(i/23+tt*1.4);i?x.lineTo(i,yy):x.moveTo(i,yy)}x.stroke();
      x.lineWidth=1.2;for(let r=0;r<4;r++){const yy=yw+5+r*(wh-7)/4;x.strokeStyle='rgba(196,220,248,'+(.3-.05*r)+')';x.setLineDash([16+r*7,24+r*10]);x.lineDashOffset=-(tt*(30+r*16)+cam*sx*1.1+r*37);
        x.beginPath();for(let i=0;i<=w+12;i+=12){const y2=yy+1.5*Math.sin(i/31+tt*1.8+r*1.7);i?x.lineTo(i,y2):x.moveTo(i,y2)}x.stroke()}
      x.setLineDash([]);x.lineDashOffset=0;x.lineWidth=1;
      if(vis.length&&wh>8){x.fillStyle='rgba(255,206,130,'+(.16+.2*dark)+')';x.beginPath();
        for(let k=0;k<vis.length;k+=3){const cx=vis[k],bw=vis[k+1];for(let r=0;r<3;r++){const yy=yw+4+r*(wh-6)/3,ww2=bw*(.5-.12*r);x.rect(cx-ww2/2+1.5*Math.sin(tt*1.7+vis[k+2]+r),yy,ww2,1.6)}}
        x.fill()}
      x.strokeStyle='rgba(206,226,250,.3)';x.beginPath();
      for(let k=0;k<16;k++){const gx=(((rnd(k+600)*w*1.2-cam*sx*1.15-tt*(6+rnd(k+620)*8))%(w*1.2))+w*1.2)%(w*1.2)-w*.1,gy2=yw+4+rnd(k+640)*(wh-6),gl2=6+rnd(k+660)*14;x.moveTo(gx,gy2);x.lineTo(gx+gl2,gy2)}
      x.stroke();
      /* a small boat with a masthead light */
      if(live&&wh>8){const span=w+120,bxp=(((c*9+cam*sx*.2)%span)+span)%span-60,byp=yw+3+1.2*Math.sin(c*1.4);x.fillStyle=rgb(mix([20,30,46],[6,10,18],dark));x.beginPath();
        x.moveTo(bxp-11,byp-3);x.lineTo(bxp+11,byp-3);x.lineTo(bxp+8,byp+1);x.lineTo(bxp-8,byp+1);x.closePath();x.rect(bxp-3,byp-7,6,4);x.fill();
        x.fillStyle='#ffd98a';x.shadowColor='#ffc24d';x.shadowBlur=8;x.beginPath();x.arc(bxp+1,byp-8.5,1.3,0,7);x.fill();x.shadowBlur=0}}

    /* stop labels: the active stop carries its place name and section */
    for(let k=0;k<NS;k++){const cx=X(k*SD);if(cx<-160||cx>w+160)continue;const pk=k<=4?P5:k===5?P2:19;let top=Y(gnd(k*SD)+pk)-32;
      if(k===active){const txt=STOPS[k].s+' · '+names[k].toUpperCase();x.font='600 14px '+FC;
        const bw=x.measureText(txt).width+18,bx=clamp(cx-bw/2,6,Math.max(6,w-bw-6));top=Math.max(bx<chipW?chipH:5,top);
        x.fillStyle='#ffc24d';x.shadowColor='#ffc24d';x.shadowBlur=12;x.fillRect(bx,top,bw,22);x.shadowBlur=0;
        x.fillStyle='#070d16';x.textAlign='left';x.textBaseline='middle';x.fillText(txt,bx+9,top+11.5)}
      else{x.font='500 10px '+FM;const tw=x.measureText(STOPS[k].s).width;top=Math.max(cx-tw/2<chipW?chipH:5,top);
        x.fillStyle='rgba(5,10,18,.6)';x.fillRect(cx-tw/2-4,top+5,tw+8,16);
        x.fillStyle='rgba(205,220,238,.8)';x.textAlign='center';x.textBaseline='middle';x.fillText(STOPS[k].s,cx,top+13.5)}}

    /* rain: angled streaks, capped count */
    if(rainK>.03){x.strokeStyle='rgba(190,210,235,'+(.4*rainK)+')';x.lineWidth=1;x.beginPath();const sl=4+windC*.14,tt=live?c:0,nr=Math.min(110,Math.round(w/8));
      for(let k=0;k<nr;k++){const rx=((rnd(k)*w*1.3+tt*(50+windC*3)*(.6+rnd(k+9)*.4))%(w*1.3))-w*.15,ry=(rnd(k+40)*h+tt*(520+rnd(k+3)*240))%h;x.moveTo(rx,ry);x.lineTo(rx+sl,ry+15)}
      x.stroke()}

    /* snow: drifting flakes in three depths, pushed sideways by the wind */
    if(snowK>.03){const tt=live?c:0,nf=Math.min(170,Math.round(w/4.5));x.fillStyle='#ffffff';
      for(let k=0;k<nf;k++){const z=.45+rnd(k+300)*.75,span=w+240;
        const fx=(((rnd(k+320)*span+tt*(10+windC*2.4)*z+14*Math.sin(tt*(.7+rnd(k+330))+k))%span)+span)%span-120,fy=(rnd(k+340)*h+tt*(34+rnd(k+310)*40)*z)%h;
        x.globalAlpha=clamp(snowK*(.35+.55*z),0,1);x.beginPath();x.arc(fx,fy,1.2+1.5*z*rnd(k+350),0,7);x.fill()}
      x.globalAlpha=1}

    /* lightning */
    if(bolt){const k=1-(c-bolt.t0)/.45;if(k<=0){bolt=null}else{
      if(live){x.fillStyle='rgba(255,255,255,'+(k*k*.5)+')';x.fillRect(0,0,w,h)}
      const ty=bolt.ug?Y(BD)-gy0*.3:Y(gnd(bolt.i*SP)+peakOf(bolt.i));x.globalAlpha=k;x.strokeStyle='#ffffff';x.shadowColor='#bcd8ff';x.shadowBlur=18;
      bolt.p.forEach((pp,n)=>{x.lineWidth=n?1.1:2.6;x.beginPath();pp.forEach((p,i)=>{const px=X(p[0]),py=p[1]*ty;i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke()});
      x.globalAlpha=1;x.shadowBlur=0}}

    /* gauges: sprung needles; DOM only touched when a value changes */
    const tv=[curr*100,Tc,ug?0:sagS,ug?25:mc];
    G.forEach((g,i)=>{if(live){g.vel+=((tv[i]-g.v)*90-g.vel*13)*dt;g.v+=g.vel*dt}else g.v=tv[i];
      const an=Math.round((-105+210*clamp((g.v-g.min)/(g.max-g.min),0,1))*4)/4;
      if(an!==g.a){g.a=an;g.el.setAttribute('transform','rotate('+an+' 60 58)')}});
    const sL=Math.round(curr*100),sT=fmtT(Math.round(Tc))+' °C',sS=sagS.toFixed(1)+' m',sC=mc.toFixed(1)+' m';
    put('v-load',sL+' %');put('v-temp',sT);put('v-sag',ug?'n.a.':sS);put('v-clr',ug?'UNDERGROUND':sC);
    put('h-kv',ug?'230 kV UG':cam>3750?'URBAN OH':'500 kV');put('h-load','LOAD '+sL+'%');put('h-temp',sT);put('h-sag',ug?'SAG n.a.':'SAG '+sS);put('h-clr',ug?'CLR n.a.':'CLR '+sC);put('h-el','ELEV '+Math.round(relev(cam)).toLocaleString('en-CA')+' m');
    put('clock',fmt(c));
    if(ug!==ugSeen){const init=ugSeen===null;ugSeen=ug;gClr.classList.toggle('na',ug);gSag.classList.toggle('na',ug);
      if(ug)log('CABLE SECTION: NO OVERHEAD CLEARANCE','ok');else if(!init)log('OVERHEAD SECTION: CLEARANCE MONITORED','ok')}

    /* alarms and thresholds, debounced */
    if(isBad!==badVis){badVis=isBad;gClr.classList.toggle('bad',isBad);el['h-clr'].classList.toggle('bad',isBad)}
    if(isBad!==badLog){if(badSince<0)badSince=c;else if(c-badSince>=.5){badLog=isBad;badSince=-1;
      log(isBad?'CLEARANCE ALARM: '+mc.toFixed(1)+' m, UNDER '+MINC+' m':'CLEARANCE ALARM CLEARED',isBad?'al':'ok')}}
    else badSince=-1;
    if(evalAt>=0&&c>=evalAt){evalAt=-1;const b=(load>=95)+(load>=80)+(load>=50),ht=tcT>=75;
      if(b!==band)log('LOAD '+load+'%: CONDUCTOR '+fmtT(Math.round(tcT))+' °C',b>=3?'al':b>=2?'wn':'');
      else if(ht&&!hot)log('CONDUCTOR '+Math.round(tcT)+' °C: THERMAL LIMIT','wn');
      band=b;hot=ht}
    const wh2=windHi?wind>=60:wind>=70;
    if(wh2!==windHi&&evalAt<0){windHi=wh2;log(wh2?'HIGH WIND '+wind+' km/h: GALLOPING':'WIND BELOW 60 km/h',wh2?'wn':'ok')}
    const stt=brk===1?'al|BREAKER OPEN':brk===2?'sg|RECLOSING':isBad?'al|CLEARANCE ALARM':rain?'wn|HEAVY RAIN':ice&&amb<-5?'wn|ICE LOADING':amb>=35?'wn|EXTREME HEAT':ug?'ug|CABLE SECTION':'ok|NORMAL';
    if(stt!==stSeen){stSeen=stt;const p=stt.split('|');lamp.setAttribute('data-s',p[0]);lamp.textContent=p[1]}
  }

  /* under reduced motion the loop runs once: redraw on input, then once more after things settle */
  let pk=0;U.cl.push(()=>clearTimeout(pk));
  const kick=()=>{if(!U.reduced)return;frame(0,0);clearTimeout(pk);pk=setTimeout(()=>frame(0,0),700)};
  const later=()=>{evalAt=clock()+.45};
  const press=p=>{preset=p;pbs.forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===p?'true':'false'))};
  /* weather presets with real BC references */
  const PRE={heat:{a:40,w:0,i:false,r:false,m:'HEAT DOME (JUNE 2021): 40 °C, CALM, FULL SUN',l:'wn'},
    river:{a:8,w:85,i:false,r:true,m:'ATMOSPHERIC RIVER (NOV 2021): RAIN, WIND',l:'wn'},
    arctic:{a:-20,w:80,i:true,r:false,m:'ARCTIC OUTFLOW: −20 °C, WIND, ICE ON',l:'wn'},
    clear:{a:15,w:20,i:false,r:false,m:'CLEAR EVENING: CONDITIONS RESET',l:'ok'}};
  const apply=p=>{const d=PRE[p];if(!d)return;press(p);
    amb=d.a;inA.value=d.a;put('o-amb',fmtT(amb)+' °C');wind=d.w;inW.value=d.w;put('o-wind',wind+' km/h');
    ice=d.i;inI.checked=d.i;rain=d.r;if(p==='clear'){night=0;day=0;inN.value=50}else if(p==='heat'){night=0;day=1;inN.value=0}
    log(d.m,d.l);later();kick()};
  const manual=()=>{if(preset&&preset!=='river')press(null)};

  U.on(window,'scroll',()=>{track();kick()},{passive:true});
  U.on(window,'resize',()=>{measure();track();kick()});
  U.on(scene,'click',e=>{const r=cv.getBoundingClientRect();strike(cam+(e.clientX-r.left-s.w/2)/sx)});
  U.on(bStrike,'click',()=>strike(null));
  pbs.forEach(b=>U.on(b,'click',()=>apply(b.dataset.p)));
  U.on(inL,'input',()=>{load=+inL.value;put('o-load',load+'%');later();kick()});
  U.on(inA,'input',()=>{amb=+inA.value;put('o-amb',fmtT(amb)+' °C');manual();later();kick()});
  U.on(inW,'input',()=>{wind=+inW.value;put('o-wind',wind+' km/h');manual();later();kick()});
  U.on(inN,'input',()=>{night=Math.max(0,inN.value/50-1);day=Math.max(0,1-inN.value/50);kick()});
  U.on(inI,'change',()=>{ice=inI.checked;manual();log(ice?'ICE LOAD ON: SAG +3.0 m':'ICE LOAD OFF',ice?'wn':'ok');kick()});
  const relay=()=>{measure();track();kick()};
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{relay();if(U.reduced)frame(0,0)},()=>{});
  U.later(700,relay);

  log('MODEL RUNNING: '+NS+' STOPS, NORTH TO SOUTH','ok');
  measure();track();cam=tgt;
  if(U.reduced)G.forEach(g=>{g.v=g.min});
  frame(0,0);
  U.raf(frame);
}});
})();
