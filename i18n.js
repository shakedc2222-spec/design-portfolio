document.addEventListener('DOMContentLoaded', function () {
  var STORAGE_KEY = 'siteLang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function resolve(path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key];
    }, TRANSLATIONS);
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var entry = resolve(el.getAttribute('data-i18n'));
      if (entry && entry[lang] != null) {
        el.innerHTML = entry[lang];
      }
    });

    var pageKey = document.body.getAttribute('data-i18n-page');
    if (pageKey) {
      var titleEntry = resolve(pageKey + '.pageTitle');
      if (titleEntry && titleEntry[lang]) {
        document.title = titleEntry[lang];
      }
    }

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'en' ? 'עברית' : 'English';
      btn.setAttribute('lang', lang === 'en' ? 'he' : 'en');
    });
  }

  function setLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
  }

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(getLang() === 'en' ? 'he' : 'en');
    });
  });

  applyLanguage(getLang());
});
