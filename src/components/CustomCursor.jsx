import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Dot follows instantly
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isVisible.current = false;
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isVisible.current = true;
    };

    // Ring follows with lerp
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.11;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.11;
      ring.style.transform = `translate(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%))`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onInteractEnter = () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('ring-hover');
    };

    const onInteractLeave = () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('ring-hover');
    };

    // Attach hover detection to interactive elements
    const attachListeners = () => {
      document.querySelectorAll('a, button, .service-card-3d, .team-card, .social-link').forEach(el => {
        el.removeEventListener('mouseenter', onInteractEnter);
        el.removeEventListener('mouseleave', onInteractLeave);
        el.addEventListener('mouseenter', onInteractEnter);
        el.addEventListener('mouseleave', onInteractLeave);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafRef.current = requestAnimationFrame(animate);

    attachListeners();

    // Watch for dynamic DOM changes
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99998 }}
      />
    </>
  );
};

export default CustomCursor;
