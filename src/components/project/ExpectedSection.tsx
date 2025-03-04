import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

function ExpectedSection() {
  useEffect(() => {
    gsap.to('.expected-02', {
      y: '-100vh',
      scrollTrigger: {
        trigger: '.expected-01',
        pin: true,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: true,
        pinSpacing: false, // 추가된 부분
      },
    });
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      {/* 기대효과 1 section */}
      <section
        className="expected-01 h-screen flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2022/02/24/08/35/background-7031999_640.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">기대효과 01</h2>
          <p className="max-w-3xl text-lg">기대효과 내용01</p>
        </div>
      </section>
      {/* 기대효과 2 section */}
      <section
        className="expected-02 h-screen flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2022/11/30/01/17/background-7625668_1280.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">기대효과 02</h2>
          <p className="max-w-3xl text-lg">기대효과 내용02</p>
        </div>
      </section>
    </div>
  );
}

export default ExpectedSection;
