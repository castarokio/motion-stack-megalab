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

  const proofTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".proof",
      start: "top 82%",
      end: "bottom 28%",
      scrub: 0.85
    }
  });

  proofTl
    .fromTo(".proof-seal",
      { scale: 0.2, rotate: -42, autoAlpha: 0 },
      { scale: 1, rotate: 8, autoAlpha: 1, ease: "none" },
      0
    )
    .fromTo(".proof h2",
      { yPercent: 28, clipPath: "inset(0 0 100% 0)" },
      { yPercent: 0, clipPath: "inset(0 0 0% 0)", ease: "none" },
      0
    )
    .fromTo(".proof-tile",
      {
        y: index => [180, -120, 130, -90][index] || 120,
        x: index => [-90, 70, 110, -60][index] || 0,
        rotate: index => [-12, 9, 14, -9][index] || 0,
        rotateX: index => index % 2 ? -22 : 18,
        opacity: 0,
        clipPath: "inset(42% 22% 42% 22% round 18px)"
      },
      {
        y: 0,
        x: 0,
        rotate: 0,
        rotateX: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0% round 18px)",
        stagger: 0.08,
        ease: "none"
      },
      0.08
    )
    .fromTo(".proof-tile.image-tile img",
      { scale: 1.42, filter: "saturate(1.6) contrast(1.18)" },
      { scale: 1.04, filter: "saturate(1.05) contrast(1)", ease: "none" },
      0.12
    );

  const systemsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".systems",
      start: "top top",
      end: "+=1100",
      scrub: 0.9,
      pin: true,
      anticipatePin: 1
    }
  });

  systemsTl
    .fromTo(".systems-wordmark",
      { xPercent: -8, autoAlpha: 0.25 },
      { xPercent: 8, autoAlpha: 0.62, ease: "none" },
      0
    )
    .fromTo(".systems h2",
      { yPercent: 24, scale: 0.92, opacity: 0.35 },
      { yPercent: 0, scale: 1, opacity: 1, ease: "none" },
      0
    )
    .fromTo(".system-card",
      {
        xPercent: index => [-128, -44, 44, 128][index] || 0,
        y: index => [210, 112, 112, 210][index] || 0,
        rotate: index => [-18, -7, 7, 18][index] || 0,
        rotateY: index => [-28, -12, 12, 28][index] || 0,
        scale: 0.68,
        opacity: 0
      },
      {
        xPercent: 0,
        y: 0,
        rotate: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.06,
        ease: "none"
      },
      0.08
    )
    .to(".system-card", {
      y: index => [-34, 26, -18, 34][index] || 0,
      rotate: index => [-2.2, 1.5, -1.5, 2.2][index] || 0,
      filter: "drop-shadow(0 24px 0 rgba(255, 247, 223, 0.14))",
      stagger: 0.04,
      ease: "none"
    }, 0.62);

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

  const mapSteps = gsap.utils.toArray(".map-step");
  const mapTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".build-map",
      start: "top 80%",
      end: "bottom 30%",
      scrub: 0.8,
      onUpdate: self => {
        const active = Math.min(mapSteps.length - 1, Math.floor(self.progress * mapSteps.length));
        mapSteps.forEach((step, index) => step.classList.toggle("is-current", index === active));
      }
    }
  });

  mapTl
    .fromTo(".map-rail span", { width: "0%" }, { width: "100%", ease: "none" }, 0)
    .fromTo(".map-step",
      {
        y: index => 140 + index * 18,
        rotate: index => [-10, 7, -6, 8, -5][index] || 0,
        rotateX: -28,
        opacity: 0,
        clipPath: "inset(0 0 100% 0 round 18px)"
      },
      {
        y: 0,
        rotate: 0,
        rotateX: 0,
        opacity: 1,
        clipPath: "inset(0 0 0% 0 round 18px)",
        stagger: 0.08,
        ease: "none"
      },
      0.06
    )
    .to(".map-step", {
      y: index => index % 2 ? -22 : 22,
      rotate: index => index % 2 ? 1.6 : -1.6,
      stagger: 0.03,
      ease: "none"
    }, 0.68);
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
