/* ===== EDIT BAGIAN INI ===== */
const CFG={
  nama:"Sayang",
  kamu:"Jojo",dia:"Ara Kesayanganku",ikonKamu:"🐻",ikonDia:"🐝",
  jarak:308,                    // jarak kalian (km), isi yang sebenarnya
  passcode:"23102006",              // ganti dengan tanggal jadian / lahir (angka)
  petunjuk:"Petunjuk: tanggal ulang tahun kamu (DDMMYYYY) 😉",
  surat:"Selamat ulang tahun untuk seseorang yang kehadirannya telah mengubah arti waktu dan hari bagiku. Di setiap detiknya, selalu ada rasa syukur yang tak pernah surut karena semesta mempertemukan kita. Semoga bertambahnya usiamu membawa ketenangan jiwa, kebahagiaan yang luas, dan terwujudnya semua mimpi indah yang selalu kamu damba. Aku di sini, akan selalu ada untuk merayakan setiap langkahmu",
  penutup:"Selamat ulang tahun ya cintaku. Semoga semua impianmu tercapai tahun ini. I love you!",
  // foto: isi src dengan data URI / URL gambar. Kosong = placeholder emoji
  foto:[
    {src:"chat-pertama.png",emoji:"💬",label:"Pertama kali chat",cap:"Awalnya cuma saling sapa lewat layar. Siapa sangka itu jadi awal dari semuanya. 🥹💗"},
    {src:"bunga.jpeg",emoji:"💐",label:"Hadiah bunga",cap:"Bunganya mungkin akan layu, tapi rasa sayangku buat kamu nggak akan. 🌷🥺💕"},
    {src:"pap-lucu.jpeg",emoji:"🤳🏻",label:"Pap lucu dari kamu",cap:"Kadang aku bingung, kok bisa ya ada manusia selucu kamu? Pantes aja aku betah, wong tiap lihat kamu bawaannya senyum sendiri. 🤏🏻💗"},
    {src:"begadang-bareng.jpeg",emoji:"🌙",label:"Begadang bareng",cap:"Ngobrol sampai larut malam, dan aku nggak pernah merasa bosan sama kamu. 🌙🫣💞"}
  ],
  musikSrc:""                    // opsional: URL/data URI mp3. Kosong = melodi kotak musik bawaan
};
/* ========================== */
const $=s=>document.querySelector(s);
const stages=[...document.querySelectorAll('.stage')];
const chibi=$('#chibi');
function go(i){stages.forEach((s,k)=>s.classList.toggle('on',k===i));window.scrollTo(0,0);i===2?Game.start():Game.stop();
  const holder={1:'#mini',6:'#fin'}[i];
  if(holder){$(holder).appendChild(chibi)}else if(i===0){$('#s1').prepend(chibi)}
  if(i===6)finale();}
