// ── Shared GNB (라이트 테마) ──
// 사용법: <header id="shared-gnb"></header> + <script src="gnb.js"></script>
// rebound-biz.html(다크 테마)은 별도 GNB 사용. 이 스크립트는 그 외 모든 페이지에서 공유.

(function() {
  var container = document.getElementById('shared-gnb');
  if (!container) return;

  // 현재 페이지 판단 (active 메뉴 표시용)
  var path = (location.pathname || '').split('/').pop();
  var activeMap = {
    'team.html': 'team',
    'support.html': 'support'
  };
  var active = activeMap[path] || '';
  function navCls(key) { return key === active ? ' class="gnb-nav-active"' : ''; }

  var logoSvg = ''
    + '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 54 55" fill="none" aria-hidden="true">'
    +   '<path opacity="0.35" d="M31.6526 48.796V49.1161C31.5679 46.065 29.0679 43.6326 26.017 43.6326C22.9662 43.6326 20.4026 46.1503 20.3814 49.2654V49.0094C20.212 41.0296 13.6653 34.5434 5.76278 34.5221H5.69922C8.77126 34.4794 11.2713 31.9617 11.2713 28.8466C11.2713 25.7315 8.79244 23.2138 5.72041 23.1712C12.5213 23.1712 18.7713 25.8809 23.4323 30.2761C28.3899 34.9275 31.5255 41.499 31.6738 48.7747L31.6526 48.796Z" fill="#FF6D24"/>'
    +   '<path opacity="0.45" d="M50.8258 10.4121C48.8343 11.927 46.9699 13.6125 45.2114 15.4474C44.4063 16.3009 43.6224 17.1757 42.8809 18.0505C35.7199 26.713 31.758 37.4238 31.6521 48.7747V49.2868C31.6521 46.1717 29.1097 43.6326 26.0165 43.6326C22.9232 43.6326 20.3809 46.1717 20.3809 49.2868V49.0094C20.4232 42.4805 21.4826 36.1863 23.4317 30.2975C25.8893 22.8725 29.7453 16.0662 34.6817 10.2201C37.1817 7.27566 39.9572 4.58729 42.9656 2.17629C43.3046 1.89892 43.6648 1.62155 44.025 1.34418C43.7072 1.62155 43.4106 1.94159 43.1351 2.30431C42.436 3.2431 42.0334 4.4166 42.0334 5.67544C42.0334 8.81187 44.5758 11.3509 47.669 11.3509C48.8343 11.3509 49.936 10.9882 50.8258 10.3908V10.4121Z" fill="#FF6D24"/>'
    +   '<path opacity="0.5" d="M11.2712 28.868C11.2712 31.9831 8.7712 34.5221 5.69916 34.5434H5.6356C2.52119 34.5434 0 32.0044 0 28.868C0 25.7316 2.54238 23.1925 5.6356 23.1925H5.72035C8.79239 23.2352 11.2712 25.7742 11.2712 28.868Z" fill="#FF6D24"/>'
    +   '<path opacity="0.8" d="M31.6521 49.2867C31.6521 52.4445 29.1097 54.9835 26.0165 54.9835C22.9232 54.9835 20.3809 52.4445 20.3809 49.3081V49.2654C20.3809 46.1503 22.9232 43.6113 26.0165 43.6113C29.1097 43.6113 31.6521 46.1503 31.6521 49.2654V49.2867Z" fill="#FF6D24"/>'
    +   '<path d="M53.3057 5.69678C53.3057 7.44635 52.5218 9.0039 51.3142 10.028C51.2506 10.0707 51.2082 10.1134 51.1658 10.1561C51.1658 10.1561 50.954 10.3267 50.8481 10.4121C49.937 11.0095 48.8565 11.3722 47.6913 11.3722C44.5769 11.3722 42.0557 8.83321 42.0557 5.69678C42.0557 4.43794 42.4582 3.26445 43.1574 2.32565C43.4116 1.98427 43.7082 1.66423 44.0472 1.36552C44.2379 1.21617 44.4074 1.08815 44.598 0.938796C45.4879 0.34138 46.5684 0 47.7125 0C50.8481 0 53.3481 2.53901 53.3481 5.67544L53.3057 5.69678Z" fill="#FF6D24"/>'
    + '</svg>'
    + '<svg xmlns="http://www.w3.org/2000/svg" width="88" height="27" viewBox="0 0 145 44" fill="none" aria-hidden="true">'
    +   '<g clip-path="url(#wm-shared)">'
    +     '<path d="M5.28317 25.6802H19.9764V8.82065H0.0732422V13.7767H14.664V20.7241H0.0732422V37.5394H25.4351V43.9262H30.645V8.82065H25.4351V32.6276H5.28317V25.6802Z" fill="#1A1714"/>'
    +     '<path d="M41.8261 8.82065H36.6162V37.4509H56.5193V8.82065H51.3094V18.6443H41.8261V8.82065ZM51.2948 23.5561V32.4506H41.8115V23.5561H51.2948Z" fill="#1A1714"/>'
    +     '<path d="M67.3779 8.82065H62.168V43.9262H67.3779V19.4851H73.3781V14.588H67.3779V8.82065Z" fill="#1A1714"/>'
    +     '<path d="M88.276 35.9759H93.7054V28.5122H106.891V23.4087H74.3877V28.5122H88.276V35.9759Z" fill="#1A1714"/>'
    +     '<path d="M79.5976 31.6835H74.3877V43.9262H106.891V39.0292H79.5976V31.6835Z" fill="#1A1714"/>'
    +     '<path d="M119.038 13.88H143.449V8.82065H113.77V30.3118H143.449V25.3557H119.038V13.88Z" fill="#1A1714"/>'
    +     '<path d="M144.927 38.8227H113.023V43.9263H144.927V38.8227Z" fill="#1A1714"/>'
    +     '<path d="M90.6617 20.3259C97.3936 20.3259 102.486 15.9598 102.486 10.1777C102.486 4.39558 97.3936 0.073761 90.6617 0.073761C83.9297 0.073761 78.8076 4.42508 78.8076 10.1924C78.8076 15.9598 83.9005 20.3406 90.6617 20.3406V20.3259ZM90.6617 4.64634C94.2911 4.64634 97.0424 7.03588 97.0424 10.1924C97.0424 13.349 94.3057 15.7828 90.6617 15.7828C87.0177 15.7828 84.2517 13.3785 84.2517 10.1924C84.2517 7.00638 87.003 4.64634 90.6617 4.64634Z" fill="#1A1714"/>'
    +   '</g>'
    +   '<defs><clipPath id="wm-shared"><rect width="145" height="44" fill="white"/></clipPath></defs>'
    + '</svg>';

  var html = ''
    + '<div class="gnb-inner">'
    +   '<div class="gnb-left">'
    +     '<a href="rebound-biz.html" class="gnb-logo">' + logoSvg + '</a>'
    +     '<div class="biz-hint-wrap">'
    +       '<div class="toggle-pill">'
    +         '<a href="rebound-biz.html" class="on">기업 Biz</a>'
    +         '<a href="#" onclick="event.preventDefault();document.getElementById(\'readyPopupOverlay\').classList.add(\'open\');">개인</a>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    +   '<nav class="gnb-nav">'
    +     '<a href="rebound-biz.html">홈</a>'
    +     '<a href="team.html"' + navCls('team') + '>팀 리바운드</a>'
    +     '<a href="support.html"' + navCls('support') + '>고객센터</a>'
    +     '<a href="https://blog.naver.com/reboundkr">블로그</a>'
    +     '<a href="self-check.html" target="_blank" rel="noopener noreferrer">셀프 진단</a>'
    +   '</nav>'
    +   '<button class="gnb-mobile-btn" id="mobileMenuBtn" aria-label="메뉴"><span></span></button>'
    +   '<div class="gnb-actions">'
    +     '<a href="login.html" class="gnb-login">로그인</a>'
    +     '<a href="rebound-biz.html#cta" class="gnb-start">신청하기</a>'
    +   '</div>'
    + '</div>';

  container.className = 'gnb';
  // header 태그 유지하면서 내부만 채움
  if (container.tagName !== 'HEADER') {
    var header = document.createElement('header');
    header.id = 'shared-gnb';
    header.className = 'gnb';
    header.innerHTML = html;
    container.parentNode.replaceChild(header, container);
  } else {
    container.innerHTML = html;
  }
})();
