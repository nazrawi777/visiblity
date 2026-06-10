(function() {
  'use strict';

  function initInfiniteCollection() {
    var wrapper = document.querySelector('[data-infinite-scroll-wrapper]');
    var grid = document.querySelector('[data-infinite-scroll-grid]');
    var loader = document.querySelector('[data-infinite-scroll-loader]');

    if (!wrapper || !grid) return;

    var nextUrl = wrapper.getAttribute('data-next-page');
    var isLoading = false;
    var isComplete = !nextUrl;

    function setLoading(state) {
      isLoading = state;
      if (loader) {
        loader.classList.toggle('is-loading', state);
        loader.setAttribute('aria-hidden', state ? 'false' : 'true');
      }
    }

    function updateNextUrl(doc) {
      var nextWrapper = doc.querySelector('[data-infinite-scroll-wrapper]');
      var fallbackNext = doc.querySelector('#AjaxinatePagination a, .pagination a[rel="next"], a.next');
      nextUrl = nextWrapper ? nextWrapper.getAttribute('data-next-page') : '';
      if (!nextUrl && fallbackNext) nextUrl = fallbackNext.getAttribute('href');
      wrapper.setAttribute('data-next-page', nextUrl || '');
      isComplete = !nextUrl;
    }

    function appendNextPage() {
      if (isLoading || isComplete || !nextUrl) return;
      setLoading(true);

      fetch(nextUrl, { credentials: 'same-origin' })
        .then(function(response) {
          if (!response.ok) throw new Error('Unable to load next collection page');
          return response.text();
        })
        .then(function(html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var incomingGrid = doc.querySelector('[data-infinite-scroll-grid], #AjaxinateContainer');
          if (!incomingGrid || !incomingGrid.children.length) {
            isComplete = true;
            wrapper.setAttribute('data-next-page', '');
            return;
          }

          Array.prototype.forEach.call(incomingGrid.children, function(item) {
            grid.appendChild(document.importNode(item, true));
          });

          updateNextUrl(doc);
          if (window.Shopify && window.Shopify.PaymentButton) {
            window.Shopify.PaymentButton.init();
          }
          if (typeof window.Currency !== 'undefined' && typeof window.Currency.convertAll === 'function') {
            window.Currency.convertAll();
          }
        })
        .catch(function(error) {
          console.warn(error);
          isComplete = true;
        })
        .finally(function() {
          setLoading(false);
        });
    }

    function onScroll() {
      if (isComplete || isLoading) return;
      var gridBottom = grid.getBoundingClientRect().bottom + window.pageYOffset;
      var triggerPoint = window.pageYOffset + window.innerHeight + 400;
      if (triggerPoint >= gridBottom) appendNextPage();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInfiniteCollection);
  } else {
    initInfiniteCollection();
  }
})();
