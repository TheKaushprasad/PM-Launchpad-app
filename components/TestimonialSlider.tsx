import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2, MessageSquare } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sanskruti Palekar",
    role: "Business Analyst",
    company: "Micron Industries",
    quote: "Very helpful website",
    initials: "SP",
    avatarColor: "bg-[#EEF2FF] text-[#4338CA] border-[#E2E8F0]"
  },
  {
    name: "Srijita Chatterjee",
    role: "AI Product Manager",
    company: "Travelved",
    quote: "Best website to prepare for PM roles.",
    initials: "SC",
    avatarColor: "bg-[#F0F9FF] text-[#0EA5E9] border-[#E2E8F0]"
  },
  {
    name: "Neeraj Gupta",
    role: "Business Delivery Executive",
    company: "IDfy",
    quote: "Extremely valuable and goldmines for aspiring Product Managers",
    initials: "NG",
    avatarColor: "bg-[#ECFDF5] text-[#10B981] border-[#E2E8F0]"
  },
  {
    name: "Rachana Tripathi",
    role: "Product Manager",
    company: "Repro India Limited",
    quote: "This stuff is actually cool !",
    initials: "RT",
    avatarColor: "bg-[#EEF2FF] text-[#4338CA] border-[#E2E8F0]"
  },
  {
    name: "Dimpal Dewasi",
    role: "Product Management Trainee",
    company: "Airpay",
    quote: "Amazing Resource",
    initials: "DD",
    avatarColor: "bg-[#F0F9FF] text-[#0EA5E9] border-[#E2E8F0]"
  },
  {
    name: "Crystal King",
    role: "Founder",
    company: "Drama Land",
    quote: "The Strategy and data part of the course is amazing",
    initials: "CK",
    avatarColor: "bg-[#ECFDF5] text-[#10B981] border-[#E2E8F0]"
  },
  {
    name: "Kunal Chaudhary",
    role: "Co-Founder",
    company: "Krishi Culture",
    quote: "From starting to ending course cover all the things a PM should know and help them to improve their skills",
    initials: "KC",
    avatarColor: "bg-[#EEF2FF] text-[#4338CA] border-[#E2E8F0]"
  }
];

// Triplicate the cards array for seamless infinite marquee wrapping
const marqueeCards = [...testimonials, ...testimonials, ...testimonials];

