const $=s=>document.querySelector(s);
const CARDS=[
["The Lovers","ไพ่คู่รัก","👩‍❤️‍👨","ไพ่แห่งความรักและการเลือก สื่อถึงความดึงดูดใจที่ลงตัว ความเข้ากันได้ดีอย่างน่าอัศจรรย์ และการพบเนื้อคู่ที่คุยกันถูกคอ","เดือนหน้าจะได้ลอยกระทงหรือลอยกะเธอน้า?"],
["The Sun","ไพ่พระอาทิตย์","☀️","ไพ่ที่ดีที่สุดในสำรับ ความรักที่เปิดเผย สดใสบริสุทธิ์ เต็มไปด้วยความสุข ความสมหวัง และโอกาสดีๆ ในการเริ่มต้นใหม่หรือสร้างครอบครัว","มองจากดาวอังคารก็รู้ว่ามีหนุ่มมาจีบแน่!"],
["The World","ไพ่โลก","🌍","ความรักที่สมบูรณ์แบบ ความเข้าใจที่ไร้ข้อกังขา ความสัมพันธ์พัฒนาไปถึงจุดสูงสุดอย่างมีความสุขและลงตัวที่สุด","โลกทั้งใบกลายเป็นสีชมพู ลอยกระทงฟินๆอ่ะ >v<"],
["Two of Cups","ไพ่ 2 ถ้วย","🥂","การเริ่มต้นความสัมพันธ์ที่ดี แลกเปลี่ยนความรู้สึกที่ตรงกัน ตกหลุมรักซึ่งกันและกัน และเกณฑ์หมั้นหมายหรือแต่งงาน","ฉลองวันเกิดแล้ว อย่าลืมฉลองเปิดตัวหวานใจด้วยนะ อิอิ OvO"],
["Four of Wands","ไพ่ 4 ไม้เท้า","🏡","ความมั่นคงและการเฉลิมฉลอง ความสัมพันธ์ที่มีรากฐานแข็งแรง มีเกณฑ์แต่งงาน ย้ายเข้าอยู่ด้วยกัน หรือสร้างอนาคตร่วมกันอย่างราบรื่น","ปีนี้ไม่ใช่แค่ปักเทียนวันเกิดนะ แต่ปักหมุดจองที่เดตได้เลอ :3"],
["Ace of Cups","ไพ่เอซถ้วย","💖","จุดเริ่มต้นใหม่ของหัวใจ ความรักที่ล้นปรี่ ความรู้สึกดีๆ ที่กำลังไหลเข้ามาหาแก","ใจฟูๆ แบบนี้ ระวังหัวใจพองโตจนเสื้อคับนะจ๊ะ 💗"]];
// stars
for(let i=0;i<40;i++){const e=document.createElement('i');e.textContent=['✦','✧','⋆','✨'][i%4];e.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${8+Math.random()*14}px;animation-delay:${Math.random()*3}s`;$('#st').appendChild(e)}
function show(i){document.querySelectorAll('section').forEach((s,k)=>s.classList.toggle('on',k==i));scrollTo(0,0)}
// audio
let ac,mOn=false,mt,mg;
const AC=window.AudioContext||window.webkitAudioContext;
function tone(f,t,d,v=.12,type='sine',dest){const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(dest||ac.destination);o.start(t);o.stop(t+d)}
const M=[[392,.5],[392,.5],[440,1],[392,1],[523,1],[494,2],[392,.5],[392,.5],[440,1],[392,1],[587,1],[523,2],[392,.5],[392,.5],[784,1],[659,1],[523,1],[494,1],[440,1],[698,.5],[698,.5],[659,1],[523,1],[587,1],[523,2]];
function loop(){if(!mOn)return;let t=ac.currentTime+.1;M.forEach(([f,d])=>{tone(f,t,1.2,.1,'sine',mg);tone(f*2,t,.6,.03,'sine',mg);t+=d*.5});mt=setTimeout(loop,(t-ac.currentTime+2)*1000)}
function music(on){mOn=on;$('#mu').textContent=on?'🔊':'🔇';clearTimeout(mt);if(mg){mg.disconnect();mg=null}if(on){ac=ac||new AC();ac.resume();mg=ac.createGain();mg.connect(ac.destination);loop()}}
$('#mu').onclick=()=>music(!mOn);
function boom(){if(!ac)return;const t=ac.currentTime;const b=ac.createBuffer(1,ac.sampleRate*.4,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=ac.createBufferSource(),g=ac.createGain();s.buffer=b;g.gain.value=.25;s.connect(g).connect(ac.destination);s.start(t);[523,659,784,1047].forEach((f,i)=>tone(f,t+i*.08,.6,.12,'triangle'))}
function chime(f){if(ac)tone(f,ac.currentTime,.8,.15,'triangle')}
// confetti + fireworks
const cv=$('#cv'),cx=cv.getContext('2d');let P=[],run=false;
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
const COL=['#ffd86b','#ff9ecf','#c9a0ff','#fff','#7fd6ff','#ffb300'];
function conf(n){for(let i=0;i<n;i++)P.push({x:Math.random()*cv.width,y:-20,vx:Math.random()*4-2,vy:Math.random()*3+2,s:Math.random()*8+4,c:COL[i%6],r:Math.random()*6,g:.05,l:300,t:'c'})}
function fw(x,y){for(let i=0;i<60;i++){const a=Math.PI*2*i/60,v=Math.random()*5+2;P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,s:3,c:COL[i%6],g:.06,l:70,t:'f'})}}
function anim(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l>0&&p.y<cv.height+30);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.l--;p.r+=.2;cx.fillStyle=p.c;cx.globalAlpha=p.t=='f'?p.l/70:1;if(p.t=='c')cx.fillRect(p.x,p.y,p.s,p.s*.6);else{cx.beginPath();cx.arc(p.x,p.y,p.s,0,7);cx.fill()}});cx.globalAlpha=1;P.length?requestAnimationFrame(anim):run=false}
function go(){if(!run){run=true;anim()}}
function magic(){if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(2000,t+.9);g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(.07,t+.3);g.gain.exponentialRampToValueAtTime(.001,t+1);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+1);[1047,1319,1568,1760,2093,2637,3136].forEach((f,i)=>{tone(f,t+.15+i*.08,1.1,.07,'sine');tone(f*1.005,t+.15+i*.08,.9,.04,'triangle')})}
function sparkle(){if(!ac)return;const t=ac.currentTime,n=[1568,1760,2093,2637,3136];for(let i=0;i<4;i++)tone(n[Math.floor(Math.random()*5)],t+i*.09,.7,.05,'sine')}
function celebrate(){magic();let k=0;const iv=setInterval(()=>{fw(Math.random()*cv.width,Math.random()*cv.height*.5+40);if(k%2==0)sparkle();conf(40);go();if(++k>6)clearInterval(iv)},450)}
// flow
$('#go').onclick=()=>{music(true);chime(880);show(1)};
let order=[0,1,2,3,4,5],deck=[],chosen=null,picked=0;
function build(){deck=[0,1,2,3,4,5].sort(()=>Math.random()-.5);chosen=null;const g=$('#g');g.innerHTML='';order.forEach(id=>{const d=document.createElement('div');d.className='c';d.dataset.id=id;d.innerHTML='<div class="in"><div class="b">🎂</div><div class="f"></div></div>';d.onclick=()=>pick(d);g.appendChild(d)})}
function pick(d){if(d.classList.contains('sel')){document.querySelectorAll('#g .c').forEach(x=>{x.classList.remove('sel');x.style.opacity=1});chosen=null;picked=0;$('#n').textContent='0/1';$('#tocake').style.display='none';$('#rd').textContent='แตะไพ่ที่ใจเรียกหา... 💜';chime(440);return}const c=CARDS[deck[+d.dataset.id]];chosen=c;document.querySelectorAll('.c').forEach(x=>{x.classList.remove('sel');x.style.opacity=.3});d.classList.add('sel');d.style.opacity=1;chime(660);
$('#rd').innerHTML='<b style="color:var(--gold)">ไพ่ใบนี้ถูกสุ่มมาให้แกแล้ว 💜</b><br>ยังไม่บอกนะว่าคืออะไร... ไปเป่าเทียนอธิษฐานก่อน แล้วค่อยเปิดดูคำทำนายกัน ✨<br><small>เปลี่ยนใจอยากได้ใบอื่น กดเลือกใบใหม่ได้เลย หรือแตะใบเดิมอีกครั้งเพื่อวางกลับสำรับนะ 🔄</small>';
picked=1;$('#n').textContent=picked+'/1';if(picked==1)$('#tocake').style.display='inline-block'}
function clearSel(){document.querySelectorAll('#g .c').forEach(x=>{x.classList.remove('sel');x.style.opacity=1});deck=[0,1,2,3,4,5].sort(()=>Math.random()-.5);chosen=null;picked=0;$('#n').textContent='0/1';$('#tocake').style.display='none';$('#rd').textContent='แตะไพ่ที่ใจเรียกหา... 💜'}function shuffle(rot){clearSel();const g=$('#g');g.style.opacity=.2;setTimeout(()=>{const open=[...document.querySelectorAll('.c.pk')];if(open.length){}const els=[...g.children];if(rot){els.push(els.shift())}else{els.sort(()=>Math.random()-.5)}els.forEach(e=>g.appendChild(e));g.style.opacity=1;chime(440)},400)}
g=$('#g');g.style.transition='opacity .4s';
$('#sh').onclick=()=>shuffle(0);$('#cut').onclick=()=>shuffle(1);
build();
$('#tocake').onclick=()=>{buildCake();show(2)};
function buildCake(){const z=['♈','♉','♊','♋','♌','♍'];$('#fm').innerHTML=z.map(x=>`<span class="fl">${x}</span>`).join('');$('#cd').innerHTML=z.map(()=>'<div class="cd"></div>').join('');document.querySelectorAll('.fl').forEach(f=>f.onclick=()=>out(f))}
function out(f){if(f.classList.contains('out'))return;f.classList.add('out');chime(1000);if(!document.querySelector('.fl:not(.out)'))setTimeout(finish,900)}
$('#blow').onclick=()=>{document.querySelectorAll('.fl:not(.out)').forEach((f,i)=>setTimeout(()=>out(f),i*180))};
function finish(){$('#rv').style.display='block';$('#rs').style.display='none';show(3)}function reveal(){$('#rg').innerHTML=[chosen].map(c=>`<div class="rc"><div class="ch">${c[2]}</div><div><b>${c[0]}</b> · ${c[1]}<br>${c[3]}</div></div>`).join('');$('#sp').innerHTML='💬 '+chosen[4];$('#rv').style.display='none';$('#rs').style.display='block';celebrate()}$('#open').onclick=reveal;
$('#gift').onclick=()=>{show(4);celebrate()};
$('#again2').onclick=$('#again').onclick=()=>{picked=0;$('#n').textContent='0/1';$('#tocake').style.display='none';$('#rd').textContent='แตะไพ่ที่ใจเรียกหา... 💜';build();show(1)};
// ===== กันตัดบรรทัดแปลกๆ (กลางคำ/กลางวลี) ใช้กับทุกข้อความ รวมถึงข้อความที่สร้างจาก JS =====
(()=>{
const NAMES='มะหมี่|เอิ้ดๆ|บี๋';            // ชื่อ/คำที่ห้ามตัดกลางคำ (เพิ่มได้)
const CAP=18;                                 // วลีที่ยาวไม่เกินนี้จะถูกล็อกให้อยู่บรรทัดเดียวกัน
const TH=/[\u0E00-\u0E7F]/;
const PRE=new RegExp('((?:'+NAMES+')(?:[!?.,…~]|\\s?[\\p{Extended_Pictographic}\\uFE0F\\u200D])*)','u');
const SKIP='.nb,script,style,textarea,canvas,.stars';
const T=s=>document.createTextNode(s);
const span=s=>{const e=document.createElement('span');e.className='nb';e.textContent=s;return e};
const small=x=>!TH.test(x)||x.length<=3;
function group(seg){
  const words=seg.trim().split(/\s+/).filter(Boolean);
  if(!words.length)return[T(seg)];
  const gs=[];
  for(const w of words){
    const last=gs[gs.length-1];
    if(last){
      const lw=last.slice(last.lastIndexOf(' ')+1);
      const tiny=!TH.test(w)&&w.length<=4;            // อีโมจิ/เครื่องหมาย ติดคำก่อนหน้าเสมอ
      if(tiny||((small(w)||small(lw))&&last.length+1+w.length<=CAP)){gs[gs.length-1]=last+' '+w;continue}
    }
    gs.push(w);
  }
  const out=[];
  if(/^\s/.test(seg))out.push(T(' '));
  gs.forEach((g,i)=>{
    if(i)out.push(T(' '));
    out.push(g.length<=CAP?span(g):T(g.replace(/ (?=[^\u0E00-\u0E7F\s]{1,4}$)/,'\u00A0')));
  });
  if(/\s$/.test(seg))out.push(T(' '));
  return out;
}
function proc(n){
  const t=n.nodeValue;
  if(!n.isConnected||!t||!/\S\s+\S/.test(t)&&!new RegExp(NAMES).test(t))return;
  if(n.parentElement&&n.parentElement.closest(SKIP))return;
  const f=document.createDocumentFragment();
  t.split(PRE).forEach((p,i)=>{if(!p)return;if(i%2)f.append(span(p));else group(p).forEach(x=>f.append(x))});
  n.replaceWith(f);
}
function walk(root){
  if(root.nodeType===3)return proc(root);
  if(root.nodeType!==1)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),a=[];
  while(w.nextNode())a.push(w.currentNode);
  a.forEach(proc);
}
const cfg={childList:true,characterData:true,subtree:true};
const ob=new MutationObserver(ms=>{
  const ns=[];
  ms.forEach(m=>{m.addedNodes.forEach(n=>ns.push(n));if(m.type==='characterData')ns.push(m.target)});
  ob.disconnect();ns.forEach(walk);ob.observe(document.body,cfg);
});
walk(document.body);
ob.observe(document.body,cfg);
})();