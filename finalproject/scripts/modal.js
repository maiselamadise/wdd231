export function setupModal(modalId, openBtnId, closeBtnClass = 'modal-close') {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = modal.querySelector(`.${closeBtnClass}`);
    let focusedElementBeforeModal = null;
  
    if (!modal || !openBtn || !closeBtn) {
      console.warn('Modal elements not found!');
      return;
    }
  
    // Utility: Get all focusable elements inside modal
    const focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]'
    ].join(',');
  
    const focusableElements = () => 
      Array.from(modal.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
  
    // Trap focus inside modal
    function trapFocus(e) {
      const focusables = focusableElements();
      if (focusables.length === 0) return;
  
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];
  
      if (e.key === 'Tab') {
        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else { // Tab
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    }
  
    function openModal() {
      focusedElementBeforeModal = document.activeElement;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'flex';
      // Focus first focusable element or modal itself
      const focusables = focusableElements();
      if (focusables.length) {
        focusables[0].focus();
      } else {
        modal.focus();
      }
      document.addEventListener('keydown', trapFocus);
      document.addEventListener('keydown', handleEscape);
    }
  
    function closeModal() {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
      document.removeEventListener('keydown', trapFocus);
      document.removeEventListener('keydown', handleEscape);
      if (focusedElementBeforeModal) {
        focusedElementBeforeModal.focus();
      }
    }
  
    // Close modal when clicking outside modal-content
    function clickOutside(e) {
      if (e.target === modal) {
        closeModal();
      }
    }
  
    // Close modal on Escape key
    function handleEscape(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }
  
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', clickOutside);
  }
  