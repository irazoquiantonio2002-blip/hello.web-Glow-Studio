/* ==========================================================================
   GLOW STUDIO — main.js
   Interacciones: pantalla de carga, navegación, reveal on scroll,
   efecto máquina de escribir, partículas doradas del hero y parallax.
   ========================================================================== */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     1. Pantalla de carga
  ---------------------------------------------------------------------- */
  function hideLoader() {
    document.body.classList.add("loaded");
    // Libera el foco del contenido oculto tras la transición
    setTimeout(function () {
      const loader = document.getElementById("loading-screen");
      if (loader) loader.remove();
    }, 900);
  }
  window.addEventListener("load", function () {
    // Deja ver el logo/spinner un instante aunque la carga sea inmediata
    setTimeout(hideLoader, 650);
  });
  // Salvaguarda: nunca dejar la cortina pegada
  setTimeout(hideLoader, 6000);

  /* ----------------------------------------------------------------------
     2. Año dinámico en el footer
  ---------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------------------
     3. Header con fondo al hacer scroll
  ---------------------------------------------------------------------- */
  const header = document.getElementById("site-header");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ----------------------------------------------------------------------
     4. Navegación móvil
  ---------------------------------------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  function closeNav() {
    if (!mainNav) return;
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ----------------------------------------------------------------------
     5. Reveal on scroll
  ---------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ----------------------------------------------------------------------
     6. Nav link activo según la sección visible
  ---------------------------------------------------------------------- */
  const navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { threshold: 0.4, rootMargin: "-20% 0px -35% 0px" });
    sections.forEach(function (sec) { sectionObserver.observe(sec); });
  }

  /* ----------------------------------------------------------------------
     7. Efecto máquina de escribir (hero)
  ---------------------------------------------------------------------- */
  const twEl = document.getElementById("typewriter");
  if (twEl && !prefersReducedMotion) {
    const words = [
      "cortes de autor",
      "colorimetría & balayage",
      "barbería premium",
      "uñas & pestañas",
      "maquillaje de eventos"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = words[wordIndex];
      twEl.textContent = current.substring(0, charIndex);

      if (!deleting && charIndex < current.length) {
        charIndex++;
        setTimeout(typeLoop, 75);
      } else if (!deleting && charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
      } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeLoop, 38);
      } else {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeLoop, 320);
      }
    }
    typeLoop();
  } else if (twEl) {
    twEl.textContent = "cortes, color, barba y más";
  }

  /* ----------------------------------------------------------------------
     8. Partículas doradas del hero (canvas)
  ---------------------------------------------------------------------- */
  const canvas = document.getElementById("particles-canvas");
  if (canvas && canvas.getContext && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let raf = null;
    let width = 0;
    let height = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * window.devicePixelRatio;
      height = canvas.height = rect.height * window.devicePixelRatio;
    }

    function seed() {
      const count = Math.min(90, Math.floor(width / 26));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: (Math.random() * 1.8 + 0.4) * window.devicePixelRatio,
          vx: (Math.random() - 0.5) * 0.25 * window.devicePixelRatio,
          vy: (Math.random() - 0.5) * 0.25 * window.devicePixelRatio,
          a: Math.random() * 0.5 + 0.15
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(233, 200, 130, " + p.a + ")";
        ctx.shadowColor = "rgba(227, 186, 99, 0.8)";
        ctx.shadowBlur = 6 * window.devicePixelRatio;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    function start() {
      resize();
      seed();
      if (raf) cancelAnimationFrame(raf);
      draw();
    }

    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 200);
    });

    // Pausa la animación cuando el hero no está visible
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!raf) draw();
          } else if (raf) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        });
      }, { threshold: 0.01 }).observe(canvas);
    }

    start();
  }

  /* ----------------------------------------------------------------------
     9. Parallax suave en los banners
  ---------------------------------------------------------------------- */
  const banners = document.querySelectorAll(".parallax-banner");
  if (banners.length && !prefersReducedMotion && window.innerWidth > 860) {
    let ticking = false;
    function updateParallax() {
      banners.forEach(function (banner) {
        const rect = banner.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = (rect.top - window.innerHeight / 2) * 0.08;
        banner.style.backgroundPositionY = "calc(50% + " + offset.toFixed(1) + "px)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }

})();
