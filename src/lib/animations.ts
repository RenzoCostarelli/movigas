import { gsap, SplitText } from "./gsap";

interface HeadingAnimationOptions {
  stagger?: number;
  position?: string | number;
}

export function animateHeading(
  el: HTMLElement,
  timeline: gsap.core.Timeline,
  options: HeadingAnimationOptions = {},
): SplitText {
  const split = new SplitText(el, { type: "chars" });
  gsap.set(split.chars, { fontWeight: 100 });
  timeline.to(
    split.chars,
    {
      fontWeight: 900,
      duration: 0.8,
      stagger: options.stagger ?? 0.03,
      ease: "power2.inOut",
    },
    options.position,
  );
  return split;
}
