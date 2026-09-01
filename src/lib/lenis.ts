import Lenis from "lenis";

export function initLenis() {
  // Prevent browser from restoring previous scroll position on load
  history.scrollRestoration = "manual";

  const lenis = new Lenis();

  // Force scroll to top immediately on init (no animation)
  lenis.scrollTo(0, { immediate: true });

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
