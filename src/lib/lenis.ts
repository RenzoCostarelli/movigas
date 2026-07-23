import Lenis from "lenis";

export function initLenis() {
  const lenis = new Lenis();

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  if (document.getElementById("loader")) {
    lenis.stop();
  }

  window.addEventListener("loader:done", () => {
    lenis.start();
  });

  document.addEventListener("astro:after-swap", () => {
    lenis.scrollTo(0, { immediate: true });
  });

  return lenis;
}
