import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const spot = spotRef.current;
    const wrap = wrapRef.current;
    if (!spot || !wrap) return;

    const move = (e) => {
      wrap.style.opacity = '1';
      spot.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };
    const leave = () => { wrap.style.opacity = '0'; };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
      style={{ opacity: 0 }}
    >
      <div
        ref={spotRef}
        className="absolute w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,170,0.04) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
