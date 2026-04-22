// ── Shared Mobile Menu ──
// 모든 페이지에서 동일한 모바일 메뉴를 사용합니다.
// 사용법: <div id="shared-mobile-menu"></div> + <script src="mobile-menu.js"></script>

(function() {
  var container = document.getElementById('shared-mobile-menu');
  if (!container) return;

  // 현재 페이지가 비즈인지 판단 (pathname, href 모두 체크)
  var href = location.href || '';
  var path = location.pathname || '';
  var isBiz = href.indexOf('rebound-biz') !== -1 || path.indexOf('rebound-biz') !== -1;

  // 비즈/개인 바로가기 링크
  var switchLink = isBiz
    ? '<a href="rebound-personal.html" class="mobile-menu-switch">\uAC1C\uC778 \uC11C\uBE44\uC2A4 \uBC14\uB85C\uAC00\uAE30 \u2192</a>'
    : '<a href="rebound-biz.html" class="mobile-menu-switch">\uAE30\uC5C5 Biz \uC11C\uBE44\uC2A4 \u2192</a>';

  var homeLink = isBiz ? 'rebound-biz.html' : 'rebound-personal.html';

  // 메뉴 HTML 삽입
  var menuHTML = '<div class="mobile-menu" id="mobileMenu">'
    + '<nav class="mobile-menu-nav">'
    + '<a href="' + homeLink + '">\uD648</a>'
    + '<a href="team.html">\uD300 \uB9AC\uBC14\uC6B4\uB4DC</a>'
    + '<a href="support.html">\uACE0\uAC1D\uC13C\uD130</a>'
    + '<a href="https://blog.naver.com/reboundkr" target="_blank">\uBE14\uB85C\uADF8</a>'
    + '<a href="self-check.html" target="_blank">\uC140\uD504 \uC9C4\uB2E8</a>'
    + switchLink
    + '</nav>'
    + '</div>';

  container.outerHTML = menuHTML;

  // 토글 로직
  var btn = document.getElementById('mobileMenuBtn');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function() {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  var links = menu.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeMenu);
  }
})();
