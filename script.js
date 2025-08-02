import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const initTextSplit = () => {
    const textElements = document.querySelectorAll(".col-3 h1 .col-3 p");

    textElements.forEach((el) => {
      const split = new SplitText(el, { type: "lines", linesClass: "line" });
      split.lines.forEach((line) => {
        line.innerHTML = `<span>${line.textContent}</span>`;
      });
    });
  };

  initTextSplit();
  
  
  gsap.set(".col-3 .col-content-wrapper .line span", { y: "0%" });
  gsap.set(".col-3 .col-content-wrapper-2 .line span", { y: "125%" });

let currentPhase =0


});
