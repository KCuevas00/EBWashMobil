/**
 * EB Wash Mobil LLC - Visual Direct On-Page Inline CMS Engine
 * Enables live on-page typing, drag-and-drop photo reordering, and direct image swapping on Desktop & Mobile.
 */

(function () {
  const STORAGE_KEY = 'ebwash_content';
  const isInIframe = window.self !== window.top;
  // ONLY activate editing mode when loaded inside the admin.html portal iframe
  const isEditorActive = isInIframe;

  if (isEditorActive) {
    window.EBWASH_ADMIN_ACTIVE = true;
  }

  // Embedded Default Site Data
  const DEFAULT_SITE_DATA = {
    global: {
      brandName: "EB WASH MOBIL",
      brandSubtitle: "Mobile Fleet Washing",
      phone: "630-414-3954",
      phoneRaw: "6304143954",
      email: "ebwash2@gmail.com",
      headerCtaText: "Request Free Quote",
      smsCtaText: "Text For Quote",
      callQuoteBtnText: "Call / Quote",
      locationText: "Based in Elgin, IL 60120",
      hoursText: "Flexible hours & weekend dispatch washing — we come to you.",
      footerDescription: "Professional on-site mobile truck, trailer, and commercial fleet washing serving Elgin, IL and surrounding Chicagoland. We bring the wash to your yard.",
      tiktokHandle: "@eb.wash.mobil",
      tiktokUrl: "https://www.tiktok.com/@eb.wash.mobil",
      facebookUrl: "https://www.facebook.com/profile.php?id=61559151614102",
      copyright: "© 2026 EB Wash Mobil LLC. All rights reserved."
    },
    home: {
      heroHeadline: "WE COME TO YOUR LOT.<br>YOUR RIG LEAVES <span class=\"accent\">SPOTLESS.</span>",
      heroLead: "EB Wash Mobil brings commercial pressure washing straight to your yard. We wash semi-trucks, trailers, reefers, and heavy equipment where they sit so your drivers stay on route.",
      heroCallBtn: "Call 630-414-3954",
      heroSmsBtn: "Text For Quote",
      heroQuoteBtn: "Get A Quote",
      heroFact1: "Trucks · Trailers · Equipment",
      heroFact2: "On-Site Lot Washing",
      heroFact3: "Fleet Pricing Available",
      servicesTitle: "Services",
      servicesSubtitle: "We bring our own water, power, and commercial wash gear straight to your lot. No driving to truck bays, no waiting in line.",
      serviceCards: [
        { id: "semi", title: "Semi Truck Wash", desc: "Cabs, hoods, grilles, fuel tanks, and wheels. Hand foamed, scrubbed, and pressure washed." },
        { id: "fleet", title: "Fleet Washing", desc: "Scheduled washes for multiple tractors and trailers. Nights and weekends available." },
        { id: "trailer", title: "Trailer & Reefer Wash", desc: "Dry vans, reefers, flatbeds, and containers. Salt, road film, and grime stripped clean." },
        { id: "machinery", title: "Heavy Machinery & Equipment", desc: "Loaders, excavators, dump trucks, and skid steers. Mud, clay, and grease blasted off." }
      ],
      howTitle: "How It Works",
      howSubtitle: "Simple and straightforward.",
      howSteps: [
        { num: "01", title: "Call or Text", desc: "Tell us your lot address, how many rigs you need washed, and what day works." },
        { num: "02", title: "We Show Up", desc: "We bring our own water, power, hoses, and wash gear right to where your rigs are parked." },
        { num: "03", title: "Done & Clean", desc: "We wash every unit thoroughly, pack up, and leave your yard clean." }
      ],
      areaTitle: "Serving Elgin & Chicagoland",
      areaDesc: "Based in Elgin, IL, we travel across the Northwest and Western suburbs to wash rigs on-site at your warehouse, yard, or lot.",
      areaBadge: "Based in Elgin, IL 60120",
      towns: ["Elgin", "South Elgin", "Hoffman Estates", "Schaumburg", "Bartlett", "St. Charles", "West Chicago", "Streamwood", "Carpentersville", "Huntley", "Hampshire", "Carol Stream", "Batavia", "Geneva"],
      requirementsTitle: "On-Site Requirements",
      requirementsSubtitle: "Zero hookups needed on your end:",
      requirementsList: [
        "<strong>Water Hookup Needed?</strong> No — we carry our own water tanks.",
        "<strong>Power Needed?</strong> No — our mobile trailer runs gas pressure washers.",
        "<strong>Drainage:</strong> We follow eco-safe washing practices for lot safety."
      ],
      socialTitle: "Follow Us On Social",
      socialDesc: "See our latest washes and video reels on Facebook and TikTok.",
      ctaTitle: "Ready For A Spotless Fleet?",
      ctaSubtitle: "CALL OR TEXT · 630-414-3954 · EBWASH2@GMAIL.COM",
      ctaBtnText: "Get Your Free Quote"
    },
    service: {
      bannerTitle: "Our Services",
      serviceCards: [
        {
          id: "semi",
          eyebrow: "Tractors & Day Cabs",
          title: "Commercial Semi Truck Wash",
          desc: "Complete exterior hand-foaming and high-pressure power rinse covering sleeper cabs, day cabs, grilles, visors, windshields, fuel tanks, and rear chassis.",
          img: "photos/after2.jpg",
          features: ["Hand brush scrub on stubborn road film", "Bug & diesel soot removal from stacks", "Streak-free glass & mirror rinse"]
        },
        {
          id: "fleet",
          eyebrow: "Scheduled Yard Care",
          title: "Fleet Maintenance Programs",
          desc: "Recurring weekly, bi-weekly, or monthly washing contracts tailored to logistics providers, freight carriers, delivery fleets, and corporate transport yards.",
          img: "photos/after5.jpg",
          features: ["Weekend & evening dispatch wash slots", "Volume tier pricing for multi-unit lots", "Zero driver downtime during business hours"]
        },
        {
          id: "trailer",
          eyebrow: "53ft Vans & Reefers",
          title: "Trailer & Reefer Cleaning",
          desc: "High-volume exterior wash removing road salt, grime, and grease from dry vans, refrigerated trailers, flatbed frames, and enclosed utility haulers.",
          img: "photos/cleantrailer.jpg",
          features: ["Reefer unit front bulkhead foam & rinse", "Swing & roll-up rear door grime stripping", "DOT reflective tape & marker visibility"]
        },
        {
          id: "machinery",
          eyebrow: "Construction & Excavation",
          title: "Heavy Machinery & Equipment",
          desc: "Heavy mud, clay, and gravel removal for tracked skid steers, wheel loaders, excavators, bulldozers, dump trailers, and aggregate haulers.",
          img: "photos/after.jpg",
          features: ["Track & undercarriage clay blasting", "Hydraulic arm & bucket joint degreasing", "Cooling radiator & engine compartment rinse"]
        },
        {
          id: "engine",
          eyebrow: "Core Speciality",
          title: "Engine Degreasing & Pre-Wash",
          desc: "As featured on our service rig: professional high-pressure pre-wash, specialized engine degreasers, and manual soap scrubbing for DOT compliance and mechanic prep.",
          img: "photos/ad.jpg",
          features: ["Commercial-grade engine degreasing", "High-pressure pre-wash grime softening", "Active soap application & manual scrubbing"]
        },
        {
          id: "wheels",
          eyebrow: "Detailing & Protection",
          title: "Wheels, Tanks & Undercarriage",
          desc: "Protect your investment against winter road salt corrosion. Thorough cleaning for chrome rims, aluminum fuel tanks, diamond plate boxes, and fifth wheels.",
          img: "photos/after3.jpg",
          features: ["Aluminum tank & toolbox brightening", "Brake dust & rim road salt neutralizer", "Chassis frame rail & mudflap power rinse"]
        }
      ],
      advantageEyebrow: "The Mobile Advantage",
      advantageTitle: "How On-Site Yard Washing Works",
      advantageDesc: "We make fleet maintenance hands-off for fleet managers and business owners. Here is how simple it is:",
      advantageSteps: [
        { num: "01", title: "Book Your Slot", desc: "Call or text 630-414-3954 with your unit count, equipment types, and parking lot address. We coordinate around your staging hours." },
        { num: "02", title: "We Roll Up Self-Contained", desc: "Our mobile units carry water tanks, commercial pressure wands, generators, and biodegradable detergents. No water or power hookups required from your shop." },
        { num: "03", title: "Your Fleet Leaves Spotless", desc: "Tractors and trailers are hand-scrubbed, power-rinsed, and ready to roll out on schedule with zero driver overtime or yard congestion." }
      ],
      coverageEyebrow: "Service Coverage",
      coverageTitle: "Serving Elgin & Surrounding Chicagoland",
      coverageDesc: "We dispatch across Kane, Cook, DuPage, and McHenry Counties. Major service corridors include:",
      coverageTowns: ["Elgin, IL (Hub)", "South Elgin", "Schaumburg", "Hoffman Estates", "Streamwood", "Carpentersville", "Algonquin", "St. Charles", "Geneva", "Batavia", "West Chicago", "Aurora"],
      ctaTitle: "Ready For A Spotless Fleet?",
      ctaSubtitle: "CALL OR TEXT · 630-414-3954 · EBWASH2@GMAIL.COM"
    },
    gallery: {
      bannerTitle: "Gallery",
      photos: [
        { id: "p1", img: "photos/after2.jpg", alt: "Jesus Murillo Trucking Inc Freightliner Semi Truck Clean Result", title: "Freightliner Semi Truck Clean Result" },
        { id: "p2", img: "photos/before2.jpg", alt: "Jesus Murillo Trucking Inc Freightliner Semi Truck Before Wash", title: "Semi Truck Before Wash" },
        { id: "p3", img: "photos/after.jpg", alt: "CAT 265 Tracked Skid Steer Loader Spotless Clean Result", title: "CAT 265 Loader Clean Result" },
        { id: "p4", img: "photos/before.jpg", alt: "CAT 265 Tracked Skid Steer Loader Heavy Mud Before Wash", title: "CAT Loader Before Wash" },
        { id: "p5", img: "photos/after4.jpg", alt: "MAC Dump Trailer and Red Tractor Clean Wash Result", title: "MAC Dump Trailer Clean Result" },
        { id: "p6", img: "photos/before4.jpg", alt: "MAC Dump Trailer Before Wash", title: "MAC Dump Trailer Before Wash" },
        { id: "p7", img: "photos/after5.jpg", alt: "M&E Sanchez Mack Truck 51 Clean Result with Coras Dump Trailer", title: "Mack Truck 51 Clean Result" },
        { id: "p8", img: "photos/before5.jpg", alt: "M&E Sanchez Mack Truck Before Wash", title: "Mack Truck Before Wash" },
        { id: "p9", img: "photos/after3.jpg", alt: "Aluminum Diamond Plate Toolbox and Undercarriage Clean Result", title: "Toolbox & Undercarriage Clean" },
        { id: "p10", img: "photos/before3.jpg", alt: "Aluminum Diamond Plate Toolbox and Undercarriage Before Wash", title: "Toolbox & Undercarriage Before" },
        { id: "p11", img: "photos/cleantrailer.jpg", alt: "Enclosed Red and Black Cargo Trailer Spotless Wash Result", title: "Enclosed Cargo Trailer Wash" },
        { id: "p12", img: "photos/ad.jpg", alt: "EB Wash Mobil Service Overview", title: "EB Wash Mobil Service Overview" }
      ],
      ctaTitle: "Ready For A Spotless Fleet?",
      ctaSubtitle: "CALL OR TEXT · 630-414-3954 · EBWASH2@GMAIL.COM"
    },
    contact: {
      bannerTitle: "Contact",
      callCardEyebrow: "Fastest Response",
      callCardTitle: "Call Or Text Us Directly",
      callCardDesc: "For immediate lot quotes, urgent wash needs, or dispatch coordination, calling or texting is the quickest route.",
      emailCardEyebrow: "Email Dispatch",
      emailCardTitle: "Written Estimates & Invoices",
      emailCardDesc: "Send RFPs, fleet size lists, or billing questions to our management team.",
      coverageCardEyebrow: "Service Coverage",
      coverageCardTitle: "Headquartered In Elgin, IL",
      coverageCardDesc: "We dispatch mobile wash units across Kane, Cook, and DuPage counties. Major service hubs include:",
      coverageTowns: ["Elgin", "South Elgin", "Hoffman Estates", "Schaumburg", "St. Charles", "Bartlett", "West Chicago", "Streamwood", "Huntley"],
      hoursCardEyebrow: "7-Day Availability",
      hoursCardTitle: "Flexible Washing Windows",
      hoursCardDesc: "We coordinate around your dispatch calendar. Weekend lot cleanups, night washes, or daytime scheduled staging — we wash when your trucks are idle.",
      formEyebrow: "Quick Quote Form",
      formTitle: "Request On-Site Fleet Washing",
      formSubtitle: "Fill out the quick details below and we'll reply with accurate pricing tailored to your fleet.",
      formSubmitBtn: "Submit Quote Request",
      faqEyebrow: "Got Questions?",
      faqTitle: "Fleet Wash FAQ",
      faqSubtitle: "Here are quick answers to the most common questions fleet dispatchers and owner-operators ask us.",
      faqs: [
        { q: "Do we need to supply water or power on our lot?", a: "No. Our mobile wash units are 100% self-contained with large-capacity onboard water tanks and commercial gas pressure washers. We can wash in gravel lots, remote yards, or commercial terminals with zero connections." },
        { q: "Can you wash our fleet while drivers are on rest?", a: "Yes, absolutely. We often schedule fleet cleaning over weekends, early mornings, or during scheduled 10-hour rest breaks so your equipment is spotless without losing a single hour of driving time." },
        { q: "Are your detergents safe for vehicle decals and aluminum?", a: "Yes. We use premium commercial-grade vehicle soaps and neutral cleaners that strip diesel grime and salt without fading vinyl logos or oxidizing polished aluminum tanks and wheels." },
        { q: "Do you offer recurring fleet contract discounts?", a: "Yes! We offer discounted rates for recurring accounts (weekly, bi-weekly, or monthly) and volume discounts for yards with 5+ units washed during the same visit." }
      ],
      ctaTitle: "Ready For Clean Trucks On Monday?",
      ctaSubtitle: "CALL OR TEXT 630-414-3954 · WE COME TO YOUR YARD"
    }
  };

  let siteData = deepClone(DEFAULT_SITE_DATA);

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function getNested(obj, path) {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }

  function setNested(obj, path, value) {
    if (!obj || !path) return;
    const parts = path.split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]]) cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  }

  function notifyStateChange() {
    // Save to localStorage immediately so changes persist across all tabs
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {}

    if (isInIframe) {
      window.parent.postMessage({ type: 'EBWASH_STATE_CHANGED', payload: siteData }, '*');
    }
  }

  // ================= 1. DOM BINDING & SYNC =================
  function applyContent(data) {
    if (data && typeof data === 'object') {
      siteData = deepClone(data);
    }

    if (!siteData.global) siteData.global = deepClone(DEFAULT_SITE_DATA.global);
    if (!siteData.home) siteData.home = deepClone(DEFAULT_SITE_DATA.home);
    if (!siteData.service) siteData.service = deepClone(DEFAULT_SITE_DATA.service);
    if (!siteData.gallery) siteData.gallery = deepClone(DEFAULT_SITE_DATA.gallery);
    if (!siteData.contact) siteData.contact = deepClone(DEFAULT_SITE_DATA.contact);

    // Update text elements by [data-cms]
    document.querySelectorAll('[data-cms]').forEach((el) => {
      const key = el.getAttribute('data-cms');
      const val = getNested(siteData, key);
      if (val !== undefined && val !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = val;
        } else {
          el.innerHTML = val;
        }
      }
    });

    // Update image sources
    document.querySelectorAll('[data-cms-img]').forEach((el) => {
      const key = el.getAttribute('data-cms-img');
      const val = getNested(siteData, key);
      if (val) el.src = val;
    });

    // Update Global Links (Phone, SMS, Email, Socials)
    if (siteData.global) {
      const g = siteData.global;
      if (g.phoneRaw) {
        document.querySelectorAll('a[href^="tel:"]').forEach((a) => (a.href = `tel:${g.phoneRaw}`));
        document.querySelectorAll('a[href^="sms:"]').forEach((a) => (a.href = `sms:${g.phoneRaw}`));
      }
      if (g.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach((a) => (a.href = `mailto:${g.email}`));
      }
      if (g.tiktokUrl) {
        document.querySelectorAll('.social-tiktok, .footer-social-tiktok').forEach((a) => (a.href = g.tiktokUrl));
      }
      if (g.facebookUrl) {
        document.querySelectorAll('.social-facebook, .footer-social-facebook').forEach((a) => (a.href = g.facebookUrl));
      }
    }

    // Update Dynamic Gallery Grid
    const galleryGrid = document.querySelector('.gallery-pure-photos .pure-photo-grid');
    if (galleryGrid && siteData.gallery && Array.isArray(siteData.gallery.photos)) {
      renderGalleryGrid(galleryGrid, siteData.gallery.photos);
    }

    // Update Dynamic Service Showcase Grid
    const serviceGrid = document.querySelector('.service-showcase-grid');
    if (serviceGrid && siteData.service && Array.isArray(siteData.service.serviceCards)) {
      renderServiceCards(serviceGrid, siteData.service.serviceCards);
    }

    // Update Dynamic FAQs on contact page
    const faqGrid = document.querySelector('.faq-grid');
    if (faqGrid && siteData.contact && Array.isArray(siteData.contact.faqs)) {
      renderFaqGrid(faqGrid, siteData.contact.faqs);
    }

    // Initialize visual admin overlays if in editor mode
    if (isEditorActive) {
      enableVisualAdmin();
    }
  }

  // ================= 2. GALLERY RENDERING (WITH VISIBLE BUTTONS & DRAG/DROP) =================
  function renderGalleryGrid(container, photos) {
    if (!photos) return;
    container.innerHTML = '';

    // If in admin mode, inject the "➕ Add New Photo" banner at top of gallery
    if (isEditorActive) {
      let addBanner = document.getElementById('eb-gallery-add-card');
      if (!addBanner) {
        addBanner = document.createElement('div');
        addBanner.id = 'eb-gallery-add-card';
        addBanner.className = 'eb-admin-add-photo-banner';
        addBanner.innerHTML = `
          <button type="button" class="eb-add-photo-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>Add New Photo To Gallery</span>
          </button>
        `;
        addBanner.querySelector('button').addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openImagePicker((newImgSrc) => {
            if (!siteData.gallery) siteData.gallery = { photos: [] };
            if (!Array.isArray(siteData.gallery.photos)) siteData.gallery.photos = [];
            siteData.gallery.photos.unshift({
              id: 'p' + Date.now(),
              img: newImgSrc,
              title: 'EB Wash Mobil Fleet Clean Result',
              alt: 'Commercial Fleet Wash Result'
            });
            applyContent(siteData);
            notifyStateChange();
          });
        });
        container.parentElement.insertBefore(addBanner, container);
      }
    }

    let draggedItemIdx = null;

    photos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'pure-photo-card in eb-editable-photo-card';
      card.setAttribute('title', photo.title || 'EB Wash Mobil');
      card.dataset.index = idx;

      if (isEditorActive) {
        card.setAttribute('draggable', 'true');

        // Drag and Drop reordering
        card.addEventListener('dragstart', (e) => {
          draggedItemIdx = idx;
          card.classList.add('eb-dragging');
          e.dataTransfer.effectAllowed = 'move';
        });

        card.addEventListener('dragend', () => {
          card.classList.remove('eb-dragging');
          document.querySelectorAll('.eb-editable-photo-card').forEach((c) => c.classList.remove('eb-drag-over'));
        });

        card.addEventListener('dragover', (e) => {
          e.preventDefault();
          card.classList.add('eb-drag-over');
        });

        card.addEventListener('dragleave', () => {
          card.classList.remove('eb-drag-over');
        });

        card.addEventListener('drop', (e) => {
          e.preventDefault();
          card.classList.remove('eb-drag-over');
          if (draggedItemIdx !== null && draggedItemIdx !== idx) {
            const moved = siteData.gallery.photos.splice(draggedItemIdx, 1)[0];
            siteData.gallery.photos.splice(idx, 0, moved);
            applyContent(siteData);
            notifyStateChange();
          }
        });
      }

      card.innerHTML = `
        <img src="${photo.img}" alt="${photo.alt || photo.title || 'EB Wash Mobil Fleet Photo'}">
        <div class="gallery-zoom-hint">
          <div class="zoom-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
        </div>
      `;

      // In admin mode, inject floating photo controls AT THE TOP of each photo (ALWAYS VISIBLE)
      if (isEditorActive) {
        const toolbar = document.createElement('div');
        toolbar.className = 'eb-photo-toolbar-top';
        toolbar.innerHTML = `
          <button type="button" class="eb-tb-btn eb-btn-swap" title="Upload & Swap Photo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>Change</span>
          </button>
          <div class="eb-tb-group">
            <button type="button" class="eb-tb-btn eb-btn-left" title="Move Left" ${idx === 0 ? 'disabled' : ''}>◀</button>
            <button type="button" class="eb-tb-btn eb-btn-right" title="Move Right" ${idx === photos.length - 1 ? 'disabled' : ''}>▶</button>
            <button type="button" class="eb-tb-btn eb-btn-delete" title="Delete Photo">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        `;

        // Swap Image
        toolbar.querySelector('.eb-btn-swap').addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          openImagePicker((newSrc) => {
            photo.img = newSrc;
            card.querySelector('img').src = newSrc;
            notifyStateChange();
          });
        });

        // Delete Photo
        toolbar.querySelector('.eb-btn-delete').addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (confirm('Are you sure you want to delete this photo from the gallery?')) {
            siteData.gallery.photos.splice(idx, 1);
            applyContent(siteData);
            notifyStateChange();
          }
        });

        // Move Left
        toolbar.querySelector('.eb-btn-left').addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (idx > 0) {
            const temp = siteData.gallery.photos[idx - 1];
            siteData.gallery.photos[idx - 1] = siteData.gallery.photos[idx];
            siteData.gallery.photos[idx] = temp;
            applyContent(siteData);
            notifyStateChange();
          }
        });

        // Move Right
        toolbar.querySelector('.eb-btn-right').addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (idx < siteData.gallery.photos.length - 1) {
            const temp = siteData.gallery.photos[idx + 1];
            siteData.gallery.photos[idx + 1] = siteData.gallery.photos[idx];
            siteData.gallery.photos[idx] = temp;
            applyContent(siteData);
            notifyStateChange();
          }
        });

        card.appendChild(toolbar);
      }

      container.appendChild(card);
    });
  }

  // Dynamic Service Detail Renderer
  function renderServiceCards(container, cards) {
    if (!cards) return;
    container.innerHTML = '';
    cards.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'service-detail-card in';
      const featuresHtml = (item.features || [])
        .map((f, fIdx) => `<li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span data-cms="service.serviceCards.${idx}.features.${fIdx}">${f}</span></li>`)
        .join('');

      card.innerHTML = `
        <div class="service-detail-img eb-image-container" data-img-key="service.serviceCards.${idx}.img">
          <img src="${item.img}" alt="${item.title}">
        </div>
        <div class="service-detail-body">
          <span class="eyebrow eyebrow-cyan" style="margin-bottom: 8px;" data-cms="service.serviceCards.${idx}.eyebrow">${item.eyebrow || ''}</span>
          <h3 data-cms="service.serviceCards.${idx}.title">${item.title}</h3>
          <p data-cms="service.serviceCards.${idx}.desc">${item.desc}</p>
          <ul class="service-detail-features">
            ${featuresHtml}
          </ul>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Dynamic FAQ Renderer
  function renderFaqGrid(container, faqs) {
    if (!faqs) return;
    container.innerHTML = '';
    faqs.forEach((faq, idx) => {
      const card = document.createElement('div');
      card.className = 'faq-card in';
      card.innerHTML = `
        <h3 data-cms="contact.faqs.${idx}.q">${faq.q}</h3>
        <p data-cms="contact.faqs.${idx}.a">${faq.a}</p>
      `;
      container.appendChild(card);
    });
  }

  // ================= 3. DIRECT VISUAL INLINE EDITING ENGINE =================
  function enableVisualAdmin() {
    if (!isEditorActive) return;

    // Inject Visual Admin CSS styles with PERMANENTLY VISIBLE toolbars on touch & desktop
    if (!document.getElementById('eb-visual-admin-styles')) {
      const style = document.createElement('style');
      style.id = 'eb-visual-admin-styles';
      style.textContent = `
        /* High-visibility editable text borders */
        [data-cms] {
          outline: 2px dashed rgba(255, 199, 44, 0.8) !important;
          outline-offset: 4px !important;
          background-color: rgba(255, 199, 44, 0.08) !important;
          cursor: text !important;
          transition: all 0.2s ease !important;
          border-radius: 4px !important;
          min-height: 1.2em;
          display: inline-block;
          -webkit-user-modify: read-write-plaintext-only;
        }
        [data-cms]:hover, [data-cms]:active {
          outline: 2.5px solid #ffc72c !important;
          background-color: rgba(255, 199, 44, 0.2) !important;
          box-shadow: 0 0 12px rgba(255, 199, 44, 0.4) !important;
        }
        [data-cms]:focus {
          outline: 3px solid #ffc72c !important;
          background-color: rgba(255, 199, 44, 0.26) !important;
          box-shadow: 0 0 18px rgba(255, 199, 44, 0.6) !important;
        }
        [data-cms].eb-modified {
          outline: 2.5px solid #ff9f1a !important;
          background-color: rgba(255, 159, 26, 0.25) !important;
        }

        /* Image change button (Always visible on photos) */
        .eb-image-container, .service-detail-img, .hero-media {
          position: relative !important;
        }
        .eb-img-change-btn {
          position: absolute !important;
          top: 10px !important;
          right: 10px !important;
          background: rgba(17, 19, 23, 0.95) !important;
          border: 1.5px solid #ffc72c !important;
          color: #ffc72c !important;
          font-family: 'Work Sans', sans-serif !important;
          font-size: 0.82rem !important;
          font-weight: 700 !important;
          padding: 8px 14px !important;
          border-radius: 6px !important;
          cursor: pointer !important;
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          align-items: center !important;
          gap: 6px !important;
          box-shadow: 0 4px 14px rgba(0,0,0,0.8) !important;
          transition: all 0.2s !important;
          z-index: 100 !important;
          pointer-events: auto !important;
        }
        .eb-img-change-btn:hover, .eb-img-change-btn:active {
          background: #ffc72c !important;
          color: #000 !important;
          transform: scale(1.04) !important;
        }

        /* Gallery Manager Top Banner */
        .eb-admin-add-photo-banner {
          width: 100% !important;
          text-align: center !important;
          margin-bottom: 24px !important;
          display: block !important;
        }
        .eb-add-photo-btn {
          background: rgba(255, 199, 44, 0.15) !important;
          border: 2px dashed #ffc72c !important;
          color: #ffc72c !important;
          font-family: 'Oswald', sans-serif !important;
          font-size: 1.15rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.8px !important;
          padding: 16px 32px !important;
          border-radius: 10px !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 10px !important;
          transition: all 0.2s !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        .eb-add-photo-btn:hover, .eb-add-photo-btn:active {
          background: #ffc72c !important;
          color: #000 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(255, 199, 44, 0.4) !important;
        }

        /* Gallery Card Styles */
        .eb-editable-photo-card {
          position: relative !important;
          overflow: visible !important;
        }
        .eb-editable-photo-card .gallery-zoom-hint {
          display: none !important;
        }
        .eb-editable-photo-card.eb-dragging {
          opacity: 0.35 !important;
          border: 2px dashed #ffc72c !important;
        }
        .eb-editable-photo-card.eb-drag-over {
          transform: scale(1.03) !important;
          box-shadow: 0 0 20px rgba(255, 199, 44, 0.7) !important;
        }

        /* Gallery Toolbar AT THE TOP OF EACH IMAGE (ALWAYS 100% VISIBLE ON MOBILE & DESKTOP) */
        .eb-photo-toolbar-top {
          position: absolute !important;
          top: 8px !important;
          left: 8px !important;
          right: 8px !important;
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          align-items: center !important;
          justify-content: space-between !important;
          background: rgba(10, 11, 13, 0.95) !important;
          border: 1.5px solid #ffc72c !important;
          border-radius: 6px !important;
          padding: 6px 8px !important;
          z-index: 9999 !important;
          pointer-events: auto !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.85) !important;
        }
        .eb-tb-btn {
          background: #20242d !important;
          border: 1px solid #475266 !important;
          color: #fff !important;
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          padding: 6px 10px !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          transition: all 0.15s !important;
          pointer-events: auto !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        .eb-tb-btn:hover:not(:disabled), .eb-tb-btn:active:not(:disabled) {
          background: #ffc72c !important;
          color: #000 !important;
          border-color: #ffc72c !important;
        }
        .eb-tb-btn:disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
        }
        .eb-btn-delete {
          background: rgba(255, 71, 87, 0.25) !important;
          border-color: #ff4757 !important;
          color: #ff7675 !important;
        }
        .eb-btn-delete:hover, .eb-btn-delete:active {
          background: #ff4757 !important;
          color: #fff !important;
        }
        .eb-tb-group {
          display: flex !important;
          gap: 4px !important;
        }

        /* Mobile specific touch optimizations */
        @media (max-width: 600px) {
          .eb-photo-toolbar-top {
            top: 6px !important;
            left: 6px !important;
            right: 6px !important;
            padding: 5px 6px !important;
          }
          .eb-tb-btn {
            padding: 6px 8px !important;
            font-size: 0.74rem !important;
          }
          .eb-add-photo-btn {
            width: 100% !important;
            padding: 14px 16px !important;
            font-size: 1rem !important;
            justify-content: center !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // 1. Make all [data-cms] elements directly contenteditable
    document.querySelectorAll('[data-cms]').forEach((el) => {
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'false');

      // Prevent link clicks when editing
      if (el.tagName === 'A' || el.closest('a')) {
        el.addEventListener('click', (e) => e.preventDefault());
      }

      if (!el._cmsBound) {
        el._cmsBound = true;

        el.addEventListener('input', () => {
          const key = el.getAttribute('data-cms');
          const newHtml = el.innerHTML;
          setNested(siteData, key, newHtml);
          el.classList.add('eb-modified');
          notifyStateChange();
        });

        el.addEventListener('blur', () => {
          const key = el.getAttribute('data-cms');
          const newHtml = el.innerHTML;
          setNested(siteData, key, newHtml);
          notifyStateChange();
        });
      }
    });

    // 2. Attach Image Change Buttons to all standalone images
    document.querySelectorAll('[data-cms-img], [data-img-key]').forEach((wrap) => {
      if (wrap.querySelector('.eb-img-change-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'eb-img-change-btn';
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>Change Photo</span>
      `;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const key = wrap.getAttribute('data-cms-img') || wrap.getAttribute('data-img-key');
        openImagePicker((newSrc) => {
          const img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img');
          if (img) img.src = newSrc;
          if (key) setNested(siteData, key, newSrc);
          wrap.classList.add('eb-modified');
          notifyStateChange();
        });
      });

      wrap.style.position = 'relative';
      wrap.appendChild(btn);
    });

    // Notify parent of initial data
    if (isInIframe) {
      window.parent.postMessage({ type: 'EBWASH_INIT_DATA', payload: siteData }, '*');
    }
  }

  // File Picker & Image Resizer Helper
  function openImagePicker(callback) {
    let input = document.getElementById('eb-hidden-file-input');
    if (!input) {
      input = document.createElement('input');
      input.id = 'eb-hidden-file-input';
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      document.body.appendChild(input);
    }

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1600;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          callback(compressedDataUrl);
          input.value = '';
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  // ================= 4. INITIALIZATION =================
  async function init() {
    let loadedData = null;

    try {
      const localStr = localStorage.getItem(STORAGE_KEY);
      if (localStr) loadedData = JSON.parse(localStr);
    } catch (e) {}

    if (!loadedData) {
      try {
        const res = await fetch('/api/content').catch(() => null);
        if (res && res.ok) {
          const cloudData = await res.json();
          if (cloudData && typeof cloudData === 'object' && cloudData.global) {
            loadedData = cloudData;
          }
        }
      } catch (err) {}
    }

    applyContent(loadedData || DEFAULT_SITE_DATA);

    // Discreet Admin link in footer
    if (!isInIframe) {
      const footerBottom = document.querySelector('.footer-bottom');
      if (footerBottom && !document.getElementById('eb-admin-footer-link')) {
        const link = document.createElement('a');
        link.id = 'eb-admin-footer-link';
        link.href = 'admin.html';
        link.textContent = 'Admin Portal';
        link.style.cssText = 'color: var(--fog-dim, #888); text-decoration: none; font-size: 0.8rem; margin-left: 14px; opacity: 0.7; transition: opacity 0.2s;';
        link.addEventListener('mouseenter', () => (link.style.opacity = '1'));
        link.addEventListener('mouseleave', () => (link.style.opacity = '0.7'));
        footerBottom.appendChild(link);
      }
    }
  }

  // ================= 5. MESSAGE COMMUNICATION WITH ADMIN HEADER =================
  window.addEventListener('message', (event) => {
    if (!event.data) return;

    if (event.data.type === 'EBWASH_RESTORE_STATE' || event.data.type === 'EBWASH_PREVIEW_UPDATE') {
      if (event.data.payload) applyContent(event.data.payload);
    } else if (event.data.type === 'EBWASH_ENABLE_INLINE_ADMIN') {
      if (event.data.payload) {
        siteData = deepClone(event.data.payload);
      }
      applyContent(siteData);
    } else if (event.data.type === 'EBWASH_SAVED_CLEAN') {
      document.querySelectorAll('.eb-modified').forEach((el) => el.classList.remove('eb-modified'));
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
