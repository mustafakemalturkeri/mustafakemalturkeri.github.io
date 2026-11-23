/* EN/TR switch. Default English; ?lang=tr or a saved choice overrides it. */
(function () {
  var root = document.documentElement;

  function initial() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'tr') return q;
      var saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'tr') return saved;
    } catch (e) {}
    return 'en';
  }

  function apply(lang, save) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    var t = root.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-set-lang') === lang ? 'true' : 'false');
    }
    if (save) { try { localStorage.setItem('lang', lang); } catch (e) {} }
  }

  var lang = initial();
  apply(lang, /[?&]lang=/.test(location.search));
  document.addEventListener('DOMContentLoaded', function () { apply(root.getAttribute('data-lang'), false); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-set-lang]') : null;
    if (b) apply(b.getAttribute('data-set-lang'), true);
  });
})();
