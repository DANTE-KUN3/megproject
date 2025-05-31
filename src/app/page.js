'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import SplashScreen from './splash/page';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const headingRef = useRef(null);
  const charsRef = useRef([]);
  const charIndexRef = useRef(0);
  const charHRef = useRef(0);
  const isMouseDownRef = useRef(false);
  const mouseYRef = useRef({ initial: 0, final: 0 });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) return;
    gsap.registerPlugin(SplitText);


    const split = new SplitText(headingRef.current, { type: 'chars' });
    const chars = split.chars;
    charsRef.current = chars;

    const weightInit = 600;
    const weightTarget = 400;
    const stretchInit = 150;
    const stretchTarget = 80;
    const weightDiff = weightInit - weightTarget;
    const stretchDiff = stretchInit - stretchTarget;
    const maxYScale = 2.5;

    function calcDispersion(index) {
      const dispersion = 1 - Math.abs(index - charIndexRef.current) / (chars.length * 0.8);
      const distY = mouseYRef.current.initial - mouseYRef.current.final;
      const maxYDrag = charHRef.current * (maxYScale - 1);
      const dragScale = Math.max(-0.5, Math.min((distY / maxYDrag), maxYScale - 1));
      return dispersion * dragScale;
    }

    function snapBack() {
      gsap.to(chars, {
        y: 0,
        fontWeight: weightInit,
        fontStretch: stretchInit,
        scaleY: 1,
        ease: 'elastic(0.35, 0.1)',
        duration: 1,
        stagger: {
          each: 0.02,
          from: charIndexRef.current
        }
      });
    }

    function onMouseMove(e) {
      if (!isMouseDownRef.current) return;
      mouseYRef.current.final = e.clientY;

      gsap.to(chars, {
        y: (i) => calcDispersion(i) * -50,
        fontWeight: (i) => weightInit - (calcDispersion(i) * weightDiff),
        fontStretch: (i) => stretchInit - (calcDispersion(i) * stretchDiff),
        scaleY: (i) => Math.max(0.5, 1 + calcDispersion(i)),
        ease: 'power4',
        duration: 0.6
      });
    }

    function onMouseUp() {
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        snapBack();
        document.body.classList.remove('grab');
      }
    }

    function onMouseLeave(e) {
      if (
        e.clientY <= 0 || e.clientX <= 0 ||
        e.clientX >= window.innerWidth || e.clientY >= window.innerHeight
      ) {
        snapBack();
        isMouseDownRef.current = false;
      }
    }

    function resize() {
      charHRef.current = headingRef.current.offsetHeight;
    }

    // Animate in
   // After SplitText is applied
gsap.set(headingRef.current, { opacity: 1 }); // Reveal text container
gsap.from(chars, {
  y: -200,
  fontWeight: weightTarget,
  fontStretch: stretchTarget,
  scaleY: 2,
  ease: "elastic(0.2, 0.1)",
  duration: 1.5,
  delay: 0.5,
  stagger: { each: 0.05, from: 'random' }
});


    // Add mousedown listeners
    chars.forEach((char, index) => {
      char.addEventListener('mousedown', (e) => {
        mouseYRef.current.initial = e.clientY;
        charIndexRef.current = index;
        isMouseDownRef.current = true;
        document.body.classList.add('grab');
      });
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', resize);
    window.addEventListener('mouseleave', onMouseLeave);

    resize();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mouseleave', onMouseLeave);
      split.revert();
    };
  }, [showSplash]);

  return (
    <>
   <SplashScreen onFinish={() => setShowSplash(false)} />
   <main className="min-h-screen p-10 bg-gray-900 text-black bg-[url(/bg.png)] bg-cover bg-center">

   <h1
  ref={headingRef}
  className="text-4xl font-bold mb-10 text-center new opacity-0"
>
  Educate Me
</h1>


  
<div className="flex flex-wrap gap-12 justify-center ">


  {/* Card 1 */}
  <Link href="/age/ten" className='block' >
<div className="card bg-base-200 w-96 shadow-md border-dashed  shadow-blue-900 transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer ">
  <figure>
    <img src="/newcard.jpeg" alt="5–10 years" />
  </figure>
  <div className="card-body">
    <div className="badge badge-accent">5–10 years</div>
    <p id="p" className="text-black mt-2">
      Foundational lessons in safety, hygiene, and boundaries for young children.
    </p>
    <div className="card-actions mt-4 justify-center flex-wrap gap-2 ">
      <div className="badge badge-soft badge-primary ">Body Basics</div>
      <div className="badge badge-soft badge-primary">Good/Bad Touch</div>
      <div className="badge badge-soft badge-primary">Hygiene</div>
      <div className="badge badge-soft badge-primary">Consent</div>
      <div className="badge badge-soft badge-primary">Stories</div>
    </div>
  </div>
</div>
</Link>


  {/* Card 2 */}
  <Link href="/age/fifteen" className='block' >
  <div className="card bg-base-200 w-96 shadow-md border-dashed shadow-red-900 transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1  cursor-pointer">
    <figure>
      <img src="/teen.jpeg" alt="11–15 years" />
    </figure>
    <div className="card-body">
      <div className="badge badge-info">11–15 years</div>
      <p className="text-black mt-2">Interactive education on puberty, identity, relationships, and personal health.</p>
      <div className="card-actions mt-4 justify-center flex-wrap gap-2 ">
        <div className="badge badge-soft badge-primary">Puberty</div>
        <div className="badge badge-soft badge-primary">Health</div>
        <div className="badge badge-soft badge-primary">Consent</div>
        <div className="badge badge-soft badge-primary">Gender</div>
        <div className="badge badge-soft badge-primary">Relationships</div>
      </div>
    </div>
  </div>
  </Link>

  {/* Card 3 */}

  <Link href="/age/adult" className='block' >
<div className="card bg-base-200 w-96 shadow-md shadow-sky-700 transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer">
  <figure>
    <img src="/16.jpg" alt="16+ years" />
  </figure>
  <div className="card-body">
    <div className="badge badge-secondary">16+ years</div>
    <p className="text-black mt-2">Deeper education on adult relationships, rights, health, and social issues.</p>
    <div className="card-actions mt-4 justify-center flex-wrap gap-2 ">
      <div className="badge badge-soft badge-primary">Contraception</div>
      <div className="badge badge-soft badge-primary">STIs</div>
      <div className="badge badge-soft badge-primary">Consent in Practice</div>
      <div className="badge badge-soft badge-primary">Pleasure</div>
      <div className="badge badge-soft badge-primary">Porn Literacy</div>
    </div>
  </div>
</div>
</Link>

</div>


</main>

    </>
  );
}
