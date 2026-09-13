import {initPortfolioAdditions} from './portfolio-additions.js';
const host=document.querySelector('#portfolio-extension');
const root=host.attachShadow({mode:'open'});
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
root.innerHTML="<style>\n:host{\n  --bg:#030303;\n  --fg:#f5f5f7;\n  --muted:rgba(245,245,247,.68);\n  --line:rgba(255,255,255,.14);\n  --glass:rgba(18,18,20,.52);\n  --shadow:0 30px 100px rgba(0,0,0,.45);\n}\n*{box-sizing:border-box}\n:host{scroll-behavior:smooth}\n:host{\n  margin:0;background:var(--bg);color:var(--fg);\n  font-family:-apple-system,BlinkMacSystemFont,\"SF Pro Display\",\"PingFang SC\",\"Microsoft YaHei\",Arial,sans-serif;\n  -webkit-font-smoothing:antialiased;\n}\nbutton,a{font:inherit}\na{color:inherit;text-decoration:none}\nbutton{color:inherit}\n.bg-video{\n  position:fixed;inset:0;width:100%;height:100%;object-fit:cover;z-index:-4;\n  filter:saturate(.9) contrast(1.03) brightness(.62);\n}\n.bg-shade{\n  position:fixed;inset:0;z-index:-3;\n  background:\n    radial-gradient(circle at 50% 20%,rgba(0,0,0,.12),rgba(0,0,0,.7) 76%),\n    linear-gradient(to bottom,rgba(0,0,0,.28),rgba(0,0,0,.72));\n}\n.grain{\n  position:fixed;inset:0;pointer-events:none;z-index:-2;opacity:.12;\n  background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E\");\n}\n.nav-shell{position:fixed;top:18px;left:0;right:0;z-index:50;display:flex;justify-content:center;padding:0 16px}\n.nav{\n  width:min(760px,100%);height:58px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;\n  background:rgba(20,20,22,.55);border:1px solid rgba(255,255,255,.15);border-radius:20px;\n  backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);\n  box-shadow:0 12px 40px rgba(0,0,0,.28)\n}\n.brand{font-weight:700;letter-spacing:-.02em}\n.nav-links{display:flex;gap:24px;font-size:13px;color:rgba(255,255,255,.78)}\n.nav-links a:hover{color:#fff}\n.page{\n  width:min(1320px,100%);min-height:100vh;margin:0 auto;padding:132px 28px 110px;\n  display:flex;flex-direction:column;justify-content:center\n}\n.section-kicker{\n  text-transform:uppercase;letter-spacing:.18em;font-size:12px;font-weight:700;color:rgba(255,255,255,.52);\n  margin-bottom:16px\n}\nh1,h2{\n  margin:0 0 36px;letter-spacing:-.055em;line-height:.92;font-size:clamp(64px,10vw,148px);font-weight:700\n}\n.section-subtitle{max-width:680px;margin:-12px 0 50px;color:var(--muted);font-size:18px;line-height:1.75}\n.glass{\n  background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.06));\n  border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(30px) saturate(140%);\n  -webkit-backdrop-filter:blur(30px) saturate(140%);box-shadow:var(--shadow)\n}\n.about-card{\n  align-self:center;width:min(1020px,94vw);padding:14px;border-radius:34px;overflow:hidden\n}\n.about-card img{display:block;width:100%;height:auto;border-radius:23px}\n.intro{\n  align-self:center;max-width:950px;margin:42px auto 0;text-align:center;color:rgba(255,255,255,.88);\n  font-size:clamp(18px,2vw,26px);line-height:1.8;letter-spacing:.01em\n}\n.scroll-hint{\n  align-self:center;margin-top:44px;width:46px;height:46px;display:grid;place-items:center;\n  border:1px solid rgba(255,255,255,.18);border-radius:50%;background:rgba(255,255,255,.06)\n}\n.award-stage{\n  position:relative;min-height:650px;display:grid;place-items:center;perspective:1600px\n}\n.award-carousel{position:relative;width:min(1000px,88vw);height:600px;transform-style:preserve-3d}\n.award-card{\n  position:absolute;inset:0;margin:auto;width:min(780px,76vw);height:560px;padding:0;border:0;background:transparent;\n  border-radius:34px;overflow:hidden;cursor:zoom-in;transition:transform .75s cubic-bezier(.2,.8,.2,1),opacity .65s,filter .65s;\n  box-shadow:0 40px 100px rgba(0,0,0,.48)\n}\n.award-card img{width:100%;height:100%;object-fit:contain;background:rgba(8,8,8,.72);display:block}\n.award-card[data-pos=\"0\"]{transform:translateX(0) translateZ(80px) rotateY(0);opacity:1;z-index:3;filter:none}\n.award-card[data-pos=\"-1\"]{transform:translateX(-37%) translateZ(-100px) rotateY(20deg) scale(.86);opacity:.54;z-index:2;filter:blur(.3px)}\n.award-card[data-pos=\"1\"]{transform:translateX(37%) translateZ(-100px) rotateY(-20deg) scale(.86);opacity:.54;z-index:2;filter:blur(.3px)}\n.arrow{\n  position:absolute;z-index:8;width:52px;height:52px;border:1px solid rgba(255,255,255,.18);border-radius:50%;\n  background:rgba(20,20,20,.58);backdrop-filter:blur(14px);cursor:pointer;font-size:32px;display:grid;place-items:center\n}\n.arrow:hover{background:rgba(255,255,255,.16)}\n.arrow.prev{left:0}.arrow.next{right:0}\n.dots{display:flex;justify-content:center;gap:8px;margin-top:8px}\n.dots button{width:8px;height:8px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.28);cursor:pointer}\n.dots button.active{width:24px;border-radius:999px;background:#fff}\n.news-grid{display:grid;grid-template-columns:.86fr 1.14fr;gap:24px;align-items:stretch}\n.showcase{border-radius:36px;padding:28px;overflow:hidden}\n.showcase-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:24px}\n.mini-label{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:rgba(255,255,255,.48)}\n.showcase h3{font-size:28px;margin:8px 0 0;letter-spacing:-.03em}\n.gesture{font-size:12px;color:rgba(255,255,255,.48)}\n.phone-wrap{display:flex;flex-direction:column;align-items:center}\n.phone{\n  position:relative;width:min(390px,80vw);height:710px;background:#0b0b0d;border:1px solid rgba(255,255,255,.22);\n  border-radius:52px;padding:12px;box-shadow:0 36px 90px rgba(0,0,0,.46)\n}\n.phone-island{position:absolute;top:21px;left:50%;transform:translateX(-50%);width:108px;height:31px;background:#000;border-radius:999px;z-index:5}\n.phone-screen{width:100%;height:100%;border-radius:41px;overflow:hidden;background:#111;touch-action:pan-y}\n.mobile-track,.paper-track{display:flex;height:100%;transition:transform .55s cubic-bezier(.2,.8,.2,1)}\n.slide{min-width:100%;height:100%;display:flex;justify-content:center;align-items:flex-start;overflow:auto;scrollbar-width:none}\n.slide::-webkit-scrollbar{display:none}\n.mobile-track .slide{background:#111}\n.mobile-track img{width:100%;height:auto;display:block}\n.paper-frame{\n  width:100%;height:710px;border-radius:24px;overflow:hidden;background:#ececec;box-shadow:0 28px 70px rgba(0,0,0,.35);\n  touch-action:pan-y\n}\n.paper-track .slide{align-items:center;padding:18px;background:linear-gradient(135deg,#ddd,#f4f4f4)}\n.paper-track img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 16px 25px rgba(0,0,0,.18))}\n.slider-controls{display:flex;justify-content:center;align-items:center;gap:14px;margin-top:18px}\n.slider-controls button{\n  width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);cursor:pointer;font-size:24px\n}\n.slider-controls span{min-width:52px;text-align:center;font-size:12px;color:var(--muted)}\n.lightbox{\n  position:fixed;inset:0;z-index:100;display:none;align-items:center;justify-content:center;padding:34px;\n  background:rgba(0,0,0,.82);backdrop-filter:blur(18px)\n}\n.lightbox.open{display:flex}\n.lightbox img{max-width:94vw;max-height:88vh;object-fit:contain;border-radius:22px;box-shadow:0 30px 120px rgba(0,0,0,.72)}\n.close{position:absolute;top:26px;right:30px;width:48px;height:48px;border:1px solid rgba(255,255,255,.22);border-radius:50%;background:rgba(255,255,255,.08);font-size:30px;cursor:pointer}\n.lightbox-tip{position:absolute;bottom:22px;color:rgba(255,255,255,.62);font-size:12px}\nfooter{\n  width:min(1320px,100%);margin:0 auto;padding:0 28px 42px;display:flex;justify-content:space-between;\n  color:rgba(255,255,255,.42);font-size:12px\n}\n.reveal{opacity:0;transform:translateY(28px);transition:opacity .85s ease,transform .85s ease}\n.reveal.visible{opacity:1;transform:none}\n@media(max-width:900px){\n  .page{padding:118px 18px 84px}\n  .nav-links{gap:14px}.nav-links a{font-size:12px}\n  .news-grid{grid-template-columns:1fr}\n  .award-stage{min-height:520px}.award-carousel{height:490px}.award-card{height:450px;width:min(680px,78vw)}\n  .arrow.prev{left:2px}.arrow.next{right:2px}\n  .paper-frame{height:620px}\n}\n@media(max-width:600px){\n  .nav-links a:nth-child(2){display:none}\n  h1,h2{font-size:clamp(54px,18vw,88px)}\n  .about-card{width:100%;padding:8px;border-radius:24px}\n  .intro{font-size:17px;text-align:left}\n  .award-stage{min-height:430px}.award-carousel{height:400px}.award-card{height:370px;width:82vw}\n  .award-card[data-pos=\"-1\"]{transform:translateX(-22%) scale(.86);opacity:.28}\n  .award-card[data-pos=\"1\"]{transform:translateX(22%) scale(.86);opacity:.28}\n  .arrow{width:44px;height:44px}\n  .showcase{padding:18px;border-radius:28px}\n  .phone{height:640px}\n  .paper-frame{height:540px}\n  footer{flex-direction:column;gap:8px}\n}\n@media (prefers-reduced-motion:reduce){\n  *{scroll-behavior:auto!important;transition:none!important}\n  .bg-video{display:none}\n  :host{background:#050505}\n}\n\n\n.tv-showcase{\n  width:min(1120px,100%);\n  margin:72px auto 0;\n  padding:28px;\n  border-radius:36px;\n}\n.tv-shell{\n  position:relative;\n  width:min(980px,100%);\n  margin:8px auto 0;\n  padding-bottom:46px;\n}\n.tv-bezel{\n  position:relative;\n  background:linear-gradient(145deg,#191a1d,#070708);\n  border:1px solid rgba(255,255,255,.2);\n  border-radius:34px;\n  padding:16px 16px 22px;\n  box-shadow:\n    0 42px 110px rgba(0,0,0,.58),\n    inset 0 1px 0 rgba(255,255,255,.08);\n}\n.tv-screen{\n  width:100%;\n  aspect-ratio:16/9;\n  overflow:hidden;\n  border-radius:22px;\n  background:#000;\n  border:1px solid rgba(255,255,255,.08);\n  touch-action:pan-y;\n}\n.tv-track{\n  display:flex;\n  height:100%;\n  transition:transform .55s cubic-bezier(.2,.8,.2,1);\n}\n.tv-track .slide{\n  min-width:100%;\n  height:100%;\n  overflow:hidden;\n  display:flex;\n  align-items:center;\n  justify-content:center;\n  background:#000;\n}\n.tv-track img{\n  width:100%;\n  height:100%;\n  object-fit:cover;\n  display:block;\n}\n.tv-chin{\n  height:18px;\n  display:flex;\n  align-items:flex-end;\n  justify-content:center;\n}\n.tv-dot{\n  width:5px;\n  height:5px;\n  margin-top:9px;\n  border-radius:50%;\n  background:rgba(255,255,255,.38);\n  box-shadow:0 0 10px rgba(255,255,255,.3);\n}\n.tv-stand{\n  position:absolute;\n  left:50%;\n  bottom:2px;\n  transform:translateX(-50%);\n  width:31%;\n  height:38px;\n  border-radius:0 0 30px 30px;\n  background:linear-gradient(180deg,#1a1b1e,#09090a);\n  clip-path:polygon(37% 0,63% 0,70% 72%,94% 88%,94% 100%,6% 100%,6% 88%,30% 72%);\n  filter:drop-shadow(0 18px 22px rgba(0,0,0,.42));\n}\n@media(max-width:600px){\n  .tv-showcase{padding:18px;margin-top:54px;border-radius:28px}\n  .tv-bezel{padding:9px 9px 14px;border-radius:22px}\n  .tv-screen{border-radius:14px}\n  .tv-shell{padding-bottom:34px}\n  .tv-stand{height:30px;width:40%}\n}\n\n\n/* TV news showcase */\n.tv-showcase{grid-column:1/-1}\n.tv-shell{display:flex;flex-direction:column;align-items:center;padding:8px 0 4px}\n.tv-bezel{\n  position:relative;\n  width:min(1040px,92vw);\n  aspect-ratio:16/9;\n  padding:16px;\n  border-radius:34px;\n  background:\n    linear-gradient(145deg,rgba(255,255,255,.16),rgba(255,255,255,.03)),\n    #0a0a0b;\n  border:1px solid rgba(255,255,255,.2);\n  box-shadow:0 34px 90px rgba(0,0,0,.52), inset 0 0 0 1px rgba(255,255,255,.03);\n}\n.tv-screen{\n  width:100%;\n  height:100%;\n  overflow:hidden;\n  border-radius:23px;\n  background:#050505;\n  touch-action:pan-y;\n  box-shadow:inset 0 0 55px rgba(0,0,0,.48);\n}\n.tv-track{display:flex;height:100%;transition:transform .55s cubic-bezier(.2,.8,.2,1)}\n.tv-track .slide{align-items:center;justify-content:center;background:#050505;overflow:hidden}\n.tv-track img{width:100%;height:100%;object-fit:contain;display:block;background:#000}\n.tv-status{\n  position:absolute;\n  bottom:7px;right:24px;\n  width:7px;height:7px;border-radius:50%;\n  background:rgba(255,255,255,.28);\n}\n.tv-stand{\n  width:170px;height:22px;margin-top:10px;\n  border-radius:0 0 18px 18px;\n  background:linear-gradient(180deg,#2b2b2d,#121214);\n  box-shadow:0 14px 30px rgba(0,0,0,.28);\n}\n@media(max-width:700px){\n  .tv-bezel{padding:9px;border-radius:23px}\n  .tv-screen{border-radius:16px}\n  .tv-stand{width:120px;height:16px}\n}\n\n\n/* pagination number feedback */\n.page-counter{\n  display:inline-block;\n  min-width:52px;\n  text-align:center;\n  font-variant-numeric:tabular-nums;\n  transition:transform .2s ease, opacity .2s ease;\n}\n.page-counter.counter-pop{\n  animation:counterPop .28s ease;\n}\n@keyframes counterPop{\n  0%{transform:translateY(5px);opacity:.45}\n  100%{transform:translateY(0);opacity:1}\n}\n\n/* 关于我简介：首行空两个中文字符 */\n.intro-indent{\n  text-indent:2em;\n}\n\n:host{display:block;position:relative;color:#f5f5f7;background:transparent;font-size:16px;line-height:1.5;--bg:transparent;overflow:clip}\n.nav-shell{position:sticky;top:18px;margin-bottom:-76px;pointer-events:none}.nav{pointer-events:auto}\n.page{scroll-margin-top:82px;min-height:100svh}.hero{padding-top:160px}\nh1,h2{line-height:1.14;letter-spacing:-.035em}.nav-links{font-size:14px}.mini-label,.gesture{font-size:13px}\n.glass{background:linear-gradient(135deg,rgba(255,255,255,.16),rgba(255,255,255,.035));backdrop-filter:blur(26px) saturate(135%);-webkit-backdrop-filter:blur(26px) saturate(135%);border:1px solid rgba(255,255,255,.23);box-shadow:0 24px 80px #0005,inset 0 1px 0 #ffffff25}\n.tv-bezel{width:100%;max-width:100%}.tv-showcase{margin-top:0}.news-grid>*{min-width:0}.phone{max-width:100%}\n.lightbox{z-index:120}.lightbox img{background:#101115}.reveal{opacity:1;transform:none}.reveal:not(.visible){opacity:.35;transform:translateY(24px)}\nbutton:focus-visible,a:focus-visible{outline:2px solid #fff;outline-offset:5px}\n@media(max-width:600px){.hero{padding-top:120px}.nav-links{gap:16px}.nav-links a:nth-child(2){display:block}.award-carousel{width:100%}.award-card{width:82%}.phone{height:600px}.section-subtitle{font-size:16px}.intro{font-size:17px}.page{padding-left:18px;padding-right:18px}}\n@media(prefers-reduced-motion:reduce){.reveal:not(.visible){opacity:1;transform:none}}\n</style>\n  \n  \n  \n\n  <header class=\"nav-shell\">\n    <nav class=\"nav\">\n      <a class=\"brand\" href=\"#about\">宋致远</a>\n      <div class=\"nav-links\">\n        <a href=\"#about\">关于我</a>\n        <a href=\"#awards\">我的奖项</a>\n        <a href=\"#news\">部队新闻</a>\n      </div>\n    </nav>\n  </header>\n\n  <main>\n    <section class=\"page hero\" id=\"about\">\n      <div class=\"section-kicker\">Portfolio</div>\n      <h1>关于我</h1>\n      <div class=\"about-card glass reveal\">\n        <img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/about.png\" alt=\"宋致远个人模卡\" />\n      </div>\n      <p class=\"intro reveal intro-indent\">\n        打铁还需自身硬，拥有官方媒体、部队宣传、商业短剧、自媒体爆款创作多重实战经验。\n        兼具军人极强的执行力、责任心与影视创作者的审美创意，擅长高燃影视质感内容制作，\n        能够独立完成从策划、拍摄、特效、建模到成片交付的全流程工作。\n      </p>\n      <a class=\"scroll-hint\" href=\"#awards\" aria-label=\"前往我的奖项\">↓</a>\n    </section>\n\n    <section class=\"page\" id=\"awards\">\n      <div class=\"section-kicker\">Recognition</div>\n      <h2>我的奖项</h2>\n      <p class=\"section-subtitle\">奖项与专业能力认证。卡片自动翻页，点击任意卡片可暂停并放大查看。</p>\n\n      <div class=\"award-stage reveal\">\n        <button class=\"arrow prev\" id=\"awardPrev\" aria-label=\"上一张\">‹</button>\n        <div class=\"award-carousel\" id=\"awardCarousel\" aria-live=\"polite\">\n          <button class=\"award-card\" data-index=\"0\">\n            <img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/award1.jpg\" alt=\"奖项展示一\" />\n          </button>\n          <button class=\"award-card\" data-index=\"1\">\n            <img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/award2.jpg\" alt=\"奖项展示二\" />\n          </button>\n          <button class=\"award-card\" data-index=\"2\">\n            <img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/award3.jpg\" alt=\"奖项展示三\" />\n          </button>\n        </div>\n        <button class=\"arrow next\" id=\"awardNext\" aria-label=\"下一张\">›</button>\n      </div>\n      <div class=\"dots\" id=\"awardDots\" aria-label=\"奖项页码\"></div>\n    </section>\n\n    <section class=\"page news-page\" id=\"news\">\n      <div class=\"section-kicker\">Editorial Work</div>\n      <h2>我刊登的部队新闻</h2>\n      <p class=\"section-subtitle\">公众号长图与报纸版面，以移动端阅读和纸媒翻阅两种方式呈现。</p>\n\n      <div class=\"news-grid\">\n        <article class=\"showcase glass reveal tv-showcase\">\n          <div class=\"showcase-head\">\n            <div>\n              <span class=\"mini-label\">电视新闻作品</span>\n              <h3>电视屏幕视图</h3>\n            </div>\n            <span class=\"gesture\">左右滑动</span>\n          </div>\n\n          <div class=\"tv-shell\">\n            <div class=\"tv-bezel\">\n              <div class=\"tv-screen\">\n                <div class=\"tv-track slider-track\" id=\"tvTrack\">\n                  <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/tv1.png\" alt=\"电视新闻作品一\"></div>\n                  <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/tv2.png\" alt=\"电视新闻作品二\"></div>\n                  <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/tv3.png\" alt=\"电视新闻作品三\"></div>\n                </div>\n              </div>\n              <div class=\"tv-status\"></div>\n            </div>\n            <div class=\"tv-stand\"></div>\n          </div>\n\n          <div class=\"slider-controls\">\n            <button data-slider=\"tv\" data-dir=\"-1\" aria-label=\"电视新闻上一张\">‹</button>\n            <span id=\"tvCounter\" class=\"page-counter\" aria-live=\"polite\">1 / 3</span>\n            <button data-slider=\"tv\" data-dir=\"1\" aria-label=\"电视新闻下一张\">›</button>\n          </div>\n        </article>\n\n<article class=\"showcase glass reveal\">\n          <div class=\"showcase-head\">\n            <div>\n              <span class=\"mini-label\">公众号作品</span>\n              <h3>手机阅读视图</h3>\n            </div>\n            <span class=\"gesture\">左右滑动</span>\n          </div>\n\n          <div class=\"phone-wrap\">\n            <div class=\"phone\">\n              <div class=\"phone-island\"></div>\n              <div class=\"phone-screen\">\n                <div class=\"mobile-track slider-track\" id=\"wechatTrack\">\n                  <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/wechat-full-1.png\" alt=\"公众号作品一\"></div>\n                  <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/wechat-full-2.png\" alt=\"公众号作品二\"></div>\n                  <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/wechat-full-3.png\" alt=\"公众号作品三\"></div>\n                </div>\n              </div>\n            </div>\n            <div class=\"slider-controls\">\n              <button data-slider=\"wechat\" data-dir=\"-1\" aria-label=\"公众号上一张\">‹</button>\n              <span id=\"wechatCounter\">1 / 3</span>\n              <button data-slider=\"wechat\" data-dir=\"1\" aria-label=\"公众号下一张\">›</button>\n            </div>\n          </div>\n        </article>\n\n        <article class=\"showcase glass reveal\">\n          <div class=\"showcase-head\">\n            <div>\n              <span class=\"mini-label\">报纸作品</span>\n              <h3>纸媒版面视图</h3>\n            </div>\n            <span class=\"gesture\">左右滑动</span>\n          </div>\n\n          <div class=\"paper-frame\">\n            <div class=\"paper-track slider-track\" id=\"paperTrack\">\n              <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/paper1.png\" alt=\"报纸作品一\"></div>\n              <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/paper2.png\" alt=\"报纸作品二\"></div>\n              <div class=\"slide\"><img loading=\"lazy\" decoding=\"async\" draggable=\"false\" src=\"./portfolio/assets/paper3.png\" alt=\"报纸作品三\"></div>\n            </div>\n          </div>\n          <div class=\"slider-controls\">\n            <button data-slider=\"paper\" data-dir=\"-1\" aria-label=\"报纸上一张\">‹</button>\n            <span id=\"paperCounter\">1 / 3</span>\n            <button data-slider=\"paper\" data-dir=\"1\" aria-label=\"报纸下一张\">›</button>\n          </div>\n        </article>\n      </div>\n    </section>\n  </main>\n\n  <div class=\"lightbox\" id=\"lightbox\" aria-hidden=\"true\">\n    <button class=\"close\" id=\"lightboxClose\" aria-label=\"关闭\">×</button>\n    <img loading=\"lazy\" decoding=\"async\" draggable=\"false\" id=\"lightboxImage\" alt=\"放大奖项图片\" />\n    <div class=\"lightbox-tip\">点击关闭后继续自动播放</div>\n  </div>\n\n  <footer>\n    <span>宋致远 · Portfolio</span>\n    <span>策划 · 拍摄 · 特效 · 建模 · 后期</span>\n  </footer>\n\n  \n";

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.14});
root.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* awards */
const cards = [...root.querySelectorAll('.award-card')];
const dots = root.getElementById('awardDots');
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
  awardTimer=setInterval(()=>{ if(!awardPaused && !document.hidden && root.getElementById('awards').getBoundingClientRect().top < innerHeight && root.getElementById('awards').getBoundingClientRect().bottom > 0 && !reduceMotion.matches) nextAward(1); },3800);
}
function restartAwardTimer(){ clearInterval(awardTimer); startAwardTimer(); }

