'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onFinish }) {
  const splashRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    gsap.to(splashRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 2,
      delay: 1,
      ease: "power3.inOut",
      onComplete: () => {
        setHidden(true); // only hide from DOM after animation
        if (onFinish) onFinish();
      }
    });
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div ref={splashRef} className="splash-screen">
      <style jsx>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: black url('/splash.png') center/cover no-repeat;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none; /* allow content to be interactive after fade */
        }
      `}</style>
    </div>
  );
}
