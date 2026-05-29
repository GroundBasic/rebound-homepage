// ── 비즈 신청 팝업 (공유) ──
// 사용법: <script src="apply-popup.js"></script>
// GNB의 .gnb-start 버튼 또는 텍스트가 "신청하기"/"서비스 신청하기" 인 링크를 누르면 모달이 열립니다.
// rebound-biz.html은 자체 inline 모달을 사용하므로 이 스크립트를 포함하지 않습니다.

(function() {
  if (document.getElementById('consult-overlay')) return;

  const MODAL_HTML = `
<div id="consult-overlay" style="display:none; position:fixed; inset:0; z-index:9000; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); overflow-y:auto; padding:32px 16px; align-items:center; justify-content:center;">
  <div id="consult-modal" style="background:#fff; border-radius:20px; max-width:620px; width:100%; margin:auto; box-shadow:0 32px 80px rgba(0,0,0,0.32), 0 8px 24px rgba(0,0,0,0.12); overflow:hidden; position:relative;">
    <button id="consult-close" style="position:absolute;top:20px;right:20px;z-index:10;background:#F3F4F6;border:none;border-radius:8px;width:32px;height:32px;cursor:pointer;font-size:18px;color:#6B7280;line-height:1;display:flex;align-items:center;justify-content:center;transition:background 0.2s;">&times;</button>
    <div style="max-height:90vh;overflow-y:auto;padding:40px 40px 32px;">
      <div style="text-align:center;margin-bottom:32px;">
        <div style="display:inline-flex;align-items:center;gap:8px;background:#0B1C2C;border-radius:20px;padding:6px 16px;margin-bottom:14px;">
          <span style="width:7px;height:7px;background:#B5F23D;border-radius:50%;display:inline-block;"></span>
          <span style="font-size:12px;font-weight:700;color:#B5F23D;letter-spacing:0.5px;">BIZ 신청</span>
        </div>
        <h2 style="font-size:28px;font-weight:900;color:#1F2937;letter-spacing:-1px;line-height:1.2;margin-bottom:8px;font-family:'Pretendard',sans-serif;">리바운드 서비스 신청</h2>
        <p style="font-size:14px;color:#6B7280;">법인 간 미수금 회수, 리바운드와 함께 해결해보세요</p>
      </div>
      <form id="consult-form">
        <div style="display:flex;flex-direction:column;gap:20px;">
          <div>
            <label class="ap-form-label">회사명 (법인명/상호) <span style="color:#EF4444;">*</span></label>
            <input type="text" id="f-company" class="ap-form-input" placeholder="회사명을 입력해주세요" />
            <p class="ap-field-error" id="err-company"></p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <label class="ap-form-label">담당자명 <span style="color:#EF4444;">*</span></label>
              <input type="text" id="f-contact-name" class="ap-form-input" placeholder="담당자 이름을 입력해주세요" />
              <p class="ap-field-error" id="err-contact-name"></p>
            </div>
            <div>
              <label class="ap-form-label">담당자 연락처 <span style="color:#EF4444;">*</span></label>
              <input type="tel" id="f-phone" class="ap-form-input" placeholder="010-0000-0000" maxlength="13" />
              <p class="ap-field-error" id="err-phone"></p>
            </div>
          </div>
          <div>
            <label class="ap-form-label">담당자 이메일 <span style="color:#EF4444;">*</span></label>
            <input type="email" id="f-email" class="ap-form-input" placeholder="이메일을 입력해주세요" />
            <p class="ap-field-error" id="err-email"></p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <label class="ap-form-label">총 채권 금액 (대략적) <span style="color:#EF4444;">*</span></label>
              <div style="position:relative;">
                <input type="text" id="f-amount" class="ap-form-input" placeholder="숫자로 입력해주세요" style="padding-right:120px;" />
                <span id="amount-korean" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:13px;font-weight:600;color:#6B7280;pointer-events:none;white-space:nowrap;"></span>
              </div>
              <p class="ap-field-error" id="err-amount"></p>
            </div>
            <div>
              <label class="ap-form-label">채권 종류 <span style="color:#EF4444;">*</span></label>
              <select id="f-claim-type" class="ap-form-input">
                <option value="">채권 종류를 선택해주세요</option>
                <option value="물품대금">물품대금</option>
                <option value="공사대금">공사대금</option>
                <option value="용역대금">용역대금</option>
                <option value="대여금">대여금</option>
                <option value="임대료">임대료</option>
                <option value="기타">기타</option>
              </select>
              <p class="ap-field-error" id="err-claim-type"></p>
            </div>
          </div>
          <div>
            <label class="ap-form-label">채무 법인 수 (대략적)</label>
            <input type="text" id="f-debtor-count" class="ap-form-input" placeholder="예) 약 5개사" />
          </div>
          <div>
            <label class="ap-form-label">추가 문의사항</label>
            <textarea id="f-notes" class="ap-form-input" rows="4" placeholder="추가로 문의하실 내용이 있으시면 자유롭게 작성해주세요." style="resize:vertical;"></textarea>
          </div>
          <div style="background:#F3F4F6;border-radius:12px;padding:20px 20px 16px;">
            <p style="font-size:14px;font-weight:700;color:#111827;margin-bottom:14px;">필수 확인 사항</p>
            <div style="display:flex;flex-direction:column;gap:14px;">
              <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;">
                <input type="checkbox" id="chk-service" style="margin-top:3px;accent-color:#B5F23D;width:16px;height:16px;flex-shrink:0;cursor:pointer;" />
                <div>
                  <p style="font-size:13px;font-weight:700;color:#111827;margin-bottom:4px;">아래 내용을 확인했습니다.</p>
                  <p style="font-size:12px;color:#6B7280;line-height:1.7;">신청 후 내용을 검토하여 서비스 기준에 적합한 경우에만 서비스가 제공됩니다.<br>서비스 대상자로 선정되시면 담당자가 추후 연락드릴 예정입니다.</p>
                </div>
              </label>
              <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;">
                <input type="checkbox" id="chk-privacy" style="margin-top:3px;accent-color:#B5F23D;width:16px;height:16px;flex-shrink:0;cursor:pointer;" />
                <div>
                  <p style="font-size:13px;font-weight:700;color:#111827;margin-bottom:4px;">개인정보 수집/이용에 동의합니다.</p>
                  <p style="font-size:12px;color:#6B7280;line-height:1.7;">· 항목: 담당자명, 연락처, 이메일, 회사명, 사업자번호, 대표자명<br>· 목적: 서비스 신청 접수 및 자격 검토<br>· 보유: 검토 완료 후 30일 파기 (계약 체결 시 계약기간 동안 보유)</p>
                </div>
              </label>
            </div>
            <p class="ap-field-error" id="err-checks"></p>
          </div>
          <button type="submit" id="modal-submit" style="width:100%;background:#9CA3AF;color:#0B1C2C;border:none;border-radius:12px;padding:16px;font-size:16px;font-weight:800;cursor:not-allowed;transition:background 0.2s,color 0.2s;letter-spacing:-0.2px;" disabled>서비스 신청하기</button>
        </div>
      </form>
    </div>
  </div>
</div>
<div id="consult-success" style="display:none;position:fixed;inset:0;z-index:9100;background:rgba(0,0,0,0.6);align-items:center;justify-content:center;padding:20px;">
  <div style="background:#fff;border-radius:20px;max-width:400px;width:100%;padding:40px 32px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.3);">
    <div style="width:64px;height:64px;background:#F0FFF4;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <h3 style="font-size:22px;font-weight:800;color:#1A1714;margin-bottom:10px;">신청이 완료되었습니다!</h3>
    <p style="font-size:15px;color:#6B6B6B;line-height:1.7;margin-bottom:28px;">담당자가 1영업일 이내에<br>연락드리겠습니다.</p>
    <button id="success-close" style="background:#0B1C2C;color:#fff;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:700;cursor:pointer;width:100%;">확인</button>
  </div>
</div>
<div id="consult-loading" style="display:none;position:fixed;inset:0;z-index:9200;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;">
  <div style="background:#fff;border-radius:16px;padding:32px 40px;text-align:center;">
    <div style="width:40px;height:40px;border:3px solid #E5E7EB;border-top-color:#0B1C2C;border-radius:50%;animation:ap-spin 0.7s linear infinite;margin:0 auto 16px;"></div>
    <p style="font-size:14px;color:#6B6B6B;font-weight:500;">제출 중...</p>
  </div>
</div>
`;

  document.body.insertAdjacentHTML('beforeend', MODAL_HTML);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ap-spin { to { transform: rotate(360deg); } }
    .ap-form-label { display:block; font-size:13px; font-weight:600; color:#374151; margin-bottom:6px; }
    .ap-form-input { width:100%; padding:13px 16px; border:1.5px solid #E5E7EB; border-radius:10px; font-size:14px; color:#111827; font-family:inherit; outline:none; transition:border-color 0.2s; background:#fff; }
    .ap-form-input:focus { border-color:#B5F23D; border-width:2px; box-shadow:none; }
    .ap-form-input.input-error { border-color:#EF4444; }
    .ap-form-input.input-error:focus { border-color:#EF4444; border-width:2px; box-shadow:none; }
    .ap-field-error { font-size:12px; color:#EF4444; margin-top:5px; min-height:0; line-height:1.4; display:none; }
    .ap-field-error.show { display:block; }
    select.ap-form-input { cursor:pointer; }
    #consult-close:hover { background:#E5E7EB; }
    #modal-submit:not([disabled]) { background:#0B1C2C !important; color:#B5F23D !important; cursor:pointer !important; }
    #modal-submit:not([disabled]):hover { background:#1A2B3F !important; }
    #consult-overlay::-webkit-scrollbar { width:0; }
  `;
  document.head.appendChild(style);

  const overlay = document.getElementById('consult-overlay');
  const loading = document.getElementById('consult-loading');
  const successModal = document.getElementById('consult-success');

  function openModal() {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('consult-form').reset();
    document.getElementById('amount-korean').textContent = '';
    document.querySelectorAll('.ap-field-error').forEach(el => { el.textContent = ''; el.classList.remove('show'); });
    document.querySelectorAll('.ap-form-input.input-error').forEach(el => el.classList.remove('input-error'));
    Object.keys(touched).forEach(k => delete touched[k]);
    updateSubmitBtn();
  }

  function closeModal() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.getElementById('consult-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('success-close').addEventListener('click', () => {
    successModal.style.display = 'none';
    closeModal();
  });

  function wireTriggers() {
    document.querySelectorAll('a').forEach(btn => {
      if (btn.dataset.applyWired) return;
      const txt = btn.textContent.trim();
      if (txt.includes('서비스 신청하기') || btn.classList.contains('gnb-start')) {
        btn.dataset.applyWired = '1';
        btn.addEventListener('click', e => { e.preventDefault(); openModal(); });
      }
    });
  }
  // gnb.js가 동적으로 GNB을 주입하므로 약간의 딜레이 후 wire (그리고 안전하게 한 번 더)
  wireTriggers();
  setTimeout(wireTriggers, 0);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireTriggers);
  }

  const MOBILE_PREFIX = ['010','011','016','017','018','019'];
  const AREA_PREFIX = ['02','031','032','033','041','042','043','044','051','052','053','054','055','061','062','063','064'];
  function getPhoneType(digits) {
    if (MOBILE_PREFIX.some(p => digits.startsWith(p))) return 'mobile';
    if (digits.startsWith('02')) return 'seoul';
    if (AREA_PREFIX.some(p => digits.startsWith(p))) return 'area';
    return 'invalid';
  }

  document.getElementById('f-phone').addEventListener('input', function() {
    let v = this.value.replace(/\D/g,'');
    const type = getPhoneType(v);
    if (type === 'seoul') {
      v = v.slice(0,10);
      if (v.length <= 2) this.value = v;
      else if (v.length <= 5) this.value = v.slice(0,2)+'-'+v.slice(2);
      else if (v.length <= 9) this.value = v.slice(0,2)+'-'+v.slice(2,v.length-4)+'-'+v.slice(v.length-4);
      else this.value = v.slice(0,2)+'-'+v.slice(2,6)+'-'+v.slice(6,10);
    } else {
      v = v.slice(0,11);
      if (v.length <= 3) this.value = v;
      else if (v.length <= 7) this.value = v.slice(0,3)+'-'+v.slice(3);
      else this.value = v.slice(0,3)+'-'+v.slice(3,7)+'-'+v.slice(7,11);
    }
    if (touched['f-phone']) validators['f-phone']();
    updateSubmitBtn();
  });

  function isPhoneComplete() {
    const digits = document.getElementById('f-phone').value.replace(/\D/g,'');
    const type = getPhoneType(digits);
    if (type === 'mobile') return digits.length === 11;
    if (type === 'seoul') return digits.length >= 9 && digits.length <= 10;
    if (type === 'area') return digits.length >= 10 && digits.length <= 11;
    return false;
  }

  function numberToKorean(num) {
    if (!num || num === 0) return '';
    const units = ['', '만', '억', '조'];
    const parts = [];
    let idx = 0;
    while (num > 0) {
      const chunk = num % 10000;
      if (chunk > 0) parts.unshift(chunk.toLocaleString() + units[idx]);
      num = Math.floor(num / 10000);
      idx++;
    }
    return parts.join(' ') + '원';
  }

  document.getElementById('f-amount').addEventListener('input', function() {
    const raw = this.value.replace(/[^\d]/g,'');
    const num = parseInt(raw, 10);
    if (raw === '' || isNaN(num)) {
      this.value = '';
      document.getElementById('amount-korean').textContent = '';
    } else {
      this.value = num.toLocaleString();
      document.getElementById('amount-korean').textContent = numberToKorean(num);
    }
    updateSubmitBtn();
  });

  function showError(inputId, errId, msg) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (input) input.classList.add('input-error');
    if (err) { err.textContent = msg; err.classList.add('show'); }
  }
  function clearError(inputId, errId) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (input) input.classList.remove('input-error');
    if (err) { err.textContent = ''; err.classList.remove('show'); }
  }

  const validators = {
    'f-company': () => {
      const v = document.getElementById('f-company').value.trim();
      if (!v) { showError('f-company','err-company','회사명을 입력해주세요.'); return false; }
      clearError('f-company','err-company'); return true;
    },
    'f-contact-name': () => {
      const v = document.getElementById('f-contact-name').value.trim();
      if (!v) { showError('f-contact-name','err-contact-name','담당자명을 입력해주세요.'); return false; }
      clearError('f-contact-name','err-contact-name'); return true;
    },
    'f-phone': () => {
      const digits = document.getElementById('f-phone').value.replace(/\D/g,'');
      if (!digits) { showError('f-phone','err-phone','연락처를 입력해주세요.'); return false; }
      const type = getPhoneType(digits);
      if (type === 'invalid') { showError('f-phone','err-phone','올바른 전화번호를 입력해주세요. (예: 010, 02, 031 등)'); return false; }
      if (!isPhoneComplete()) { showError('f-phone','err-phone','전화번호를 끝까지 입력해주세요.'); return false; }
      clearError('f-phone','err-phone'); return true;
    },
    'f-email': () => {
      const v = document.getElementById('f-email').value.trim();
      if (!v) { showError('f-email','err-email','이메일을 입력해주세요.'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { showError('f-email','err-email','올바른 이메일 형식으로 입력해주세요.'); return false; }
      clearError('f-email','err-email'); return true;
    },
    'f-amount': () => {
      const raw = document.getElementById('f-amount').value.replace(/[^\d]/g,'');
      if (!raw) { showError('f-amount','err-amount','채권 금액을 입력해주세요.'); return false; }
      clearError('f-amount','err-amount'); return true;
    },
    'f-claim-type': () => {
      const v = document.getElementById('f-claim-type').value;
      if (!v) { showError('f-claim-type','err-claim-type','채권 종류를 선택해주세요.'); return false; }
      clearError('f-claim-type','err-claim-type'); return true;
    },
  };

  const touched = {};
  Object.keys(validators).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => { touched[id] = true; validators[id](); updateSubmitBtn(); });
    el.addEventListener('input', () => { if (touched[id]) validators[id](); updateSubmitBtn(); });
    if (el.tagName === 'SELECT') {
      el.addEventListener('change', () => { touched[id] = true; validators[id](); updateSubmitBtn(); });
    }
  });

  function validateChecks() {
    const s = document.getElementById('chk-service');
    const p = document.getElementById('chk-privacy');
    if (s && p && s.checked && p.checked) {
      const err = document.getElementById('err-checks');
      if (err) { err.textContent = ''; err.classList.remove('show'); }
      return true;
    }
    return false;
  }

  function updateSubmitBtn() {
    const btn = document.getElementById('modal-submit');
    if (!btn) return;
    const allValid = Object.keys(validators).every(inputId => {
      const el = document.getElementById(inputId);
      if (!el) return false;
      if (inputId === 'f-phone') return isPhoneComplete();
      if (inputId === 'f-email') {
        const v = el.value.trim();
        return v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      }
      return el.value.trim() !== '';
    });
    const chkService = document.getElementById('chk-service');
    const chkPrivacy = document.getElementById('chk-privacy');
    const allChecked = chkService && chkPrivacy && chkService.checked && chkPrivacy.checked;
    btn.disabled = !(allValid && allChecked);
  }

  ['chk-service','chk-privacy'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => { validateChecks(); updateSubmitBtn(); });
  });

  document.getElementById('consult-form').addEventListener('submit', async e => {
    e.preventDefault();
    Object.keys(validators).forEach(id => { touched[id] = true; });
    let allPass = true;
    let firstFail = null;
    Object.keys(validators).forEach(id => {
      if (!validators[id]()) { allPass = false; if (!firstFail) firstFail = id; }
    });
    const chkS = document.getElementById('chk-service');
    const chkP = document.getElementById('chk-privacy');
    if (!chkS.checked || !chkP.checked) {
      allPass = false;
      showError('chk-service','err-checks','필수 확인 사항을 모두 체크해주세요.');
      if (!firstFail) firstFail = 'chk-service';
    }
    if (!allPass) {
      if (firstFail) document.getElementById(firstFail).focus();
      return;
    }
    loading.style.display = 'flex';
    const payload = {
      companyName: document.getElementById('f-company').value,
      contactPersonName: document.getElementById('f-contact-name').value,
      contactPhone: document.getElementById('f-phone').value,
      contactEmail: document.getElementById('f-email').value,
      totalClaimAmount: document.getElementById('f-amount').value.replace(/,/g,''),
      claimType: document.getElementById('f-claim-type').value,
      debtorCount: document.getElementById('f-debtor-count').value,
      additionalNotes: document.getElementById('f-notes').value,
    };
    try {
      const response = await fetch('/api/submit-consult', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('submit failed');
    } catch(err) {
      loading.style.display = 'none';
      alert('신청 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    loading.style.display = 'none';
    overlay.style.display = 'none';
    successModal.style.display = 'flex';
  });
})();
