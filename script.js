/**
 * EB Wash Mobil LLC - Interactive Script
 * Handles navigation, mobile menu, scroll reveal, gallery filtering & lightbox, and contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Scroll Reveal Animations ----------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // ---------- Header Scroll State (Transparent to Scrolled) & Mobile Menu (Quechidos Style) ----------
  const header = document.querySelector('header.site') || document.querySelector('header');
  const navToggle = document.querySelector('.nav-toggle') || document.getElementById('menuToggle');
  const mainNav = document.querySelector('nav.main-nav') || document.getElementById('mobileNav');

  const updateHeaderState = () => {
    if (!header) return;
    const isMenuOpen = header.classList.contains('menu-open') || (mainNav && mainNav.classList.contains('open'));

    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (isMenuOpen) {
      header.classList.add('menu-open');
    } else {
      header.classList.remove('menu-open');
    }
  };

  // ---------- Floating Scroll Down Button Visibility (HDZ Tree Company Style) ----------
  const scrollDownBtn = document.getElementById('floating-scroll-down');

  const updateScrollDownBtn = () => {
    if (!scrollDownBtn) return;
    const scrollBottom = window.innerHeight + window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    if (scrollBottom >= totalHeight - 140) {
      scrollDownBtn.classList.add('hidden');
    } else {
      scrollDownBtn.classList.remove('hidden');
    }
  };

  const handleScroll = () => {
    updateHeaderState();
    updateScrollDownBtn();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateHeaderState();
  updateScrollDownBtn();

  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', (e) => {
      const targetId = scrollDownBtn.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      header.classList.toggle('menu-open');
      const isNowOpen = mainNav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isNowOpen);
      updateHeaderState();
    });

    // Close mobile nav when clicking any link
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        header.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        updateHeaderState();
      });
    });
  }

  // ---------- Gallery Category Filtering ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
            item.style.display = 'flex';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 30);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // ---------- Gallery Lightbox Modal (Clean with Previous/Next Arrows) ----------
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (lightbox && lightboxImg) {
    let currentPhotoIndex = 0;
    let photoList = [];

    const getActivePhotos = () => {
      const cards = Array.from(document.querySelectorAll('.pure-photo-card img, .gallery-item img'));
      return cards.map((img) => img.src).filter(Boolean);
    };

    const updateLightboxPhoto = (index) => {
      photoList = getActivePhotos();
      if (!photoList.length) return;
      if (index < 0) index = photoList.length - 1;
      if (index >= photoList.length) index = 0;
      currentPhotoIndex = index;
      lightboxImg.src = photoList[currentPhotoIndex];
    };

    const openLightbox = (src) => {
      if (window.self !== window.top || window.EBWASH_ADMIN_ACTIVE) return; // Never open inside admin mode
      photoList = getActivePhotos();
      const idx = photoList.indexOf(src);
      currentPhotoIndex = idx >= 0 ? idx : 0;
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E';
      }, 250);
    };

    // Attach click listeners to gallery cards for public visitors
    document.addEventListener('click', (e) => {
      if (window.self !== window.top || window.EBWASH_ADMIN_ACTIVE) return;
      const card = e.target.closest('.pure-photo-card, .gallery-item');
      if (card && !e.target.closest('.eb-photo-toolbar-top, button, .eb-tb-btn')) {
        const img = card.querySelector('img');
        if (img && img.src) openLightbox(img.src);
      }
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        updateLightboxPhoto(currentPhotoIndex - 1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        updateLightboxPhoto(currentPhotoIndex + 1);
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxImg.parentElement) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') updateLightboxPhoto(currentPhotoIndex - 1);
      else if (e.key === 'ArrowRight') updateLightboxPhoto(currentPhotoIndex + 1);
    });
  }

  // ---------- Contact & Quote Form Handling ----------
  const quoteForm = document.getElementById('quoteForm');
  const formStatus = document.getElementById('formStatus');

  if (quoteForm && formStatus) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || 'Valued Customer';
      const units = document.getElementById('units')?.value || 'fleet';
      const phone = document.getElementById('phone')?.value || 'phone';

      // Submit feedback simulation
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Quote Request...';

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong><br>
          Your mobile washing quote request for <strong>${units} units</strong> has been received.<br>
          Our Elgin dispatch team will call or text <strong>${phone}</strong> shortly with pricing and lot availability.
        `;
        formStatus.style.display = 'block';

        quoteForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    });
  }

  // ---------- Hero Video Playback & Audio Controls ----------
  const heroVideoMain = document.getElementById('heroVideoMain') || document.getElementById('heroVideo');
  const heroVideoBackdrop = document.getElementById('heroVideoBackdrop');
  const heroPlayBtn = document.getElementById('heroPlayBtn');
  const heroPlayText = document.getElementById('heroPlayText');
  const heroSoundBtn = document.getElementById('heroSoundBtn');
  const heroSoundText = document.getElementById('heroSoundText');

  // Backdrop must strictly never have audio
  if (heroVideoBackdrop) {
    heroVideoBackdrop.muted = true;
    heroVideoBackdrop.volume = 0;

    // On narrow screens (phones/small tablets), the main video covers the entire viewport.
    // Pause backdrop decoding to save CPU/GPU and network buffer.
    if (window.innerWidth <= 768) {
      heroVideoBackdrop.pause();
    } else {
      heroVideoBackdrop.play().catch(() => {});
    }
  }

  if (heroVideoMain) {
    // Autoplay muted by default (standard browser autoplay policy requirement)
    heroVideoMain.muted = true;
    heroVideoMain.play().catch(() => {});

    // Keep backdrop in sync on desktop
    if (heroVideoBackdrop && window.innerWidth > 768) {
      heroVideoMain.addEventListener('play', () => {
        heroVideoBackdrop.play().catch(() => {});
      });
      heroVideoMain.addEventListener('pause', () => {
        heroVideoBackdrop.pause();
      });
      heroVideoMain.addEventListener('seeking', () => {
        heroVideoBackdrop.currentTime = heroVideoMain.currentTime;
      });
      heroVideoMain.addEventListener('timeupdate', () => {
        if (Math.abs(heroVideoBackdrop.currentTime - heroVideoMain.currentTime) > 0.5) {
          heroVideoBackdrop.currentTime = heroVideoMain.currentTime;
        }
      });
    }

    // Toggle Play/Pause Button Logic (Bottom Left)
    if (heroPlayBtn) {
      const updatePlayUI = (isPaused) => {
        if (isPaused) {
          heroPlayBtn.classList.add('is-paused');
          heroPlayBtn.setAttribute('aria-pressed', 'true');
          heroPlayBtn.setAttribute('aria-label', 'Play video');
          heroPlayBtn.setAttribute('title', 'Click to play video');
          if (heroPlayText) heroPlayText.textContent = 'Play';
        } else {
          heroPlayBtn.classList.remove('is-paused');
          heroPlayBtn.setAttribute('aria-pressed', 'false');
          heroPlayBtn.setAttribute('aria-label', 'Pause video');
          heroPlayBtn.setAttribute('title', 'Click to pause video');
          if (heroPlayText) heroPlayText.textContent = 'Pause';
        }
      };

      // Initial state sync
      updatePlayUI(heroVideoMain.paused);

      heroPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (heroVideoMain.paused) {
          heroVideoMain.play().then(() => {
            if (heroVideoBackdrop && window.innerWidth > 768) {
              heroVideoBackdrop.play().catch(() => {});
            }
            updatePlayUI(false);
          }).catch(() => {});
        } else {
          heroVideoMain.pause();
          if (heroVideoBackdrop) {
            heroVideoBackdrop.pause();
          }
          updatePlayUI(true);
        }
      });

      heroVideoMain.addEventListener('play', () => updatePlayUI(false));
      heroVideoMain.addEventListener('pause', () => updatePlayUI(true));
    }

    // Toggle Sound Button Logic (Bottom Right)
    if (heroSoundBtn) {
      const updateSoundUI = (isMuted) => {
        if (isMuted) {
          heroSoundBtn.classList.add('is-muted');
          heroSoundBtn.setAttribute('aria-pressed', 'false');
          heroSoundBtn.setAttribute('aria-label', 'Unmute audio');
          heroSoundBtn.setAttribute('title', 'Click to unmute video audio');
          if (heroSoundText) heroSoundText.textContent = 'Sound Off';
        } else {
          heroSoundBtn.classList.remove('is-muted');
          heroSoundBtn.setAttribute('aria-pressed', 'true');
          heroSoundBtn.setAttribute('aria-label', 'Mute audio');
          heroSoundBtn.setAttribute('title', 'Click to mute video audio');
          if (heroSoundText) heroSoundText.textContent = 'Sound On';
        }
      };

      // Initial state sync
      updateSoundUI(heroVideoMain.muted);

      heroSoundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (heroVideoMain.muted) {
          heroVideoMain.muted = false;
          heroVideoMain.volume = 1;
          heroVideoMain.play().then(() => {
            updateSoundUI(false);
          }).catch(() => {
            // Fallback if browser prevented unmuting
            heroVideoMain.muted = true;
            updateSoundUI(true);
          });
        } else {
          heroVideoMain.muted = true;
          updateSoundUI(true);
        }
      });

      // Keep UI synchronized if user or system changes volume/mute
      heroVideoMain.addEventListener('volumechange', () => {
        updateSoundUI(heroVideoMain.muted || heroVideoMain.volume === 0);
      });
    }
  }
});
