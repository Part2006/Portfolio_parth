'use strict';

/* ── Typed.js ──────────────────────────────────────────── */
if (window.Typed) {
  new Typed('#typed', {
    strings: [
      'Full Stack Learner',
      'Software Engineering Student',
      'AI & Cybersecurity Enthusiast',
      'SQL Learner'
    ],
    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 2000,
    loop: true,
    cursorChar: '|',
  });
}

/* ── Navbar scroll ─────────────────────────────────────── */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

/* ── Active nav link ───────────────────────────────────── */
var allNavLinks = document.querySelectorAll('#desktopNav a, .mob-link');
var allSections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', function () {
  var cur = '';
  allSections.forEach(function (s) {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id;
  });
  allNavLinks.forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

/* ── Hamburger ─────────────────────────────────────────── */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
var mobOverlay = document.getElementById('mobOverlay');

function closeMob() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}
hamburger.addEventListener('click', function () {
  var open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  mobOverlay.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});
mobOverlay.addEventListener('click', closeMob);
document.querySelectorAll('.mob-link').forEach(function (l) { l.addEventListener('click', closeMob); });

/* ── Scroll reveal ─────────────────────────────────────── */
var ro = new IntersectionObserver(function (entries) {
  entries.forEach(function (e, i) {
    if (e.isIntersecting) {
      setTimeout(function () { e.target.classList.add('visible'); }, i * 65);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

function addReveal(sel) {
  document.querySelectorAll(sel).forEach(function (el) {
    el.classList.add('reveal');
    ro.observe(el);
  });
}

/* ============================================================
   RENDER SKILLS
============================================================ */
function renderSkills() {
  var grid = document.getElementById('skillsGrid');
  if (!grid || typeof SKILLS === 'undefined') return;
  grid.innerHTML = SKILLS.map(function (cat) {
    return '<div class="skill-card">' +
      '<div class="skill-card-head">' +
        '<span class="sk-icon">' + cat.icon + '</span>' +
        '<h3>' + cat.category + '</h3>' +
      '</div>' +
      '<div class="skill-tags">' +
        cat.items.map(function (s) { return '<span class="skill-tag">' + s + '</span>'; }).join('') +
      '</div>' +
    '</div>';
  }).join('');
  addReveal('.skill-card');
}

/* ============================================================
   RENDER PROJECTS
   Each card: image, title, description, tech tags, GitHub btn, Live Demo btn
============================================================ */
function renderProjects() {
  var grid = document.getElementById('projectsGrid');
  if (!grid || typeof PROJECTS === 'undefined') return;

  grid.innerHTML = PROJECTS.map(function (p) {
    var imgHtml = p.image
      ? '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" />' +
        '<div class="project-img-placeholder" style="display:none"><i class=\'bx bx-image\'></i></div>'
      : '<div class="project-img-placeholder"><i class=\'bx bx-image\'></i></div>';

    var hasGh   = p.github   && p.github   !== 'PASTE_GITHUB_LINK_HERE';
    var hasDemo = p.liveDemo && p.liveDemo !== 'PASTE_LIVE_DEMO_LINK_HERE' && p.liveDemo !== '';

    var ghBtn = hasGh
      ? '<a href="' + p.github + '" target="_blank" rel="noopener" class="btn-gh"><i class=\'bx bxl-github\'></i> GitHub</a>'
      : '<span class="btn-gh" style="opacity:.35;cursor:default"><i class=\'bx bxl-github\'></i> GitHub</span>';

    var demoBtn = hasDemo
      ? '<a href="' + p.liveDemo + '" target="_blank" rel="noopener" class="btn-demo"><i class=\'bx bx-link-external\'></i> Live Demo</a>'
      : '<span class="btn-demo disabled"><i class=\'bx bx-link-external\'></i> Live Demo</span>';

    return '<div class="project-card">' +
      '<div class="project-img">' + imgHtml + '</div>' +
      '<div class="project-body">' +
        '<h3>' + p.title + '</h3>' +
        '<p class="project-desc">' + p.description + '</p>' +
        '<div class="tech-tags">' +
          p.technologies.map(function (t) { return '<span class="tech-tag">' + t + '</span>'; }).join('') +
        '</div>' +
        '<div class="project-btns">' + ghBtn + demoBtn + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  addReveal('.project-card');
}

/* ============================================================
   RENDER CERTIFICATIONS
   Each card: title, issuer, date, description, View btn, Download btn
   View  → opens PDF in new tab
   Download → downloads the PDF file
============================================================ */
function renderCertifications() {
  var container = document.getElementById('certsContainer');
  if (!container || typeof CERTIFICATIONS === 'undefined') return;

  if (!CERTIFICATIONS.length) {
    container.innerHTML =
      '<div class="certs-empty">' +
        '<i class="bx bx-certification"></i>' +
        '<p>No certificates yet. Add PDFs to <code>public/certificates/</code> and update <code>data/certifications.js</code>.</p>' +
      '</div>';
    return;
  }

  /* Group by category */
  var groups = {};
  CERTIFICATIONS.forEach(function (c) {
    if (!groups[c.category]) groups[c.category] = [];
    groups[c.category].push(c);
  });

  var categoryIcons = {
    'Programming': 'bx bxl-python',
    'Artificial Intelligence': 'bx bx-brain',
    'Cybersecurity': 'bx bx-shield-alt-2',
  };

  container.innerHTML = Object.keys(groups).map(function (cat) {
    var icon = categoryIcons[cat] || 'bx bx-certification';
    return '<div class="cert-group">' +
      '<h3 class="cert-group-title"><i class="' + icon + '"></i>' + cat + '</h3>' +
      '<div class="cert-grid">' +
        groups[cat].map(function (c) {
          return '<div class="cert-card">' +
            '<span class="cert-badge">' + c.category + '</span>' +
            '<h4>' + c.title + '</h4>' +
            '<p class="cert-issuer">' + c.issuer + '</p>' +
            '<p class="cert-date">' + c.date + '</p>' +
            '<p class="cert-desc">' + c.description + '</p>' +
            '<div class="cert-btns">' +
              '<button class="btn-view" data-pdf="' + c.file + '" data-title="' + c.title + '" data-filename="' + c.title.replace(/\s+/g, '_') + '.pdf">' +
                '<i class="bx bx-show"></i> View' +
              '</button>' +
              '<a href="' + c.file + '" download class="btn-dl">' +
                '<i class="bx bx-download"></i> Download' +
              '</a>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }).join('');

  addReveal('.cert-card');
}

/* ============================================================
   RENDER EDUCATION
============================================================ */
function renderEducation() {
  var tl = document.getElementById('educationTimeline');
  if (!tl || typeof EDUCATION === 'undefined') return;
  tl.innerHTML = EDUCATION.map(function (e, i) {
    return '<div class="tl-item">' +
      '<div class="tl-dot' + (i === 0 ? ' active' : '') + '"></div>' +
      '<div class="tl-card">' +
        '<span class="tl-date">' + e.duration + '</span>' +
        '<h4>' + e.degree + '</h4>' +
        '<p class="tl-org">' + e.institution + '</p>' +
        '<p class="tl-desc">' + e.description + '</p>' +
      '</div>' +
    '</div>';
  }).join('');
  addReveal('.tl-item');
}


/* ============================================================
   RENDER ACHIEVEMENTS
============================================================ */
function renderAchievements() {
  var grid = document.getElementById('achievementsGrid');
  if (!grid || typeof ACHIEVEMENTS === 'undefined') return;
  grid.innerHTML = ACHIEVEMENTS.map(function (a) {
    var icon = a.icon || 'bx bx-trophy';
    var certBtn = a.certificate
      ? '<button class="btn-cert" data-pdf="' + a.certificate + '" data-title="' + a.title + ' Certificate" data-filename="' + a.title.replace(/\s+/g, '_') + '_Certificate.pdf"><i class="bx bx-show"></i> View Certificate</button>'
      : '';
    return '<div class="ach-card">' +
      '<span class="ach-badge">' + a.badge + '</span>' +
      '<div class="ach-icon"><i class="' + icon + '"></i></div>' +
      '<h3>' + a.title + '</h3>' +
      '<p class="ach-sub">' + a.subtitle + '</p>' +
      '<p class="ach-desc">' + a.description + '</p>' +
      certBtn +
    '</div>';
  }).join('');
  addReveal('.ach-card');
}

/* ============================================================
   PDF MODAL
============================================================ */
(function () {
  var modal    = document.getElementById('pdfModal');
  var backdrop = document.getElementById('pdfBackdrop');
  var titleEl  = document.getElementById('pdfModalTitle');
  var dlBtn    = document.getElementById('pdfDl');
  var closeBtn = document.getElementById('pdfClose');
  var spinner  = document.getElementById('pdfSpin');
  var errBox   = document.getElementById('pdfErr');
  var fallback = document.getElementById('pdfFallback');
  var imgEl    = document.getElementById('pdfImg');
  var frame    = document.getElementById('pdfFrame');

  var IMG = ['jpg','jpeg','png','gif','webp'];
  function isImg(url) { return IMG.indexOf(url.split('.').pop().split('?')[0].toLowerCase()) !== -1; }

  function openModal(url, title, filename) {
    frame.src = ''; imgEl.src = '';
    spinner.style.display = 'flex';
    errBox.hidden = true; imgEl.hidden = true; frame.hidden = true;
    titleEl.textContent = title || 'Document';
    dlBtn.href = url; dlBtn.download = filename || 'document';
    fallback.href = url;
    modal.removeAttribute('hidden');
    setTimeout(function () { modal.classList.add('open'); }, 10);
    document.body.style.overflow = 'hidden';

    if (isImg(url)) {
      imgEl.onload  = function () { spinner.style.display = 'none'; imgEl.hidden = false; };
      imgEl.onerror = function () { spinner.style.display = 'none'; errBox.hidden = false; };
      imgEl.src = url;
    } else {
      frame.onload = function () { spinner.style.display = 'none'; frame.hidden = false; };
      setTimeout(function () {
        if (spinner.style.display !== 'none') { spinner.style.display = 'none'; frame.hidden = false; }
      }, 2000);
      frame.src = url;
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    setTimeout(function () {
      modal.setAttribute('hidden', '');
      frame.src = ''; imgEl.src = '';
      document.body.style.overflow = '';
    }, 250);
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-pdf]');
    if (!el) return;
    e.preventDefault();
    var url = el.getAttribute('data-pdf');
    if (!url || url === '#') return;
    openModal(url, el.getAttribute('data-title'), el.getAttribute('data-filename'));
  });
})();

/* ============================================================
   CONTACT FORM
============================================================ */
(function () {
  var form    = document.getElementById('contactForm');
  if (!form) return;
  var fname   = document.getElementById('fname');
  var femail  = document.getElementById('femail');
  var fmsg    = document.getElementById('fmsg');
  var fnameE  = document.getElementById('fnameErr');
  var femailE = document.getElementById('femailErr');
  var fmsgE   = document.getElementById('fmsgErr');
  var submitBtn = document.getElementById('submitBtn');
  var submitTxt = document.getElementById('submitTxt');
  var status  = document.getElementById('formStatus');

  function validate() {
    var ok = true;
    fnameE.textContent = femailE.textContent = fmsgE.textContent = '';
    if (!fname.value.trim())  { fnameE.textContent  = 'Name is required.'; ok = false; }
    if (!femail.value.trim()) { femailE.textContent = 'Email is required.'; ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(femail.value.trim())) { femailE.textContent = 'Enter a valid email.'; ok = false; }
    if (!fmsg.value.trim())   { fmsgE.textContent   = 'Message is required.'; ok = false; }
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    submitBtn.disabled = true;
    submitTxt.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    /*
      WIRE YOUR EMAIL SERVICE HERE:
      ─────────────────────────────
      Option 1 – Formspree (no code needed):
        Add  action="https://formspree.io/f/YOUR_ID"  method="POST"
        to the <form> tag in index.html and delete this JS handler.

      Option 2 – EmailJS:
        emailjs.send('SERVICE_ID','TEMPLATE_ID',{
          from_name: fname.value,
          reply_to:  femail.value,
          message:   fmsg.value
        }).then(onOk, onFail);
    */

    /* Placeholder response — remove once real service is connected */
    setTimeout(function () {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.className = 'form-status ok';
      form.reset();
      submitBtn.disabled = false;
      submitTxt.textContent = 'Send Message';
    }, 1000);
  });
})();

/* ── Init ──────────────────────────────────────────────── */
renderSkills();
renderProjects();
renderCertifications();
renderEducation();
renderAchievements();

addReveal('.stat, .about-img-frame, .about-text-col, .contact-info, .contact-form');

/* ── Custom Cursor Animation ───────────────────────────── */
(function () {
  var dots = document.querySelectorAll('.cursor-trail');
  if (!dots.length) return;

  var mouse = { x: 0, y: 0 };
  var coords = [];
  
  // Initialize position objects for all dots
  dots.forEach(function () {
    coords.push({ x: 0, y: 0 });
  });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Show all dots on first mousemove
    dots.forEach(function (dot) {
      dot.style.opacity = '1';
    });
  });

  document.addEventListener('mouseleave', function () {
    // Hide all dots when leaving the window
    dots.forEach(function (dot) {
      dot.style.opacity = '0';
    });
  });

  function animateCursor() {
    var x = mouse.x;
    var y = mouse.y;

    coords.forEach(function (coord, index) {
      var dot = dots[index];
      
      // Each dot follows the coordinates of the previous one with a lerp speed factor (0.3)
      coord.x += (x - coord.x) * 0.3;
      coord.y += (y - coord.y) * 0.3;

      dot.style.transform = 'translate(-50%, -50%) translate3d(' + coord.x + 'px, ' + coord.y + 'px, 0)';

      x = coord.x;
      y = coord.y;
    });

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Event delegation for hover states across all trail dots
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a, button, input, textarea, select, .project-card, .cert-card, .ach-card, .hamburger, .btn')) {
      dots.forEach(function (dot) {
        dot.classList.add('hover');
      });
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest('a, button, input, textarea, select, .project-card, .cert-card, .ach-card, .hamburger, .btn')) {
      dots.forEach(function (dot) {
        dot.classList.remove('hover');
      });
    }
  });
})();

/* ── 3D Card Tilt Animation ────────────────────────────── */
(function () {
  var card = document.querySelector('.hero-img-card');
  var wrap = document.querySelector('.hero-img-wrap');
  if (!card || !wrap) return;

  var maxTilt = 12; // Maximum rotation angle in degrees

  wrap.addEventListener('mousemove', function (e) {
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left; // x position within element
    var y = e.clientY - rect.top;  // y position within element
    
    var w = rect.width;
    var h = rect.height;
    
    // Convert mouse coordinates to angles between -maxTilt and maxTilt
    var tiltY = ((x / w) - 0.5) * maxTilt;
    var tiltX = ((y / h) - 0.5) * -maxTilt; // Inverted so it tilts towards the cursor

    card.style.transform = 'rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale3d(1.05, 1.05, 1.05)';
  });

  wrap.addEventListener('mouseleave', function () {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
})();
