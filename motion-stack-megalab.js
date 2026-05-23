import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.mjs";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js";
import { animate as animeAnimate, stagger as animeStagger } from "https://cdn.jsdelivr.net/npm/animejs@4.4.1/dist/bundles/anime.esm.min.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function markLibrary(name, state = "active") {
  const status = document.querySelector(`[data-status-lib="${name}"]`);
  if (!status) return;

  status.classList.remove("is-active", "is-skipped");
  status.classList.add(state === "active" ? "is-active" : "is-skipped");
  status.textContent = `${name} ${state === "active" ? "active" : "skipped"}`;
}

function splitHeroTitle() {
  document.querySelectorAll(".hero-title > span").forEach(line => {
    line.innerHTML = `<span>${line.innerHTML}</span>`;
  });
}

function setupLenis() {
  if (prefersReducedMotion) {
    markLibrary("Lenis", "skipped");
    return null;
  }
  const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
  lenis.on("scroll", ScrollTrigger.update);
  lenis.on("scroll", event => {
    const readout = document.getElementById("lenis-readout");
    if (readout) readout.textContent = `Scroll velocity: ${Math.abs(event.velocity).toFixed(2)}`;
  });
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  markLibrary("Lenis");
  return lenis;
}

function setupGSAP() {
  if (prefersReducedMotion) {
    document.getElementById("load-curtain").style.display = "none";
    markLibrary("GSAP", "skipped");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  splitHeroTitle();

  const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
  intro
    .from(".mega-header", { y: -40, opacity: 0, duration: 0.8 })
    .from(".hero-title > span > span", { yPercent: 115, rotate: 3, duration: 1.15, stagger: 0.08 }, "-=0.55")
    .from(".eyebrow, .hero-text, .hero-actions", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.65")
    .from(".hero-console", { x: 40, opacity: 0, duration: 0.85 }, "-=0.6");

  gsap.to("#scroll-meter-fill", {
    width: "100%",
    ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true }
  });

  gsap.to(".marquee-a", {
    xPercent: -42,
    ease: "none",
    scrollTrigger: { trigger: ".marquee-section", start: "top bottom", end: "bottom top", scrub: 0.5 }
  });

  gsap.to(".marquee-b", {
    xPercent: 28,
    ease: "none",
    scrollTrigger: { trigger: ".marquee-section", start: "top bottom", end: "bottom top", scrub: 0.5 }
  });

  gsap.to(".timeline-bars i", {
    scaleX: 0.28,
    opacity: 0.48,
    duration: 0.7,
    stagger: 0.14,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  gsap.from(".hero-shot", {
    y: 80,
    rotate: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.45
  });

  gsap.utils.toArray(".stack-img").forEach((image, index) => {
    gsap.from(image, {
      y: 80,
      scale: 0.94,
      opacity: 0,
      duration: 0.9,
      delay: (index % 4) * 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: image, start: "top 88%" }
    });
  });

  gsap.utils.toArray(".demo-tile img").forEach(image => {
    gsap.to(image, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: image.closest(".demo-tile"), start: "top bottom", end: "bottom top", scrub: 0.6 }
    });
  });

  gsap.utils.toArray(".library-card").forEach((card, index) => {
    gsap.from(card, {
      y: 46,
      opacity: 0,
      duration: 0.8,
      delay: (index % 3) * 0.04,
      ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 84%" }
    });
  });

  setupGSAPShowreel();

  markLibrary("GSAP");
}

function setupGSAPShowreel() {
  const showreel = document.querySelector(".gsap-showreel");
  if (!showreel) return;

  const frames = gsap.utils.toArray(".reel-frame");
  const steps = gsap.utils.toArray(".gsap-steps span");
  const cursor = document.querySelector(".gsap-cursor");
  const magnetic = document.querySelector(".magnetic-link");

  gsap.from(".gsap-copy h2, .gsap-copy p, .gsap-steps, .magnetic-link", {
    y: 42,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: { trigger: showreel, start: "top 72%" }
  });

  frames.forEach((frame, index) => {
    gsap.fromTo(frame,
      { clipPath: "inset(48% 18% 48% 18% round 22px)", y: 90, rotate: index % 2 ? 9 : -8, opacity: 0 },
      {
        clipPath: "inset(0% 0% 0% 0% round 22px)",
        y: 0,
        opacity: 1,
        duration: 1,
        delay: index * 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: showreel, start: "top 68%" }
      }
    );

    gsap.to(frame.querySelector("img"), {
      scale: 1,
      yPercent: index % 2 ? -10 : 10,
      ease: "none",
      scrollTrigger: { trigger: showreel, start: "top bottom", end: "bottom top", scrub: 0.8 }
    });
  });

  const scrub = gsap.timeline({
    scrollTrigger: {
      trigger: showreel,
      start: "top 55%",
      end: "bottom 45%",
      scrub: 0.7,
      onUpdate: self => {
        const active = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        steps.forEach((step, index) => step.classList.toggle("is-current", index === active));
      }
    }
  });

  scrub
    .to(".frame-a", { xPercent: -8, yPercent: -7, rotate: -9, ease: "none" }, 0)
    .to(".frame-b", { xPercent: 10, yPercent: 12, rotate: 10, ease: "none" }, 0)
    .to(".frame-c", { xPercent: -12, yPercent: -10, rotate: -7, ease: "none" }, 0)
    .to(".frame-d", { xPercent: 10, yPercent: 16, rotate: 12, ease: "none" }, 0);

  gsap.to(".gsap-ticker", {
    xPercent: -38,
    ease: "none",
    scrollTrigger: { trigger: ".gsap-showreel", start: "top bottom", end: "bottom top", scrub: 0.5 }
  });

  if (cursor) {
    const moveCursor = event => {
      gsap.to(cursor, { x: event.clientX, y: event.clientY, opacity: 1, duration: 0.22, ease: "power2.out" });
    };
    const hideCursor = () => gsap.to(cursor, { opacity: 0, duration: 0.25 });

    showreel.addEventListener("pointermove", moveCursor);
    showreel.addEventListener("pointerleave", hideCursor);
  }

  if (magnetic) {
    magnetic.addEventListener("pointermove", event => {
      const rect = magnetic.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(magnetic, { x: x * 0.22, y: y * 0.32, duration: 0.28, ease: "power3.out" });
    });

    magnetic.addEventListener("pointerleave", () => {
      gsap.to(magnetic, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.35)" });
    });
  }
}

