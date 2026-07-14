/** Keep the accessible theme control in sync with system and saved preferences. */

const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

/** Apply a theme and update the control so its next action is unambiguous. */
function applyTheme(theme) {
  const isDark = theme === 'dark';

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  themeColor.content = isDark ? '#111715' : '#f7f6f2';
  themeToggle.textContent = isDark ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

  // Persist only explicit choices; otherwise system changes remain authoritative.
  try {
    localStorage.setItem('theme', nextTheme);
  } catch {
    // The active page can still switch when browser storage is unavailable.
  }
  applyTheme(nextTheme);
});

systemTheme.addEventListener('change', (event) => {
  try {
    if (localStorage.getItem('theme')) return;
  } catch {
    // Without storage, following the live system preference is the safest fallback.
  }
  applyTheme(event.matches ? 'dark' : 'light');
});

applyTheme(document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
