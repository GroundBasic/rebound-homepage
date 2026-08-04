// ── Shared Self-check Floating Bar ──
// 사용법: </body> 앞에 <script src="selfcheck-bar.js"></script> 추가.
// 홈(#selfcheckDock 존재): 스크롤을 시작하면 떠오르고, 페이지 하단에서 도킹하며 풀블리드 배너로 확장.
// 그 외 페이지(팀 리바운드, 고객센터 등): 처음부터 항상 하단에 떠 있는다.
(function() {
  if (document.getElementById('selfcheckBar')) return;

  var css = ''
    + '.selfcheck-bar{position:fixed;left:50%;bottom:20px;transform:translate(-50%,calc(100% + 32px));'
    +   'width:min(1160px, calc(100% - 200px));z-index:150;opacity:0;pointer-events:none;'
    +   'transition:transform 0.5s cubic-bezier(0.22,1,0.36,1),opacity 0.35s ease;}'
    + '.selfcheck-bar.show{transform:translate(-50%,0);opacity:1;pointer-events:auto;}'
    + '.selfcheck-bar-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;'
    +   'background:#fff;border:1px solid rgba(16,24,40,0.06);border-radius:18px;padding:18px 20px 18px 30px;'
    +   'box-shadow:0 12px 44px rgba(16,24,40,0.16),0 2px 8px rgba(16,24,40,0.06);position:relative;overflow:hidden;'
    +   'transition:background 0.45s ease,padding 0.45s ease,border-radius 0.45s ease,box-shadow 0.45s ease,gap 0.45s ease,border-color 0.45s ease;}'
    + '.selfcheck-bar-text{display:flex;flex-direction:column;gap:3px;min-width:0;position:relative;z-index:1;}'
    + '.selfcheck-bar-text .selfcheck-bar-chip{display:none;align-items:center;gap:5px;'
    +   'background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.3);color:#fff;'
    +   'font-size:12px;font-weight:700;letter-spacing:0.3px;padding:6px 16px;border-radius:50px;'
    +   'margin:0 auto 4px;backdrop-filter:blur(6px);animation:scFadeUp 0.5s 0.15s ease both;}'
    + '.selfcheck-bar-text .selfcheck-bar-chip::before{content:"";width:5px;height:5px;border-radius:50%;background:#fff;opacity:0.9;}'
    + '.selfcheck-bar.expanded .selfcheck-bar-text .selfcheck-bar-chip{display:inline-flex;}'
    /* 문구 스왑 — 필 상태와 확장 배너 상태의 문구가 다름 */
    + '.selfcheck-bar .sc-expanded{display:none;}'
    + '.selfcheck-bar.expanded .sc-expanded{display:inline;}'
    + '.selfcheck-bar.expanded .sc-collapsed{display:none;}'
    + '@keyframes scFadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}'
    + '.selfcheck-bar-text strong{font-size:17px;font-weight:800;color:var(--text,#18181b);letter-spacing:-0.3px;'
    +   'transition:color 0.45s ease,font-size 0.45s ease;}'
    + '.selfcheck-bar-text > span:not(.selfcheck-bar-chip){font-size:13px;color:var(--text3,#a1a1aa);font-weight:500;'
    +   'transition:color 0.45s ease,font-size 0.45s ease;}'
    + '.selfcheck-bar-btn{flex-shrink:0;background:#009DFF;color:#fff;font-size:15px;font-weight:700;'
    +   'padding:14px 28px;border-radius:12px;text-decoration:none;white-space:nowrap;position:relative;z-index:1;'
    +   'transition:background 0.15s,transform 0.15s,color 0.45s ease,font-size 0.45s ease,padding 0.45s ease,border-radius 0.45s ease;}'
    + '.selfcheck-bar-btn:hover{background:#008AE0;transform:translateY(-1px);}'
    /* 필 상태 신청하기 버튼 — 브랜드 오렌지 */
    + '.selfcheck-bar-btn.sc-collapsed{background:#FF6D24;}'
    + '.selfcheck-bar-btn.sc-collapsed:hover{background:#F05A00;}'
    /* 도킹 상태 — 페이지 하단 dock 안에 자리 잡음 (홈 전용) */
    + '.selfcheck-bar.docked{position:absolute;bottom:auto;}'
    /* 확장 배너 상태 — 가로로 꽉 찬 풀블리드 대형 배너 */
    + '.selfcheck-bar.expanded{width:100%;}'
    + '.selfcheck-bar.expanded .selfcheck-bar-inner{flex-direction:column;justify-content:center;align-items:center;'
    +   'text-align:center;background:linear-gradient(160deg,#00BAFF 0%,#0090F2 42%,#0060D2 100%);'
    +   'border-color:transparent;border-radius:0;padding:76px max(48px, calc((100% - 1160px) / 2)) 84px;gap:30px;box-shadow:none;}'
    + '.selfcheck-bar.expanded .selfcheck-bar-text{gap:14px;align-items:center;}'
    + '.selfcheck-bar.expanded .selfcheck-bar-text strong{color:#fff;font-size:36px;letter-spacing:-1px;line-height:1.3;}'
    + '.selfcheck-bar.expanded .selfcheck-bar-text > span:not(.selfcheck-bar-chip){color:rgba(255,255,255,0.85);font-size:16px;}'
    + '.selfcheck-bar.expanded .selfcheck-bar-btn{background:#fff;color:#0080DF;font-size:16px;padding:18px 42px;border-radius:14px;}'
    + '.selfcheck-bar.expanded .selfcheck-bar-btn:hover{background:#EFF8FF;transform:translateY(-1px);}'
    /* 도킹 섹션 (홈 전용) */
    + '.selfcheck-dock-section{padding:0;background:#fff;}'
    + '.selfcheck-dock{position:relative;z-index:2;width:100%;margin:0 auto;min-height:340px;}'
    + '@media (max-width:768px){'
    +   '.selfcheck-bar{bottom:80px;left:12px;right:12px;width:auto;transform:translateY(calc(100% + 112px));}'
    +   '.selfcheck-bar.no-fab{bottom:12px;transform:translateY(calc(100% + 32px));}'
    +   '.selfcheck-bar.no-fab.show{transform:translateY(0);}'
    +   '.selfcheck-bar.show{transform:translateY(0);}'
    +   '.selfcheck-bar.expanded,.selfcheck-bar.expanded.show{left:50%;right:auto;width:100%;transform:translate(-50%,0);}'
    +   '.selfcheck-bar-inner{flex-direction:column;align-items:stretch;gap:12px;padding:16px;border-radius:16px;text-align:center;}'
    +   '.selfcheck-bar-text strong{font-size:15px;}'
    +   '.selfcheck-bar-text > span:not(.selfcheck-bar-chip){font-size:12px;}'
    +   '.selfcheck-bar-btn{text-align:center;padding:13px 20px;font-size:14px;}'
    +   '.selfcheck-bar.expanded .selfcheck-bar-inner{padding:56px 24px 64px;gap:24px;border-radius:0;}'
    +   '.selfcheck-bar.expanded .selfcheck-bar-text{gap:10px;}'
    +   '.selfcheck-bar.expanded .selfcheck-bar-text strong{font-size:23px;letter-spacing:-0.6px;}'
    +   '.selfcheck-bar.expanded .selfcheck-bar-text > span:not(.selfcheck-bar-chip){font-size:14px;}'
    +   '.selfcheck-bar.expanded .selfcheck-bar-btn{font-size:15px;padding:16px 32px;width:auto;align-self:center;}'
    +   '.selfcheck-dock-section{padding:0;}'
    +   '.selfcheck-dock{min-height:300px;width:100%;}'
    + '}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.className = 'selfcheck-bar';
  bar.id = 'selfcheckBar';
  bar.setAttribute('role', 'complementary');
  bar.setAttribute('aria-label', '셀프진단 바로가기');
  bar.innerHTML = ''
    + '<div class="selfcheck-bar-inner">'
    +   '<div class="selfcheck-bar-text">'
    +     '<span class="selfcheck-bar-chip">1분 셀프진단</span>'
    +     '<strong>'
    +       '<span class="sc-collapsed">초기비용 0원으로, 미수금을 되찾으세요</span>'
    +       '<span class="sc-expanded">아직 고민 중이신가요?<br>복잡하게 생각하지 말고, 먼저 확인해보세요</span>'
    +     '</strong>'
    +     '<span>'
    +       '<span class="sc-collapsed">회수되지 않으면 수수료도 없어요. 부담 없이 시작해보세요!</span>'
    +       '<span class="sc-expanded">몇 가지 질문에 답하면, 지금 상황에 맞는 회수 방향을 확인할 수 있어요.</span>'
    +     '</span>'
    +   '</div>'
    /* 필 상태: 신청 CTA (홈에서는 신청 모달, 그 외 페이지에서는 홈 CTA로 이동) */
    + '<a href="rebound-biz.html#cta" class="selfcheck-bar-btn sc-collapsed">리바운드 신청하기</a>'
    /* 확장 배너 상태: 셀프진단 CTA */
    + '<a href="self-check.html" target="_blank" rel="noopener noreferrer" class="selfcheck-bar-btn sc-expanded">지금 바로 셀프 진단하기</a>'
    + '</div>';
  document.body.appendChild(bar);

  // 우측 하단 플로팅 런처(#floatActions)가 없는 페이지에서는 바를 화면 맨 아래로 (모바일)
  function markNoFab() {
    if (!document.getElementById('floatActions')) bar.classList.add('no-fab');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markNoFab);
  } else {
    markNoFab();
  }

  // ── 스크롤 로직 ──
  var dock = document.getElementById('selfcheckDock'); // 홈에만 존재
  var THRESHOLD = 200; // 이만큼 스크롤하면 바 노출
  var FLOAT_GAP = 20;  // 플로팅 시 화면 하단 여백 (CSS bottom과 일치)
  var collapsedH = 0;  // 축소(필) 상태 높이

  function measure() {
    if (!bar.classList.contains('expanded')) {
      collapsedH = bar.offsetHeight || collapsedH;
    }
  }

  function onScroll() {
    var y = window.scrollY;

    if (dock) {
      var rect = dock.getBoundingClientRect();
      // 플로팅 바의 상단이 dock 상단에 닿는 시점에 도킹
      var boundary = window.innerHeight - FLOAT_GAP - (collapsedH || 76);
      if (rect.top <= boundary) {
        bar.style.top = (y + rect.top) + 'px';
        if (!bar.classList.contains('docked')) {
          bar.classList.add('docked', 'expanded', 'show');
        }
        // 확장된 배너 높이에 맞게 dock 높이 동기화 (푸터와 빈틈/겹침 방지)
        var h = bar.offsetHeight;
        if (h && Math.abs(h - dock.offsetHeight) > 1) {
          dock.style.minHeight = h + 'px';
        }
        return;
      }
      if (bar.classList.contains('docked')) {
        bar.classList.remove('docked', 'expanded');
        bar.style.top = '';
        dock.style.minHeight = '';
      }
    }

    // 홈(dock 존재)에서만 스크롤 후 노출, 그 외 페이지는 항상 노출
    bar.classList.toggle('show', dock ? y > THRESHOLD : true);
  }

  measure();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function() { measure(); onScroll(); }, { passive: true });
  // 확장 애니메이션이 끝난 뒤 최종 높이로 dock 재동기화
  bar.addEventListener('transitionend', function() {
    if (dock && bar.classList.contains('docked')) {
      dock.style.minHeight = bar.offsetHeight + 'px';
    }
  });
  onScroll();
})();
