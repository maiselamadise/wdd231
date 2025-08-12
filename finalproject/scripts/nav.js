document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('nav ul');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
  
    // Toggle mobile menu visibility and aria-expanded
    function toggleMenu() {
      const isShown = navLinks.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', isShown);
    }
  
    // Close mobile menu if open
    function closeMenu() {
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', false);
      }
    }
  
    // Hamburger click toggles menu
    hamburger.addEventListener('click', toggleMenu);
  
    // Close menu if clicking outside nav when open (mobile)
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (
        navLinks.classList.contains('show') &&
        !navLinks.contains(target) &&
        target !== hamburger
      ) {
        closeMenu();
      }
    });
  
    // Close menu on window resize if wider than mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  
    // Theme toggling logic
    function setTheme(theme) {
      if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️'; // Sun icon
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
      } else {
        body.classList.remove('dark-theme');
        themeToggle.textContent = '🌓'; // Moon icon
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      }
      localStorage.setItem('theme', theme);
    }
  
    // Load theme preference or default light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });
  