export function createModal(contentHTML) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-button" aria-label="Close modal">&times;</button>
      ${contentHTML}
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close-button').addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });
}

let lastFocusedEl = null;

export function openModal(contentHTML){
  const modal = document.getElementById('service-modal');
  const body = document.getElementById('modal-body');
  lastFocusedEl = document.activeElement;
  body.innerHTML = contentHTML;
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('#modal-close').focus();
}

export function closeModal(){
  const modal = document.getElementById('service-modal');
  modal.setAttribute('aria-hidden', 'true');
  if(lastFocusedEl) lastFocusedEl.focus();
}

export function bindModal(){
  const modal = document.getElementById('service-modal');
  if(!modal) return;
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
}
