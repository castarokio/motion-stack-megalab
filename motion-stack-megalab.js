const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = typeof window.gsap !== "undefined";

if (hasGsap && typeof window.ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function setupFallbackMotion() {
  document.documentElement.classList.add("fallback-motion");
}

function scrubTrigger(trigger, start = "top 92%", end = "top 58%", scrub = 0.7) {
  return { trigger, start, end, scrub };
}

function setupGsapMotion() {
  if (!hasGsap || prefersReducedMotion) {
    setupFallbackMotion();
    return;
  }

  gsap.fromTo(".topbar",
    { y: 0, opacity: 1 },
    {
      y: -42,
      opacity: 0.84,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "+=220", scrub: 0.55 }
    }
  );

  gsap.fromTo(".hero h1 span",
    { yPercent: 0, rotate: 0, opacity: 1 },
    {
      yPercent: -44,
      rotate: -2,
      opacity: 0.25,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "+=420", scrub: 0.75 }
    }
  );

  gsap.fromTo(".section-code, .hero p, .hero-actions",
    { y: 0, opacity: 1 },
    {
      y: -36,
      opacity: 0,
      stagger: 0.03,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "+=360", scrub: 0.75 }
    }
  );

  gsap.fromTo(".hero-frame",
    { scale: 1, opacity: 1, rotate: index => [-4, 8, 5][index] || 0 },
    {
      scale: 1.08,
      opacity: 0.45,
      rotate: index => [-12, 16, 11][index] || 0,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "+=520", scrub: 0.8 }
    }
  );

  gsap.to(".orb-a", {
    x: "18vw",
    y: "-10vh",
    scale: 1.2,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  gsap.to(".orb-b", {
    x: "-16vw",
    y: "16vh",
    scale: 0.78,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  gsap.to("#scroll-meter-fill", {
    width: "100%",
    ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true }
  });

  gsap.to(".lane-a", {
    xPercent: -30,
    ease: "none",
    scrollTrigger: { trigger: ".rush", start: "top bottom", end: "bottom top", scrub: 0.55 }
  });

  gsap.to(".lane-b", {
    xPercent: 24,
    ease: "none",
    scrollTrigger: { trigger: ".rush", start: "top bottom", end: "bottom top", scrub: 0.55 }
  });

  gsap.to(".lane-c", {
    xPercent: -20,
    ease: "none",
    scrollTrigger: { trigger: ".rush", start: "top bottom", end: "bottom top", scrub: 0.55 }
  });

  setupDirectorScene();

  gsap.to(".manifesto-track", {
    x: () => -(document.querySelector(".manifesto-track").scrollWidth - window.innerWidth + 80),
    ease: "none",
    scrollTrigger: {
      trigger: ".manifesto",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.7,
      invalidateOnRefresh: true
    }
  });

  gsap.utils.toArray(".wall-card").forEach((card, index) => {
    gsap.fromTo(card,
      {
        clipPath: "inset(38% 18% 38% 18% round 18px)",
        y: 90,
        rotate: index % 2 ? 4 : -4,
        opacity: 0
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 18px)",
        y: 0,
        rotate: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: scrubTrigger(card)
      }
    );

    gsap.to(card.querySelector("img"), {
      scale: 1.08,
      yPercent: index % 2 ? -8 : 8,
      ease: "none",
      scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.6 }
    });
  });

  gsap.utils.toArray(".studio-panel").forEach((panel, index) => {
    gsap.fromTo(panel,
      { y: 100, rotate: index === 1 ? 3 : -3, opacity: 0 },
      {
        y: 0,
        rotate: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: scrubTrigger(panel, "top 92%", "top 54%", 0.7)
      }
    );

    gsap.to(panel.querySelector("img"), {
      scale: 1.12,
      yPercent: index % 2 ? 8 : -8,
      ease: "none",
      scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 0.65 }
    });
  });

  gsap.fromTo(".proof-tile",
    { y: 80, opacity: 0, rotate: index => index % 2 ? 2.5 : -2.5 },
    {
      y: 0,
      opacity: 1,
      rotate: 0,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: scrubTrigger(".proof-grid", "top 92%", "top 52%", 0.7)
    }
  );

  gsap.fromTo(".system-card",
    { y: 80, opacity: 0, rotate: index => [-2, 2, -1, 1][index] || 0 },
    {
      y: 0,
      opacity: 1,
      rotate: 0,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: scrubTrigger(".system-grid", "top 92%", "top 52%", 0.7)
    }
  );

  gsap.to(".system-card", {
    y: index => index % 2 ? 28 : -28,
    ease: "none",
    scrollTrigger: { trigger: ".systems", start: "top bottom", end: "bottom top", scrub: 0.7 }
  });

  gsap.utils.toArray(".stack-word").forEach((word, index) => {
    gsap.fromTo(word,
      { xPercent: index % 2 ? -18 : 18 },
      {
        xPercent: index % 2 ? 14 : -14,
        ease: "none",
        scrollTrigger: { trigger: ".stack-show", start: "top bottom", end: "bottom top", scrub: 0.75 }
      }
    );
  });

  gsap.fromTo(".map-step",
    { y: 70, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: scrubTrigger(".map-grid", "top 92%", "top 56%", 0.7)
    }
  );
}

