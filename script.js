(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');

  if (!themeButton) {
    return;
  }

  const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const getSavedTheme = () => {
    try {
      return localStorage.getItem('theme');
    } catch {
      return null;
    }
  };

  const setTheme = (isDark) => {
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeButton.innerHTML = `<svg class="i"><use href="#i-${isDark ? 'sun' : 'moon'}" /></svg>`;
  };

  const savedTheme = getSavedTheme();
  const defaultDark = mediaQuery ? mediaQuery.matches : false;
  let isDark = savedTheme ? savedTheme === 'dark' : defaultDark;

  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch {
    // Intentionally ignored when storage is unavailable.
  }

  setTheme(isDark);

  themeButton.addEventListener('click', () => {
    isDark = !isDark;

    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Intentionally ignored when storage is unavailable.
    }

    setTheme(isDark);
  });
})();
