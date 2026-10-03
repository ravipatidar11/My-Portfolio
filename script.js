(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const label = toggle.querySelector('.theme-label');
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    icon.textContent = dark ? '☀' : '☾';
    label.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    metaTheme.setAttribute('content', dark ? '#11151d' : '#f7f8fa');
    try { localStorage.setItem('ravi-portfolio-theme', theme); } catch (_) {}
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('ravi-portfolio-theme'); } catch (_) {}
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (preferredDark ? 'dark' : 'light'));

  toggle.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
})();