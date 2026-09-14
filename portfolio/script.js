
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* awards */
const cards = [...document.querySelectorAll('.award-card')];
const dots = document.getElementById('awardDots');
let awardIndex = 0;
let awardTimer = null;
let awardPaused = false;

cards.forEach((_,i)=>{
  const b=document.createElement('button');
  b.setAttribute('aria-label',`第 ${i+1} 张奖项`);
  b.onclick=()=>{awardIndex=i; renderAwards(); restartAwardTimer();}
  dots.appendChild(b);
});

function renderAwards(){
  cards.forEach((card,i)=>{
    let diff=i-awardIndex;
    if(diff > 1) diff -= cards.length;
    if(diff < -1) diff += cards.length;
    card.dataset.pos=String(diff);
  });
  [...dots.children].forEach((d,i)=>d.classList.toggle('active',i===awardIndex));
}
function nextAward(dir=1){
  awardIndex=(awardIndex+dir+cards.length)%cards.length;
  renderAwards();
}
function startAwardTimer(){
  clearInterval(awardTimer);
  awardTimer=setInterval(()=>{ if(!awardPaused) nextAward(1); },3800);
}
function restartAwardTimer(){ clearInterval(awardTimer); startAwardTimer(); }

document.getElementById('awardPrev').onclick=()=>{nextAward(-1);restartAwardTimer()};
document.getElementById('awardNext').onclick=()=>{nextAward(1);restartAwardTimer()};

const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
const closeBtn=document.getElementById('lightboxClose');
cards.forEach(card=>{
  card.addEventListener('click',()=>{
    const img=card.querySelector('img');
    awardPaused=true;
    lightboxImage.src=img.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  awardPaused=false;
}
closeBtn.onclick=closeLightbox;
lightbox.addEventListener('click',e=>{if(e.target===lightbox) closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeLightbox()});
renderAwards(); startAwardTimer();

/* reusable sliders */
const state = {
  tv: {
    index: 0,
    track: document.getElementById('tvTrack'),
    counter: document.getElementById('tvCounter'),
    count: 3
  },
  wechat: {
    index: 0,
    track: document.getElementById('wechatTrack'),
    counter: document.getElementById('wechatCounter'),
    count: 3
  },
  paper: {
    index: 0,
    track: document.getElementById('paperTrack'),
    counter: document.getElementById('paperCounter'),
    count: 3
  }
};

function renderSlider(name, animateCounter = true) {
  const s = state[name];
  if (!s || !s.track) return;

  s.track.style.transform = `translateX(${-100 * s.index}%)`;

  if (s.counter) {
    s.counter.textContent = `${s.index + 1} / ${s.count}`;

    if (animateCounter) {
      s.counter.classList.remove('counter-pop');
      void s.counter.offsetWidth;
      s.counter.classList.add('counter-pop');
    }
  }
}

function moveSlider(name, dir) {
  const s = state[name];
  if (!s) return;
  s.index = (s.index + dir + s.count) % s.count;
  renderSlider(name, true);
}

document.querySelectorAll('[data-slider]').forEach(btn => {
  btn.addEventListener('click', () => {
    moveSlider(btn.dataset.slider, Number(btn.dataset.dir));
  });
});

function bindSwipe(name) {
  const s = state[name];
  if (!s || !s.track) return;

  let startX = 0;
  let currentX = 0;
  let active = false;
  const el = s.track.parentElement;

  el.addEventListener('pointerdown', e => {
    active = true;
    startX = e.clientX;
    currentX = startX;
    el.setPointerCapture?.(e.pointerId);
  });

  el.addEventListener('pointermove', e => {
    if (active) currentX = e.clientX;
  });

  el.addEventListener('pointerup', () => {
    if (!active) return;
    const delta = currentX - startX;
    if (Math.abs(delta) > 45) {
      moveSlider(name, delta < 0 ? 1 : -1);
    }
    active = false;
  });

  el.addEventListener('pointercancel', () => {
    active = false;
  });
}

['tv', 'wechat', 'paper'].forEach(name => {
  renderSlider(name, false);
  bindSwipe(name);
});

/* video fallback for browser autoplay edge cases */
const bgVideo=document.getElementById('bgVideo');
bgVideo.play().catch(()=>{});
