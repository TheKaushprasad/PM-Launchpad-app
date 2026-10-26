import { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '../../lib/gsap';

// The landing page's numbered path: as the visitor scrolls, a green line fills down the rail and each
// step number turns green when the line reaches it (and back again on the way up), so the motion shows
// progress along the path. The line's tip follows a fixed reading line part way down the screen.
//
// Markup inside the root:
//   [data-path-step]     one per step (the <li>)
//   [data-path-number]   the step number; data-reached="true" shows it filled
//   [data-path-fill]     the green line under the number, starting at scaleY(0) in CSS
//
// With reduced motion (or no JavaScript) none of this runs: the rail stays grey and step 1 stays filled.

const READING_LINE = 'top 58%';

export function usePathProgress(rootRef: RefObject<HTMLElement>) {
    useGSAP(() => {
        const root = rootRef.current;
        if (!root) return;
        const mm = gsap.matchMedia();

        mm.add(MOTION_OK, () => {
            const steps = gsap.utils.toArray<HTMLElement>('[data-path-step]', root);
            const numbers = steps.map((step) => step.querySelector<HTMLElement>('[data-path-number]'));
            const initial = numbers.map((n) => n?.dataset.reached);

            const setReached = (n: HTMLElement | null, reached: boolean) => {
                if (!n || (n.dataset.reached === 'true') === reached) return;
                n.dataset.reached = reached ? 'true' : 'false';
                // A small settle confirms the step; colour does the rest through the CSS transition.
                if (reached) gsap.fromTo(n, { scale: 0.86 }, { scale: 1, duration: 0.3, ease: 'expo.out', clearProps: 'scale' });
            };

            steps.forEach((step, i) => {
                const number = numbers[i];
                const fill = step.querySelector<HTMLElement>('[data-path-fill]');
                // Every step, the first included, earns its colour when the reader gets there.
                if (number) number.dataset.reached = 'false';

                ScrollTrigger.create({
                    trigger: step,
                    start: READING_LINE,
                    onEnter: () => setReached(number, true),
                    onLeaveBack: () => setReached(number, false),
                });

                if (fill) {
                    gsap.fromTo(fill, { scaleY: 0 }, {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: { trigger: step, start: READING_LINE, end: 'bottom 58%', scrub: 0.3 },
                    });
                }
            });

            // A visitor who lands lower on the page (refresh, anchor link) sees the steps above already reached.
            ScrollTrigger.refresh();
            steps.forEach((step, i) => {
                if (step.getBoundingClientRect().top < window.innerHeight * 0.58) setReached(numbers[i], true);
            });

            return () => {
                // Put the static look back (step 1 filled) if motion preferences change mid-visit.
                numbers.forEach((n, i) => { if (n) n.dataset.reached = initial[i] ?? 'false'; });
            };
        });

        return () => mm.revert();
    }, { scope: rootRef });
}
