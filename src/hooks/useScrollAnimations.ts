import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      // ═══════════════════════════════════════════
      // 1. HERO — Dashboard parallax (deeper effect)
      // ═══════════════════════════════════════════
      const dashboardEl = document.querySelector("[data-gsap='hero-dashboard']");
      if (dashboardEl) {
        gsap.to(dashboardEl, {
          y: 120,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: dashboardEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Text reveals are now handled by the <TextReveal> React component

      // ═══════════════════════════════════════════
      // 3. PROBLEM CARDS — Reveal from left with stagger
      // ═══════════════════════════════════════════
      const problemCards = document.querySelectorAll("[data-gsap='problem-card']");
      if (problemCards.length) {
        gsap.fromTo(
          problemCards,
          { x: -80, opacity: 0, rotateY: -15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: problemCards[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ═══════════════════════════════════════════
      // 4. SOLUTION CARDS — Reveal from right with stagger
      // ═══════════════════════════════════════════
      const solutionCards = document.querySelectorAll("[data-gsap='solution-card']");
      if (solutionCards.length) {
        gsap.fromTo(
          solutionCards,
          { x: 80, opacity: 0, rotateY: 15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: solutionCards[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ═══════════════════════════════════════════
      // 5. PREVENTA CARD — Scale-in with bounce
      // ═══════════════════════════════════════════
      const preventaCard = document.querySelector("[data-gsap='preventa-card']");
      if (preventaCard) {
        gsap.fromTo(
          preventaCard,
          { scale: 0.85, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: preventaCard,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ═══════════════════════════════════════════
      // 6. PINNED CTA SECTION — Pin while scrolling
      // ═══════════════════════════════════════════
      const ctaSection = document.querySelector("[data-gsap='cta-pin']");
      if (ctaSection) {
        const ctaContent = ctaSection.querySelector("[data-gsap='cta-content']");
        
        if (ctaContent) {
          gsap.fromTo(
            ctaContent,
            { scale: 0.9, opacity: 0, y: 60 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ctaSection,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // ═══════════════════════════════════════════
      // 7. PARALLAX BACKGROUNDS — Subtle depth effect
      // ═══════════════════════════════════════════
      const parallaxBgs = document.querySelectorAll("[data-gsap='parallax-bg']");
      parallaxBgs.forEach((bg) => {
        gsap.to(bg, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      // ═══════════════════════════════════════════
      // 8. SECTION DIVIDERS — Horizontal line animations
      // ═══════════════════════════════════════════
      const sectionHeaders = document.querySelectorAll("[data-gsap='section-header']");
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ═══════════════════════════════════════════
      // 9. BENEFIT ITEMS — Stagger fade in
      // ═══════════════════════════════════════════
      const benefitItems = document.querySelectorAll("[data-gsap='benefit-item']");
      if (benefitItems.length) {
        gsap.fromTo(
          benefitItems,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: benefitItems[0],
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ═══════════════════════════════════════════
      // 10. TESTIMONIAL CARDS — Stagger reveal
      // ═══════════════════════════════════════════
      const testimonialCards = document.querySelectorAll("[data-gsap='testimonial-card']");
      if (testimonialCards.length) {
        gsap.fromTo(
          testimonialCards,
          { y: 60, opacity: 0, scale: 0.9, rotateX: -10 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: testimonialCards[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Testimonial main quote — cinematic scale
      const testimonialQuote = document.querySelector("[data-gsap='testimonial-quote']");
      if (testimonialQuote) {
        gsap.fromTo(
          testimonialQuote,
          { scale: 0.8, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialQuote,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

    }, 100);

    return () => {
      clearTimeout(initTimeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};
