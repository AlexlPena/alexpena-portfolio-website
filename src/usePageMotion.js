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
        const tween = gsap.from(target, {
          y: desktop ? 28 : 14, opacity: 0.25, ...from,
          duration: desktop ? 0.85 : 0.55, delay, ease: 'power3.out',
          scrollTrigger: {trigger, start: 'top 92%', once: true},
          clearProps: 'transform,opacity',
        });
        entrances.push({target, tween});
      };

      // The existing hero owns its cube and opening animation.
      select('.studio-about > div').forEach((el, i) => enter(el, {x: desktop && i === 0 ? -18 : 0}, el, desktop ? i * 0.1 : 0));
      select('.studio-section-top').forEach(el => enter(el, {y: desktop ? 22 : 12}));

      select('.studio-service-grid article').forEach((card, i) => {
        const art = card.querySelector('.service-artwork');
        enter(art, {scale: 0.94, y: desktop ? 35 : 18}, card, desktop ? i * 0.1 : 0);
        if (desktop) {
          gsap.fromTo(art.querySelector('img'), {y: 10, rotation: i === 1 ? 0 : (i === 0 ? -1.5 : 1.5)}, {
            y: -7, rotation: 0, ease: 'none',
            scrollTrigger: {trigger: art, start: 'top bottom', end: 'bottom 15%', scrub: 0.6},
          });
        }
      });
      const tools = select('.studio-tools > div span');
      tools.forEach((el, i) => enter(el, {y: 10}, el, desktop ? i * 0.035 : 0));

      select('.studio-workbench').forEach(el => enter(el, {y: desktop ? 40 : 16, scale: desktop ? 0.985 : 1}));
      select('.training-copy, .prompt-workshop').forEach((el, i) => enter(el, {x: desktop ? (i ? 24 : -24) : 0, y: desktop ? 0 : 16}));
      select('.training-topics span').forEach((el, i) => enter(el, {y: 8}, el, i * 0.06));
      select('.oversight-copy, .oversight-demo').forEach((el, i) => enter(el, {y: desktop ? (i ? 36 : 18) : 16}));
      select('.oversight-copy li').forEach((el, i) => enter(el, {x: 12, y: 0}, el, i * 0.08));

      select('.process-steps article').forEach((el, i) => {
        enter(el, {y: desktop ? 26 : 14}, el, desktop ? i * 0.14 : 0);
        gsap.fromTo(el, {'--step-progress': 0}, {
          '--step-progress': 1, ease: 'none',
          scrollTrigger: {trigger: el, start: 'top 88%', end: 'top 50%', scrub: desktop ? 0.5 : true},
        });
      });
      select('.contact-heading, .contact-copy').forEach((el, i) => enter(el, {y: 20}, el, desktop ? i * 0.15 : 0));
      select('.studio-footer').forEach(el => enter(el, {y: 10, opacity: 0.6}));

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