function setupThree() {
  const canvas = document.getElementById("three-hero");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const group = new THREE.Group();
  scene.add(group);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.15, 0.34, 180, 18),
    new THREE.MeshStandardMaterial({ color: 0xd7ff41, metalness: 0.36, roughness: 0.24, transparent: true, opacity: 0.72 })
  );
  knot.position.set(4.1, -0.55, -2.2);
  knot.scale.setScalar(0.38);
  group.add(knot);

  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 650;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 11;
    positions[i + 1] = (Math.random() - 0.5) * 7;
    positions[i + 2] = (Math.random() - 0.5) * 5;
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({ color: 0x40dfff, size: 0.025, transparent: true, opacity: 0.75 })
  );
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const light = new THREE.PointLight(0xff4fd8, 3.2);
  light.position.set(-3, 2, 4);
  scene.add(light);

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", resize);

  function render() {
    if (!prefersReducedMotion) {
      knot.rotation.x += 0.005;
      knot.rotation.y += 0.008;
      particles.rotation.y += 0.0008;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
  markLibrary("Three.js");
}

function setupAnime() {
  if (prefersReducedMotion) {
    markLibrary("Anime.js", "skipped");
    return;
  }
  animeAnimate(".anime-card .lib-tag", {
    translateX: [0, 10, 0],
    color: ["#d7ff41", "#40dfff", "#d7ff41"],
    duration: 2200,
    delay: animeStagger(180),
    loop: true,
    ease: "inOutSine"
  });

  animeAnimate(".anime-orbit", {
    rotate: "1turn",
    duration: 5200,
    loop: true,
    ease: "linear"
  });

  animeAnimate(".anime-orbit b", {
    scale: [0.7, 1.35, 0.7],
    opacity: [0.5, 1, 0.5],
    duration: 1600,
    delay: animeStagger(130),
    loop: true,
    ease: "inOutSine"
  });

  markLibrary("Anime.js");
}

function setupMotionOne() {
  const motionAnimate = window.MotionOne?.animate;
  const motionHover = window.MotionOne?.hover;

  if (!motionAnimate || !motionHover) {
    markLibrary("Motion One", "skipped");
    return;
  }

  document.querySelectorAll(".dock-card").forEach((card, index) => {
    motionAnimate(card, { opacity: [0, 1], y: [22, 0] }, { duration: 0.45, delay: 0.04 * index });
  });

  motionHover(".motion-card", element => {
    motionAnimate(element, { scale: 1.035, rotate: -0.6 }, { duration: 0.22 });
    return () => motionAnimate(element, { scale: 1, rotate: 0 }, { duration: 0.28 });
  });

  motionHover(".demo-tile, .dock-card, .case-card", element => {
    motionAnimate(element, { y: -10, scale: 1.015 }, { duration: 0.25 });
    return () => motionAnimate(element, { y: 0, scale: 1 }, { duration: 0.3 });
  });

  motionHover(".motion-pads button", element => {
    motionAnimate(element, { scale: 1.08, rotate: -1.5 }, { duration: 0.2 });
    return () => motionAnimate(element, { scale: 1, rotate: 0 }, { duration: 0.22 });
  });

  document.querySelectorAll(".primary-btn, .secondary-btn, .header-action").forEach(button => {
    button.addEventListener("pointerdown", () => {
      motionAnimate(button, { scale: 0.96 }, { duration: 0.12 });
    });
    button.addEventListener("pointerup", () => {
      motionAnimate(button, { scale: 1 }, { duration: 0.18 });
    });
  });

  markLibrary("Motion One");
}

function setupFramerMotionDom() {
  const framerAnimate = window.FramerDom?.animate;
  const framerHover = window.FramerDom?.hover;

  if (!framerAnimate || !framerHover) {
    markLibrary("Framer Motion", "skipped");
    return;
  }

  framerAnimate(".framer-proof", {
    backgroundColor: ["rgba(255,255,255,0.055)", "rgba(132,104,255,0.16)", "rgba(255,255,255,0.055)"],
    rotate: [0, -0.35, 0.35, 0]
  }, {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  });

  framerHover(".framer-proof", element => {
    framerAnimate(element, { scale: 1.025, y: -8 }, { duration: 0.25 });
    return () => framerAnimate(element, { scale: 1, y: 0 }, { duration: 0.25 });
  });

  markLibrary("Framer Motion");
}

function setupSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });
}

