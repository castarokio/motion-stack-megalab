const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function splitHeroTitle() {
  document.querySelectorAll(".hero-title > span").forEach(line => {
    const content = line.innerHTML;
    line.innerHTML = `<span>${content}</span>`;
  });
}

function setupMagneticCards() {
  document.querySelectorAll(".motion-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      if (reduceMotion) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      gsap.to(card, {
        rotateX,
        rotateY,
        y: -8,
        duration: 0.35,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        duration: 0.45,
        ease: "power2.out"
      });
    });
  });
}

function setupMotion() {
  if (!window.gsap || reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);
  splitHeroTitle();

  const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
  intro
    .from(".site-header", { y: -40, opacity: 0, duration: 0.9 })
    .from(".hero-title > span > span", {
      yPercent: 115,
      rotate: 3,
      duration: 1.15,
      stagger: 0.09
    }, "-=0.35")
    .from(".reveal", {
      y: 22,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08
    }, "-=0.7")
    .from(".hero-panel", {
      y: 42,
      opacity: 0,
      rotate: -2,
      duration: 0.9
    }, "-=0.65");

  gsap.to(".orb-a", {
    x: -80,
    y: 60,
    scale: 1.08,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".orb-b", {
    x: 90,
    y: -50,
    scale: 0.92,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".motion-ring", {
    rotate: 360,
    duration: 28,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
  });

  gsap.to(".floating-token", {
    y: -18,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    stagger: 0.3,
    ease: "sine.inOut"
  });

  gsap.to(".marquee-track", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee-band",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6
    }
  });

  gsap.to("#scroll-progress", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  gsap.utils.toArray(".section-copy, .motion-card, .proof-item").forEach((element, index) => {
    gsap.from(element, {
      y: 46,
      opacity: 0,
      duration: 0.9,
      delay: (index % 3) * 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 82%"
      }
    });
  });

  const pinTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-section",
      start: "top 70%",
      end: "bottom 55%",
      scrub: 0.8
    }
  });

  pinTimeline
    .from(".card-one", { x: -80, rotate: -8, opacity: 0 })
    .from(".card-two", { x: 90, rotate: 8, opacity: 0 }, "<0.18")
    .from(".card-three", { y: 110, rotate: -5, opacity: 0 }, "<0.18")
    .to(".sequence-card", { y: -34, stagger: 0.12 }, "+=0.1");

  gsap.from(".final-cta", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".final-cta",
      start: "top 82%"
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMotion();
  setupMagneticCards();
});
