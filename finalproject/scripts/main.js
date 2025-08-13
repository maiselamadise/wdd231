
// Main site interactions: nav toggle and active link
document.addEventListener('DOMContentLoaded', ()=>{
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  toggle?.addEventListener('click', ()=> menu.classList.toggle('open'));

  // Wayfinding: highlight active link based on pathname
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
});
