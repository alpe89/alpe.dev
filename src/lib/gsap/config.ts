'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Default easing
export const defaultEase = 'power3.out';

// Animation presets
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, duration: 0.8, ease: defaultEase },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, duration: 0.6, ease: defaultEase },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
};

export const staggerChildren = {
  stagger: 0.1,
  ease: defaultEase,
};

// ScrollTrigger defaults
export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
};

// Create a scroll-triggered animation
export function createScrollAnimation(
  element: string | Element,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      ...scrollTriggerDefaults,
      ...triggerOptions,
    },
  });
}

// Text reveal animation (character by character)
export function createTextReveal(
  element: HTMLElement,
  options?: {
    duration?: number;
    stagger?: number;
    delay?: number;
  }
) {
  const text = element.textContent || '';
  element.innerHTML = '';

  const chars = text.split('').map((char) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    span.textContent = char === ' ' ? '\u00A0' : char;
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: options?.duration || 0.05,
    stagger: options?.stagger || 0.03,
    delay: options?.delay || 0,
    ease: 'power2.out',
  });
}

export { gsap, ScrollTrigger };
