import Lenis from "lenis";

function getScrollOffset() {
  const header = document.querySelector("[data-navbar]") as HTMLElement | null;
  return header ? -(header.offsetHeight + 16) : -16;
}

export function initLenis() {
  // Prevent browser from restoring previous scroll position on load
  history.scrollRestoration = "manual";

  const offset = getScrollOffset();
  const lenis = new Lenis({ anchors: { offset } });

  // Respect a hash already in the URL (e.g. arriving from "/#servicios"),
  // otherwise force scroll to top immediately (no animation)
  const hashTarget = window.location.hash
    ? document.querySelector(window.location.hash)
    : null;

  if (hashTarget) {
    lenis.scrollTo(hashTarget as HTMLElement, { immediate: true, offset });
  } else {
    lenis.scrollTo(0, { immediate: true });
  }

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