function setupLottie() {
  const container = document.getElementById("lottie-stage");
  if (!window.lottie || !container) return;

  const animation = window.lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: !prefersReducedMotion,
    animationData: {
      v: "5.7.4",
      fr: 30,
      ip: 0,
      op: 90,
      w: 520,
      h: 280,
      nm: "Motion Signal",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "outer ring",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: { a: 1, k: [{ t: 0, s: [0] }, { t: 90, s: [360] }] },
            p: { a: 0, k: [260, 140, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 1, k: [{ t: 0, s: [70, 70, 100] }, { t: 45, s: [105, 105, 100] }, { t: 90, s: [70, 70, 100] }] }
          },
          shapes: [
            {
              ty: "gr",
              it: [
                { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [150, 150] }, nm: "ellipse" },
                { ty: "st", c: { a: 0, k: [0.84, 1, 0.25, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 10 }, lc: 2, lj: 2, nm: "stroke" },
                { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, nm: "transform" }
              ],
              nm: "ring group"
            }
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 2,
          ty: 4,
          nm: "inner pulse",
          sr: 1,
          ks: {
            o: { a: 1, k: [{ t: 0, s: [30] }, { t: 45, s: [100] }, { t: 90, s: [30] }] },
            r: { a: 0, k: 0 },
            p: { a: 0, k: [260, 140, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 1, k: [{ t: 0, s: [65, 65, 100] }, { t: 45, s: [118, 118, 100] }, { t: 90, s: [65, 65, 100] }] }
          },
          shapes: [
            {
              ty: "gr",
              it: [
                { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [110, 110] }, nm: "ellipse" },
                { ty: "fl", c: { a: 0, k: [0.25, 0.87, 1, 1] }, o: { a: 0, k: 62 }, nm: "fill" },
                { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, nm: "transform" }
              ],
              nm: "pulse group"
            }
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0
        }
      ]
    }
  });

  setTimeout(() => {
    if (!container.querySelector("svg")) {
      container.innerHTML = `<div class="lottie-fallback"><span></span><strong>Lottie</strong></div>`;
    }
  }, 500);

  markLibrary("Lottie");
  return animation;
}

function setupRive() {
  const canvas = document.getElementById("rive-stage");
  const drawFallback = () => {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#d7ff41";
    context.beginPath();
    context.roundRect(70, 78, 380, 170, 28);
    context.fill();
    context.fillStyle = "#050608";
    context.font = "900 42px Inter";
    context.fillText("RIVE", 190, 165);
    context.font = "700 18px Inter";
    context.fillText("Drop a .riv file here later", 150, 198);
  };

  if (!window.rive) {
    drawFallback();
    markLibrary("Rive", "skipped");
    return;
  }

  try {
    new window.rive.Rive({
      src: "https://cdn.rive.app/animations/vehicles.riv",
      canvas,
      autoplay: !prefersReducedMotion,
      onLoad: event => event?.rive?.resizeDrawingSurfaceToCanvas()
    });
    markLibrary("Rive");
  } catch {
    drawFallback();
    markLibrary("Rive", "skipped");
  }
}

function runEnhancement(name, setup) {
  try {
    setup();
  } catch (error) {
    markLibrary(name, "skipped");
    console.warn(`${name} skipped`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dock = document.querySelector(".library-dock");
  const gsapShowreel = document.querySelector(".gsap-showreel");
  if (dock && gsapShowreel) dock.after(gsapShowreel);
  if (window.location.hash === "#gsap-lab" && gsapShowreel) {
    requestAnimationFrame(() => gsapShowreel.scrollIntoView({ block: "start" }));
  }

  document.body.classList.add("motion-ready");
  runEnhancement("AOS", () => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 80, disable: prefersReducedMotion });
    markLibrary("AOS", prefersReducedMotion ? "skipped" : "active");
  });
  runEnhancement("smooth anchors", setupSmoothAnchors);
  runEnhancement("Lenis", setupLenis);
  runEnhancement("GSAP", setupGSAP);
  runEnhancement("Three.js", setupThree);
  runEnhancement("Anime.js", setupAnime);
  runEnhancement("Motion One", setupMotionOne);
  runEnhancement("Framer Motion", setupFramerMotionDom);
  runEnhancement("Lottie", setupLottie);
  runEnhancement("Rive", setupRive);
});
