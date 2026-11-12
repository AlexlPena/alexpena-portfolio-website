import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function usePageMotion(root) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({desktop: '(min-width: 800px)', mobile: '(max-width: 799px)', reduce: '(prefers-reduced-motion: reduce)'}, context => {
      if (context.conditions.reduce) return;
      const desktop = context.conditions.desktop;
      const select = gsap.utils.selector(root);
      const entrances = [];
      const enter = (target, from = {}, trigger = target, delay = 0) => {
        const tween = gsap.fromTo(target, {
          y: desktop ? 90 : 44, x: 0, opacity: 0, scale: 1,
          rotation: 0, rotationX: 0, transformPerspective: 1100, ...from,
        }, {
          x: 0, y: 0, opacity: 1, scale: 1, rotation: 0, rotationX: 0,
          duration: desktop ? 1.25 : 0.85, delay, ease: 'power3.out',
          scrollTrigger: {trigger, start: 'clamp(top 88%)', toggleActions: 'play none none reverse'},
        });
        entrances.push({target, tween});
      };

      // The existing hero owns its cube and opening animation.
      select('.studio-about > div').forEach((el, i) => enter(el, {x: desktop ? (i === 0 ? -90 : 70) : 0}, el, desktop ? i * 0.18 : 0));
      select('.studio-section-top').forEach(el => enter(el, {y: desktop ? 75 : 40, rotationX: desktop ? -12 : 0}));

      select('.studio-service-grid article').forEach((card, i) => {
        const art = card.querySelector('.service-artwork');
        enter(art, {scale: desktop ? 0.78 : 0.88, y: desktop ? 110 : 55, rotation: desktop ? (i - 1) * 5 : 0}, card, desktop ? i * 0.18 : 0);
        if (desktop) {
          gsap.fromTo(art.querySelector('img'), {y: 30, scale: 0.9, rotation: (i - 1) * 4}, {
            y: -24, scale: 1.08, rotation: 0, ease: 'none',
            scrollTrigger: {trigger: art, start: 'top bottom', end: 'bottom 15%', scrub: 0.6},
          });
        }
      });
      const tools = select('.studio-tools > div span');
      tools.forEach((el, i) => enter(el, {y: 30, scale: 0.85}, el, desktop ? i * 0.07 : 0));

      select('.studio-workbench').forEach(el => enter(el, {y: desktop ? 120 : 50, scale: desktop ? 0.88 : 0.95, rotationX: desktop ? 10 : 0}));
      select('.training-copy, .prompt-workshop').forEach((el, i) => enter(el, {x: desktop ? (i ? 100 : -80) : 0, y: desktop ? 45 : 45, rotation: desktop && i ? 3 : 0}));
      select('.training-topics span').forEach((el, i) => enter(el, {y: 28, scale: 0.85}, el, i * 0.06));
      select('.oversight-copy, .oversight-demo').forEach((el, i) => enter(el, {y: desktop ? (i ? 100 : 65) : 45, scale: i ? 0.92 : 1, rotation: desktop && i ? -3 : 0}));
      select('.oversight-copy li').forEach((el, i) => enter(el, {x: desktop ? 45 : 24, y: 0}, el, i * 0.08));

      select('.process-steps article').forEach((el, i) => {
        enter(el, {y: desktop ? 90 : 50, scale: 0.92}, el, desktop ? i * 0.22 : 0);
        gsap.fromTo(el, {'--step-progress': 0}, {
          '--step-progress': 1, ease: 'none',
          scrollTrigger: {trigger: el, start: 'top 88%', end: 'top 50%', scrub: desktop ? 0.5 : true},
        });
      });
      select('.contact-heading, .contact-copy').forEach((el, i) => enter(el, {y: desktop ? 85 : 45, scale: 0.95}, el, desktop ? i * 0.15 : 0));
      select('.studio-footer').forEach(el => enter(el, {y: 40, opacity: 0}));

      // Keyboard navigation should never wait for an entrance to finish.
      const focus = event => entrances.forEach(({target, tween}) => {
        if (target.contains(event.target)) tween.progress(1);
      });
      root.current.addEventListener('focusin', focus);
      return () => root.current?.removeEventListener('focusin', focus);
    });

    // Refresh after fonts, image loads, or expanding interactive content.
    let disposed = false;
    let frame;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); });
    };
    document.fonts.ready.then(() => { if (!disposed) refresh(); });
    const observer = new ResizeObserver(refresh);
    observer.observe(root.current);
    root.current.addEventListener('load', refresh, true);
    const element = root.current;
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener('load', refresh, true);
      mm.revert();
    };
  }, {scope: root});
}
