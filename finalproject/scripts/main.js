// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('nav ul');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
  
    // Toggle navigation menu on small screens
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      // Update aria-expanded for accessibility
      const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
      hamburger.setAttribute('aria-expanded', !expanded);
    });
  
    // Theme toggle function
    function setTheme(theme) {
      if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
      } else {
        body.classList.remove('dark-theme');
        themeToggle.textContent = '🌓';
      }
      localStorage.setItem('theme', theme);
    }
  
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  
    // Theme toggle button click
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });
  