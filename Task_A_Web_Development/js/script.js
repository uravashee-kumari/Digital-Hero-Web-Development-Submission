
document.addEventListener('DOMContentLoaded', function () {
 
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Scroll-reveal ------------------------------------------------------
     Elements with class="reveal" fade/slide into place as they enter the
     viewport. Falls back to just showing everything immediately if
     IntersectionObserver isn't available, or if the user prefers reduced
     motion (checked here, in addition to the CSS-level reduced-motion rule,
     so we don't even bother observing in that case). */
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) {
    
  } else if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    // Give direct children of a revealed grid a staggered delay index,
    // so cards in a feature grid settle in one after another rather than
    // all landing on the same frame.
    revealEls.forEach(function (el) {
      var children = el.children;
      for (var i = 0; i < children.length; i++) {
        children[i].style.setProperty('--stagger', i);
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('primary-nav');

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the menu with Escape, and return focus to the toggle button —
    // small detail, but it's what makes a mobile menu actually usable
    // with a keyboard instead of just a mouse.
    navList.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---- Contact form: demo submit handler --------------------------------
     There's no backend behind this yet. This just proves the interaction
     and gives real user feedback in the UI, using aria-live so screen
     reader users hear the status without moving focus. Swap the body of
     this handler for a real fetch() call once there's an endpoint. */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('is-confirming');
        setTimeout(function () { submitBtn.classList.remove('is-confirming'); }, 400);
      }

      status.textContent = 'Thanks — this is a demo form with no backend connected yet. In production this would send your details to the sales team.';
      status.classList.add('is-visible');
      form.reset();
    });
  }
});
