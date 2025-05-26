document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Get current theme (should already be set by theme-init.js)
  const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Ensure theme is properly applied
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateBodyClass(currentTheme);
  updateThemeIcon(currentTheme);
  
  // Ensure body is visible and theme-loaded
  document.body.classList.add('theme-loaded');
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'light' 
        : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      updateBodyClass(newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  // Update body class for background animation compatibility
  function updateBodyClass(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  // Update the theme icon based on current theme
  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
  }
  
  // Listen for system theme changes
  prefersDarkScheme.addEventListener('change', function(e) {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateBodyClass(newTheme);
      updateThemeIcon(newTheme);
    }
  });
});