export const TestimonialSlider: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Marquee physics & positioning refs (using refs avoids re-renders on every animation frame)
  const offsetRef = useRef<number>(0);
  const targetDeltaRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragPrevXRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);
  const cardStepRef = useRef<number>(355);
  const animFrameIdRef = useRef<number | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Measure card width and calculate the exact width of 1 complete set of cards
  const measureDimensions = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.children[0] as HTMLElement | undefined;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 20; // gap-5 = 20px
    const step = cardWidth + gap;
    cardStepRef.current = step;
    singleSetWidthRef.current = step * testimonials.length;
  }, []);

  useEffect(() => {
    measureDimensions();
    window.addEventListener('resize', measureDimensions);
    return () => window.removeEventListener('resize', measureDimensions);
  }, [measureDimensions]);

  // Continuous Marquee Animation Loop via requestAnimationFrame
  useEffect(() => {
    if (reducedMotion) return;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // in seconds, capped to avoid huge jumps
      lastTime = currentTime;

      const singleSetWidth = singleSetWidthRef.current || 2500;

      // Base marquee speed: ~38 pixels per second for an elegant, comfortable reading pace
      const baseSpeed = isPausedRef.current || isDraggingRef.current ? 0 : 38;

      // Apply continuous drift
      offsetRef.current += baseSpeed * deltaTime;

      // Apply smooth interactive nudges (e.g. from arrow buttons)
      if (Math.abs(targetDeltaRef.current) > 0.1) {
        const step = targetDeltaRef.current * 0.14;
        offsetRef.current += step;
        targetDeltaRef.current -= step;
      } else {
        targetDeltaRef.current = 0;
      }

      // Seamless infinite wrap-around
      if (offsetRef.current >= singleSetWidth) {
        offsetRef.current -= singleSetWidth;
      } else if (offsetRef.current < 0) {
        offsetRef.current += singleSetWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [reducedMotion]);

  // Interactive controls: nudge forward or backward smoothly
  const nudge = (direction: 'next' | 'prev') => {
    const step = cardStepRef.current || 355;
    targetDeltaRef.current += direction === 'next' ? step : -step;
  };

  // Touch and drag handling for mobile and desktop dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragPrevXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.touches[0].clientX;
    const delta = dragPrevXRef.current - currentX;
    dragPrevXRef.current = currentX;
    offsetRef.current += delta;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nudge('prev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nudge('next');
    }
  };

  return (
    <section 
      id="testimonials"
      className="py-8 sm:py-10 bg-[#F8FAFC] border-y border-[#E2E8F0] overflow-hidden select-none"
      aria-label="Testimonials"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row: Eyebrow + Navigation Buttons aligned horizontally */}
        <div className="flex items-center justify-between gap-4 mb-2 sm:mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#E2E8F0] text-[#4338CA] text-[10px] font-black uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" /> What PMs Are Saying
          </div>

          {/* Controls: navigation buttons aligned on the same row */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => nudge('prev')}
              aria-label="Nudge testimonials backward"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2E8F0] bg-white hover:bg-slate-50 hover:border-[#4338CA] text-[#334155] hover:text-[#4338CA] flex items-center justify-center transition-all shadow-xs active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4338CA]/30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nudge('next')}
              aria-label="Nudge testimonials forward"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2E8F0] bg-white hover:bg-slate-50 hover:border-[#4338CA] text-[#334155] hover:text-[#4338CA] flex items-center justify-center transition-all shadow-xs active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4338CA]/30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Heading & Description: Tight margin connecting to the marquee */}
        <div className="max-w-2xl text-left mb-4 sm:mb-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-1 sm:mb-1.5">
            Built by PMs.{' '}
            <span className="text-[#4338CA]">
              Loved by learners.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
            Real feedback from aspiring and working product professionals using The Noob PM.
          </p>
        </div>

        {/* Marquee Track Container with Smooth Edge Gradients */}
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle edge fades for smooth marquee entry and exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 sm:w-20 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 sm:w-20 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-10" />

          {/* Continuously gliding marquee track */}
          <div
            ref={trackRef}
            className="flex gap-5 py-2.5 will-change-transform"
          >
            {marqueeCards.map((t, idx) => (
              <div
                key={idx}
                className="w-[82vw] sm:w-[320px] md:w-[335px] shrink-0 bg-white border border-[#E2E8F0] hover:border-[#4338CA]/40 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-default"
                style={{ minHeight: '215px' }}
              >
                <div>
                  {/* Top Bar: 5 Stars + Subtle Quote Icon */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" 
                        />
                      ))}
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] border border-[#E2E8F0] flex items-center justify-center text-[#4338CA] group-hover:bg-[#4338CA] group-hover:text-white transition-colors">
                      <Quote className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="min-h-[52px] flex items-center">
                    <p className="text-[14px] sm:text-[15px] font-medium text-[#0F172A] leading-snug sm:leading-relaxed">
                      “{t.quote.replace(/^[“"]|[”"]$/g, '')}”
                    </p>
                  </div>
                </div>

                {/* Author Area */}
                <div className="pt-3.5 mt-4 border-t border-[#E2E8F0] flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full border ${t.avatarColor} font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#0F172A] truncate">
                        {t.name}
                      </span>
                      <span title="Verified Learner" className="inline-flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4338CA] shrink-0" />
                      </span>
                    </div>
                    <div className="text-xs text-[#64748B] font-medium truncate leading-tight mt-0.5">
                      {t.role} · <span className="text-[#475569] font-semibold">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