root.getElementById('awardPrev').onclick=()=>{nextAward(-1);restartAwardTimer()};
root.getElementById('awardNext').onclick=()=>{nextAward(1);restartAwardTimer()};

const lightbox=root.getElementById('lightbox');
const lightboxImage=root.getElementById('lightboxImage');
const closeBtn=root.getElementById('lightboxClose');
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
    track: root.getElementById('tvTrack'),
    counter: root.getElementById('tvCounter'),
    count: 3
  },
  wechat: {
    index: 0,
    track: root.getElementById('wechatTrack'),
    counter: root.getElementById('wechatCounter'),
    count: 3
  },
  paper: {
    index: 0,
    track: root.getElementById('paperTrack'),
    counter: root.getElementById('paperCounter'),
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
  if(name === "wechat") syncReadingLink();
}

root.querySelectorAll('[data-slider]').forEach(btn => {
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


initPortfolioAdditions(root);
root.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=root.getElementById(a.getAttribute('href').slice(1));if(target){e.preventDefault();history.replaceState(null,'','#'+target.id);window.scrollTo({top:target.getBoundingClientRect().top+scrollY-(target.id==='contact-end'?0:82),behavior:reduceMotion.matches?'instant':'smooth'});}}));
let returnFocus=null;
lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');lightbox.setAttribute('aria-label','奖项图片');
cards.forEach(card=>card.addEventListener('click',()=>{returnFocus=card;closeBtn.focus();}));
lightbox.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();closeBtn.focus();}});
closeBtn.addEventListener('click',()=>returnFocus?.focus({preventScroll:true}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&returnFocus){returnFocus.focus({preventScroll:true});returnFocus=null;}});
const glass=document.querySelector('#portfolio-glass');
let queued=false;
function updateGlass(){
queued=false;const top=host.getBoundingClientRect().top;const enter=Math.max(0,Math.min(1,(innerHeight-top)/(innerHeight*.9)));
const ending=root.getElementById('contact-end');const endTop=ending?ending.getBoundingClientRect().top:innerHeight*2;
const exit=Math.max(0,Math.min(1,(innerHeight-endTop)/innerHeight));const eased=exit*exit*(3-2*exit);const p=enter*(1-eased);
glass.style.opacity=String(p);glass.style.backdropFilter='blur('+(p*28)+'px) saturate('+(1-p*.3)+')';glass.style.webkitBackdropFilter=glass.style.backdropFilter;glass.style.visibility=p>.001?'visible':'hidden';
const canvas=document.querySelector('#scene');canvas.style.opacity=String(1-eased);canvas.style.visibility=eased>.999?'hidden':'visible';
const nav=root.querySelector('.nav-shell');nav.style.opacity=String(1-eased);nav.style.visibility=eased>.98?'hidden':'visible';
const backgroundVideo=document.querySelector('#ambientVideo');backgroundVideo.style.opacity=String(.56+.44*eased);backgroundVideo.style.mixBlendMode=eased>.999?'normal':'soft-light';
}
function scheduleGlass(){if(!queued){queued=true;requestAnimationFrame(updateGlass);}}
addEventListener('scroll',scheduleGlass,{passive:true});addEventListener('resize',scheduleGlass);new ResizeObserver(scheduleGlass).observe(document.querySelector('main'));updateGlass();

