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
        lightboxImg.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E';
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

  // ---------- Hero Video Playback (Muted by Default) ----------
  const heroVideoMain = document.getElementById('heroVideoMain') || document.getElementById('heroVideo');
  const heroVideoBackdrop = document.getElementById('heroVideoBackdrop');

  if (heroVideoMain) {
    heroVideoMain.muted = true;
    heroVideoMain.play().catch(() => {});
  }
  if (heroVideoBackdrop) {
    heroVideoBackdrop.muted = true;
    heroVideoBackdrop.play().catch(() => {});
  }
});
