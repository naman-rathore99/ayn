import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Split text into lines for animation
  const initTextSplit = () => {
    const textElements = document.querySelectorAll(".col-3 h1, .col-3 p");
    textElements.forEach((element) => {
      const split = new SplitText(element, {
        type: "lines",
        linesClass: "line",
      });

      split.lines.forEach((line) => {
        line.innerHTML = `<span>${line.textContent}</span>`;
      });
    });
  };

  initTextSplit();

  // Set initial animation state
  gsap.set(".col-3 .col-content-wrapper, .line span", { y: "0%" });
  gsap.set(".col-3 .col-content-wrapper-2, .line span", { y: "-125%" });

  let currentPhrase = 0;

  // Scroll-triggered animation
  ScrollTrigger.create({
    trigger: ".sticky-cols",
    start: "top top",
    end: `+=${window.innerHeight * 5}px`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      const progress = self.progress;

      if (progress > 0.25 && currentPhrase === 0) {
        currentPhrase = 1;

        gsap.to(".col-1", {
          opacity: 0,
          scale: 0.75,
          duration: 0.75,
        });

        gsap.to(".col-2", {
          x: "0%",
          duration: 0.75,
        });

        gsap.to(".col-3", {
          y: "0%",
          duration: 0.75,
        });

        gsap.to(".col-img-1 img", {
          scale: 1.25,
          duration: 0.75,
        });

        gsap.to(".col-img-2", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
        });

        gsap.to(".col-img-2 img", {
          scale: 1,
          duration: 0.75,
        });
      }
    },
  });
});
