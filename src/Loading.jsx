import { useEffect } from "react";
import gsap from "gsap";

const Loading = ({ onComplete }) => {
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
    const fakeTween = gsap.timeline({ ease: "power1.inOut " });
    fakeTween
      .to("#loader-fg", { scaleX: 0.2, duration: 3, ease: "power1.inOut" })
      .to("#loader-fg", { scaleX: 0.5, duration: 2, ease: "power1.inOut" })
      .to("#loader-fg", { scaleX: 0.8, duration: 2, ease: "power1.inOut" });

    // Real "all assets loaded" event
    const handleLoad = () => {
      fakeTween.kill(); // stop fake tween if running
      gsap.to("#loader-fg", {
        scaleX: 1,
        duration: 0.8,
        ease: "power1.out",
        onComplete: () => {
          gsap.to("#loader", {
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            onComplete,
          });
        },
      });
    };

    // If assets are already loaded (cached), skip straight to 100%
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, [onComplete]);

  return (
    <div
      id="loader"
      className="text-5xl col-center abs-center gap-10 pointer-events-none"
    >
      <img id="logo" src="/images/fav.png" className="size-32" />

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
