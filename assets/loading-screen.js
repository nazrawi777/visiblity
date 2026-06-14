/**
 * Signature Loading Screen
 */
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const loader = document.querySelector('.loading-screen');
    if (loader) loader.style.display = 'none';
    return;
  }

  if (sessionStorage.getItem('iv_loaded')) {
    const loader = document.querySelector('.loading-screen');
    if (loader) loader.style.display = 'none';
    return;
  }

  window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') {
        const loader = document.querySelector('.loading-screen');
        if (loader) loader.style.display = 'none';
        return;
    }

    const tl = gsap.timeline();

    tl.to('.echo-1', {
        scale: 1.4,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    })
    .to('.echo-2', {
        scale: 1.7,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
    }, '<0.1')
    .to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in'
    }, '+=0.2')
    .set('.loading-screen', {
        display: 'none'
    });

    sessionStorage.setItem('iv_loaded', 'true');
  });
})();
