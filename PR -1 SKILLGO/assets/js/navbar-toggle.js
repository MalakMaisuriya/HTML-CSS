document.addEventListener('DOMContentLoaded', function () {
  // Toggle dropdowns on click for touch and keyboard users
  document.querySelectorAll('.main-nav-item').forEach(function (item) {
    var submenu = item.querySelector('.sub-menu');
    if (!submenu) return;
    var link = item.querySelector('.main-nav-link');
    if (!link) return;

    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');

    link.addEventListener('click', function (e) {
      // Allow normal link behavior for true navigational links
      var href = link.getAttribute('href');
      if (href && href.trim() !== '#' && href.trim() !== '') return;

      e.preventDefault();
      var isOpen = item.classList.toggle('open');
      link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Close open menus when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.main-nav')) {
      document.querySelectorAll('.main-nav-item.open').forEach(function (it) {
        it.classList.remove('open');
        var l = it.querySelector('.main-nav-link');
        if (l) l.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      document.querySelectorAll('.main-nav-item.open').forEach(function (it) {
        it.classList.remove('open');
        var l = it.querySelector('.main-nav-link');
        if (l) l.setAttribute('aria-expanded', 'false');
      });
    }
  });
});
