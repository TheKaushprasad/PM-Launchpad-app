import { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '../../lib/gsap';

// Scroll reveals for any page, driven by data attributes so pages only mark what should animate:
//   data-reveal          the element fades and rises in when it scrolls into view
//   data-reveal-stagger  its direct children do the same, one after another (card grids, lists)
// Elements that already animate with Motion (motion.div etc.) should not carry these, so nothing animates twice.
// Content that appears later (after data loads, or on a tab switch) is picked up automatically.
// With reduced motion on, nothing is hidden or moved.

const REVEAL = '[data-reveal]';
const STAGGER = '[data-reveal-stagger]';
const DONE = 'revealDone';

export function useScrollReveal(
    rootRef: RefObject<HTMLElement>,
    // scrollerRef: the scrolling element, when the page scrolls inside a box rather than the window.
    // resetKey: start over when it changes (a new route), so finished pages leave nothing behind.
    options: { scrollerRef?: RefObject<HTMLElement>; resetKey?: string } = {},
) {
    useGSAP(() => {
        const root = rootRef.current;
        if (!root) return;
        const mm = gsap.matchMedia();

        mm.add(MOTION_OK, (context) => {
            const scroller = options.scrollerRef?.current ?? undefined;

            const reveal = (trigger: Element, targets: Element[], stagger = 0) => {
                // transition: none stops Tailwind transition classes (transition-all) from fighting the tween.
                gsap.set(targets, { autoAlpha: 0, y: 18, transition: 'none' });
                ScrollTrigger.create({
                    trigger,
                    scroller,
                    start: 'top 92%',
                    once: true,
                    onEnter: () => gsap.to(targets, {
                        autoAlpha: 1,
                        y: 0,
                        stagger,
                        // Leave no transform behind: it would break position: fixed popups inside the element.
                        clearProps: 'transform,opacity,visibility,transition',
                    }),
                });
            };

            const scan = () => {
                let found = false;
                const fresh = (selector: string) =>
                    gsap.utils.toArray<HTMLElement>(selector, root).filter((el) => {
                        if (el.dataset[DONE]) return false;
                        el.dataset[DONE] = '1';
                        found = true;
                        return true;
                    });
                fresh(REVEAL).forEach((el) => reveal(el, [el]));
                fresh(STAGGER).forEach((group) => {
                    const items = Array.from(group.children);
                    if (items.length) reveal(group, items, 0.06);
                });
                return found;
            };
            scan();

            // Pick up content rendered after the first paint, and keep trigger positions right as the page grows or shrinks.
            let frame = 0;
            let resized = false;
            const schedule = (resize: boolean) => {
                resized ||= resize;
                cancelAnimationFrame(frame);
                frame = requestAnimationFrame(() => {
                    let found = false;
                    context.add(() => { found = scan(); });
                    if (found || resized) ScrollTrigger.refresh();
                    resized = false;
                });
            };
            const mutations = new MutationObserver(() => schedule(false));
            mutations.observe(root, { childList: true, subtree: true });
            const resizes = new ResizeObserver(() => schedule(true));
            resizes.observe(root);

            return () => {
                cancelAnimationFrame(frame);
                mutations.disconnect();
                resizes.disconnect();
                gsap.utils.toArray<HTMLElement>(`${REVEAL}, ${STAGGER}`, root).forEach((el) => delete el.dataset[DONE]);
            };
        });

        return () => mm.revert();
    }, { scope: rootRef, dependencies: [options.resetKey], revertOnUpdate: true });
}
