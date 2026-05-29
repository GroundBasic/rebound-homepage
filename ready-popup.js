// ── 개인 서비스 준비중 팝업 (공유) ──
// 사용법: <script src="ready-popup.js"></script>
// 토글에서 개인 클릭 시 동일한 준비중 팝업을 띄우고, 기업 Biz를 첫 번째로 정렬합니다.

(function() {
  var existingPopup = document.getElementById('readyPopupOverlay');
  if (existingPopup) existingPopup.remove();

  function closePopup() {
    var popup = document.getElementById('readyPopupOverlay');
    if (popup) popup.classList.remove('open');
  }

  function openPopup(e) {
    if (e) e.preventDefault();
    var popup = document.getElementById('readyPopupOverlay');
    if (popup) popup.classList.add('open');
  }

  // 1. 팝업 CSS 삽입
  var style = document.createElement('style');
  style.textContent = `
    #readyPopupOverlay {
      display:none;
      position:fixed;
      inset:0;
      background:rgba(17,24,39,0.56);
      z-index:2000;
      align-items:center;
      justify-content:center;
      padding:24px;
    }
    #readyPopupOverlay.open { display:flex; }
    #readyPopupOverlay.open #readyPopupCard { animation:rpDialog 0.16s ease-out both; }
    @keyframes rpDialog {
      from { opacity:0; transform:translateY(8px) scale(0.985); }
      to { opacity:1; transform:translateY(0) scale(1); }
    }
    #readyPopupCard {
      width:min(420px, 100%);
      background:#fff;
      border:1px solid #E5E7EB;
      border-radius:14px;
      box-shadow:0 24px 72px rgba(0,0,0,0.22), 0 6px 20px rgba(0,0,0,0.12);
      padding:24px 24px 20px;
      position:relative;
      font-family:'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif;
    }
    .rp-head {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      margin-bottom:20px;
    }
    .rp-label {
      font-size:14px;
      font-weight:800;
      color:#344054;
      line-height:1.3;
    }
    .rp-x {
      width:28px;
      height:28px;
      border:0;
      border-radius:8px;
      background:transparent;
      color:#667085;
      cursor:pointer;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
    }
    .rp-x:hover { background:#F2F4F7; color:#101828; }
    .rp-title {
      font-size:19px;
      font-weight:900;
      color:#101828;
      letter-spacing:-0.3px;
      line-height:1.45;
      margin:0 0 10px;
    }
    .rp-copy {
      font-size:14px;
      color:#667085;
      line-height:1.7;
      font-weight:600;
      margin:0 0 20px;
    }
    .rp-actions {
      display:flex;
      justify-content:flex-end;
      gap:8px;
    }
    .rp-btn-primary,
    .rp-btn-ghost {
      min-width:88px;
      height:42px;
      border-radius:10px;
      font-size:14px;
      font-weight:800;
      cursor:pointer;
      font-family:inherit;
    }
    .rp-btn-primary {
      background:#0B1C2C;
      color:#fff;
      border:1px solid #0B1C2C;
    }
    .rp-btn-primary:hover { background:#142638; }
    .rp-btn-ghost {
      background:#fff;
      color:#475467;
      border:1px solid #D0D5DD;
    }
    .rp-btn-ghost:hover { background:#F8FAFC; }
    @media(max-width:480px) {
      #readyPopupOverlay { padding:18px; }
      #readyPopupCard { padding:22px 20px 18px; border-radius:12px; }
      .rp-actions { justify-content:stretch; }
      .rp-btn-primary,
      .rp-btn-ghost { flex:1; min-width:0; }
    }
  `;
  document.head.appendChild(style);

  // 2. 팝업 HTML 삽입
  var overlay = document.createElement('div');
  overlay.id = 'readyPopupOverlay';
  overlay.onclick = function(e) {
    if (e.target === this) closePopup();
  };
  overlay.innerHTML = `
    <div id="readyPopupCard" role="dialog" aria-modal="true" aria-labelledby="readyPopupTitle">
      <div class="rp-head">
        <div class="rp-label">서비스 안내</div>
        <button class="rp-x" type="button" aria-label="닫기">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <h3 class="rp-title" id="readyPopupTitle">개인 서비스는 현재 준비 중입니다.</h3>
      <p class="rp-copy">지금은 기업 Biz 서비스를 먼저 운영하고 있어요. 개인 서비스는 준비가 끝나는 대로 안내드리겠습니다.</p>
      <div class="rp-actions">
        <button class="rp-btn-ghost" type="button">닫기</button>
        <button class="rp-btn-primary" type="button">문의하기</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('.rp-x').addEventListener('click', closePopup);
  overlay.querySelector('.rp-btn-ghost').addEventListener('click', closePopup);
  overlay.querySelector('.rp-btn-primary').addEventListener('click', function() {
    if (window.ChannelIO) {
      window.ChannelIO('showMessenger');
      closePopup();
      return;
    }
    window.location.href = 'support.html';
  });

  // 3. 토글 처리: 기업 Biz 첫번째, 개인 두번째, 개인 클릭 시 팝업
  document.querySelectorAll('.toggle-pill').forEach(function(pill) {
    var links = pill.querySelectorAll('a');
    var bizLink = null;
    var personalLink = null;

    links.forEach(function(a) {
      var text = a.textContent.trim();
      if (text.indexOf('기업') !== -1 || text.indexOf('Biz') !== -1) bizLink = a;
      else if (text.indexOf('개인') !== -1) personalLink = a;
    });

    // 순서 재정렬: 기업 Biz 먼저
    if (bizLink && personalLink) {
      pill.innerHTML = '';
      pill.appendChild(bizLink);
      pill.appendChild(personalLink);
    }

    // 개인 클릭 → 팝업
    if (personalLink) {
      personalLink.setAttribute('href', '#');
      personalLink.style.cursor = 'pointer';
      personalLink.addEventListener('click', openPopup);
    }
  });
})();
