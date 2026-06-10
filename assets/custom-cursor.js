(function() {
  'use strict';

  var isTouchDevice = navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
  var root = document.documentElement;
  var dot;
  var ring;
  var targetX = 0;
  var targetY = 0;
  var ringX = 0;
  var ringY = 0;

  function setInteractive(isInteractive) {
    if (!dot || !ring) return;
    dot.classList.toggle('is-interactive', isInteractive);
    ring.classList.toggle('is-interactive', isInteractive);
  }

  function animateRing() {
    ringX += (targetX - ringX) * 0.12;
    ringY += (targetY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }

  function initCustomCursor() {
    dot = document.getElementById('cursor-orb');
    ring = document.getElementById('cursor-trail');

    if (isTouchDevice || !dot || !ring) {
      root.classList.remove('iv-custom-cursor-enabled');
      return;
    }

    root.classList.add('iv-custom-cursor-enabled');
    targetX = window.innerWidth / 2;
    targetY = window.innerHeight / 2;
    ringX = targetX;
    ringY = targetY;

    document.addEventListener('mousemove', function(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.left = targetX + 'px';
      dot.style.top = targetY + 'px';
      setInteractive(Boolean(event.target.closest('a, button, [role="button"], .btn, input, select')));
    }, { passive: true });

    document.addEventListener('mouseover', function(event) {
      setInteractive(Boolean(event.target.closest('a, button, [role="button"], .btn, input, select')));
    });

    document.addEventListener('mouseout', function(event) {
      if (event.target.closest('a, button, [role="button"], .btn, input, select')) {
        setInteractive(false);
      }
    });

    animateRing();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
  } else {
    initCustomCursor();
  }
})();
