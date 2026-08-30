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

  // ---------- Header Scroll State (Transparent to Scrolled) & Mobile Menu ----------
  const header = document.querySelector('header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  const updateHeaderState = () => {
    if (!header) return;
    const isMenuOpen = mobileNav && mobileNav.classList.contains('open');

    if (window.scrollY > 20) {
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

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      updateHeaderState();
    });

    // Close mobile nav when clicking any link
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
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

  // ---------- Gallery Lightbox Modal ----------
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    const openLightbox = (src, title) => {
      lightboxImg.src = src;
      lightboxImg.alt = title || 'EB Wash Mobil Rig Wash';
      if (lightboxTitle) lightboxTitle.textContent = title || 'EB Wash Mobil On-Site Fleet Washing';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 250);
    };

    document.querySelectorAll('.gallery-item, .proof-photo, .pure-photo-card').forEach((item) => {
      item.addEventListener('click', (e) => {
        const img = item.querySelector('img');
        const titleEl = item.querySelector('h3') || item.querySelector('.gallery-badge');
        const title = titleEl ? titleEl.textContent : (img ? img.alt : 'EB Wash Mobil Fleet Wash');
        if (img) {
          openLightbox(img.src, title);
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
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

  // ---------- Hero Video Controls & Reel Switcher ----------
  const heroVideo = document.getElementById('heroVideo');
  const heroSoundToggle = document.getElementById('heroSoundToggle');
  const soundMutedIcon = document.getElementById('soundMutedIcon');
  const soundActiveIcon = document.getElementById('soundActiveIcon');
  const soundText = document.getElementById('soundText');
  const btnVideoSemi = document.getElementById('btnVideoSemi');
  const btnVideoLoader = document.getElementById('btnVideoLoader');

  if (heroVideo) {
    if (heroSoundToggle) {
      heroSoundToggle.addEventListener('click', () => {
        if (heroVideo.muted) {
          heroVideo.muted = false;
          if (soundMutedIcon) soundMutedIcon.style.display = 'none';
          if (soundActiveIcon) soundActiveIcon.style.display = 'inline-block';
          if (soundText) soundText.textContent = 'Sound On';
        } else {
          heroVideo.muted = true;
          if (soundMutedIcon) soundMutedIcon.style.display = 'inline-block';
          if (soundActiveIcon) soundActiveIcon.style.display = 'none';
          if (soundText) soundText.textContent = 'Sound Off';
        }
      });
    }

    const switchHeroVideo = (src, activeBtn, inactiveBtn) => {
      if (!heroVideo.src.includes(src)) {
        heroVideo.style.opacity = '0.3';
        setTimeout(() => {
          heroVideo.src = src;
          heroVideo.load();
          heroVideo.play().catch(() => {});
          heroVideo.style.opacity = '1';
        }, 200);
      }
      if (activeBtn) activeBtn.classList.add('active');
      if (inactiveBtn) inactiveBtn.classList.remove('active');
    };

    if (btnVideoSemi) {
      btnVideoSemi.addEventListener('click', () => {
        switchHeroVideo(btnVideoSemi.dataset.video, btnVideoSemi, btnVideoLoader);
      });
    }

    if (btnVideoLoader) {
      btnVideoLoader.addEventListener('click', () => {
        switchHeroVideo(btnVideoLoader.dataset.video, btnVideoLoader, btnVideoSemi);
      });
    }
  }
});
