// ==========================================================================
// HAVEN Luxury Real Estate - Interactive Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preview Card Carousel State & Switching
  const previewSlides = [
    {
      img: 'assets/preview-villa.jpg',
      caption: 'Find a home that fits your lifestyle'
    },
    {
      img: 'assets/hero-villa.jpg',
      caption: 'Curated brutalist sanctuary with horizon views'
    },
    {
      img: 'assets/preview-villa.jpg',
      caption: 'Sculpted living spaces harmonized with nature'
    },
    {
      img: 'assets/hero-villa.jpg',
      caption: 'Intelligent passive solar architecture & luxury'
    }
  ];

  let currentSlideIndex = 0;
  const previewImage = document.getElementById('previewImage');
  const previewCaption = document.getElementById('previewCaption');
  const indicatorBars = document.querySelectorAll('.indicator-bar');

  function updateSlide(index) {
    if (index < 0 || index >= previewSlides.length) return;
    currentSlideIndex = index;

    // Fade transition
    previewImage.style.opacity = '0.3';
    setTimeout(() => {
      previewImage.src = previewSlides[currentSlideIndex].img;
      previewCaption.textContent = previewSlides[currentSlideIndex].caption;
      previewImage.style.opacity = '1';
    }, 200);

    // Update active bar
    indicatorBars.forEach((bar, i) => {
      bar.classList.toggle('active', i === currentSlideIndex);
    });
  }

  // Click on indicator bars
  indicatorBars.forEach((bar, i) => {
    bar.addEventListener('click', () => {
      updateSlide(i);
      resetAutoSlide();
    });
  });

  // Auto slide rotation every 5 seconds
  let slideInterval = setInterval(() => {
    const nextIndex = (currentSlideIndex + 1) % previewSlides.length;
    updateSlide(nextIndex);
  }, 5000);

  function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const nextIndex = (currentSlideIndex + 1) % previewSlides.length;
      updateSlide(nextIndex);
    }, 5000);
  }

  // 2. Viewing Modal Logic
  const bookViewingBtn = document.getElementById('bookViewingBtn');
  const bookingModal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');

  function openBookingModal(e) {
    if (e) e.preventDefault();
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (bookViewingBtn) {
    bookViewingBtn.addEventListener('click', openBookingModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeBookingModal);
  }

  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
      closeBookingModal();
    }
  });

  // Handle booking form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      bookingForm.style.display = 'none';
      bookingSuccess.style.display = 'block';
      setTimeout(() => {
        closeBookingModal();
        setTimeout(() => {
          bookingForm.style.display = 'flex';
          bookingSuccess.style.display = 'none';
          bookingForm.reset();
        }, 400);
      }, 2500);
    });
  }

  // 3. Floating Notification Pill Dismiss & Hire Action
  const closeNotificationBtn = document.getElementById('closeNotificationBtn');
  const hireNotification = document.getElementById('hireNotification');
  const hireBtn = document.getElementById('hireBtn');

  if (closeNotificationBtn && hireNotification) {
    closeNotificationBtn.addEventListener('click', () => {
      hireNotification.classList.add('hidden');
    });
  }

  if (hireBtn) {
    hireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  }

  // 4. Explore Homes Button Smooth Interaction
  const exploreHomesBtn = document.getElementById('exploreHomesBtn');
  if (exploreHomesBtn) {
    exploreHomesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Set default minimum date for viewing to today
  const preferredDateInput = document.getElementById('preferredDate');
  if (preferredDateInput) {
    const today = new Date().toISOString().split('T')[0];
    preferredDateInput.setAttribute('min', today);
    preferredDateInput.value = today;
  }

  // 5. Nav Pill Tab Switching & Smooth Scrolling
  const navLinks = document.querySelectorAll('.nav-pill-container .nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Scrollspy: Highlight active nav pill based on scroll position
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 250;
    const faqSection = document.getElementById('faq');
    const journeySection = document.getElementById('journey');
    const residencesSection = document.getElementById('residences');

    if (faqSection && scrollPos >= faqSection.offsetTop) {
      navLinks.forEach((l) => {
        l.classList.toggle('active', l.getAttribute('href') === '#faq');
      });
    } else if (journeySection && scrollPos >= journeySection.offsetTop) {
      navLinks.forEach((l) => {
        l.classList.toggle('active', l.getAttribute('href') === '#journey');
      });
    } else if (residencesSection && scrollPos >= residencesSection.offsetTop) {
      navLinks.forEach((l) => {
        l.classList.toggle('active', l.getAttribute('href') === '#residences');
      });
    } else {
      navLinks.forEach((l) => {
        l.classList.toggle('active', l.getAttribute('href') === '#hero');
      });
    }
  });

  // 7. Residence Filter Pills
  const filterPills = document.querySelectorAll('.filter-pill');
  const residenceCards = document.querySelectorAll('.residence-card');
  const countBadge = document.querySelector('.residences-count-badge');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      let visibleCount = 0;

      residenceCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered-out');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
          visibleCount++;
        } else {
          card.classList.add('filtered-out');
        }
      });

      if (countBadge) {
        countBadge.textContent = `${visibleCount} ${visibleCount === 1 ? 'Residence' : 'Residences'}`;
      }
    });
  });

  // 8. Card Quick Tour Triggers
  const cardTourBtns = document.querySelectorAll('.card-quick-tour-btn');
  cardTourBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const residenceId = btn.getAttribute('data-residence');
      const residenceSelect = document.getElementById('residenceType');
      if (residenceSelect && residenceId) {
        residenceSelect.value = residenceId;
      }
      openBookingModal();
    });
  });

  // 9. Spatial Ambiance Switcher (Daylight vs Twilight)
  const ambianceBtns = document.querySelectorAll('.ambiance-btn');
  const spatialCanvasWrapper = document.getElementById('spatialCanvasWrapper');

  ambianceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      ambianceBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode');
      if (spatialCanvasWrapper) {
        spatialCanvasWrapper.classList.toggle('twilight-active', mode === 'twilight');
      }
    });
  });

  // 10. Spatial Hotspots Click/Touch Interaction
  const hotspots = document.querySelectorAll('.spatial-hotspot');
  hotspots.forEach((hotspot) => {
    const trigger = hotspot.querySelector('.hotspot-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = hotspot.classList.contains('active');
        hotspots.forEach((h) => h.classList.remove('active'));
        if (!wasActive) {
          hotspot.classList.add('active');
        }
      });
    }
  });

  // Dismiss open hotspot cards when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.spatial-hotspot')) {
      hotspots.forEach((h) => h.classList.remove('active'));
    }
  });

  // 10b. Spatial Image Dynamic Cursor Zoom & Pan
  const spatialWrapper = document.getElementById('spatialCanvasWrapper');
  const spatialImg = document.getElementById('spatialImage');

  if (spatialWrapper && spatialImg) {
    spatialWrapper.addEventListener('mousemove', (e) => {
      if (e.target.closest('.hotspot-card')) return;
      const rect = spatialWrapper.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spatialImg.style.transformOrigin = `${x}% ${y}%`;
    });

    spatialWrapper.addEventListener('mouseleave', () => {
      spatialImg.style.transformOrigin = 'center center';
    });
  }

  // 11. Journey Initiate Commission Button
  const journeyCommissionBtn = document.getElementById('journeyCommissionBtn');
  if (journeyCommissionBtn) {
    journeyCommissionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const residenceSelect = document.getElementById('residenceType');
      if (residenceSelect) {
        residenceSelect.value = 'bespoke-commission';
      }
      openBookingModal();
    });
  }

  // 12. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked item
        if (!isCurrentlyActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 13. FAQ Consultation Button Trigger
  const consultationBtn = document.getElementById('consultationBtn');
  if (consultationBtn) {
    consultationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const residenceSelect = document.getElementById('residenceType');
      if (residenceSelect) {
        residenceSelect.value = 'bespoke-commission';
      }
      openBookingModal();
    });
  }

  // 14. Interactive 3D Virtual Tour & Architectural Floorplan Dossier
  const residenceDossiers = {
    'haven-monolith': {
      title: 'The Monolith Coastal Sanctuary',
      location: 'Pacific Palisades, California',
      price: '$18,500,000',
      specs: '5 Beds • 6 Baths • 8,400 sq.ft • Infinity Pool',
      views: [
        { src: 'assets/tour-living.jpg', title: '01 / Ocean Living Pavilion', ceiling: 'Ceiling: 6.2m Double Height', exposure: 'Exposure: Direct South-West', label: 'Living Pavilion' },
        { src: 'assets/tour-suite.jpg', title: '02 / Cantilever Master Suite', ceiling: 'Ceiling: 3.4m Flush Timber', exposure: 'Exposure: Sunset Pacific Coast', label: 'Master Suite' },
        { src: 'assets/hero-villa.jpg', title: '03 / Cantilever Pool & Terraces', ceiling: 'Ceiling: Open Sky Canopy', exposure: 'Exposure: Full Daylight Ambient', label: 'Terraces & Pool' },
        { src: 'assets/spatial-materials.jpg', title: '04 / Monolithic Concrete Atrium', ceiling: 'Ceiling: 8.0m Sculptural Lightwell', exposure: 'Exposure: Zenith Diffused Light', label: 'Concrete Atrium' }
      ]
    },
    'haven-cliff': {
      title: 'Horizon Cliffside Estate',
      location: 'Big Sur Coast, California',
      price: '$24,200,000',
      specs: '4 Beds • 5.5 Baths • 7,250 sq.ft • Ocean Bluff Deck',
      views: [
        { src: 'assets/preview-villa.jpg', title: '01 / Cliffside Cantilever Lounge', ceiling: 'Ceiling: 4.2m Floor-to-Ceiling', exposure: 'Exposure: Pacific Big Sur Bluff', label: 'Bluff Lounge' },
        { src: 'assets/tour-suite.jpg', title: '02 / Ocean Master Sanctuary', ceiling: 'Ceiling: 3.6m Concrete Beam', exposure: 'Exposure: Golden Horizon View', label: 'Master Suite' },
        { src: 'assets/tour-living.jpg', title: '03 / Monolithic Great Hall', ceiling: 'Ceiling: 5.8m Double Height', exposure: 'Exposure: South-West Coastline', label: 'Great Hall' },
        { src: 'assets/hero-villa.jpg', title: '04 / Skybridge & Deck', ceiling: 'Ceiling: Open Cantilever', exposure: 'Exposure: Unobstructed Ocean', label: 'Skybridge' }
      ]
    },
    'haven-sanctuary': {
      title: 'The Obsidian Glass Pavilion',
      location: 'Sedona Canyon, Arizona',
      price: '$14,800,000',
      specs: '4 Beds • 4 Baths • 6,100 sq.ft • Desert Courtyard',
      views: [
        { src: 'assets/residence-3.jpg', title: '01 / Obsidian Desert Courtyard', ceiling: 'Ceiling: 4.8m Cantilever Overhang', exposure: 'Exposure: Canyon Red Rock View', label: 'Courtyard' },
        { src: 'assets/tour-living.jpg', title: '02 / Great Hearth Hall', ceiling: 'Ceiling: 6.0m Sculptured Stone', exposure: 'Exposure: Sedona Panorama', label: 'Hearth Hall' },
        { src: 'assets/tour-suite.jpg', title: '03 / Cantilever Sky Suite', ceiling: 'Ceiling: 3.2m Minimal Wood', exposure: 'Exposure: Evening Sunset Ridge', label: 'Sky Suite' },
        { src: 'assets/spatial-materials.jpg', title: '04 / Thermal Reflection Basin', ceiling: 'Ceiling: Open Sky Atrium', exposure: 'Exposure: Starry Night Biophilic', label: 'Reflection Basin' }
      ]
    }
  };

  let activeTourResidenceId = 'haven-monolith';
  const tourModal = document.getElementById('tourModal');
  const closeTourModalBtn = document.getElementById('closeTourModalBtn');
  const tourVirtualBtns = document.querySelectorAll('.card-virtual-tour-btn');

  const tourResidenceTitle = document.getElementById('tourResidenceTitle');
  const tourResidenceLocation = document.getElementById('tourResidenceLocation');
  const tourFooterPrice = document.getElementById('tourFooterPrice');
  const tourFooterSpecs = document.getElementById('tourFooterSpecs');

  const tourMainImg = document.getElementById('tourMainImg');
  const hudSpaceTitle = document.getElementById('hudSpaceTitle');
  const hudCeiling = document.getElementById('hudCeiling');
  const hudExposure = document.getElementById('hudExposure');
  const tourThumbsStrip = document.getElementById('tourThumbsStrip');

  function openTourModal(residenceId) {
    activeTourResidenceId = residenceId || 'haven-monolith';
    const data = residenceDossiers[activeTourResidenceId] || residenceDossiers['haven-monolith'];

    // Update Header & Footer text
    if (tourResidenceTitle) tourResidenceTitle.textContent = data.title;
    if (tourResidenceLocation) tourResidenceLocation.textContent = data.location;
    if (tourFooterPrice) tourFooterPrice.textContent = data.price;
    if (tourFooterSpecs) tourFooterSpecs.textContent = data.specs;

    // Render Thumbs Strip
    if (tourThumbsStrip && data.views && data.views.length > 0) {
      tourThumbsStrip.innerHTML = '';
      data.views.forEach((v, idx) => {
        const btn = document.createElement('button');
        btn.className = `tour-thumb-btn ${idx === 0 ? 'active' : ''}`;
        btn.setAttribute('data-src', v.src);
        btn.setAttribute('data-title', v.title);
        btn.setAttribute('data-ceiling', v.ceiling);
        btn.setAttribute('data-exposure', v.exposure);
        btn.innerHTML = `
          <img src="${v.src}" alt="${v.label}">
          <span class="thumb-caption">${v.label}</span>
        `;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.tour-thumb-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          switchTourSpace(v);
        });
        tourThumbsStrip.appendChild(btn);
      });

      // Default to first space
      switchTourSpace(data.views[0]);
    }

    // Default to Views tab
    switchTourTab('views');

    if (tourModal) {
      tourModal.classList.add('active');
      tourModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function switchTourSpace(space) {
    if (!tourMainImg || !space) return;
    tourMainImg.style.opacity = '0.4';
    setTimeout(() => {
      tourMainImg.src = space.src;
      if (hudSpaceTitle) hudSpaceTitle.textContent = space.title;
      if (hudCeiling) hudCeiling.textContent = space.ceiling;
      if (hudExposure) hudExposure.textContent = space.exposure;
      tourMainImg.style.opacity = '1';
    }, 180);
  }

  function closeTourModal() {
    if (!tourModal) return;
    tourModal.classList.remove('active');
    tourModal.setAttribute('aria-hidden', 'true');
    const viewport = document.querySelector('.tour-main-viewport');
    if (viewport) viewport.classList.remove('zoomed');
    document.body.style.overflow = '';
  }

  tourVirtualBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const resId = btn.getAttribute('data-residence');
      openTourModal(resId);
    });
  });

  if (closeTourModalBtn) {
    closeTourModalBtn.addEventListener('click', closeTourModal);
  }

  if (tourModal) {
    tourModal.addEventListener('click', (e) => {
      if (e.target === tourModal) {
        closeTourModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tourModal && tourModal.classList.contains('active')) {
      closeTourModal();
    }
  });

  // Tour Tab Switching
  const tourTabBtns = document.querySelectorAll('.tour-tab-btn');
  const tabContentViews = document.getElementById('tabContentViews');
  const tabContentPlans = document.getElementById('tabContentPlans');
  const tabContentSpecs = document.getElementById('tabContentSpecs');

  function switchTourTab(tabKey) {
    tourTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
    });
    if (tabContentViews) tabContentViews.classList.toggle('active', tabKey === 'views');
    if (tabContentPlans) tabContentPlans.classList.toggle('active', tabKey === 'plans');
    if (tabContentSpecs) tabContentSpecs.classList.toggle('active', tabKey === 'specs');
  }

  tourTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTourTab(tab);
    });
  });

  // Zoom Lens Toggle
  const tourZoomBtn = document.getElementById('tourZoomBtn');
  const mainViewport = document.querySelector('.tour-main-viewport');
  if (tourZoomBtn && mainViewport) {
    tourZoomBtn.addEventListener('click', () => {
      mainViewport.classList.toggle('zoomed');
    });
  }

  // Floorplan Level Switching
  const btnFloor1 = document.getElementById('btnFloor1');
  const btnFloor2 = document.getElementById('btnFloor2');
  const graphicLevel1 = document.getElementById('graphicLevel1');
  const graphicLevel2 = document.getElementById('graphicLevel2');

  if (btnFloor1 && btnFloor2 && graphicLevel1 && graphicLevel2) {
    btnFloor1.addEventListener('click', () => {
      btnFloor1.classList.add('active');
      btnFloor2.classList.remove('active');
      graphicLevel1.style.display = 'flex';
      graphicLevel2.style.display = 'none';
    });

    btnFloor2.addEventListener('click', () => {
      btnFloor2.classList.add('active');
      btnFloor1.classList.remove('active');
      graphicLevel2.style.display = 'flex';
      graphicLevel1.style.display = 'none';
    });
  }

  // CAD Room Tooltip Hover
  const cadRooms = document.querySelectorAll('.cad-room-zone');
  const cadTooltip = document.getElementById('cadTooltip');
  const cadTooltipTitle = document.getElementById('cadTooltipTitle');
  const cadTooltipDims = document.getElementById('cadTooltipDims');
  const cadTooltipFinish = document.getElementById('cadTooltipFinish');
  const cadTooltipAcoustics = document.getElementById('cadTooltipAcoustics');

  cadRooms.forEach(zone => {
    zone.addEventListener('mouseenter', () => {
      if (!cadTooltip) return;
      const room = zone.getAttribute('data-room');
      const dims = zone.getAttribute('data-dims');
      const finish = zone.getAttribute('data-finish');
      const acoustics = zone.getAttribute('data-acoustics');

      if (cadTooltipTitle) cadTooltipTitle.textContent = room;
      if (cadTooltipDims) cadTooltipDims.textContent = dims;
      if (cadTooltipFinish) cadTooltipFinish.textContent = finish;
      if (cadTooltipAcoustics) cadTooltipAcoustics.textContent = acoustics;

      cadTooltip.style.opacity = '1';
    });

    zone.addEventListener('mouseleave', () => {
      if (cadTooltip) cadTooltip.style.opacity = '0';
    });
  });

  // Download PDF Dossier Feedback
  const tourDownloadBtn = document.getElementById('tourDownloadBtn');
  if (tourDownloadBtn) {
    tourDownloadBtn.addEventListener('click', () => {
      const origText = tourDownloadBtn.innerHTML;
      tourDownloadBtn.innerHTML = `<span>✓ Dossier Saved to Device</span>`;
      tourDownloadBtn.style.background = 'rgba(16, 185, 129, 0.2)';
      tourDownloadBtn.style.color = '#6ee7b7';
      tourDownloadBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      setTimeout(() => {
        tourDownloadBtn.innerHTML = origText;
        tourDownloadBtn.style.background = '';
        tourDownloadBtn.style.color = '';
        tourDownloadBtn.style.borderColor = '';
      }, 2500);
    });
  }

  // Book from Tour Modal
  const tourBookDirectBtn = document.getElementById('tourBookDirectBtn');
  if (tourBookDirectBtn) {
    tourBookDirectBtn.addEventListener('click', () => {
      closeTourModal();
      const residenceSelect = document.getElementById('residenceType');
      if (residenceSelect && activeTourResidenceId) {
        residenceSelect.value = activeTourResidenceId;
      }
      openBookingModal();
    });
  }

  // 15. In-Page Architectural 3D Tour & Blueprint Studio Controller
  let inPageActiveResidence = 'haven-monolith';
  let currentInPageSpaceIndex = 0;
  const inPageResidenceTitle = document.getElementById('inPageResidenceTitle');
  const inPageResidenceSubtitle = document.getElementById('inPageResidenceSubtitle');
  const inPagePrice = document.getElementById('inPagePrice');
  const inPageSpecs = document.getElementById('inPageSpecs');
  const inPageMainImg = document.getElementById('inPageMainImg');
  const inPageHudTitle = document.getElementById('inPageHudTitle');
  const inPageHudCeiling = document.getElementById('inPageHudCeiling');
  const inPageHudExposure = document.getElementById('inPageHudExposure');
  const inPageThumbsStrip = document.getElementById('inPageThumbsStrip');

  function setInPageResidence(resId) {
    inPageActiveResidence = resId;
    const data = residenceDossiers[resId] || residenceDossiers['haven-monolith'];

    // Update Pills
    document.querySelectorAll('.residence-select-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-residence') === resId);
    });

    // Update Titles & Meta
    if (inPageResidenceTitle) inPageResidenceTitle.textContent = data.title.toUpperCase();
    if (inPageResidenceSubtitle) inPageResidenceSubtitle.textContent = `${data.location} — ${data.specs}`;
    if (inPagePrice) inPagePrice.textContent = data.price;
    if (inPageSpecs) inPageSpecs.textContent = `${data.specs} • ${data.location}`;

    // Reset space index if out of bounds
    if (currentInPageSpaceIndex >= data.views.length) {
      currentInPageSpaceIndex = 0;
    }

    // Render Thumbs
    if (inPageThumbsStrip && data.views && data.views.length > 0) {
      inPageThumbsStrip.innerHTML = '';
      data.views.forEach((v, idx) => {
        const btn = document.createElement('button');
        btn.className = `inpage-thumb-btn ${idx === currentInPageSpaceIndex ? 'active' : ''}`;
        btn.setAttribute('data-src', v.src);
        btn.setAttribute('data-title', v.title);
        btn.setAttribute('data-ceiling', v.ceiling);
        btn.setAttribute('data-exposure', v.exposure);
        btn.setAttribute('data-index', idx);
        btn.setAttribute('type', 'button');
        btn.innerHTML = `
          <img src="${v.src}" alt="${v.label}">
          <span class="thumb-label">${v.title.split('/')[0]} ${v.label}</span>
        `;
        btn.addEventListener('click', () => {
          switchInPageSpace(v, idx);
        });
        inPageThumbsStrip.appendChild(btn);
      });

      switchInPageSpace(data.views[currentInPageSpaceIndex], currentInPageSpaceIndex);
    }
  }

  function switchInPageSpace(space, idx) {
    if (!inPageMainImg || !space) return;
    if (typeof idx === 'number') {
      currentInPageSpaceIndex = idx;
    }

    // Update active thumb classes
    if (inPageThumbsStrip) {
      const allThumbs = inPageThumbsStrip.querySelectorAll('.inpage-thumb-btn');
      allThumbs.forEach((btn, i) => {
        btn.classList.toggle('active', i === currentInPageSpaceIndex);
      });
    }

    inPageMainImg.style.opacity = '0.35';
    setTimeout(() => {
      inPageMainImg.src = space.src;
      inPageMainImg.alt = space.title;
      if (inPageHudTitle) inPageHudTitle.textContent = space.title;
      if (inPageHudCeiling) inPageHudCeiling.textContent = space.ceiling;
      if (inPageHudExposure) inPageHudExposure.textContent = space.exposure;
      inPageMainImg.style.opacity = '1';
    }, 120);
  }

  // Thumbnails Strip Click Delegation (handles both static and dynamically rendered thumbs)
  if (inPageThumbsStrip) {
    inPageThumbsStrip.addEventListener('click', (e) => {
      const btn = e.target.closest('.inpage-thumb-btn');
      if (!btn) return;
      const allBtns = Array.from(inPageThumbsStrip.querySelectorAll('.inpage-thumb-btn'));
      const index = allBtns.indexOf(btn);
      if (index !== -1) {
        const wasActive = btn.classList.contains('active');
        const data = residenceDossiers[inPageActiveResidence] || residenceDossiers['haven-monolith'];
        if (data && data.views && data.views[index]) {
          switchInPageSpace(data.views[index], index);
          if (wasActive) {
            // Already selected, clicking again opens 360 spatial view
            openLightbox(index);
          }
        }
      }
    });

    inPageThumbsStrip.addEventListener('dblclick', (e) => {
      const btn = e.target.closest('.inpage-thumb-btn');
      if (!btn) return;
      const allBtns = Array.from(inPageThumbsStrip.querySelectorAll('.inpage-thumb-btn'));
      const index = allBtns.indexOf(btn);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  }

  // Residence selector pills click
  const residencePills = document.querySelectorAll('.residence-select-pill');
  residencePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const resId = pill.getAttribute('data-residence');
      currentInPageSpaceIndex = 0;
      setInPageResidence(resId);
    });
  });

  // Mode tab switching
  const inPageTabBtns = document.querySelectorAll('.showcase-tab-btn');
  const inPagePanelView = document.getElementById('inPagePanelView');
  const inPagePanelPlans = document.getElementById('inPagePanelPlans');
  const inPagePanelSpecs = document.getElementById('inPagePanelSpecs');

  function switchInPageTab(tabKey) {
    inPageTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
    });
    if (inPagePanelView) inPagePanelView.classList.toggle('active', tabKey === 'views');
    if (inPagePanelPlans) inPagePanelPlans.classList.toggle('active', tabKey === 'plans');
    if (inPagePanelSpecs) inPagePanelSpecs.classList.toggle('active', tabKey === 'specs');
  }

  inPageTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchInPageTab(tab);
    });
  });

  // 16. Fullscreen High-Resolution Lightbox & 360° Spatial Tour Controller
  const lightboxModal = document.getElementById('imageLightboxModal');
  const spatialCanvas = document.getElementById('spatial360Canvas');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaptionTitle = document.getElementById('lightboxCaptionTitle');
  const lightboxCaptionSub = document.getElementById('lightboxCaptionSub');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxRoomStrip = document.getElementById('lightboxRoomStrip');

  // 360 HUD Elements
  const hud360Heading = document.getElementById('hud360Heading');
  const hud360Hint = document.getElementById('hud360Hint');
  const btn360AutoRotate = document.getElementById('btn360AutoRotate');
  const labelAutoRotate = document.getElementById('labelAutoRotate');
  const btn360Reset = document.getElementById('btn360Reset');
  const btn360Toggle2D = document.getElementById('btn360Toggle2D');
  const btn360ToggleLabel = document.getElementById('btn360ToggleLabel');
  const btn360ZoomIn = document.getElementById('btn360ZoomIn');
  const btn360ZoomOut = document.getElementById('btn360ZoomOut');

  // WebGL 360 Engine Variables
  let gl360 = null;
  let program360 = null;
  let tex360 = null;
  let anim360Id = null;
  let is360Running = false;
  let is2DMode = false;
  let autoRotate360 = true;
  let hasInteracted360 = false;

  let yaw360 = 0.0;
  let pitch360 = 0.0;
  let fov360 = 1.15; // default FOV (~66 deg)
  let targetFov360 = 1.15;
  let velYaw360 = 0.0;
  let velPitch360 = 0.0;

  let isDragging360 = false;
  let lastDragX = 0;
  let lastDragY = 0;

  // Uniform locations
  let uResLoc, uYawLoc, uPitchLoc, uFovLoc, uTexLoc;

  function init360WebGL() {
    if (gl360) return true;
    if (!spatialCanvas) return false;

    try {
      gl360 = spatialCanvas.getContext('webgl', { antialias: true, alpha: false }) ||
              spatialCanvas.getContext('experimental-webgl');
    } catch (e) {
      console.warn('WebGL not supported for 360 tour:', e);
      return false;
    }

    if (!gl360) return false;

    const vsSource = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D u_tex;
      uniform vec2 u_res;
      uniform float u_yaw;
      uniform float u_pitch;
      uniform float u_fov;

      #define PI 3.141592653589793

      void main() {
        // Ray from camera through screen coordinate
        vec2 coord = (gl_FragCoord.xy - u_res * 0.5) / (u_res.y * 0.5);
        float focal = 1.0 / tan(u_fov * 0.5);
        vec3 ray = normalize(vec3(coord.x, coord.y, focal));

        // Pitch rotation around X axis
        float cp = cos(u_pitch);
        float sp = sin(u_pitch);
        vec3 rPitch = vec3(ray.x, ray.y * cp - ray.z * sp, ray.y * sp + ray.z * cp);

        // Yaw rotation around Y axis
        float cy = cos(u_yaw);
        float sy = sin(u_yaw);
        vec3 dir = vec3(rPitch.x * cy + rPitch.z * sy, rPitch.y, -rPitch.x * sy + rPitch.z * cy);

        // Spherical coordinates
        float sYaw = atan(dir.x, dir.z);
        float sPitch = asin(clamp(dir.y, -1.0, 1.0));

        // Seamless 360 continuous horizontal mapping
        float normYaw = sYaw / PI * 0.5 + 0.5;
        float u = abs(fract(normYaw) * 2.0 - 1.0);
        float v = clamp(sPitch / (PI * 0.64) + 0.5, 0.0, 1.0);

        gl_FragColor = texture2D(u_tex, vec2(u, 1.0 - v));
      }
    `;

    function compileShader(type, src) {
      const shader = gl360.createShader(type);
      gl360.shaderSource(shader, src);
      gl360.compileShader(shader);
      if (!gl360.getShaderParameter(shader, gl360.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl360.getShaderInfoLog(shader));
        gl360.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl360.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl360.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return false;

    program360 = gl360.createProgram();
    gl360.attachShader(program360, vs);
    gl360.attachShader(program360, fs);
    gl360.linkProgram(program360);

    if (!gl360.getProgramParameter(program360, gl360.LINK_STATUS)) {
      console.error('Program link error:', gl360.getProgramInfoLog(program360));
      return false;
    }

    gl360.useProgram(program360);

    // Full-screen quad
    const quadBuffer = gl360.createBuffer();
    gl360.bindBuffer(gl360.ARRAY_BUFFER, quadBuffer);
    gl360.bufferData(gl360.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl360.STATIC_DRAW);

    const aPosLoc = gl360.getAttribLocation(program360, 'a_pos');
    gl360.enableVertexAttribArray(aPosLoc);
    gl360.vertexAttribPointer(aPosLoc, 2, gl360.FLOAT, false, 0, 0);

    // Get Uniforms
    uResLoc = gl360.getUniformLocation(program360, 'u_res');
    uYawLoc = gl360.getUniformLocation(program360, 'u_yaw');
    uPitchLoc = gl360.getUniformLocation(program360, 'u_pitch');
    uFovLoc = gl360.getUniformLocation(program360, 'u_fov');
    uTexLoc = gl360.getUniformLocation(program360, 'u_tex');

    // Create 360 Texture
    tex360 = gl360.createTexture();
    gl360.bindTexture(gl360.TEXTURE_2D, tex360);
    // Temporary 1x1 placeholder
    gl360.texImage2D(gl360.TEXTURE_2D, 0, gl360.RGBA, 1, 1, 0, gl360.RGBA, gl360.UNSIGNED_BYTE, new Uint8Array([15, 18, 24, 255]));
    gl360.texParameteri(gl360.TEXTURE_2D, gl360.TEXTURE_WRAP_S, gl360.CLAMP_TO_EDGE);
    gl360.texParameteri(gl360.TEXTURE_2D, gl360.TEXTURE_WRAP_T, gl360.CLAMP_TO_EDGE);
    gl360.texParameteri(gl360.TEXTURE_2D, gl360.TEXTURE_MIN_FILTER, gl360.LINEAR);
    gl360.texParameteri(gl360.TEXTURE_2D, gl360.TEXTURE_MAG_FILTER, gl360.LINEAR);

    setup360Interactions();
    return true;
  }

  function load360Texture(imageSrc) {
    if (!init360WebGL()) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!gl360 || !tex360) return;
      gl360.bindTexture(gl360.TEXTURE_2D, tex360);
      gl360.texImage2D(gl360.TEXTURE_2D, 0, gl360.RGBA, gl360.RGBA, gl360.UNSIGNED_BYTE, img);
      gl360.texParameteri(gl360.TEXTURE_2D, gl360.TEXTURE_WRAP_S, gl360.CLAMP_TO_EDGE);
      gl360.texParameteri(gl360.TEXTURE_2D, gl360.TEXTURE_WRAP_T, gl360.CLAMP_TO_EDGE);
      gl360.texParameteri(gl360.TEXTURE_2D, gl360.TEXTURE_MIN_FILTER, gl360.LINEAR);
      gl360.texParameteri(gl360.TEXTURE_2D, gl360.TEXTURE_MAG_FILTER, gl360.LINEAR);
    };
    img.src = imageSrc;
  }

  function updateHeadingHUD() {
    if (!hud360Heading) return;
    const deg = Math.round(((yaw360 * 180 / Math.PI) % 360 + 360) % 360);
    const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const cIdx = Math.round(deg / 45) % 8;
    hud360Heading.textContent = `${deg}° ${cardinals[cIdx]}`;
  }

  function render360Loop() {
    if (!is360Running) return;

    if (spatialCanvas && gl360 && !is2DMode) {
      // Resize canvas to match display size
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = Math.floor(spatialCanvas.clientWidth * dpr);
      const displayH = Math.floor(spatialCanvas.clientHeight * dpr);
      if (displayW > 0 && displayH > 0 && (spatialCanvas.width !== displayW || spatialCanvas.height !== displayH)) {
        spatialCanvas.width = displayW;
        spatialCanvas.height = displayH;
        gl360.viewport(0, 0, displayW, displayH);
      }

      // Physics & Inertia
      if (!isDragging360 && autoRotate360) {
        yaw360 += 0.0022;
      }

      if (!isDragging360) {
        yaw360 += velYaw360;
        pitch360 += velPitch360;
        velYaw360 *= 0.91;
        velPitch360 *= 0.91;
      }

      // Smooth zoom FOV
      fov360 += (targetFov360 - fov360) * 0.16;

      // Clamp vertical pitch (-65° to +65°)
      pitch360 = Math.max(-1.15, Math.min(1.15, pitch360));

      // Update uniforms
      gl360.useProgram(program360);
      gl360.uniform2f(uResLoc, spatialCanvas.width || 800, spatialCanvas.height || 600);
      gl360.uniform1f(uYawLoc, yaw360);
      gl360.uniform1f(uPitchLoc, pitch360);
      gl360.uniform1f(uFovLoc, fov360);
      gl360.uniform1i(uTexLoc, 0);

      gl360.drawArrays(gl360.TRIANGLES, 0, 6);
      updateHeadingHUD();
    }

    anim360Id = requestAnimationFrame(render360Loop);
  }

  function start360Tour() {
    if (init360WebGL()) {
      is360Running = true;
      if (spatialCanvas) spatialCanvas.style.display = is2DMode ? 'none' : 'block';
      if (lightboxImg) lightboxImg.style.display = is2DMode ? 'block' : 'none';
      if (!anim360Id) {
        anim360Id = requestAnimationFrame(render360Loop);
      }
    } else {
      if (spatialCanvas) spatialCanvas.style.display = 'none';
      if (lightboxImg) lightboxImg.style.display = 'block';
    }
  }

  function stop360Tour() {
    is360Running = false;
    if (anim360Id) {
      cancelAnimationFrame(anim360Id);
      anim360Id = null;
    }
  }

  function setup360Interactions() {
    if (!spatialCanvas) return;

    spatialCanvas.addEventListener('pointerdown', (e) => {
      isDragging360 = true;
      spatialCanvas.classList.add('grabbing');
      lastDragX = e.clientX;
      lastDragY = e.clientY;
      velYaw360 = 0;
      velPitch360 = 0;
      try { spatialCanvas.setPointerCapture(e.pointerId); } catch(err) {}

      if (!hasInteracted360) {
        hasInteracted360 = true;
        if (hud360Hint) hud360Hint.classList.add('hidden');
      }
    });

    spatialCanvas.addEventListener('pointermove', (e) => {
      if (!isDragging360) return;
      const dx = e.clientX - lastDragX;
      const dy = e.clientY - lastDragY;
      lastDragX = e.clientX;
      lastDragY = e.clientY;

      const sens = (fov360 / (spatialCanvas.clientHeight || 600)) * 1.35;
      yaw360 -= dx * sens;
      pitch360 += dy * sens;

      velYaw360 = -dx * sens * 0.35;
      velPitch360 = dy * sens * 0.35;
    });

    const endDrag = (e) => {
      if (isDragging360) {
        isDragging360 = false;
        spatialCanvas.classList.remove('grabbing');
        try { spatialCanvas.releasePointerCapture(e.pointerId); } catch(err) {}
      }
    };

    spatialCanvas.addEventListener('pointerup', endDrag);
    spatialCanvas.addEventListener('pointercancel', endDrag);

    // Mouse wheel zoom
    spatialCanvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      targetFov360 += e.deltaY * 0.0015;
      targetFov360 = Math.max(0.48, Math.min(1.52, targetFov360));
    }, { passive: false });
  }

  // 360 HUD Controls
  if (btn360AutoRotate) {
    btn360AutoRotate.classList.toggle('active', autoRotate360);
    btn360AutoRotate.addEventListener('click', () => {
      autoRotate360 = !autoRotate360;
      btn360AutoRotate.classList.toggle('active', autoRotate360);
      if (labelAutoRotate) {
        labelAutoRotate.textContent = autoRotate360 ? 'Auto-Orbit' : 'Orbit Paused';
      }
    });
  }

  if (btn360Reset) {
    btn360Reset.addEventListener('click', () => {
      yaw360 = 0.0;
      pitch360 = 0.0;
      velYaw360 = 0.0;
      velPitch360 = 0.0;
      targetFov360 = 1.15;
    });
  }

  if (btn360Toggle2D) {
    btn360Toggle2D.addEventListener('click', () => {
      is2DMode = !is2DMode;
      if (spatialCanvas) spatialCanvas.style.display = is2DMode ? 'none' : 'block';
      if (lightboxImg) lightboxImg.style.display = is2DMode ? 'block' : 'none';
      if (btn360ToggleLabel) {
        btn360ToggleLabel.textContent = is2DMode ? '360° View' : '2D Photo';
      }
      btn360Toggle2D.classList.toggle('active', is2DMode);
    });
  }

  if (btn360ZoomIn) {
    btn360ZoomIn.addEventListener('click', () => {
      targetFov360 = Math.max(0.48, targetFov360 - 0.22);
    });
  }

  if (btn360ZoomOut) {
    btn360ZoomOut.addEventListener('click', () => {
      targetFov360 = Math.min(1.52, targetFov360 + 0.22);
    });
  }

  function openLightbox(index) {
    if (!lightboxModal) return;
    const data = residenceDossiers[inPageActiveResidence] || residenceDossiers['haven-monolith'];
    const views = data.views || [];
    if (views.length === 0) return;

    if (typeof index === 'number') {
      currentInPageSpaceIndex = index;
    }
    updateLightbox();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Start 360 WebGL view
    start360Tour();
  }

  function updateLightbox() {
    const data = residenceDossiers[inPageActiveResidence] || residenceDossiers['haven-monolith'];
    const views = data.views || [];
    if (views.length === 0) return;

    if (currentInPageSpaceIndex < 0) currentInPageSpaceIndex = views.length - 1;
    if (currentInPageSpaceIndex >= views.length) currentInPageSpaceIndex = 0;

    const currentSpace = views[currentInPageSpaceIndex];

    // Load into 360 WebGL texture
    load360Texture(currentSpace.src);

    // Update 2D fallback image
    if (lightboxImg) {
      lightboxImg.src = currentSpace.src;
      lightboxImg.alt = currentSpace.label || currentSpace.title;
    }
    if (lightboxCaptionTitle) {
      lightboxCaptionTitle.textContent = currentSpace.title;
    }
    if (lightboxCaptionSub) {
      lightboxCaptionSub.textContent = `${currentSpace.ceiling} • ${currentSpace.exposure}`;
    }

    // Render / update Room Switcher strip in lightbox
    if (lightboxRoomStrip && views.length > 0) {
      lightboxRoomStrip.innerHTML = '';
      views.forEach((v, idx) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `lightbox-room-pill ${idx === currentInPageSpaceIndex ? 'active' : ''}`;
        pill.innerHTML = `<span>${v.title.split('/')[0]} ${v.label}</span>`;
        pill.addEventListener('click', () => {
          currentInPageSpaceIndex = idx;
          updateLightbox();
        });
        lightboxRoomStrip.appendChild(pill);
      });
    }

    // Keep in-page view synchronized
    switchInPageSpace(currentSpace, currentInPageSpaceIndex);
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    stop360Tour();
  }

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentInPageSpaceIndex--;
      updateLightbox();
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentInPageSpaceIndex++;
      updateLightbox();
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      currentInPageSpaceIndex++;
      updateLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentInPageSpaceIndex--;
      updateLightbox();
    }
  });

  // Clicking main in-page image or zoom button opens the lightbox viewer
  if (inPageMainImg) {
    inPageMainImg.addEventListener('click', () => {
      openLightbox(currentInPageSpaceIndex);
    });
  }

  const inPageZoomBtn = document.getElementById('inPageZoomBtn');
  if (inPageZoomBtn) {
    inPageZoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentInPageSpaceIndex);
    });
  }

  const inPageExpandHint = document.getElementById('inPageExpandHint');
  if (inPageExpandHint) {
    inPageExpandHint.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentInPageSpaceIndex);
    });
  }

  // Floorplan switching in-page
  const inPageBtnFloor1 = document.getElementById('inPageBtnFloor1');
  const inPageBtnFloor2 = document.getElementById('inPageBtnFloor2');
  const inPageGraphicL1 = document.getElementById('inPageGraphicL1');
  const inPageGraphicL2 = document.getElementById('inPageGraphicL2');

  if (inPageBtnFloor1 && inPageBtnFloor2 && inPageGraphicL1 && inPageGraphicL2) {
    inPageBtnFloor1.addEventListener('click', () => {
      inPageBtnFloor1.classList.add('active');
      inPageBtnFloor2.classList.remove('active');
      inPageGraphicL1.style.display = 'flex';
      inPageGraphicL2.style.display = 'none';
    });

    inPageBtnFloor2.addEventListener('click', () => {
      inPageBtnFloor2.classList.add('active');
      inPageBtnFloor1.classList.remove('active');
      inPageGraphicL2.style.display = 'flex';
      inPageGraphicL1.style.display = 'none';
    });
  }

  // In-Page CAD Room Tooltip
  const inPageCadRooms = document.querySelectorAll('.inpage-cad-room');
  const inPageCadTooltip = document.getElementById('inPageCadTooltip');
  const inPageTooltipTitle = document.getElementById('inPageTooltipTitle');
  const inPageTooltipDims = document.getElementById('inPageTooltipDims');
  const inPageTooltipFinish = document.getElementById('inPageTooltipFinish');
  const inPageTooltipAcoustics = document.getElementById('inPageTooltipAcoustics');

  inPageCadRooms.forEach(zone => {
    zone.addEventListener('mouseenter', () => {
      if (!inPageCadTooltip) return;
      const room = zone.getAttribute('data-room');
      const dims = zone.getAttribute('data-dims');
      const finish = zone.getAttribute('data-finish');
      const acoustics = zone.getAttribute('data-acoustics');

      if (inPageTooltipTitle) inPageTooltipTitle.textContent = room;
      if (inPageTooltipDims) inPageTooltipDims.textContent = dims;
      if (inPageTooltipFinish) inPageTooltipFinish.textContent = finish;
      if (inPageTooltipAcoustics) inPageTooltipAcoustics.textContent = acoustics;

      inPageCadTooltip.style.opacity = '1';
    });

    zone.addEventListener('mouseleave', () => {
      if (inPageCadTooltip) inPageCadTooltip.style.opacity = '0';
    });
  });

  // Download PDF Dossier Feedback (In-Page)
  const inPageDownloadBtn = document.getElementById('inPageDownloadBtn');
  if (inPageDownloadBtn) {
    inPageDownloadBtn.addEventListener('click', () => {
      const origText = inPageDownloadBtn.innerHTML;
      inPageDownloadBtn.innerHTML = `<span>✓ Architectural Dossier Saved</span>`;
      inPageDownloadBtn.style.background = 'rgba(16, 185, 129, 0.2)';
      inPageDownloadBtn.style.color = '#6ee7b7';
      inPageDownloadBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      setTimeout(() => {
        inPageDownloadBtn.innerHTML = origText;
        inPageDownloadBtn.style.background = '';
        inPageDownloadBtn.style.color = '';
        inPageDownloadBtn.style.borderColor = '';
      }, 2500);
    });
  }

  // In-Page Book Viewing
  const inPageBookBtn = document.getElementById('inPageBookBtn');
  if (inPageBookBtn) {
    inPageBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const residenceSelect = document.getElementById('residenceType');
      if (residenceSelect && inPageActiveResidence) {
        residenceSelect.value = inPageActiveResidence;
      }
      openBookingModal();
    });
  }

  // Connect Card "Tour & Plans" buttons to scroll to #tour
  tourVirtualBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const resId = btn.getAttribute('data-residence');
      const tourSection = document.getElementById('tour');
      if (tourSection) {
        tourSection.scrollIntoView({ behavior: 'smooth' });
        setInPageResidence(resId);
      }
    });
  });

  // ==========================================================================
  // 17. HAVEN Private Architectural Concierge Chatbot ("AURA")
  // ==========================================================================
  const havenChatWrapper = document.getElementById('havenChatbotWrapper');
  const havenChatTrigger = document.getElementById('havenChatTrigger');
  const chatTeaserPill = document.getElementById('chatTeaserPill');
  const chatUnreadBadge = document.getElementById('chatUnreadBadge');
  const havenChatWindow = document.getElementById('havenChatWindow');
  const chatClearBtn = document.getElementById('chatClearBtn');
  const chatMinimizeBtn = document.getElementById('chatMinimizeBtn');
  const chatMessagesBody = document.getElementById('chatMessagesBody');
  const chatMessagesContainer = document.getElementById('chatMessagesContainer');
  const chatTypingIndicator = document.getElementById('chatTypingIndicator');
  const chatQuickPrompts = document.getElementById('chatQuickPrompts');
  const chatInputForm = document.getElementById('chatInputForm');
  const chatInputText = document.getElementById('chatInputText');
  const chatSendBtn = document.getElementById('chatSendBtn');

  let isChatOpen = false;
  let isChatTyping = false;

  function formatTime(date) {
    const d = date || new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendChatMessage(sender, text, actions = null) {
    if (!chatMessagesContainer) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    let actionButtonsHtml = '';
    if (actions && Array.isArray(actions) && actions.length > 0) {
      actionButtonsHtml = `
        <div class="chat-action-strip">
          ${actions.map(act => `<button type="button" class="chat-action-btn" data-action="${act.action}" data-payload="${act.payload || ''}">${act.label}</button>`).join('')}
        </div>
      `;
    }

    msgDiv.innerHTML = `
      <div class="chat-bubble">
        ${text}
        ${actionButtonsHtml}
      </div>
      <span class="chat-msg-time">${formatTime()}</span>
    `;

    chatMessagesContainer.appendChild(msgDiv);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    if (chatMessagesBody) {
      chatMessagesBody.scrollTop = chatMessagesBody.scrollHeight;
    }
  }

  function showTyping() {
    isChatTyping = true;
    if (chatTypingIndicator) chatTypingIndicator.style.display = 'flex';
    if (chatSendBtn) chatSendBtn.disabled = true;
    scrollChatToBottom();
  }

  function hideTyping() {
    isChatTyping = false;
    if (chatTypingIndicator) chatTypingIndicator.style.display = 'none';
    if (chatSendBtn) chatSendBtn.disabled = false;
  }

  function toggleChat(forceState) {
    if (!havenChatWrapper || !havenChatWindow) return;
    isChatOpen = typeof forceState === 'boolean' ? forceState : !isChatOpen;
    havenChatWrapper.classList.toggle('active', isChatOpen);
    havenChatWindow.setAttribute('aria-hidden', isChatOpen ? 'false' : 'true');

    if (isChatOpen) {
      if (chatUnreadBadge) chatUnreadBadge.classList.add('hidden');
      if (chatTeaserPill) chatTeaserPill.style.display = 'none';
      setTimeout(() => {
        if (chatInputText) chatInputText.focus();
        scrollChatToBottom();
      }, 200);
    }
  }

  // ==========================================================================
  // 17. HAVEN Private Architectural Concierge Chatbot ("AURA") - Intelligent Engine
  // ==========================================================================

  // Comprehensive Knowledge Base feeding all project data, engineering, CAD specs & advisory details
  const havenKnowledgeBase = {
    residences: {
      'haven-monolith': {
        id: 'haven-monolith',
        name: 'The Monolith Coastal Sanctuary',
        shortName: 'The Monolith',
        location: 'Pacific Palisades, California',
        price: '$18,500,000',
        priceNum: 18500000,
        pricePerSqft: '$2,202 / sq.ft',
        beds: 5,
        baths: 6,
        sqft: '8,400 sq.ft',
        lot: '0.85 acre Pacific Ocean bluff frontage',
        category: 'Monolithic Coastal Villa',
        summary: 'Cascading board-formed concrete masses integrated into natural coastal bluffs with panoramic South-West Pacific ocean horizons.',
        spaces: [
          { name: 'Ocean Living Pavilion', ceiling: '6.2m double-height', exposure: 'Direct South-West', dims: '14.2m × 8.8m', highlight: 'Monolithic travertine hearth, pocketing glass apertures' },
          { name: 'Cantilever Master Suite', ceiling: '3.4m flush timber', exposure: 'Sunset Pacific Coast', dims: '12.6m × 7.2m', highlight: 'Suspended over ocean bluff, smoked oak finish, acoustic STC 46' },
          { name: 'Cantilever Pool & Terraces', ceiling: 'Open sky canopy', exposure: 'Full daylight ambient', dims: '22.0m × 5.4m', highlight: 'Zero-edge saltwater reflection basin, natural evaporative cooling (-4.2°C)' },
          { name: 'Monolithic Concrete Atrium', ceiling: '8.0m lightwell', exposure: 'Zenith diffused light', dims: '8.2m × 6.4m', highlight: 'Captures zenith coastal daylight, sculptural architectural lightwell' },
          { name: 'Boffi Minimalist Kitchen', ceiling: '3.6m architectural', exposure: 'Morning East light', dims: '9.4m × 6.2m', highlight: 'Italian quartzite countertops, fluted oak joinery, concealed silent extraction' },
          { name: 'Wine Tasting Vault', ceiling: '3.2m climate-sealed', exposure: 'Vibration isolated', dims: '5.2m × 4.6m', highlight: 'Temperature and humidity controlled, low-iron tempered glass enclosure' }
        ],
        idealFor: 'Families, entertaining, coastal luxury seekers, clients wanting prime proximity to Los Angeles while enjoying complete blufftop tranquility.'
      },
      'haven-cliff': {
        id: 'haven-cliff',
        name: 'Horizon Cliffside Estate',
        shortName: 'Horizon Cliffside',
        location: 'Big Sur Coast, California',
        price: '$24,200,000',
        priceNum: 24200000,
        pricePerSqft: '$3,338 / sq.ft',
        beds: 4,
        baths: 5.5,
        sqft: '7,250 sq.ft',
        lot: '1.4 acres sheer granite sea cliff',
        category: 'Suspended Cliffside Sanctuary',
        summary: 'Suspended high over rugged coastline crags with deep concrete cantilevers floating above crashing Pacific surf.',
        spaces: [
          { name: 'Cliffside Cantilever Lounge', ceiling: '4.2m floor-to-ceiling', exposure: 'Pacific Big Sur Bluff', highlight: 'Sheer granite cliff drop below, vanishing frameless glazing' },
          { name: 'Ocean Master Sanctuary', ceiling: '3.6m concrete beam', exposure: 'Golden Horizon View', highlight: 'Dramatic Pacific sunsets, freestanding soaking tub framing surf' },
          { name: 'Monolithic Great Hall', ceiling: '5.8m double height', exposure: 'South-West Coastline', highlight: 'Board-formed concrete spine, floating staircase, unobstructed sea views' },
          { name: 'Skybridge & Deck', ceiling: 'Open Cantilever', exposure: 'Unobstructed 180° Ocean', highlight: 'Cantilever walkway framing dramatic California coastline' }
        ],
        idealFor: 'Collectors, connoisseurs of extreme dramatic topography, clients seeking raw natural grandeur and total sensory peace.'
      },
      'haven-sanctuary': {
        id: 'haven-sanctuary',
        name: 'The Obsidian Glass Pavilion',
        shortName: 'The Obsidian Pavilion',
        location: 'Sedona Canyon, Arizona',
        price: '$14,800,000',
        priceNum: 14800000,
        pricePerSqft: '$2,426 / sq.ft',
        beds: 4,
        baths: 4,
        sqft: '6,100 sq.ft',
        lot: '2.2 acres desert red rock canyon',
        category: 'Biophilic Desert Pavilion',
        summary: 'Sculpted brutalist sanctuary nestled between ancient canyon rocks, framed by quiet reflection pools and private courtyards.',
        spaces: [
          { name: 'Obsidian Desert Courtyard', ceiling: '4.8m cantilever overhang', exposure: 'Canyon Red Rock View', highlight: 'Deep roof cantilevers protecting from high desert noon sun' },
          { name: 'Great Hearth Hall', ceiling: '6.0m sculptured stone', exposure: 'Sedona Red Rock Panorama', highlight: 'Hand-carved red stone fireplace, floor-to-ceiling thermal glazing' },
          { name: 'Cantilever Sky Suite', ceiling: '3.2m minimal wood', exposure: 'Evening Sunset Ridge', highlight: 'Panoramic views of iconic Sedona red rock formations' },
          { name: 'Thermal Reflection Basin', ceiling: 'Open sky atrium', exposure: 'Starry Night Biophilic', highlight: 'Night sky star reflection, biophilic evaporative microclimate' }
        ],
        idealFor: 'High-desert serenity, biophilic wellness, stargazing, contemplative artist or writer retreats.'
      }
    },

    materials: {
      concrete: {
        title: 'Board-Formed Monolithic Concrete',
        specs: '400mm Thickness • 45 MPa Compressive Strength • 12-Hour Thermal Lag • 100+ Year Longevity',
        description: 'Poured-in-place Type II/V self-consolidating low-carbon concrete cured with rough-sawn Douglas fir boards to reveal an exquisite, tactile wood grain. The 400mm mass creates a 12-hour thermal lag that absorbs daytime solar heat and releases it during cool coastal evenings, eliminating peak air conditioning loads.'
      },
      glazing: {
        title: 'Low-Iron Acoustic Cavity Glazing',
        specs: '48mm Triple-Pane • STC 42 Sound Isolation • 0.22 U-Factor • 99.4% UV Block',
        description: 'Engineered with 48mm insulated glass cavities filled with inert argon gas and treated with microscopic low-emissivity ceramic layers. Provides sound isolation up to STC 42 (impervious to 60-knot coastal gales), prevents interior fabric fading, and provides crystal-clear optical color transmission with zero green tint.'
      },
      pocketGlass: {
        title: 'Motorized Pocket Cavity Glass Walls',
        specs: 'Seamless Aperture • Flush In-Floor Tracks • Concealed Cavity Pockets',
        description: 'Massive multi-slide glass panels up to 6.2 meters tall glide effortlessly on hidden recessed rollers into double-wall concrete pockets, transforming indoor living spaces into open-air blufftop pavilions in seconds.'
      },
      travertine: {
        title: 'Honed Roman Travertine Flooring',
        specs: 'Level 0 Flush • Hydronic Radiant Warmth (23°C / 73°F) • Concealed Slot Drains',
        description: 'Direct-quarried in Tivoli, Italy, cut into continuous large-format slabs, and laid with micro-joints. Incorporates hydronic subfloor radiant loops delivering even, whisper-quiet warmth underfoot without forced-air drafts or airborne dust.'
      },
      geothermal: {
        title: 'Closed-Loop Geothermal Climate Matrix',
        specs: '100% Hydronic • Net-Zero Energy Target • Zero Fossil Fuel Combustion',
        description: 'Concealed deep vertical borehole ground-source heat exchange coupled with variable-capacity inverter water-to-water heat pumps and energy recovery ventilation (ERV). Provides year-round heating and cooling with 75% less energy than standard luxury systems.'
      },
      pool: {
        title: 'Zero-Edge Saltwater Reflection Basin',
        specs: '22m Length • Geothermal Temperature Control • -4.2°C Evaporative Cooling',
        description: 'Continuous with the travertine terrace plane, this 22-meter basin utilizes mineral-pure saltwater. The constant laminar overflow generates natural biophilic evaporative micro-cooling that reduces ambient summer terrace temperatures by 4.2°C.'
      },
      seismic: {
        title: 'Structural Bedrock & Seismic Engineering',
        specs: 'Bedrock Micropile Anchoring • Zone 4 / 8.0+ Richter Resilience • Post-Tensioned Cantilevers',
        description: 'Residences are anchored into coastal bedrock formations using steel-reinforced micropiles drilled up to 18 meters deep. Cantilevered terraces utilize internal high-strength post-tensioned steel tendons to resist earthquakes, soil erosion, and lateral gale forces.'
      }
    },

    floorplans: {
      l1: {
        name: 'Level 01: Ground & Entertaining (4,800 sq.ft)',
        zones: [
          { room: 'Great Room & Hearth', dims: '14.2m × 8.8m (1,345 sq.ft)', finish: 'Roman Travertine, Board-Formed Concrete', acoustics: 'STC 44 Isolated' },
          { room: 'Boffi Minimalist Kitchen', dims: '9.4m × 6.2m (628 sq.ft)', finish: 'Italian Quartzite, Fluted Smoked Oak', acoustics: 'Concealed Silent Extraction' },
          { room: 'Wine Tasting Vault', dims: '5.2m × 4.6m (257 sq.ft)', finish: 'Low-Iron Tempered Glass, Fluted Oak', acoustics: 'Vibration-Isolated Cooling' },
          { room: 'Zero-Edge Saltwater Basin & Terrace', dims: '22.0m × 5.4m (1,280 sq.ft)', finish: 'Saltwater, Roman Travertine Plinth', acoustics: 'Zero-Edge Laminar Overflow' }
        ]
      },
      l2: {
        name: 'Level 02: Cantilever Private Suites (3,600 sq.ft)',
        zones: [
          { room: 'Primary Cantilever Suite', dims: '12.6m × 7.2m (976 sq.ft)', finish: 'Smoked French Oak, Acoustic Linen Paneling', acoustics: 'STC 46 Total Silence' },
          { room: 'Monolithic Spa Bath & Rain Atrium', dims: '8.2m × 6.4m (564 sq.ft)', finish: 'Freestanding Monolithic Stone Tub, Rain Sky Lightwell', acoustics: 'Decoupled Cast Plumbing' },
          { room: 'Private Guest Residence Galleries (2 Suites)', dims: '16.0m × 4.8m (825 sq.ft total)', finish: 'Ensuite Travertine Baths, Private Terrace Entrances', acoustics: 'Independent Acoustic Shell' }
        ]
      }
    },

    commissionProcess: [
      { phase: 'Phase 01', name: 'Site Intelligence', duration: 'Weeks 1–4', desc: '3D LiDAR topographical scans, geological bedrock core drilling, and microclimate sun-path vector analysis ensuring passive thermal efficiency.' },
      { phase: 'Phase 02', name: 'Schematic Design', duration: 'Weeks 5–12', desc: '1:50 physical scale modeling, monolithic massing studies, sightline choreography, and VR spatial horizon walkthroughs.' },
      { phase: 'Phase 03', name: 'Precision Build', duration: 'Months 3–14', desc: 'Architectural concrete pouring, direct hand-selected travertine slab quarrying in Italy, triple-glaze acoustic fitting, and hydronic subfloor integration.' },
      { phase: 'Phase 04', name: 'White-Glove Handover', duration: 'Final Month', desc: 'Curated turnkey bespoke furniture installation, HAVEN Smart Living OS calibration, 10-year structural warranty issuance, and bilateral NDA key handover.' }
    ],

    advisory: {
      confidentiality: 'All private tours, architectural contracts, and acquisitions are governed by bilateral non-disclosure agreements (NDAs). Off-market portfolios and client identities remain strictly confidential.',
      furniture: 'Residences are delivered 100% turnkey, appointed with bespoke site-specific furniture sculpted from Roman travertine, French oak, and Belgian wool textiles designed to complement the home\'s geometry.',
      locations: {
        la: 'Los Angeles Advisory Desk: +1 (310) 845-9200 (Pacific Palisades Studio)',
        zurich: 'Zurich Advisory Desk: Talstrasse 14, 8001 Zurich (+41 44 218 8000)',
        tokyo: 'Tokyo Advisory Desk: Minami-Aoyama, Minato-ku',
        email: 'private@haven-residences.com'
      },
      international: 'While signature estates are in California and Arizona, our studio accepts private architectural commissions worldwide, including Switzerland, the Mediterranean coast, Japan, and the Caribbean.'
    }
  };

  const chatState = {
    clientName: null,
    activeResidenceId: 'haven-monolith',
    currentRoomIndex: 0,
    lastIntent: null,
    interactionCount: 0
  };

  function updateQuickPrompts(prompts) {
    if (!chatQuickPrompts || !Array.isArray(prompts) || prompts.length === 0) return;
    chatQuickPrompts.innerHTML = '';
    prompts.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quick-prompt-chip';
      btn.setAttribute('data-prompt', p.prompt);
      btn.textContent = p.label;
      chatQuickPrompts.appendChild(btn);
    });
  }

  function resetChat() {
    if (!chatMessagesContainer) return;
    chatMessagesContainer.innerHTML = '';
    chatState.clientName = null;
    chatState.activeResidenceId = inPageActiveResidence || 'haven-monolith';
    chatState.currentRoomIndex = 0;
    chatState.interactionCount = 0;

    appendChatMessage(
      'bot',
      'Good day. I am <strong>AURA</strong>, your private architectural concierge at HAVEN. How may I assist your exploration today? I can walk you through our portfolio, launch interactive 360° virtual tours of any room, open CAD blueprints and engineering specs, or schedule a confidential private viewing.',
      [
        { label: '🏛️ Available Residences', action: 'residences' },
        { label: '🔄 360° Spatial Tour', action: 'open-360', payload: 'haven-monolith' },
        { label: '📐 CAD Floorplans', action: 'plans' },
        { label: '📅 Book a Viewing', action: 'book' }
      ]
    );

    updateQuickPrompts([
      { label: '🏛️ Available Residences', prompt: 'Tell me about all available residences' },
      { label: '🔄 360° Virtual Tour', prompt: 'Show me the 360 degree virtual tour' },
      { label: '💰 Pricing & Specs', prompt: 'What are the prices and specifications?' },
      { label: '🌿 Sustainable Tech', prompt: 'How does your net zero passive technology work?' },
      { label: '📅 Book Private Tour', prompt: 'I want to schedule a private viewing' }
    ]);
  }

  function getBotResponse(userMsg) {
    const raw = userMsg.trim();
    const q = raw.toLowerCase();
    chatState.interactionCount++;

    // 1. Detect Client Name Introduction (e.g., "My name is Arthur", "I am Victoria", "Call me Julian")
    const nameMatch = raw.match(/(?:my name is|i am|i'm|call me)\s+([A-Za-z]+)/i);
    if (nameMatch && nameMatch[1] && !['interested', 'looking', 'here', 'ready', 'asking', 'wondering', 'touring'].includes(nameMatch[1].toLowerCase())) {
      chatState.clientName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1).toLowerCase();
      return {
        text: `It is an honor to assist you, <strong>${chatState.clientName}</strong>. Welcome to HAVEN. How may I tailor your architectural exploration today? Are you drawn toward coastal blufftop estates like <em>The Monolith</em>, dramatic Big Sur cliffs like <em>Horizon Cliffside</em>, or a tranquil desert retreat like <em>The Obsidian Pavilion</em>?`,
        actions: [
          { label: '🌊 The Monolith ($18.5M)', action: 'switch-residence', payload: 'haven-monolith' },
          { label: '⛰️ Horizon Cliffside ($24.2M)', action: 'switch-residence', payload: 'haven-cliff' },
          { label: '🏜️ Obsidian Pavilion ($14.8M)', action: 'switch-residence', payload: 'haven-sanctuary' },
          { label: '🔄 Launch 360° Tour', action: 'open-360', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Tour', prompt: 'Show me the 360 degree tour' },
          { label: '📐 CAD Blueprints', prompt: 'Show me the floor plans' },
          { label: '📅 Book Private Viewing', prompt: 'I would like to schedule a private viewing' }
        ]
      };
    }

    const salutation = chatState.clientName ? `${chatState.clientName}, ` : '';

    // 2. Greetings & Courtesy
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|greetings|howdy)\b/i.test(q)) {
      return {
        text: `Hello! ${salutation}Welcome to HAVEN. I am at your service to answer any questions regarding our brutalist residences, pricing, engineering, or floorplans. I can also launch 360° WebGL virtual tours or arrange a confidential on-site walkthrough. Where shall we begin?`,
        actions: [
          { label: '🏛️ View Portfolio', action: 'residences' },
          { label: '🔄 Experience 360° Tour', action: 'open-360', payload: chatState.activeResidenceId },
          { label: '💰 Pricing Overview', action: 'pricing' },
          { label: '📅 Book a Viewing', action: 'book' }
        ],
        followUps: [
          { label: '🌊 The Monolith ($18.5M)', prompt: 'Tell me about The Monolith Villa' },
          { label: '⛰️ Horizon Cliffside ($24.2M)', prompt: 'Tell me about Horizon Cliffside Estate' },
          { label: '🏜️ Obsidian Pavilion ($14.8M)', prompt: 'Tell me about The Obsidian Pavilion' },
          { label: '🔄 360° Virtual Tour', prompt: 'Launch 360 tour' }
        ]
      };
    }

    // 3. Bot Persona / Capabilities
    if (q.includes('who are you') || q.includes('what are you') || q.includes('what can you do') || q.includes('are you ai') || q.includes('are you real') || q.includes('your role')) {
      return {
        text: `I am <strong>AURA</strong>, HAVEN's conversational architectural concierge.<br><br>
I am equipped with complete architectural intelligence across our entire estate portfolio, including:<br>
• **Granular Residence Dossiers**: Pricing, room dimensions, bedroom suites, and site elevations<br>
• **Live Interactive Actions**: Directly launching full 360° WebGL panoramic tours and opening CAD blueprints on your screen<br>
• **Material & Sustainability Specifications**: Concrete thermal lag, triple-glazing STC ratings, geothermal systems, and seismic engineering<br>
• **Commission Journey Guidance**: The 4 phases from 3D LiDAR site intelligence to white-glove turnkey handover<br>
• **Confidential Private Viewings**: Coordinating bilateral NDA site visits with our Los Angeles and Zurich desks.`,
        actions: [
          { label: '🔄 Experience 360° Tour', action: 'open-360', payload: chatState.activeResidenceId },
          { label: '🏛️ Explore Estates', action: 'residences' },
          { label: '📅 Book a Viewing', action: 'book' }
        ],
        followUps: [
          { label: '🔄 360° Tour', prompt: 'Show me the 360 degree virtual tour' },
          { label: '💰 Pricing & Specs', prompt: 'What are the prices and specifications?' },
          { label: '🌿 Sustainable Engineering', prompt: 'How does your net zero passive technology work?' }
        ]
      };
    }

    // 4. Kitchen / Dining Queries
    if (q.includes('kitchen') || q.includes('cooking') || q.includes('boffi') || q.includes('chef') || q.includes('dining')) {
      const tourSec = document.getElementById('tour');
      if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });
      switchInPageTab('plans');

      return {
        text: `The culinary heart of <em>The Monolith</em> is an architectural showcase:<br><br>
• **Boffi Minimalist Kitchen**: Sized at **9.4m × 6.2m (628 sq.ft)** on Level 01.<br>
• **Finishes**: Monolithic honed Italian quartzite work islands paired with fluted smoked French oak millwork.<br>
• **Appliances & Technology**: Custom Gaggenau 400 Series flush induction cooktops, concealed dual integrated refrigeration columns, and silent acoustic perimeter downdraft ventilation.<br>
• **Wine Tasting Vault**: Positioned directly adjacent (5.2m × 4.6m) with low-iron glass and vibration-isolated climate storage for over 1,200 bottles.<br><br>
I have opened the **Level 01 CAD floorplan** on your screen so you can inspect the layout.`,
        actions: [
          { label: '📐 Inspect Kitchen CAD', action: 'plans' },
          { label: '🔄 360° Living Pavilion', action: 'open-360-room', payload: '0' },
          { label: '📅 Book Private Walkthrough', action: 'book', payload: 'haven-monolith' }
        ],
        followUps: [
          { label: '🍷 Tell me about Wine Vault', prompt: 'Tell me about the wine cellar and vault' },
          { label: '🔄 360° Living Pavilion', prompt: 'Show me the living pavilion in 360' },
          { label: '📐 Level 02 Bedrooms', prompt: 'Show me the bedroom level floor plans' }
        ]
      };
    }

    // 5. Wine Vault / Cellar Queries
    if (q.includes('wine') || q.includes('cellar') || q.includes('vault') || q.includes('tasting')) {
      const tourSec = document.getElementById('tour');
      if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });
      switchInPageTab('plans');

      return {
        text: `Our residences feature museum-grade wine preservation:<br><br>
• **The Monolith Wine Tasting Vault**: Measures **5.2m × 4.6m (257 sq.ft)** on Level 01.<br>
• **Capacity & Display**: Accommodates 1,200+ vintages behind 12mm low-iron frameless tempered glass.<br>
• **Vibration & Climate Isolation**: Decoupled foundation dampening protects fine aged wines from seismic or traffic harmonic vibrations.<br>
• **Atmosphere**: Precise 13°C (55°F) temperature and 68% relative humidity regulated by a redundant concealed geothermal loop.`,
        actions: [
          { label: '📐 View Blueprint Layout', action: 'plans' },
          { label: '🔄 360° Living Pavilion', action: 'open-360-room', payload: '0' },
          { label: '📅 Book a Viewing', action: 'book', payload: 'haven-monolith' }
        ],
        followUps: [
          { label: '🍳 Tell me about Kitchen', prompt: 'Tell me about the kitchen' },
          { label: '🔄 360° Virtual Tour', prompt: 'Launch 360 tour' },
          { label: '💰 Pricing & Specs', prompt: 'What are the prices and specs?' }
        ]
      };
    }

    // 6. Pool, Terrace & Water Queries
    if (q.includes('pool') || q.includes('swim') || q.includes('water') || q.includes('basin') || q.includes('terrace') || q.includes('deck') || q.includes('patio')) {
      chatState.currentRoomIndex = 2;
      const data = residenceDossiers[chatState.activeResidenceId] || residenceDossiers['haven-monolith'];
      const view = data.views[2] || data.views[0];
      switchInPageSpace(view, 2);

      const shouldOpen360 = q.includes('360') || q.includes('virtual') || q.includes('look around') || q.includes('tour');
      if (shouldOpen360) {
        setTimeout(() => openLightbox(2), 350);
      }

      return {
        text: `Here is the <strong>${view.title}</strong> of <em>${data.title}</em>:<br><br>
• **22-Meter Zero-Edge Saltwater Basin**: Sized at **22.0m × 5.4m (1,280 sq.ft)**, cantilevered toward the ocean bluff edge.<br>
• **Biophilic Micro-Cooling**: Constant laminar water overflow creates natural evaporative cooling that lowers ambient terrace temperatures in summer by **4.2°C**.<br>
• **Geothermal Heating**: Heated to an ideal 28°C (82°F) via closed-loop geothermal ground heat exchange with zero fossil fuels.<br>
• **Material Harmony**: Level 0 flush transition into Roman travertine with concealed perimeter drainage slots.`,
        actions: [
          { label: '🔄 View Pool in 360°', action: 'open-360-room', payload: '2' },
          { label: '📐 Pool CAD Specs', action: 'plans' },
          { label: '📅 Book Private Tour', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Pool View', prompt: 'Open 360 view of the pool terrace' },
          { label: '🛏️ Show Master Suite', prompt: 'Show me the Master Suite' },
          { label: '💰 Price of this Home', prompt: `What is the price of ${data.title}?` }
        ]
      };
    }

    // 7. Master Suite / Bedroom Queries
    if (q.includes('master') || q.includes('bedroom') || q.includes('suite') || q.includes('bed room') || q.includes('sleep')) {
      chatState.currentRoomIndex = 1;
      const data = residenceDossiers[chatState.activeResidenceId] || residenceDossiers['haven-monolith'];
      const view = data.views[1] || data.views[0];
      switchInPageSpace(view, 1);

      const shouldOpen360 = q.includes('360') || q.includes('virtual') || q.includes('look around') || q.includes('tour');
      if (shouldOpen360) {
        setTimeout(() => openLightbox(1), 350);
      }

      return {
        text: `Displaying the <strong>${view.title}</strong> (${view.ceiling} • ${view.exposure}):<br><br>
• **Primary Cantilever Suite**: Measures **12.6m × 7.2m (976 sq.ft)** on Level 02, suspended dramatically over the bluff.<br>
• **Acoustic Serenity**: STC 46 acoustic wall assembly with acoustic linen paneling and 48mm triple-glazing to isolate ocean wind.<br>
• **Spa Bath & Rain Atrium**: En-suite **8.2m × 6.4m** sanctuary with a monolithic freestanding carved stone tub, frameless rain skylight, and dual walk-in dressing galleries.<br>
• **Guest Wing**: Level 02 also hosts 2 private en-suite guest residence suites (16.0m × 4.8m gallery wing) with independent terrace access.`,
        actions: [
          { label: '🔄 View Master Suite in 360°', action: 'open-360-room', payload: '1' },
          { label: '📐 Bedroom CAD Plans', action: 'plans' },
          { label: '📅 Book Itinerary', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Master Suite', prompt: 'Open 360 view of the Master Suite' },
          { label: '🏊 Cantilever Pool', prompt: 'Show me the Pool & Terraces' },
          { label: '🌊 Living Pavilion', prompt: 'Show me the Ocean Living Pavilion' }
        ]
      };
    }

    // 8. Living Pavilion / Great Room / Hearth
    if (q.includes('living') || q.includes('great room') || q.includes('hearth') || q.includes('fireplace') || q.includes('lounge') || q.includes('salon')) {
      chatState.currentRoomIndex = 0;
      const data = residenceDossiers[chatState.activeResidenceId] || residenceDossiers['haven-monolith'];
      const view = data.views[0];
      switchInPageSpace(view, 0);

      const shouldOpen360 = q.includes('360') || q.includes('virtual') || q.includes('look around') || q.includes('tour');
      if (shouldOpen360) {
        setTimeout(() => openLightbox(0), 350);
      }

      return {
        text: `Here is the <strong>${view.title}</strong> (${view.ceiling} • ${view.exposure}):<br><br>
• **Scale**: Sized at **14.2m × 8.8m (1,345 sq.ft)** with dramatic 6.2-meter double-height ceilings.<br>
• **Monolithic Travertine Hearth**: A full-height architectural stone fireplace anchoring the pavilion.<br>
• **Pocketing Glass Walls**: Floor-to-ceiling motorized sliding glass vanishes completely into concrete cavity pockets, opening the room entirely to the ocean bluff breeze.<br>
• **Acoustic Tuning**: Hand-cured board-formed concrete walls scatter sound reflections to produce rich, warm room acoustics without reverberation.`,
        actions: [
          { label: '🔄 View Living Pavilion in 360°', action: 'open-360-room', payload: '0' },
          { label: '📐 CAD Floorplans', action: 'plans' },
          { label: '📅 Schedule Viewing', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Living Room', prompt: 'Open 360 degree view of the living room' },
          { label: '🛏️ Master Suite', prompt: 'Show me the Master Suite' },
          { label: '🏊 Pool & Terraces', prompt: 'Show me the Pool & Terraces' }
        ]
      };
    }

    // 9. Concrete Atrium / Spa / Lightwell
    if (q.includes('atrium') || q.includes('lightwell') || q.includes('spa') || q.includes('bath') || q.includes('tub')) {
      chatState.currentRoomIndex = 3;
      const data = residenceDossiers[chatState.activeResidenceId] || residenceDossiers['haven-monolith'];
      const view = data.views[3] || data.views[0];
      switchInPageSpace(view, 3);

      const shouldOpen360 = q.includes('360') || q.includes('virtual') || q.includes('look around') || q.includes('tour');
      if (shouldOpen360) {
        setTimeout(() => openLightbox(3), 350);
      }

      return {
        text: `Displaying the <strong>${view.title}</strong> (${view.ceiling} • ${view.exposure}):<br><br>
• **Zenith Lightwell**: An 8.0-meter vertical architectural atrium that channels diffused zenith skylight down through both levels.<br>
• **Biophilic Wellness**: Honed travertine walls, indoor reflection channels, and acoustic silence.<br>
• **Monolithic Spa Bath**: Freestanding custom-carved stone soaking tub, rain shower atrium with concealed floor drains, and decoupled plumbing stacks for zero acoustic transfer.`,
        actions: [
          { label: '🔄 View in 360°', action: 'open-360-room', payload: '3' },
          { label: '📐 Material Specs', action: 'specs' },
          { label: '📅 Book Viewing', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Atrium View', prompt: 'Open 360 degree view of the atrium' },
          { label: '🌿 Sustainable Materials', prompt: 'Tell me about your concrete and glass materials' },
          { label: '🏛️ Living Pavilion', prompt: 'Show me the living pavilion' }
        ]
      };
    }

    // 10. Interactive 360° Virtual Tour Command
    if (q.includes('360') || q.includes('virtual tour') || q.includes('panoram') || q.includes('look around') || q.includes('orbit') || q.includes('spin') || q.includes('rotate') || q.includes('full view')) {
      const tourSec = document.getElementById('tour');
      if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => openLightbox(chatState.currentRoomIndex || 0), 400);

      const currentRes = havenKnowledgeBase.residences[chatState.activeResidenceId] || havenKnowledgeBase.residences['haven-monolith'];

      return {
        text: `Launching the full <strong>360° WebGL Panoramic Tour</strong> for <em>${currentRes.name}</em> right now!<br><br>
• **Drag with mouse or touch**: Look in any direction across the full 360° sphere.<br>
• **Mouse Wheel / Pinch**: Zoom dynamically in and out (FOV controls).<br>
• **Auto-Orbit Button**: Toggles smooth cinematic rotation.<br>
• **Bottom Room Strip**: Instantly transport yourself into other rooms (Living Pavilion, Master Suite, Pool Terrace, Atrium) in full 360°!`,
        actions: [
          { label: '🔄 Relaunch 360° Viewer', action: 'open-360', payload: chatState.activeResidenceId },
          { label: '📐 View CAD Blueprints', action: 'plans' },
          { label: '📅 Book In-Person Tour', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '⛰️ 360° Horizon Cliffside', prompt: 'Show 360 tour of Horizon Cliffside Estate' },
          { label: '🏜️ 360° Obsidian Pavilion', prompt: 'Show 360 tour of The Obsidian Pavilion' },
          { label: '💰 Pricing & Specs', prompt: 'What are the prices and specs?' }
        ]
      };
    }

    // 11. CAD Floorplans / Blueprints / Dimensions / Levels
    if (q.includes('floorplan') || q.includes('floor plan') || q.includes('blueprint') || q.includes('cad') || q.includes('layout') || q.includes('dimension') || q.includes('sqft') || q.includes('square feet') || q.includes('levels') || q.includes('size')) {
      const tourSec = document.getElementById('tour');
      if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });
      switchInPageTab('plans');

      const data = havenKnowledgeBase.residences[chatState.activeResidenceId] || havenKnowledgeBase.residences['haven-monolith'];

      return {
        text: `I have opened the interactive **CAD Vector Floorplans** for <em>${data.name}</em> on your screen.<br><br>
• **Level 01: Ground & Entertaining (4,800 sq.ft)**:<br>
  - Great Room & Hearth: 14.2m × 8.8m (1,345 sq.ft) with 6.2m double-height ceilings<br>
  - Boffi Minimalist Kitchen: 9.4m × 6.2m (628 sq.ft) with quartzite & fluted oak<br>
  - Wine Tasting Vault: 5.2m × 4.6m (257 sq.ft) with vibration-isolated cooling<br>
  - Zero-Edge Saltwater Basin: 22.0m × 5.4m (1,280 sq.ft) cantilever terrace<br><br>
• **Level 02: Cantilever Private Suites (3,600 sq.ft)**:<br>
  - Primary Cantilever Suite: 12.6m × 7.2m (976 sq.ft) overlooking Pacific sunsets<br>
  - Monolithic Spa Bath & Rain Atrium: 8.2m × 6.4m (564 sq.ft)<br>
  - Private Guest Residence Galleries: 2 suites (16.0m × 4.8m total wing)<br><br>
*Hover over any room zone on the blueprint to inspect real-time dimensions, finishes, and acoustic STC ratings.*`,
        actions: [
          { label: '🔄 360° Spatial Views', action: 'views' },
          { label: '📐 Material Specs', action: 'specs' },
          { label: '📅 Book In-Person Tour', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Spatial Tour', prompt: 'Take me back to 360 spatial views' },
          { label: '🌿 Material Specs', prompt: 'Show me the architectural material specs' },
          { label: '📅 Book Viewing', prompt: 'I want to schedule a private viewing' }
        ]
      };
    }

    // 12. Materials, Concrete, Glazing, Engineering & Sustainability
    if (q.includes('material') || q.includes('concrete') || q.includes('glass') || q.includes('glazing') || q.includes('geothermal') || q.includes('sustain') || q.includes('net zero') || q.includes('thermal') || q.includes('solar') || q.includes('energy') || q.includes('travertine')) {
      const tourSec = document.getElementById('tour');
      if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });
      switchInPageTab('specs');

      return {
        text: `HAVEN residences are engineered for **100+ year structural resilience and Net-Zero performance**:<br><br>
• **400mm Board-Formed Concrete**: Type II/V self-consolidating low-carbon concrete cured with rough-sawn Douglas fir boards. Tested at 45 MPa compressive strength with a **12-hour thermal lag** that eliminates peak air conditioning demand.<br>
• **Low-Iron Acoustic Cavity Glazing**: 48mm triple-pane insulated glass with an **STC 42 acoustic isolation rating** (impervious to ocean winds). Blocks 99.4% of UV rays with a 0.22 U-factor while transmitting crystal-clear natural light without tint.<br>
• **Closed-Loop Geothermal Matrix**: Concealed vertical borehole ground-source heat pumps coupled to hydronic in-floor radiant warming at 23°C (73°F) with zero fossil fuel combustion.<br>
• **Biophilic Saltwater Micro-Cooling**: 22m zero-edge saltwater pool generating natural evaporative cooling that lowers terrace air by 4.2°C.<br>
• **Natural Daylighting**: Deep cantilever overhangs provide 94.8% natural daylighting without solar heat gain.`,
        actions: [
          { label: '🔄 Experience in 360°', action: 'open-360', payload: chatState.activeResidenceId },
          { label: '📐 CAD Floorplans', action: 'plans' },
          { label: '📅 Schedule Private Tour', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Spatial Tour', prompt: 'Show me the 360 tour' },
          { label: '🛡️ Earthquake Safety', prompt: 'How earthquake safe are these homes?' },
          { label: '💰 Pricing & Specs', prompt: 'What are the prices of your homes?' }
        ]
      };
    }

    // 13. Earthquakes, Safety, Foundation & Geology
    if (q.includes('earthquake') || q.includes('seismic') || q.includes('safe') || q.includes('safety') || q.includes('foundation') || q.includes('bedrock') || q.includes('cliff fall') || q.includes('erosion') || q.includes('storm') || q.includes('wind')) {
      return {
        text: `Our structural engineering adheres to the highest seismic and geological standards in the world:<br><br>
• **Bedrock Micropile Anchoring**: Prior to pouring, 3D LiDAR scans and geological core drilling locate solid geological strata. Steel-reinforced micropiles are socketed up to 18 meters into bedrock.<br>
• **Zone 4 Seismic Resistance**: Engineered with heavy ductile concrete shear cores and post-tensioned cantilever beams capable of withstanding Richter 8.0+ seismic events with zero structural damage.<br>
• **Wind & Gale Resistance**: 48mm triple-glazed tempered glass and concrete overhangs are rated for sustained coastal gale-force winds exceeding 120 mph.<br>
• **Lifespan**: The solid monolithic concrete and Roman travertine envelope has a projected resilience of over **100+ years** with minimal maintenance.`,
        actions: [
          { label: '🌿 Material Specs', action: 'specs' },
          { label: '🔄 360° Spatial Views', action: 'open-360', payload: chatState.activeResidenceId },
          { label: '📅 Book a Consultation', action: 'book' }
        ],
        followUps: [
          { label: '🌿 Material Specs', prompt: 'Show me the architectural material specs' },
          { label: '📐 CAD Blueprints', prompt: 'Show me the floor plans' },
          { label: '💰 Pricing Overview', prompt: 'What are the prices and specs?' }
        ]
      };
    }

    // 14. Acoustics, Sound Isolation & Noise
    if (q.includes('acoustic') || q.includes('sound') || q.includes('noise') || q.includes('quiet') || q.includes('silent') || q.includes('hear the ocean')) {
      return {
        text: `Acoustic tranquility is a cornerstone of the HAVEN living experience:<br><br>
• **STC 42 Cavity Glazing**: Multi-layered laminated triple glass blocks outside highway and wind noise, delivering library-level acoustic calm inside the residence.<br>
• **Decoupled Plumbing & HVAC**: Cast-iron acoustic plumbing sleeves and whisper-quiet subterranean geothermal air diffusion keep sound levels below NC-20.<br>
• **Acoustic Suite Partitions**: Bedroom suites are rated at **STC 46**, utilizing acoustic linen wall panelling and vibration-dampened subfloors.<br>
• **Natural Ocean Ambiance**: Motorized pocketing glass allows you to tune your environment—open them for soothing ocean surf, or close them for total serene silence.`,
        actions: [
          { label: '🔄 360° Master Suite', action: 'open-360-room', payload: '1' },
          { label: '📐 CAD Specifications', action: 'specs' },
          { label: '📅 Book Viewing', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Master Suite', prompt: 'Show me the Master Suite in 360' },
          { label: '🌿 Sustainable Engineering', prompt: 'How does your net zero passive technology work?' },
          { label: '📅 Book Viewing', prompt: 'I want to schedule a private viewing' }
        ]
      };
    }

    // 15. The Monolith Villa (Pacific Palisades)
    if (q.includes('monolith') || (q.includes('palisades') && !q.includes('cliff') && !q.includes('sedona'))) {
      chatState.activeResidenceId = 'haven-monolith';
      setInPageResidence('haven-monolith');
      const tourSec = document.getElementById('tour');
      if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });

      const m = havenKnowledgeBase.residences['haven-monolith'];

      return {
        text: `<strong>${m.name}</strong> (Pacific Palisades, CA) is now active on your screen:<br><br>
• **Acquisition Price**: <strong>${m.price}</strong> (${m.pricePerSqft})<br>
• **Scale**: ${m.beds} Beds • ${m.baths} Baths • ${m.sqft} • ${m.lot}<br>
• **Architecture**: Cascading monolithic board-formed concrete terraces embedded into natural bluffs with panoramic South-West Pacific ocean horizons.<br>
• **Key Highlights**: 6.2m double-height Ocean Living Pavilion, 22m zero-edge saltwater infinity basin (-4.2°C evaporative cooling), Boffi kitchen, and climate wine tasting vault.<br>
• **Ideal For**: ${m.idealFor}`,
        actions: [
          { label: '🔄 Launch 360° Monolith Tour', action: 'open-360', payload: 'haven-monolith' },
          { label: '📐 Monolith Floorplans', action: 'plans' },
          { label: '📅 Book Palisades Viewing', action: 'book', payload: 'haven-monolith' }
        ],
        followUps: [
          { label: '🔄 Monolith 360° Tour', prompt: 'Launch 360 tour of The Monolith' },
          { label: '⛰️ Compare with Horizon ($24.2M)', prompt: 'Tell me about Horizon Cliffside Estate' },
          { label: '📅 Book Private Tour', prompt: 'I want to book a private viewing for The Monolith' }
        ]
      };
    }

    // 16. Horizon Cliffside Estate (Big Sur)
    if (q.includes('horizon') || q.includes('cliff') || q.includes('big sur')) {
      chatState.activeResidenceId = 'haven-cliff';
      setInPageResidence('haven-cliff');
      const tourSec = document.getElementById('tour');
      if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });

      const h = havenKnowledgeBase.residences['haven-cliff'];

      return {
        text: `<strong>${h.name}</strong> (Big Sur Coast, CA) is now active on your screen:<br><br>
• **Acquisition Price**: <strong>${h.price}</strong> (${h.pricePerSqft})<br>
• **Scale**: ${h.beds} Beds • ${h.baths} Baths • ${h.sqft} • ${h.lot}<br>
• **Architecture**: Sited directly on granite sea crags, featuring daring concrete cantilevers floating hundreds of feet over the crashing Pacific ocean.<br>
• **Key Highlights**: Cliffside Cantilever Lounge with frameless glass, Ocean Master Sanctuary with golden horizon sunsets, and an open cantilever skybridge.<br>
• **Ideal For**: ${h.idealFor}`,
        actions: [
          { label: '🔄 Launch 360° Horizon Tour', action: 'open-360', payload: 'haven-cliff' },
          { label: '🏛️ View Bluff Lounge in 360°', action: 'open-360-room', payload: '0' },
          { label: '📅 Book Big Sur Walkthrough', action: 'book', payload: 'haven-cliff' }
        ],
        followUps: [
          { label: '🔄 Horizon 360° Tour', prompt: 'Launch 360 tour of Horizon Cliffside' },
          { label: '🌊 Compare with Monolith', prompt: 'Compare Monolith and Horizon' },
          { label: '📅 Book Big Sur Viewing', prompt: 'Book an in-person viewing for Horizon Cliffside' }
        ]
      };
    }

    // 17. The Obsidian Glass Pavilion (Sedona Canyon)
    if (q.includes('obsidian') || q.includes('sedona') || q.includes('sanctuary') || q.includes('desert') || q.includes('arizona')) {
      chatState.activeResidenceId = 'haven-sanctuary';
      setInPageResidence('haven-sanctuary');
      const tourSec = document.getElementById('tour');
      if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });

      const o = havenKnowledgeBase.residences['haven-sanctuary'];

      return {
        text: `<strong>${o.name}</strong> (Sedona Canyon, AZ) is now active on your screen:<br><br>
• **Acquisition Price**: <strong>${o.price}</strong> (${o.pricePerSqft})<br>
• **Scale**: ${o.beds} Beds • ${o.baths} Baths • ${o.sqft} • ${o.lot}<br>
• **Architecture**: Deep cantilevered roof overhangs shielding from high desert sun, sculpted red stone hearths (6.0m height), thermal reflection basin, and pocketing glass looking onto iconic canyon red rocks.<br>
• **Key Highlights**: Obsidian Desert Courtyard, Great Hearth Hall, Cantilever Sky Suite, and Thermal Reflection Basin reflecting starry desert skies.<br>
• **Ideal For**: ${o.idealFor}`,
        actions: [
          { label: '🔄 Launch 360° Obsidian Tour', action: 'open-360', payload: 'haven-sanctuary' },
          { label: '🏛️ View Courtyard in 360°', action: 'open-360-room', payload: '0' },
          { label: '📅 Schedule Sedona Viewing', action: 'book', payload: 'haven-sanctuary' }
        ],
        followUps: [
          { label: '🔄 360° Obsidian Tour', prompt: 'Launch 360 tour of Obsidian Pavilion' },
          { label: '🌊 The Monolith ($18.5M)', prompt: 'Tell me about The Monolith Coastal Sanctuary' },
          { label: '📅 Book Sedona Viewing', prompt: 'I want to schedule a viewing in Sedona' }
        ]
      };
    }

    // 18. Pricing, Investment & Cost Queries
    if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('how much') || q.includes('budget') || q.includes('rate') || q.includes('deposit') || q.includes('cheapest') || q.includes('most expensive') || q.includes('afford') || q.includes('$')) {
      return {
        text: `Our current residential portfolio pricing:<br><br>
1. **The Obsidian Glass Pavilion** (Sedona, AZ): **$14,800,000** ($2,426/sq.ft • 4 Beds • 6,100 sq.ft)<br>
2. **The Monolith Coastal Sanctuary** (Pacific Palisades, CA): **$18,500,000** ($2,202/sq.ft • 5 Beds • 8,400 sq.ft)<br>
3. **Horizon Cliffside Estate** (Big Sur, CA): **$24,200,000** ($3,338/sq.ft • 4 Beds • 7,250 sq.ft)<br>
4. **Bespoke Architectural Commissions**: Custom ground-up commissions initiate from **$12,000,000+**.<br><br>
*All purchases include complete turnkey interior appointments, site-sculpted travertine furnishings, and HAVEN Smart Living OS with a 10-year structural warranty.*`,
        actions: [
          { label: '🏛️ Compare Residences', action: 'residences' },
          { label: '🔄 360° Virtual Tour', action: 'open-360', payload: 'haven-monolith' },
          { label: '📅 Private Advisory Consultation', action: 'book' }
        ],
        followUps: [
          { label: '🌊 Monolith ($18.5M)', prompt: 'Tell me about The Monolith Villa' },
          { label: '⛰️ Horizon ($24.2M)', prompt: 'Tell me about Horizon Cliffside' },
          { label: '📋 4-Phase Commission Process', prompt: 'How does the 4-phase commission process work?' }
        ]
      };
    }

    // 19. Side-by-Side Comparison Queries
    if (q.includes('compare') || q.includes('difference') || q.includes('vs') || q.includes('versus') || q.includes('which is better') || q.includes('comparison')) {
      return {
        text: `Here is a side-by-side comparison of our signature estates:<br><br>
| Feature | **The Monolith** | **Horizon Cliffside** | **The Obsidian Pavilion** |<br>
|---|---|---|---|<br>
| **Location** | Pacific Palisades, CA | Big Sur Coast, CA | Sedona Canyon, AZ |<br>
| **Price** | $18,500,000 | $24,200,000 | $14,800,000 |<br>
| **Size** | 8,400 sq.ft (5 Beds, 6 Baths) | 7,250 sq.ft (4 Beds, 5.5 Baths) | 6,100 sq.ft (4 Beds, 4 Baths) |<br>
| **Topography** | Ocean Bluff Frontage | Granite Sea Crags | Red Rock Desert Canyon |<br>
| **Signature** | 22m Saltwater Basin & Atrium | Cantilever Skybridge & Deck | 6m Stone Hearth & Reflection Basin |<br>
| **Lifestyle** | Family & Entertaining near LA | Ultimate Dramatic Solitude | High-Desert Wellness & Stargazing |<br><br>
Which setting speaks to your vision?`,
        actions: [
          { label: '🔄 360° The Monolith', action: 'open-360', payload: 'haven-monolith' },
          { label: '🔄 360° Horizon Cliffside', action: 'open-360', payload: 'haven-cliff' },
          { label: '🔄 360° Obsidian Pavilion', action: 'open-360', payload: 'haven-sanctuary' }
        ],
        followUps: [
          { label: '🌊 Explore Monolith', prompt: 'Show me The Monolith in 360' },
          { label: '⛰️ Explore Horizon', prompt: 'Show me Horizon Cliffside in 360' },
          { label: '📅 Schedule Private Tour', prompt: 'I want to schedule an in-person viewing' }
        ]
      };
    }

    // 20. Lifestyle & Family Recommendations
    if (q.includes('recommend') || q.includes('which should i') || q.includes('help me choose') || q.includes('family') || q.includes('kids') || q.includes('entertain') || q.includes('party') || q.includes('sunset') || q.includes('privacy') || q.includes('peace') || q.includes('quiet')) {
      if (q.includes('family') || q.includes('kids') || q.includes('children') || q.includes('school') || q.includes('entertain')) {
        return {
          text: `For a primary family residence or frequent entertaining, I unequivocally recommend <strong>The Monolith Coastal Sanctuary</strong> ($18.5M in Pacific Palisades):<br><br>
• **Space & Privacy**: 5 bedrooms and 6 bathrooms across 8,400 sq.ft, with a dedicated 2-suite private guest wing on Level 02.<br>
• **Entertaining**: 6.2m double-height living pavilion, Boffi gourmet kitchen, 1,200-bottle wine vault, and 22m saltwater infinity basin.<br>
• **Location**: Sited on a peaceful ocean bluff while remaining only minutes from premier private academies and cultural hubs in West Los Angeles.`,
          actions: [
            { label: '🔄 Explore Monolith in 360°', action: 'open-360', payload: 'haven-monolith' },
            { label: '📐 Monolith Floorplans', action: 'plans' },
            { label: '📅 Book Private Tour', action: 'book', payload: 'haven-monolith' }
          ],
          followUps: [
            { label: '🔄 360° Monolith Tour', prompt: 'Show me the 360 tour of The Monolith' },
            { label: '📐 CAD Floorplans', prompt: 'Show me the floor plans' },
            { label: '⛰️ What about Big Sur?', prompt: 'Tell me about Horizon Cliffside Estate' }
          ]
        };
      }

      if (q.includes('sunset') || q.includes('dramatic') || q.includes('views') || q.includes('horizon') || q.includes('cliff') || q.includes('solitude')) {
        return {
          text: `For peerless natural drama, sheer awe, and legendary sunsets, <strong>Horizon Cliffside Estate</strong> ($24.2M in Big Sur) is unparalleled:<br><br>
• **Suspended Cantilevers**: Floating high above the Pacific on ancient granite bluffs.<br>
• **Unrivaled Views**: 180° unobstructed ocean horizon framing golden California sunsets from every major room and the open cantilever skybridge.<br>
• **Sanctuary**: Complete sensory detachment from the noise of the outside world.`,
          actions: [
            { label: '🔄 Explore Horizon in 360°', action: 'open-360', payload: 'haven-cliff' },
            { label: '📅 Book Big Sur Tour', action: 'book', payload: 'haven-cliff' }
          ],
          followUps: [
            { label: '🔄 Horizon 360° Tour', prompt: 'Show me Horizon Cliffside in 360' },
            { label: '🌊 What about Palisades?', prompt: 'Tell me about The Monolith Coastal Sanctuary' },
            { label: '📅 Book Viewing', prompt: 'I want to schedule a viewing for Horizon' }
          ]
        };
      }

      return {
        text: `To tailor the ideal recommendation for you, what experience resonates most?<br><br>
1. **The Monolith** ($18.5M • Palisades) — Monolithic coastal grandeur close to Los Angeles with 5 beds and expansive entertaining spaces.<br>
2. **Horizon Cliffside** ($24.2M • Big Sur) — Unrivaled dramatic ocean cliff cantilevers and Pacific sunsets.<br>
3. **The Obsidian Pavilion** ($14.8M • Sedona) — Biophilic desert serenity, red rock vistas, and tranquil reflection courtyards.`,
        actions: [
          { label: '🌊 Explore The Monolith', action: 'switch-residence', payload: 'haven-monolith' },
          { label: '⛰️ Explore Horizon Cliffside', action: 'switch-residence', payload: 'haven-cliff' },
          { label: '🏜️ Explore Obsidian Pavilion', action: 'switch-residence', payload: 'haven-sanctuary' }
        ],
        followUps: [
          { label: '🌊 Monolith ($18.5M)', prompt: 'Tell me about The Monolith' },
          { label: '⛰️ Horizon ($24.2M)', prompt: 'Tell me about Horizon Cliffside' },
          { label: '🏜️ Obsidian ($14.8M)', prompt: 'Tell me about The Obsidian Pavilion' }
        ]
      };
    }

    // 21. Commission Journey / Process / Timeline / Custom Builds
    if (q.includes('commission') || q.includes('process') || q.includes('phase') || q.includes('step') || q.includes('build') || q.includes('journey') || q.includes('timeline') || q.includes('how long') || q.includes('custom build') || q.includes('architect')) {
      const journeySec = document.getElementById('journey');
      if (journeySec) journeySec.scrollIntoView({ behavior: 'smooth' });

      return {
        text: `Every HAVEN estate is realized through our collaborative **4-Phase Commission Process**:<br><br>
• **Phase 01: Site Intelligence (Weeks 1–4)**:<br>
  - Topographical 3D LiDAR mesh scanning<br>
  - Geological bedrock core drilling and wind vector analysis<br>
  - Microclimate sun-path matrix for passive solar orientation<br><br>
• **Phase 02: Schematic Design (Weeks 5–12)**:<br>
  - 1:50 physical architectural scale model crafting<br>
  - Monolithic mass sculpting and sightline choreography<br>
  - Full-scale VR spatial horizon walkthrough<br><br>
• **Phase 03: Precision Build (Months 3–14)**:<br>
  - Pouring 400mm self-consolidating architectural concrete<br>
  - Direct slab selection in historic Italian travertine quarries<br>
  - Motorized triple-glazing and geothermal hydronic integration<br><br>
• **Phase 04: Turnkey Handover (Final Month)**:<br>
  - Bespoke furniture placement and HAVEN Smart Living OS calibration<br>
  - Bilateral NDA key ceremony with 10-year comprehensive structural warranty.`,
        actions: [
          { label: '🗺️ Explore Process Steps', action: 'journey' },
          { label: '📅 Initiate Commission', action: 'book' },
          { label: '🔄 360° Virtual Tour', action: 'open-360', payload: 'haven-monolith' }
        ],
        followUps: [
          { label: '🗺️ View Process Steps', prompt: 'Show me the commission journey section' },
          { label: '📅 Initiate Commission', prompt: 'I want to initiate an architectural commission' },
          { label: '💰 Custom Pricing', prompt: 'What are the costs of custom commissions?' }
        ]
      };
    }

    // 22. Turnkey Furniture / Finishes / Interior Design
    if (q.includes('furniture') || q.includes('furnish') || q.includes('interior') || q.includes('turnkey') || q.includes('decor') || q.includes('move in')) {
      return {
        text: `Yes, all HAVEN residences are delivered **100% Turnkey**:<br><br>
• **Bespoke Sculpted Furniture**: Custom-designed to match the home's spatial geometry—from monolithic honed Roman travertine dining tables to solid smoked oak credenzas.<br>
• **Acoustic Textiles**: Hand-loomed Belgian wool wall textiles, linen curtains, and organic down upholstery.<br>
• **HAVEN Smart Living OS**: Integrated smart home automation calibrating discrete circadian lighting, geothermal radiant heating, motorized pocket glass, and biometric perimeter security.<br>
• You simply step through the door and immediately experience pure, effortless serenity.`,
        actions: [
          { label: '🌿 Material Specs', action: 'specs' },
          { label: '🔄 360° Virtual Tour', action: 'open-360', payload: chatState.activeResidenceId },
          { label: '📅 Schedule Private Tour', action: 'book' }
        ],
        followUps: [
          { label: '🌿 Material Specs', prompt: 'Show me the architectural material specs' },
          { label: '🔄 360° Tour', prompt: 'Launch the 360 virtual tour' },
          { label: '📅 Book Viewing', prompt: 'I want to schedule a private viewing' }
        ]
      };
    }

    // 23. Confidentiality, NDA, Privacy & Security
    if (q.includes('confidential') || q.includes('nda') || q.includes('privacy') || q.includes('discreet') || q.includes('discretion') || q.includes('security') || q.includes('helicopter') || q.includes('private jet')) {
      return {
        text: `Absolute discretion is paramount to our private advisory:<br><br>
• **Bilateral NDAs**: All private viewings, architectural blueprints, and escrow negotiations are executed under bilateral non-disclosure agreements.<br>
• **Off-Market Exclusivity**: Our residences are never placed on public MLS databases. Siting locations and buyer identities are never publicized.<br>
• **Private Site Arrivals**: For confidential viewings, chauffeured arrivals from private FBOs (Santa Monica, LAX, Monterey, Sedona) or direct helicopter site landings can be coordinated upon request.<br>
• **Perimeter Security**: Integrated invisible thermal perimeter monitoring and biometric access controlled through HAVEN OS.`,
        actions: [
          { label: '📅 Request Confidential Viewing', action: 'book' },
          { label: '📞 Direct Advisory Desk', action: 'faq' },
          { label: '🏛️ Available Residences', action: 'residences' }
        ],
        followUps: [
          { label: '📅 Request Confidential Tour', prompt: 'I want to schedule a confidential private viewing' },
          { label: '💰 Pricing Overview', prompt: 'What are the prices and specifications?' },
          { label: '🔄 360° Virtual Tour', prompt: 'Launch 360 tour' }
        ]
      };
    }

    // 24. Booking, Viewing, Scheduling & Site Visits
    if (q.includes('book') || q.includes('viewing') || q.includes('visit') || q.includes('schedule') || q.includes('appointment') || q.includes('in person') || q.includes('tour in person') || q.includes('see the house') || q.includes('meet') || q.includes('consultation')) {
      const resSelect = document.getElementById('residenceType');
      if (resSelect && chatState.activeResidenceId) {
        resSelect.value = chatState.activeResidenceId;
      }
      openBookingModal();

      const res = havenKnowledgeBase.residences[chatState.activeResidenceId] || havenKnowledgeBase.residences['haven-monolith'];

      return {
        text: `I have opened our **Private Viewing Appointment Form** on your screen for confidential scheduling of <em>${res.name}</em>.<br><br>
• **Private Itinerary**: Conducted under bilateral non-disclosure agreements with a dedicated managing partner.<br>
• **Concierge Arrival**: Chauffeured transfers or helicopter landing can be arranged upon confirmation.<br>
• Our advisory team will reach out within 2 hours to confirm your private itinerary.`,
        actions: [
          { label: '📅 Complete Booking Form', action: 'book', payload: chatState.activeResidenceId },
          { label: '📞 Contact Advisory Desk', action: 'faq' },
          { label: '🔄 Return to 360° Tour', action: 'open-360', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Virtual Tour', prompt: 'Let me look at the 360 tour first' },
          { label: '💰 Pricing Overview', prompt: 'What are the prices and specs?' },
          { label: '📐 CAD Floorplans', prompt: 'Show me the floor plans' }
        ]
      };
    }

    // 25. Location, Offices, Contacts & International Reach
    if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('office') || q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('zurich') || q.includes('tokyo') || q.includes('switzerland') || q.includes('japan') || q.includes('international') || q.includes('europe')) {
      const faqSec = document.getElementById('faq');
      if (faqSec) faqSec.scrollIntoView({ behavior: 'smooth' });

      return {
        text: `HAVEN operates through direct private client advisory desks across the globe:<br><br>
• **Los Angeles Studio (Headquarters)**:<br>
  Pacific Palisades, CA • Phone: **+1 (310) 845-9200**<br><br>
• **Zurich Advisory Partner Desk**:<br>
  Talstrasse 14, 8001 Zurich, Switzerland • Phone: **+41 44 218 8000**<br><br>
• **Tokyo Advisory Desk**:<br>
  Minami-Aoyama, Minato-ku, Tokyo, Japan<br><br>
• **Confidential Desk**: <code>private@haven-residences.com</code><br><br>
While our signature estates grace California and Arizona, our studio accepts bespoke commissions globally, including the Swiss Alps, the Mediterranean, and Japan.`,
        actions: [
          { label: '🏛️ Available Residences', action: 'residences' },
          { label: '📅 Schedule Private Advisory Call', action: 'book' },
          { label: '🔄 360° Virtual Tour', action: 'open-360', payload: 'haven-monolith' }
        ],
        followUps: [
          { label: '🏛️ Available Residences', prompt: 'Show me all available residences' },
          { label: '📅 Book Consultation', prompt: 'Schedule a private consultation' },
          { label: '🔄 360° Tour', prompt: 'Launch the 360 virtual tour' }
        ]
      };
    }

    // 26. Gratitude, Compliments & Farewell
    if (q.includes('thank') || q.includes('thanks') || q.includes('awesome') || q.includes('great') || q.includes('wonderful') || q.includes('amazing') || q.includes('beautiful') || q.includes('stunning') || q.includes('bye') || q.includes('goodbye')) {
      return {
        text: `You are most welcome, ${salutation}! It is our absolute pleasure to share the craft of monolithic brutalist architecture with you. Whether you wish to revisit the 360° spatial tours or coordinate an on-site confidential walkthrough, I remain at your service.`,
        actions: [
          { label: '🔄 360° Virtual Tour', action: 'open-360', payload: chatState.activeResidenceId },
          { label: '📐 CAD Blueprints', action: 'plans' },
          { label: '📅 Book a Viewing', action: 'book', payload: chatState.activeResidenceId }
        ],
        followUps: [
          { label: '🔄 360° Tour', prompt: 'Launch 360 tour' },
          { label: '🏛️ Available Residences', prompt: 'Show me available residences' }
        ]
      };
    }

    // 27. Intelligent Conversational Fallback (Domain-Aware Concierge)
    return {
      text: `Regarding your query "${raw}", our architectural studio provides tailored guidance on every facet of our residences.<br><br>
Would you like to:<br>
• **Experience 360° Views**: Inspect the living pavilion, cantilever master suite, or saltwater pool in full panoramic WebGL<br>
• **Review CAD Blueprints**: Inspect room dimensions, finishes, and acoustic STC ratings<br>
• **Compare Residences**: Explore pricing from $14.8M to $24.2M across Palisades, Big Sur, and Sedona<br>
• **Schedule an In-Person Walkthrough**: Arrange a confidential bilateral NDA viewing.`,
      actions: [
        { label: '🔄 Experience 360° Tour', action: 'open-360', payload: chatState.activeResidenceId },
        { label: '📐 CAD Floorplans', action: 'plans' },
        { label: '💰 Pricing & Specs', action: 'pricing' },
        { label: '📅 Book a Viewing', action: 'book', payload: chatState.activeResidenceId }
      ],
      followUps: [
        { label: '🔄 360° Tour', prompt: 'Show me the 360 degree virtual tour' },
        { label: '🌊 The Monolith ($18.5M)', prompt: 'Tell me about The Monolith Villa' },
        { label: '⛰️ Horizon Cliffside ($24.2M)', prompt: 'Tell me about Horizon Cliffside Estate' },
        { label: '📅 Book Walkthrough', prompt: 'I want to schedule a private viewing' }
      ]
    };
  }

  function handleChatSubmit(text) {
    const query = text || (chatInputText ? chatInputText.value : '');
    if (!query || !query.trim() || isChatTyping) return;

    // Append user message
    appendChatMessage('user', query.trim());
    if (chatInputText) chatInputText.value = '';

    showTyping();

    // Natural bot response delay (380ms - 600ms)
    setTimeout(() => {
      hideTyping();
      const resp = getBotResponse(query);
      appendChatMessage('bot', resp.text, resp.actions);
      if (resp.followUps && resp.followUps.length > 0) {
        updateQuickPrompts(resp.followUps);
      }
    }, 450);
  }

  // Handle action buttons inside chat messages
  if (chatMessagesContainer) {
    chatMessagesContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.chat-action-btn');
      if (!btn) return;
      const act = btn.getAttribute('data-action');
      const payload = btn.getAttribute('data-payload');

      if (act === 'open-360') {
        const resId = payload || chatState.activeResidenceId || inPageActiveResidence || 'haven-monolith';
        chatState.activeResidenceId = resId;
        setInPageResidence(resId);
        const tourSec = document.getElementById('tour');
        if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          openLightbox(chatState.currentRoomIndex || 0);
        }, 400);
      } else if (act === 'open-360-room') {
        const roomIdx = parseInt(payload, 10) || 0;
        chatState.currentRoomIndex = roomIdx;
        const resId = chatState.activeResidenceId || inPageActiveResidence || 'haven-monolith';
        setInPageResidence(resId);
        const data = residenceDossiers[resId] || residenceDossiers['haven-monolith'];
        if (data.views[roomIdx]) {
          switchInPageSpace(data.views[roomIdx], roomIdx);
        }
        const tourSec = document.getElementById('tour');
        if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          openLightbox(roomIdx);
        }, 400);
      } else if (act === 'switch-residence') {
        const resId = payload || 'haven-monolith';
        chatState.activeResidenceId = resId;
        setInPageResidence(resId);
        const tourSec = document.getElementById('tour');
        if (tourSec) tourSec.scrollIntoView({ behavior: 'smooth' });
      } else if (act === 'book') {
        const resSelect = document.getElementById('residenceType');
        if (resSelect && payload) {
          resSelect.value = payload;
        }
        openBookingModal();
      } else if (act === 'plans') {
        const tourSec = document.getElementById('tour');
        if (tourSec) {
          tourSec.scrollIntoView({ behavior: 'smooth' });
          switchInPageTab('plans');
        }
      } else if (act === 'specs') {
        const tourSec = document.getElementById('tour');
        if (tourSec) {
          tourSec.scrollIntoView({ behavior: 'smooth' });
          switchInPageTab('specs');
        }
      } else if (act === 'views') {
        const tourSec = document.getElementById('tour');
        if (tourSec) {
          tourSec.scrollIntoView({ behavior: 'smooth' });
          switchInPageTab('views');
        }
      } else if (act === 'residences') {
        const sec = document.getElementById('residences');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      } else if (act === 'journey') {
        const sec = document.getElementById('journey');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      } else if (act === 'faq') {
        const sec = document.getElementById('faq');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      } else if (act === 'pricing') {
        handleChatSubmit('What are the prices and specs of your residences?');
      }
    });
  }

  // Quick Prompt Chips Delegation
  if (chatQuickPrompts) {
    chatQuickPrompts.addEventListener('click', (e) => {
      const chip = e.target.closest('.quick-prompt-chip');
      if (!chip) return;
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        handleChatSubmit(prompt);
      }
    });
  }

  // Trigger & Window Listeners
  if (havenChatTrigger) {
    havenChatTrigger.addEventListener('click', () => {
      toggleChat();
    });
  }

  if (chatMinimizeBtn) {
    chatMinimizeBtn.addEventListener('click', () => {
      toggleChat(false);
    });
  }

  if (chatClearBtn) {
    chatClearBtn.addEventListener('click', () => {
      resetChat();
    });
  }

  if (chatInputForm) {
    chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleChatSubmit();
    });
  }

  // Escape key closes chat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isChatOpen) {
      toggleChat(false);
    }
  });

  // Initial welcome message
  resetChat();

  // Initial render for In-Page Architectural 3D Tour & Blueprint Studio
  setInPageResidence('haven-monolith');
});

