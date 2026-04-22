// ── Shared Auth-aware GNB ──
// 로그인 상태에 따라 GNB의 로그인/CTA 버튼을 변경하고 프로필 메뉴를 추가합니다.
// 사용법: 각 페이지 </body> 직전에 <script src="auth-nav.js"></script> 추가

(function() {
  var STYLE_ID = 'auth-nav-style';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.gnb-user { position: relative; display: inline-flex; align-items: center; margin-right: 10px; }',
      '.gnb-user-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid #EAEAEA; background: #fff; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-family: inherit; padding: 0; color: #767676; transition: border-color 0.15s ease, box-shadow 0.15s ease; }',
      '.gnb-user-btn:hover { border-color: #D4D4D4; box-shadow: 0 2px 8px rgba(0,0,0,0.06); color: #302622; }',
      '.gnb-user-btn:focus-visible { outline: none; border-color: var(--orange, #FF6D24); box-shadow: 0 0 0 3px rgba(255,109,36,0.15); }',
      '.gnb-user.open .gnb-user-btn { border-color: #302622; color: #302622; }',
      '.gnb-user-dropdown { position: absolute; top: calc(100% + 10px); right: 0; min-width: 260px; background: #fff; border: 1px solid #EEE; border-radius: 14px; box-shadow: 0 12px 32px rgba(0,0,0,0.12); padding: 8px; opacity: 0; visibility: hidden; transform: translateY(-4px); transition: opacity 0.15s, transform 0.15s, visibility 0.15s; z-index: 1000; }',
      '.gnb-user.open .gnb-user-dropdown { opacity: 1; visibility: visible; transform: translateY(0); }',
      '.gnb-user-header { padding: 14px 14px 12px; border-bottom: 1px solid #F0F0F0; margin-bottom: 6px; }',
      '.gnb-user-label { font-size: 11px; font-weight: 700; color: #888; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 4px; }',
      '.gnb-user-email { font-size: 14px; color: #302622; font-weight: 600; word-break: break-all; }',
      '.gnb-user-item { display: flex; align-items: center; gap: 10px; padding: 11px 14px; font-size: 14px; color: #302622; text-decoration: none; border-radius: 8px; background: none; border: none; width: 100%; font-family: inherit; cursor: pointer; text-align: left; transition: background 0.12s; }',
      '.gnb-user-item:hover { background: #F6F6F8; }',
      '.gnb-user-item svg { flex-shrink: 0; }',
      '.gnb-user-divider { height: 1px; background: #F0F0F0; margin: 6px 0; border: none; }',
      '.gnb-user-logout { color: #D93A3A; }',
      '.gnb-user-logout:hover { background: rgba(217,58,58,0.06); }',
      '@media (max-width: 900px) { .gnb-user { display: none; } }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function getInitial(email) {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  }

  function buildUserMenu(email) {
    var wrap = document.createElement('div');
    wrap.className = 'gnb-user';
    wrap.innerHTML = [
      '<button class="gnb-user-btn" type="button" aria-label="내 계정">',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      '</button>',
      '<div class="gnb-user-dropdown" role="menu">',
        '<div class="gnb-user-header">',
          '<div class="gnb-user-label">로그인 계정</div>',
          '<div class="gnb-user-email">' + email + '</div>',
        '</div>',
        '<a href="#" class="gnb-user-item" role="menuitem">',
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
          '내 리바운드',
        '</a>',
        '<a href="#" class="gnb-user-item" role="menuitem">',
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
          '계정 관리',
        '</a>',
        '<a href="support.html" class="gnb-user-item" role="menuitem">',
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
          '고객센터',
        '</a>',
        '<hr class="gnb-user-divider">',
        '<button class="gnb-user-item gnb-user-logout" type="button" role="menuitem">',
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
          '로그아웃',
        '</button>',
      '</div>'
    ].join('');
    return wrap;
  }

  function logout() {
    if (!confirm('로그아웃 하시겠습니까?')) return;
    sessionStorage.removeItem('rebound_logged_in');
    sessionStorage.removeItem('rebound_user_email');
    window.location.reload();
  }

  function updateNav() {
    var isLoggedIn = sessionStorage.getItem('rebound_logged_in') === 'true';
    if (!isLoggedIn) return;

    var email = sessionStorage.getItem('rebound_user_email') || '';
    var loginBtn = document.querySelector('.gnb-login');
    var startBtn = document.querySelector('.gnb-start');

    if (loginBtn) loginBtn.style.display = 'none';
    if (startBtn) startBtn.style.display = 'none';

    // 프로필 메뉴가 없으면 삽입
    if (!document.querySelector('.gnb-user')) {
      injectStyles();
      var menu = buildUserMenu(email);
      var anchor = startBtn || loginBtn;
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(menu, anchor.nextSibling);
      }

      // 토글 로직
      var btn = menu.querySelector('.gnb-user-btn');
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('open');
      });

      // 외부 클릭 시 닫기
      document.addEventListener('click', function(e) {
        if (!menu.contains(e.target)) menu.classList.remove('open');
      });

      // ESC 키로 닫기
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') menu.classList.remove('open');
      });

      // 로그아웃
      var logoutBtn = menu.querySelector('.gnb-user-logout');
      logoutBtn.addEventListener('click', logout);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNav);
  } else {
    updateNav();
  }
})();
