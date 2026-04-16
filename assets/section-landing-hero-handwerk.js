(() => {
  const SELECTOR = '[data-landing-hw-hero-carousel]';

  /** Avoid two slides marked active (theme editor / odd saves). */
  function dedupeActiveSlide(slides) {
    const list = Array.prototype.slice.call(slides);
    let seen = false;
    list.forEach((slide) => {
      if (slide.classList.contains('is-active')) {
        if (seen) {
          slide.classList.remove('is-active');
          slide.setAttribute('aria-hidden', 'true');
        } else {
          seen = true;
        }
      }
    });
    if (list.length && !seen) {
      list[0].classList.add('is-active');
      list[0].setAttribute('aria-hidden', 'false');
    }
  }

  function clearCarousel(carousel) {
    if (carousel._hwHeroIntervalId) {
      clearInterval(carousel._hwHeroIntervalId);
      carousel._hwHeroIntervalId = null;
    }
    if (carousel._hwHeroResumeTimeout) {
      clearTimeout(carousel._hwHeroResumeTimeout);
      carousel._hwHeroResumeTimeout = null;
    }
  }

  function startCarouselTimer(carousel, slides, intervalMs) {
    clearCarousel(carousel);
    let index = 0;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('is-active')) {
        index = i;
        break;
      }
    }

    const tick = () => {
      // Instantly hide outgoing slide (no transition on it)
      const outgoing = slides[index];
      outgoing.classList.remove('is-active');
      outgoing.setAttribute('aria-hidden', 'true');

      // Pick next, let the browser flush the removal before adding is-active
      // so the incoming slide's opacity transition always starts from 0.
      index = (index + 1) % slides.length;
      const incoming = slides[index];
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          incoming.classList.add('is-active');
          incoming.setAttribute('aria-hidden', 'false');
        });
      });
    };

    carousel._hwHeroIntervalId = window.setInterval(tick, intervalMs);
  }

  function initCarousel(carousel) {
    clearCarousel(carousel);
    if (carousel._hwHeroAbort) {
      carousel._hwHeroAbort.abort();
    }
    carousel._hwHeroAbort = new AbortController();
    const signal = carousel._hwHeroAbort.signal;

    const slides = carousel.querySelectorAll('.landing-hw-hero__carousel-slide');
    dedupeActiveSlide(slides);
    if (slides.length < 2) return;

    const autoplay = carousel.getAttribute('data-autoplay') !== 'false';
    const intervalMs = parseInt(carousel.getAttribute('data-interval-ms') || '5000', 10);
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!autoplay || prefersReduced || intervalMs < 1000) return;

    const scheduleResume = () => {
      if (carousel._hwHeroResumeTimeout) clearTimeout(carousel._hwHeroResumeTimeout);
      carousel._hwHeroResumeTimeout = window.setTimeout(() => {
        startCarouselTimer(carousel, slides, intervalMs);
      }, 400);
    };

    carousel.addEventListener(
      'mouseenter',
      () => {
        clearCarousel(carousel);
      },
      { signal }
    );
    carousel.addEventListener('mouseleave', scheduleResume, { signal });

    if (!document.hidden) {
      startCarouselTimer(carousel, slides, intervalMs);
    }
  }

  function initLandingHwHeroCarousels(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const list =
      root && root.matches && root.matches(SELECTOR)
        ? [root]
        : Array.prototype.slice.call(scope.querySelectorAll(SELECTOR));
    list.forEach((carousel) => initCarousel(carousel));
  }

  document.addEventListener('DOMContentLoaded', () => initLandingHwHeroCarousels(document));

  document.addEventListener('shopify:section:load', (event) => {
    const target = event.target;
    if (target && target.nodeType === 1) {
      initLandingHwHeroCarousels(target);
    }
  });

  if (!window.__landingHwHeroVisBound) {
    window.__landingHwHeroVisBound = true;
    document.addEventListener('visibilitychange', () => {
      document.querySelectorAll(SELECTOR).forEach((carousel) => {
        const slides = carousel.querySelectorAll('.landing-hw-hero__carousel-slide');
        const autoplay = carousel.getAttribute('data-autoplay') !== 'false';
        const intervalMs = parseInt(carousel.getAttribute('data-interval-ms') || '5000', 10);
        const prefersReduced =
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (slides.length < 2 || !autoplay || prefersReduced || intervalMs < 1000) return;

        if (document.hidden) {
          clearCarousel(carousel);
        } else {
          startCarouselTimer(carousel, slides, intervalMs);
        }
      });
    });
  }
})();
