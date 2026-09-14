export function initPortfolioAdditions(root) {
  const A='./portfolio/assets/';
  const image=(file,alt)=>`<img src="${A+file}" alt="${alt}" loading="lazy" decoding="async" draggable="false">`;
  const carousel=(id,label,slides,kind='tv')=>`<div class="media-carousel ${kind}-carousel" data-carousel="${id}" aria-label="${label}"><div class="media-shell"><div class="media-track" tabindex="0" aria-label="${label}，左右滑动切换">${slides.map((s,i)=>`<div class="media-slide" role="group" aria-label="${i+1} / ${slides.length}">${s}</div>`).join('')}</div></div><div class="media-controls"><button type="button" data-step="-1" aria-label="${label}上一项">‹</button><span class="media-count" aria-live="polite">1 / ${slides.length}</span><button type="button" data-step="1" aria-label="${label}下一项">›</button></div></div>`;
  const videos=['假如秽土的是马斑1','假如秽土的是马斑2','佐助VS新春鼬兄弟之战','忍界大战第五集'].map((title,i)=>`<figure class="video-work"><video controls playsinline preload="none" poster="${A}ai-poster-${i+1}.jpg" aria-label="${title}" data-src="${A}ai-web-${i+1}.mp4"></video><figcaption><span>${title}</span><div class="video-options"><button type="button" class="play-work" aria-label="播放${title}">播放</button><label>倍速 <select aria-label="${title}播放速度"><option value="0.5">0.5×</option><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label></div></figcaption></figure>`);
  const certs=[['cert-douyin.jpeg','抖音青创认证'],['cert-tencent.jpg','腾讯手游认证']].map(([f,t])=>`<figure>${image(f,t)}<figcaption>${t}</figcaption></figure>`);
  const stats=['data-1.webp','data-2.webp','data-3.webp'].map((f,i)=>`<a href="${A+f}" target="_blank" rel="noopener" aria-label="放大查看账号数据${i+1}">${image(f,'我的账号数据 '+(i+1))}</a>`);
  const productions=[['production-1.jpg','养母别哭，女儿回来了','https://www.mgtv.com/b/900501/24597758.html?fpa=se'],['production-2.jpg','穿成宁采臣后我带崩了神仙界','https://m.v.qq.com/x/m/play?cid=mzc0036lz77nyad&vid=i3192g0psq2'],['production-3.jpeg','废柴厨神靠小龙虾风靡大夏','https://novelquickapp.com/s/SbPPxyRRtH8/']].map(([f,t,url])=>`<a class="production-link" href="${url}" target="_blank" rel="noopener noreferrer">${image(f,t)}<span>${t}<small>点击观看 ↗</small></span></a>`);
  const early=Array.from({length:5},(_,i)=>{const file=i===4?'early-5-v2.webp':'early-'+(i+1)+'.jpg';return `<a href="${A+file}" target="_blank" rel="noopener" aria-label="放大查看早期参演照片${i+1}">${image(file,'早期参演照片 '+(i+1))}</a>`;});
  const radio=['早安綦江','綦江日报','早安綦江'].map((t,i)=>`<figure>${image('radio-'+(i+1)+'.webp',t+'栏目作品截图')}<figcaption>${t}</figcaption></figure>`);
  const pages=document.createElement('div');pages.className='additional-pages';pages.innerHTML=`
    <section class="page added-page" id="ai-works"><div class="section-kicker">AI FILMMAKING</div><h2>我的AI作品</h2>${carousel('ai','AI作品',videos,'video')}
      <div class="credentials-grid"><article class="credential-column"><h3>我的认证</h3>${carousel('certification','我的认证',certs,'phone')}</article><article class="data-column"><h3>我的账号数据</h3>${carousel('account','账号数据',stats)}<p class="account-summary">全网统一账户ID：空心带土，单条AI视频全网最高播放量突破400万，点赞量突破20万，平均视频10万播放量</p></article></div>
    </section>
    <section class="page added-page" id="productions"><div class="section-kicker">SELECTED PRODUCTIONS</div><h2>我的参与制作</h2>${carousel('productions','参与制作',productions,'production')}</section>
    <section class="page added-page" id="radio-experience"><div class="section-kicker">BROADCAST EXPERIENCE</div><h2>我的电台经历</h2>${carousel('radio','电台经历',radio,'phone')}<p class="radio-caption">负责<strong>《綦江日报》</strong>、<strong>《早安綦江》</strong>栏目素材拍摄、视频剪辑、成片输出工作。</p></section>
    <section class="page added-page" id="early-acting"><div class="section-kicker">EARLY APPEARANCES</div><h2>我的早期参演</h2>${carousel('early','早期参演',early)}</section>
    <section class="contact-end" id="contact-end" aria-label="微信联系"><div class="contact-center">${image('contact-qr.jpeg','宋致远的微信联系二维码')}<p>感谢您的观看，可扫描微信二维码联系我哦～</p></div><img class="footer-people" src="${A}footer-people.webp" alt="" aria-hidden="true"></section>`;
  root.querySelector('footer').remove();root.querySelector('main').appendChild(pages);
  const style=document.createElement('link');style.rel='stylesheet';style.href='./portfolio-additions.css';root.appendChild(style);
  const nav=root.querySelector('.nav-links');[['ai-works','AI作品'],['productions','参与制作'],['radio-experience','电台经历'],['early-acting','早期参演'],['contact-end','联系我']].forEach(([id,label])=>{const a=document.createElement('a');a.href='#'+id;a.textContent=label;nav.appendChild(a);});
  root.querySelectorAll('[data-carousel]').forEach(shell=>{
    const track=shell.querySelector('.media-track'),slides=[...track.children],counter=shell.querySelector('.media-count');let current=0,frame=0;
    function update(){frame=0;const next=Math.max(0,Math.min(slides.length-1,Math.round(track.scrollLeft/track.clientWidth)));if(next!==current)slides[current].querySelector('video')?.pause();current=next;counter.textContent=`${current+1} / ${slides.length}`;}
    const move=dir=>track.scrollTo({left:((current+dir+slides.length)%slides.length)*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
    track.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update);},{passive:true});shell.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>move(Number(b.dataset.step))));
    track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}});
    new ResizeObserver(()=>{track.scrollTo({left:current*track.clientWidth,behavior:'instant'});}).observe(track);
    let drag=null,suppressClick=false;
    track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('video,button,select,label'))return;drag={x:e.clientX,y:e.clientY,left:track.scrollLeft,moved:false};suppressClick=false;});
    track.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>8){drag.moved=true;suppressClick=true;track.style.scrollSnapType='none';track.setPointerCapture(e.pointerId);e.preventDefault();track.scrollLeft=drag.left-dx;}});
    const finish=()=>{if(!drag)return;const moved=drag.moved;drag=null;track.style.scrollSnapType='';if(moved){update();track.scrollTo({left:current*track.clientWidth,behavior:'smooth'});}};
    track.addEventListener('pointerup',finish);track.addEventListener('pointercancel',finish);track.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;}},true);
  });
  const allVideos=[...root.querySelectorAll('.video-work video')];
  function prepareVideo(video){if(!video.getAttribute('src')){video.src=video.dataset.src;video.preload='metadata';video.load();}}
  const visibility=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)prepareVideo(e.target);else e.target.pause();}),{threshold:.05});
  allVideos.forEach(video=>{
    const figure=video.closest('figure'),button=figure.querySelector('.play-work');
    const status=document.createElement('p');status.className='video-status';status.setAttribute('role','status');figure.appendChild(status);
    figure.querySelector('select').addEventListener('change',e=>video.playbackRate=Number(e.target.value));
    button.addEventListener('click',()=>{prepareVideo(video);if(video.error)video.load();if(video.paused)video.play().catch(()=>{status.textContent='视频暂时无法播放，请点击重试。';button.textContent='重试播放';});else video.pause();});
    video.addEventListener('play',()=>{allVideos.forEach(v=>{if(v!==video)v.pause();});button.textContent='暂停';button.setAttribute('aria-label','暂停'+video.getAttribute('aria-label'));});
    video.addEventListener('pause',()=>{button.textContent='播放';button.setAttribute('aria-label','播放'+video.getAttribute('aria-label'));});
    video.addEventListener('waiting',()=>status.textContent='正在缓冲…');video.addEventListener('playing',()=>status.textContent='');video.addEventListener('canplay',()=>status.textContent='');
    video.addEventListener('error',()=>{status.textContent='视频加载失败，请点击重试。';});visibility.observe(video);
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)allVideos.forEach(v=>v.pause());});
}
