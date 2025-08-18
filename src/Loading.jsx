import { useEffect } from "react";
import gsap from "gsap";

const Loading = () => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Logo fade in
    tl.fromTo(
      "#logo",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Logo bouncing (infinite)
    gsap.to("#logo", {
      y: -4,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });

    // Loader background expands from center
    tl.fromTo(
      "#loader-bg",
      { scaleX: 0, transformOrigin: "center center" },
      { scaleX: 1, duration: 1 },
      "+=0.02"
    );

    // Fake smooth progress (0 → ~80%)
    tl.to("#loader-fg", { scaleX: 0.2, duration: 3, ease: "power1.inOut" })
      .to("#loader-fg", { scaleX: 0.5, duration: 2, ease: "power1.inOut" })
      .to("#loader-fg", { scaleX: 0.8, duration: 2, ease: "power1.inOut" })
      .to("#loader-fg", { scaleX: 1, duration: 4, ease: "power1.inOut" });

    tl.to("#loader", {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
    });
  }, []);

  return (
    <div
      id="loader"
      className="text-5xl col-center abs-center gap-10 pointer-events-none"
    >
      <img id="logo" src="/images/fav.webp" className="size-32" />

      <div
        id="loader-bg"
        className="h-[1px] w-[400px] rounded-full bg-[#3b393c] flex-center overflow-hidden"
      >
        <div
          id="loader-fg"
          className="h-[1px] w-full rounded-full bg-white"
          style={{ transform: "scaleX(0)", transformOrigin: "center center" }}
        />
      </div>
    </div>
  );
};

export default Loading;
