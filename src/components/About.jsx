import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const About = () => {
  useGSAP(() => {
    const titleSPlit = SplitText.create("#about h2", {
      type: "words",
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeline
      .from(titleSPlit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(".top-grid div, .bottom-grid div", {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.04,
      }, '-=0.5'); // start the animation when 0.5s before the previous animation end (overlap a bit).
  });
  return (
    <div id="about">
      <div className="mb-16 px-5 md:px-0">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">- </span>
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Every cocktails we serve is a reflection of our obsession with
              detail ─ from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>
            <div>
              <p className="text-xl font-bold md:text-3xl">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt1.webp" alt="grid-img-1" />
        </div>

        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/images/abt2.webp" alt="grid-img-2" />
        </div>

        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt5.webp" alt="grid-img-5" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/images/abt3.webp" alt="grid-img-3" />
        </div>

        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/images/abt4.webp" alt="grid-img-4" />
        </div>
      </div>
    </div>
  );
};

export default About;
