// Launch day: put the App Store link here (one line). While it is empty the badges say "Coming soon".
const APP_STORE_URL = "";
(function(){
const $=(s)=>document.querySelector(s), $$=(s)=>document.querySelectorAll(s);
const S={d:0,p:false,week:1,shelf:0,plan:'yr',cur:'INR'};
const titles=['Plant a habit','Day one. A sprout.','Leaves unfold','Halfway there','A trunk appears','Taking shape','One more day','It bloomed!'];
const story=['Give it a name and a weekly goal, like every day. A seed goes into its pot right away. Tap Monday.','One check-in, +10 Sunlight on the spot, and the seed shows its first leaves.','Second check-in. The bonsai stretches up and its leaves unfold.','Three days in. Nothing to break, nothing to lose; just a plant that keeps growing.','The little trunk thickens and bends. The sky outside has turned golden.','Pads of green appear on the branches. Almost a real bonsai now.','Saturday night. One more check-in and it blooms.','Sunday hits the weekly goal: full bloom, a +21 bonus, and the pot moves to your windowsill for keeps. Press next for week two.'];
const labels=['Before you start','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
function render(){const d=S.d,stage=1+d,checked=d>=1&&S.p;
 for(let i=1;i<=8;i++){$('#hp'+i).classList.toggle('on',i===stage);$('#mp'+i).classList.toggle('on',i===stage);}
 $('#stage').textContent=stage;$('#c').textContent=d;$('#n').textContent=checked?1:0;
 const earned=d*10+(d>=7?21:0);$('#earned').textContent=earned;$('#earned2').textContent=earned;$('#sun').textContent=60+earned;
 $('#line').textContent=d===0?'each one is a tiny promise to yourself':(checked?'everyone is glowing today':'lovely, keep going');
 $('#m66').style.width=Math.round((12+d)/66*100)+'%';$('#tot').textContent=12+d;
 $('#daysLeft').textContent=d>=7?'ALL SET':(d===6?'LAST DAY':(7-d)+' DAYS LEFT');
 for(let i=0;i<7;i++){const c=$('#wc'+i);c.className='cell'+(i<d?' done':(i===d&&d<7?' now':''));c.textContent=i<d?'\u2713':(i===d&&d<7?'\u2022':'');
  const t=$('#tl'+i);t.className='day'+(i<d?' done':(i===d?' now':''));}
 $('#note').textContent=d===0?'water it every day to bloom':(d<6?(7-d)+' more to bloom':(d===6?'1 more and it blooms!':'in full bloom this week'));
 $('#checkin').style.display=d===0?'':'none';$('#done').style.display=d>=1?'flex':'none';
 $('#next').textContent=d>=7?'\u21bb':'\u25B6';
 $('#dayLabel').textContent=labels[d]+(d?' \u00b7 week '+S.week:'');$('#title').textContent=titles[d];{const cap=$('#tlcap');if(cap)cap.textContent=d?(labels[d]+' \u00b7 '+titles[d]):'Tap a day to grow the bonsai';}$('#story').textContent=story[d];
 const pp=checked?1:0,th=Math.PI-pp*Math.PI/2,cc=Math.cos(th),sn=Math.sin(th);
 const sun=$('#sr-sun');sun.style.transition='transform 1.4s cubic-bezier(.3,1,.4,1)';sun.style.transform='translate('+(159+113*cc)+'px,'+(92-56*sn)+'px)';
 const op=(el,v,t)=>{el.style.transition='opacity '+(t||1)+'s';el.style.opacity=v;};
 op($('#sr-glow'),.35+pp*.65);op($('#sr-rays'),.3+pp*.7);op($('#sr-day'),pp*.95,1.2);op($('#sr-stars'),1-pp,.8);op($('#sr-birds'),pp?1:0,.8);
}
function bump(el){el.classList.remove('grow');void el.offsetWidth;el.classList.add('grow');}
function step(n){if(n<1||n>7)return;const bloom=n===7&&S.d<7;S.d=n;S.p=false;render();bump($('#hplant'));bump($('#sunchip'));setTimeout(()=>{S.p=true;render();},60);
 if(bloom){const c=$('#conf');c.classList.remove('boom');void c.offsetWidth;c.classList.add('boom');S.shelf++;}}
for(let i=0;i<7;i++)$('#tl'+i).addEventListener('click',()=>step(i+1));
$('#next').addEventListener('click',()=>{if(S.d>=7){S.d=0;S.week++;render();}else step(S.d+1);});
$('#checkin').addEventListener('click',()=>step(1));
$$('[data-grow]').forEach(b=>b.addEventListener('click',()=>{const w=b.querySelector('.win');w.classList.remove('play');void w.offsetWidth;w.classList.add('play');}));
const P={INR:{yr:['\u20B9999','/ year'],mo:['\u20B9149','/ month'],life:['\u20B91,999','once']},USD:{yr:['$19.99','/ year'],mo:['$2.99','/ month'],life:['$39.99','once']}};
function renderPro(){const p=P[S.cur];['yr','mo','life'].forEach(k=>{$('[data-price="'+k+'"]').textContent=p[k][0];$('[data-per="'+k+'"]').textContent=p[k][1];$('[data-plan="'+k+'"]').classList.toggle('on',S.plan===k);});
 $$('[data-cur]').forEach(b=>b.classList.toggle('on',b.dataset.cur===S.cur));
 $('#cta').textContent=S.plan==='yr'?'Start a 3-day free trial':(S.plan==='mo'?'Subscribe for '+p.mo[0]+' a month':'Get Pro forever for '+p.life[0]);}
$$('[data-plan]').forEach(b=>b.addEventListener('click',()=>{S.plan=b.dataset.plan;renderPro();}));
$$('[data-cur]').forEach(b=>b.addEventListener('click',()=>{S.cur=b.dataset.cur;renderPro();}));
$('#replay66').addEventListener('click',()=>{const g=$('#goldcard');g.classList.remove('play66');void g.offsetWidth;g.classList.add('play66');});
render();renderPro();
})();
(function(){
 if(!APP_STORE_URL) return;
 document.querySelectorAll('[data-store]').forEach(function(el){
  var a=document.createElement('a');a.className=el.className;a.href=APP_STORE_URL;a.setAttribute('data-store','');
  a.setAttribute('aria-label','Download Sprout on the App Store');
  a.innerHTML=el.innerHTML.replace('Coming soon on the','Download on the');el.replaceWith(a);});
 var cta=document.getElementById('cta');if(cta)cta.href=APP_STORE_URL;
})();

/* play the golden celebration when it scrolls into view */
(function(){var g=document.getElementById('goldcard');if(!g||!('IntersectionObserver' in window))return;var done=false;
new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting&&!done){done=true;g.classList.add('play66');o.disconnect();}});},{threshold:.55}).observe(g);})();


/* the snowy shelf only animates while it is on screen */
(function(){var w=document.querySelector('.wcard');if(!w||!('IntersectionObserver' in window))return;
new IntersectionObserver(function(es){es.forEach(function(e){w.classList.toggle('is-off',!e.isIntersecting);});},{threshold:0}).observe(w);})();