// Keep the complete source images in independently scrollable reading panels.
const readingStyle=document.createElement('style');
readingStyle.textContent='#wechatTrack .slide{display:block;overflow-y:auto;overflow-x:hidden;overscroll-behavior-y:contain;touch-action:pan-y pinch-zoom;scrollbar-width:thin}#wechatTrack img{display:block;width:100%;height:auto;max-height:none;object-fit:contain;flex:none}.original-reading-link{display:block;width:fit-content;margin:14px auto 0;padding:8px 16px;border:1px solid #ffffff30;border-radius:20px;font-size:14px;color:#f5f5f7;background:#ffffff0a}.phone-screen{touch-action:pan-y pinch-zoom}';
root.appendChild(readingStyle);
const originalLink=document.createElement('a');originalLink.className='original-reading-link';originalLink.textContent='查看原图 · 放大阅读';originalLink.target='_blank';originalLink.rel='noopener';
state.wechat.track.closest('.phone-wrap').appendChild(originalLink);
function syncReadingLink(){originalLink.href=state.wechat.track.children[state.wechat.index].querySelector('img').src;originalLink.setAttribute('aria-label','查看第 '+(state.wechat.index+1)+' 张公众号原图，支持放大阅读');}
state.wechat.track.querySelectorAll('.slide').forEach((slide,i)=>{slide.tabIndex=0;slide.setAttribute('role','region');slide.setAttribute('aria-label','公众号作品 '+(i+1)+'，上下滚动阅读完整长图');});
syncReadingLink();

function openSectionHash(){const target=root.getElementById(location.hash.slice(1));if(target)window.scrollTo({top:target.getBoundingClientRect().top+scrollY-(target.id==='contact-end'?0:82),behavior:'instant'});}
addEventListener('load',openSectionHash,{once:true});
