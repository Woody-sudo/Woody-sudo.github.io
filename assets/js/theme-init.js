// Immediate theme initialization to prevent flash
(function() {
  // Get saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Set theme immediately
  document.documentElement.setAttribute('data-theme', theme);
  
  // Set body class for background animation compatibility
  if (theme === 'dark') {
    document.documentElement.style.backgroundColor = '#121212';
    document.body?.classList.add('dark-mode');
  } else {
    document.documentElement.style.backgroundColor = '#fff';
    document.body?.classList.remove('dark-mode');
  }
})();
