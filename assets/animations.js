/**
 * Shared GSAP & ScrollTrigger Animations
 */
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Wait for GSAP and ScrollTrigger
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Header Transition past 80px
    const header = document.querySelector('.sticky-header-active');
    if (header) {
        ScrollTrigger.create({
          start: 'top -80',
          onEnter: () => {
            gsap.to(header, {
              backgroundColor: 'rgba(49, 55, 143, 0.85)',
              backdropFilter: 'blur(10px)',
              webkitBackdropFilter: 'blur(10px)',
              duration: 0.2,
              ease: 'power1.out'
            });
          },
          onLeaveBack: () => {
            gsap.to(header, {
              backgroundColor: '#31378F', // Original nav bg
              backdropFilter: 'blur(0px)',
              webkitBackdropFilter: 'blur(0px)',
              duration: 0.2,
              ease: 'power1.in'
            });
          }
        });
    }

    // 1.1 Header Dropdowns reveal
    gsap.utils.toArray('.glass-nav').forEach(dropdown => {
        const parent = dropdown.closest('.menu-item-has-children');
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 768) {
                    gsap.fromTo(dropdown,
                        { opacity: 0, y: 8 },
                        { opacity: 1, y: 0, duration: 0.2, ease: 'power1.out' }
                    );
                }
            });
        }
    });

    // 2. Section Headers Reveal
    gsap.utils.toArray('.dt-sc-heading').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 90%',
        },
        y: 12,
        opacity: 0,
        duration: 0.5,
        ease: 'power1.out' // roughly matches cubic-bezier(0, 0, 0.2, 1)
      });
    });

    // 3. Product Grid Batching
    ScrollTrigger.batch('.iv-product-card', {
      onEnter: batch => {
        gsap.from(batch, {
          y: 30,
          opacity: 0,
          stagger: 0.07,
          duration: 0.5,
          ease: 'power1.out',
          overwrite: true
        });
      },
      start: 'top 90%'
    });

    // 4. Marquee Glow Pulse
    ScrollTrigger.create({
        trigger: '.dt-sc-marquee-section',
        onEnter: () => {
            gsap.to('.dt-sc-marquee-section', {
                boxShadow: '0 0 20px rgba(255, 199, 47, 0.5)',
                repeat: 2,
                yoyo: true,
                duration: 0.6,
                ease: 'power1.inOut'
            });
        }
    });

    // 5. Testimonials Reveal
    ScrollTrigger.batch('.dt-sc-testimonial', {
        onEnter: batch => {
            gsap.from(batch, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power2.out'
            });
        },
        start: 'top 90%'
    });

    // 8. Collection Parallax
    if (window.innerWidth >= 768) {
        gsap.utils.toArray('.iv-collection-hero-parallax img').forEach(img => {
            gsap.to(img, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    // 9. Card Hover (CSS handles most, but we can add accent glow via JS if needed or just use CSS)
    //Brief says: Card hover: translateY(-6px) + box-shadow: 0 8px 24px rgba(255, 199, 47, 0.35);

    // 10. Filter Sidebar Slide (if it's not a drawer)
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth >= 768) {
        gsap.from(sidebar, {
            xPercent: -100,
            duration: 0.5,
            ease: 'power1.out'
        });
    }

    // 11. Sale Badges Pulse
    ScrollTrigger.batch('.badge--sale', {
        onEnter: batch => {
            gsap.to(batch, {
                scale: 1.1,
                repeat: 2,
                yoyo: true,
                duration: 0.4,
                ease: 'power1.inOut',
                onComplete: () => {
                    gsap.set(batch, { scale: 1.05 });
                }
            });
        }
    });

    // 6. Deal Timer Pulse
    ScrollTrigger.create({
        trigger: '.iv-deal-timer-wrapper',
        onEnter: () => {
            gsap.to('.iv-deal-timer-wrapper', {
                scale: 1.02,
                repeat: 2,
                yoyo: true,
                duration: 0.4,
                ease: 'power1.inOut'
            });
        }
    });

    // 7. Hero Slideshow Text Reveal
    const initHeroAnimation = () => {
        const activeSlide = document.querySelector('.home-slideshow-section .swiper-slide-active');
        if (!activeSlide) return;

        const elements = activeSlide.querySelectorAll('.slide-heading, .slide-sub-heading-2, .slide-text, .multiple-buttons');

        elements.forEach(el => {
            // Split text into words for stagger effect if it's a heading or text
            if (el.classList.contains('slide-heading') || el.classList.contains('slide-text')) {
                const words = el.innerText.split(' ');
                el.innerHTML = words.map(word => `<span class="word" style="display:inline-block">${word}</span>`).join(' ');

                gsap.fromTo(el.querySelectorAll('.word'),
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: 'power1.out' }
                );
            } else {
                gsap.fromTo(el,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out', delay: 0.2 }
                );
            }
        });
    };

    // Swiper hook - since we don't have direct access to the swiper instance easily,
    // we can use a MutationObserver on the swiper-wrapper or just listen for the transition end.
    const swiperWrapper = document.querySelector('.home-slideshow-section .swiper-wrapper');
    if (swiperWrapper) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    // Small delay to ensure active class is toggled
                    setTimeout(initHeroAnimation, 50);
                }
            });
        });
        observer.observe(swiperWrapper, { attributes: true });
        // Initial run
        setTimeout(initHeroAnimation, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