function setupDirectorScene() {
  const director = document.querySelector(".director");
  if (!director) return;

  const copies = gsap.utils.toArray(".scene-copy");
  const number = document.querySelector(".scene-number");
  const dialText = document.querySelector(".motion-dial strong");
  const route = document.querySelector(".route-line");
  const colors = ["#d8ff1f", "#08ddff", "#ff39c8", "#ff7a18"];

  gsap.set(copies, { autoAlpha: 0, y: 34, rotate: -1.5 });
  gsap.set(copies[0], { autoAlpha: 1, y: 0, rotate: 0 });
  gsap.set(".shutter-b", { clipPath: "inset(0 100% 0 0 round 18px)" });
  gsap.set(".shutter-c", { clipPath: "inset(100% 0 0 0 round 18px)" });
  gsap.set(route, { strokeDashoffset: 980 });

  function setScene(index) {
    copies.forEach((copy, copyIndex) => {
      copy.classList.toggle("is-active", copyIndex === index);
    });
    if (number) number.textContent = String(index + 1).padStart(2, "0");
    director.style.setProperty("--director-bg", colors[index]);
  }

  const state = { scene: 0, progress: 0 };
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: director,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.9,
      pin: ".director-pin",
      anticipatePin: 1,
      onUpdate: self => {
        const nextScene = Math.min(3, Math.floor(self.progress * 4));
        if (nextScene !== state.scene) {
          state.scene = nextScene;
          setScene(nextScene);
        }
        state.progress = Math.round(self.progress * 100);
        if (dialText) dialText.textContent = `${String(state.progress).padStart(2, "0")}%`;
      }
    }
  });

  timeline
    .to(".dial-hand", { rotate: 320, ease: "none" }, 0)
    .to(route, { strokeDashoffset: 0, ease: "none" }, 0)
    .to(".shutter-a", { xPercent: -16, yPercent: -8, rotate: -10, scale: 0.92, ease: "none" }, 0)
    .to(".shutter-b", { clipPath: "inset(0 0% 0 0 round 18px)", xPercent: 8, yPercent: -5, rotate: 9, ease: "none" }, 0.18)
    .to(copies[0], { autoAlpha: 0, y: -26, rotate: 1.5, duration: 0.12 }, 0.2)
    .to(copies[1], { autoAlpha: 1, y: 0, rotate: 0, duration: 0.14 }, 0.23)
    .to(".director-stage", { borderRadius: 44, ease: "none" }, 0.25)
    .to(".shutter-c", { clipPath: "inset(0% 0 0 0 round 18px)", xPercent: -7, yPercent: 10, rotate: -6, ease: "none" }, 0.48)
    .to(copies[1], { autoAlpha: 0, y: -26, rotate: 1.5, duration: 0.12 }, 0.48)
    .to(copies[2], { autoAlpha: 1, y: 0, rotate: 0, duration: 0.14 }, 0.51)
    .to(".motion-route", { scale: 1.22, xPercent: -10, yPercent: -8, ease: "none" }, 0.54)
    .to(".shutter-a img, .shutter-b img, .shutter-c img", { scale: 1, ease: "none" }, 0)
    .to(".shutter-stack", { rotate: 3, scale: 0.88, ease: "none" }, 0.72)
    .to(copies[2], { autoAlpha: 0, y: -26, rotate: 1.5, duration: 0.12 }, 0.72)
    .to(copies[3], { autoAlpha: 1, y: 0, rotate: 0, duration: 0.14 }, 0.75)
    .to(".director-console span", { backgroundColor: "#050509", color: "#fff7df", stagger: 0.03, ease: "none" }, 0.78)
    .to(".director-stage", { rotate: -1.5, scale: 0.96, ease: "none" }, 0.82);
}

document.addEventListener("DOMContentLoaded", setupGsapMotion);
