/** Persist theme choices while CSS radio selectors remain the switching mechanism. */

const lightInput = document.querySelector('#theme-light');
const darkInput = document.querySelector('#theme-dark');
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

/** Synchronize document metadata and radio state with an effective theme. */
function applyTheme(theme, persist = false) {
  const isDark = theme === 'dark';

  lightInput.checked = !isDark;
  darkInput.checked = isDark;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  themeColor.content = isDark ? '#111715' : '#f7f6f2';

  if (!persist) return;

  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Radio selectors still switch the visible theme when storage is unavailable.
  }
}

for (const input of [lightInput, darkInput]) {
  input.addEventListener('change', () => {
    if (input.checked) applyTheme(input.value, true);
  });
}

function handleSystemThemeChange(event) {
  try {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') return;
  } catch {
    // Without storage, the system theme should continue to drive the default.
  }

  applyTheme(event.matches ? 'dark' : 'light');
}

// Older Firefox versions expose addListener but not EventTarget methods here.
if (typeof systemTheme.addEventListener === 'function') {
  systemTheme.addEventListener('change', handleSystemThemeChange);
} else if (typeof systemTheme.addListener === 'function') {
  systemTheme.addListener(handleSystemThemeChange);
}

let storedTheme;
try {
  storedTheme = localStorage.getItem('theme');
} catch {
  // The system preference below remains a complete fallback.
}

const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
  ? storedTheme
  : (systemTheme.matches ? 'dark' : 'light');

applyTheme(initialTheme);
