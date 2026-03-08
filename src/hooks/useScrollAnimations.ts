import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Hero dashboard parallax
    const dashboardEl = document.querySelector("[data-gsap='hero-dashboard']");
    if (dashboardEl) {
      gsap.to(dashboardEl, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: dashboardEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Problem cards — reveal from left with stagger
    const problemCards = document.querySelectorAll("[data-gsap='problem-card']");
    if (problemCards.length) {
      gsap.fromTo(
        problemCards,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: problemCards[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Solution cards — reveal from right with stagger
    const solutionCards = document.querySelectorAll("[data-gsap='solution-card']");
    if (solutionCards.length) {
      gsap.fromTo(
        solutionCards,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: solutionCards[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Preventa section — scale-in pricing card
    const preventaCard = document.querySelector("[data-gsap='preventa-card']");
    if (preventaCard) {
      gsap.fromTo(
        preventaCard,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: preventaCard,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Section headers — text reveal
    const sectionHeaders = document.querySelectorAll("[data-gsap='section-header']");
    sectionHeaders.forEach((header) => {
      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};
