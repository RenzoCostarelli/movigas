## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

**never** use :any for typing

- All components should go inside /components folder
- All types/interfaces must be inside /types folder
- Use pnpm never npm
- imports for gsap and gsap plugins ar in lib/gsap.ts

## GSAP conventions

- Always import `gsap`, `ScrollTrigger`, and `SplitText` from `lib/gsap.ts` — never directly from the `gsap` package.
- Define the timeline separately from the ScrollTrigger. The timeline must be `paused: true`.
- Pass the timeline to `ScrollTrigger.create()` via the `animation` property.
- Always use `scrub: true` in `ScrollTrigger.create()`.

```ts
const tl = gsap.timeline({ paused: true });

tl.to(element, { ... });

ScrollTrigger.create({
  trigger: element,
  start: "top 80%",
  end: "bottom 20%",
  animation: tl,
  scrub: true,
});
```