function mood(m){chibi.setAttribute('class',m)}
/* gelembung */
(()=>{const b=$('#bubbles');for(let i=0;i<22;i++){const e=document.createElement('i');e.className='bub';const s=8+Math.random()*26;e.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${9+Math.random()*12}s;animation-delay:${-Math.random()*20}s`;b.appendChild(e)}})();
/* musik */
let ac,playing=false,timer,audioEl;
const MEL=[[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],[67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,1],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2.5]];
function note(m,t,d){const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=440*Math.pow(2,(m-69)/12);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.16,t+.02);g.gain.exponentialRampToValueAtTime(.0008,t+d*.9+.5);
  o.connect(g).connect(ac.destination);o.start(t);o.stop(t+d+.6)}
function loop(){if(!playing)return;const sp=.62;let t=ac.currentTime+.05;MEL.forEach(([m,b])=>{note(m,t,b*sp);t+=b*sp});timer=setTimeout(loop,(t-ac.currentTime+1.2)*1000)}
function music(on){playing=on;$('#mute').textContent=on?'🔊':'🔇';
  if(CFG.musikSrc){audioEl=audioEl||Object.assign(new Audio(CFG.musikSrc),{loop:true});on?audioEl.play().catch(()=>{}):audioEl.pause();return}
  try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(on){ac.resume();loop()}else clearTimeout(timer)}catch(e){}}
$('#mute').onclick=()=>music(!playing);
/* tahap 1 -> 2 */
$('#open').onclick=()=>{music(true);$('#mute').style.display='block';go(1);mood('curious')};
/* tahap 2: tombol jahil */
const no=$('#no'),yes=$('#yes'),hint=$('#hint');let tries=0;
const jokes=["Eh, kok kabur? 😆","Hayo, jangan bohong...","Tombolnya malu 🙈","Hampir! Coba lagi 😜","Yang benar yang kiri ya 💕","Aku sedih nih... 🥺","Nyerah aja deh, klik yang satunya 😘"];
function dodge(e){if(e&&e.preventDefault)e.preventDefault();tries++;
  no.style.position='fixed';const w=no.offsetWidth,h=no.offsetHeight,r=yes.getBoundingClientRect();let x,y,n=0;
  do{x=12+Math.random()*(innerWidth-w-24);y=70+Math.random()*(innerHeight-h-110);n++}
  while(n<30&&x<r.right+10&&x+w>r.left-10&&y<r.bottom+10&&y+h>r.top-10);
  no.style.left=x+'px';no.style.top=y+'px';
  hint.textContent=jokes[Math.min(tries-1,jokes.length-1)];
  mood('sad');clearTimeout(dodge.t);dodge.t=setTimeout(()=>mood('curious'),1100);
  yes.style.transform=`scale(${Math.min(1+tries*.07,1.5)})`}
['mouseenter','touchstart','pointerdown','focus'].forEach(ev=>no.addEventListener(ev,dodge,{passive:false}));
yes.onclick=()=>{mood('joy');hint.textContent="Yeay! Aku juga sayang kamu 💖";setTimeout(()=>{go(2);mood('wave')},900)};
/* tahap 2: Jarak Kita */
const Game=(()=>{
let p=0,iv,done=false;
$('#pi1').textContent=CFG.ikonKamu;$('#pn1').textContent=CFG.kamu;$('#pi2').textContent=CFG.ikonDia;$('#pn2').textContent=CFG.dia;
const ms=[[0,'Jarak memisahkan kita, tapi hati kita tetap saling mencari 💭'],[.2,'Menyeberangi lautan 🌊'],[.4,'Menembus awan ☁️'],[.6,'Melewati kota-kota yang gemerlap 🌃'],[.8,'Tinggal sedikit lagi... 💓'],[1,'Akhirnya kita bertemu! 💞']];
function draw(){const a=8+p*36,z=92-p*36;
 $('#pa').style.left=a+'%';$('#pz').style.left=z+'%';$('#ln').style.left=a+'%';$('#ln').style.width=(z-a)+'%';$('#mh').style.left=(a+z)/2+'%';
 $('#bar').style.width=p*100+'%';$('#km').textContent=Math.round(CFG.jarak*(1-p)).toLocaleString('id-ID')+' km lagi';
 $('#dm').textContent=ms.filter(m=>m[0]<=p).pop()[1]}
function add(d){if(done)return;p=Math.min(1,p+d);draw();
 if(p>=1){done=true;clearInterval(iv);$('#nx').style.display='inline-block';$('#near').style.display='none';$('#mh').textContent='💞';$('#mh').style.fontSize='2.6rem'}}
const b=$('#near');
b.addEventListener('pointerdown',e=>{e.preventDefault();add(.04);clearInterval(iv);iv=setInterval(()=>add(.012),60)});
['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>clearInterval(iv)));
b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();add(.05)}});
const next=()=>{clearInterval(iv);go(3);mood('wave')};
$('#nx').onclick=next;$('#skip').onclick=next;
return{start(){p=0;done=false;$('#nx').style.display='none';b.style.display='';$('#mh').textContent='💗';$('#mh').style.fontSize='';draw()},stop(){clearInterval(iv)}}})();

/* tahap 3: surat */
$('#phint').textContent=CFG.petunjuk;
function unlock(){const pin=$('#pin');
  if(pin.value.trim()===CFG.passcode){$('#env').classList.add('open');$('#pass').style.display='none';$('#phint').style.display='none';
    setTimeout(()=>{$('#env').style.display='none';$('#t3').textContent='Untukmu 💖';const l=$('#letter');l.textContent=CFG.surat;l.style.display='block';$('#toGal').style.display='inline-block'},900)}
  else{pin.classList.remove('shake');void pin.offsetWidth;pin.classList.add('shake');$('#phint').textContent='Belum tepat, coba lagi ya 💭 '+CFG.petunjuk}}
$('#unlock').onclick=unlock;$('#pin').addEventListener('keydown',e=>{if(e.key==='Enter')unlock()});
$('#toGal').onclick=()=>go(4);
/* tahap 4: Mekarkan Lily */
const bloomed=new Set();
$('#grid').innerHTML=CFG.foto.map((f,i)=>`<button class="bud" data-i="${i}" aria-label="Kuncup lily ${i+1}"><svg viewBox="0 0 120 110"><use href="#lily"/></svg><span>Ketuk</span></button>`).join('');
for(let i=0;i<12;i++){const e=document.createElement('i');e.className='ff';e.style.cssText=`left:${Math.random()*96}%;top:${Math.random()*90}%;animation-delay:${-Math.random()*5}s`;$('#pond').appendChild(e)}
function cnt(){$('#bc').textContent=`Mekar ${bloomed.size}/${CFG.foto.length} 🪷`;if(bloomed.size===CFG.foto.length)$('#toFin').style.display='inline-block'}
$('#grid').addEventListener('click',e=>{const b=e.target.closest('.bud');if(!b)return;const f=CFG.foto[b.dataset.i];
 b.classList.add('on');b.querySelector('span').textContent=f.label;bloomed.add(b.dataset.i);cnt();
 $('#bph').style.backgroundImage=f.src?`url('${f.src}')`:'';$('#bph').textContent=f.src?'':f.emoji;$('#blb').textContent=f.label;$('#bcap').textContent=f.cap;$('#bm').classList.add('show')});
$('#bm').addEventListener('click',e=>{if(!e.target.closest('.mc'))$('#bm').classList.remove('show')});
$('#bx').onclick=()=>$('#bm').classList.remove('show');
cnt();
/* tahap 5: Tiup lilin */
const left=()=>document.querySelectorAll('.cd:not(.out)').length;
function out(n=1){[...document.querySelectorAll('.cd:not(.out)')].slice(0,n).forEach(x=>x.classList.add('out'));
 if(!left()){$('#cm').textContent='Semoga semua permohonanmu terkabul 💖';setTimeout(()=>go(6),1800)}else $('#cm').textContent='Masih ada '+left()+' lilin lagi... 💨'}
$('#blow').onclick=()=>out(1);
$('#cake').addEventListener('click',e=>{const c=e.target.closest('.cd');if(c&&!c.classList.contains('out')){c.classList.add('out');out(0)}});
$('#mic').onclick=async()=>{try{const s=await navigator.mediaDevices.getUserMedia({audio:true}),c=new (window.AudioContext||window.webkitAudioContext)(),a=c.createAnalyser(),d=new Uint8Array(a.fftSize);c.createMediaStreamSource(s).connect(a);let n=0;$('#cm').textContent='Tiup ke arah mikrofon... 🎤';
 const t=setInterval(()=>{a.getByteTimeDomainData(d);let m=0;d.forEach(v=>m=Math.max(m,Math.abs(v-128)));n=m>70?n+1:0;if(n>4||!left()){clearInterval(t);s.getTracks().forEach(x=>x.stop());c.close();if(left())out(9)}},60)}catch(e){$('#cm').textContent='Mikrofon tidak bisa dipakai, tekan Tiup saja ya 💨'}};
function resetAll(){bloomed.clear();document.querySelectorAll('.bud').forEach(b=>{b.classList.remove('on');b.querySelector('span').textContent='Ketuk'});$('#toFin').style.display='none';cnt();document.querySelectorAll('.cd').forEach(c=>c.classList.remove('out'));$('#cm').textContent=''}
$('#toFin').onclick=()=>go(5);
/* tahap 5: finale */
let fxT;
function finale(){mood('joy');$('#ft').textContent=CFG.penutup;
  clearInterval(fxT);const em=['💖','⭐','✨','💕','🎉','🌟'];
  const spawn=()=>{const e=document.createElement('span');e.className='fx';e.textContent=em[Math.floor(Math.random()*em.length)];
    e.style.cssText=`left:${Math.random()*100}%;font-size:${16+Math.random()*24}px;animation-duration:${3+Math.random()*3}s`;document.body.appendChild(e);setTimeout(()=>e.remove(),6500)};
  for(let i=0;i<24;i++)setTimeout(spawn,i*80);fxT=setInterval(spawn,260)}
$('#again').onclick=()=>{clearInterval(fxT);document.querySelectorAll('.fx').forEach(e=>e.remove());tries=0;hint.textContent='';no.style.position='';yes.style.transform='';$('#pin').value='';$('#env').style.display='';$('#env').classList.remove('open');$('#pass').style.display='flex';$('#phint').style.display='';$('#phint').textContent=CFG.petunjuk;$('#letter').style.display='none';$('#toGal').style.display='none';$('#t3').textContent='Pesan rahasia untukmu 💌';resetAll();go(0);mood('wave')};
