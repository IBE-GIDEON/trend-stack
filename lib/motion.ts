import type { Variants, Transition } from "framer-motion";

/**
 * Centralised motion language. Every reveal in the product pulls from here so
 * the easing feels like one hand designed it — Apple-style expressive curves,
 * never bouncy, GPU-friendly (opacity + transform only).
 */

export const EASE_APPLE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const transitionBase: Transition = {
  duration: 0.7,
  ease: EASE_APPLE,
};

/** Single element rising into place. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: transitionBase },
};

/** Softer variant for large hero type. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE_APPLE } },
};

/** Parent that staggers its children's reveals. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Child used inside a staggerParent. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: transitionBase },
};

/** Default viewport config for scroll reveals — fire once, a bit early. */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
