"use client";

import { useRef, useState } from "react";
import { allCocktails } from "../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRight, setIsRight] = useState(false);

  const contentRef = useRef();

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: isRight ? 100 : -100 },
      { opacity: 1, xPercent: 0, duration: 1, ease: "back.out" }
    );
    gsap.fromTo(
      ".details h2",
      { yPercent: 30, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: "power1.inOut", delay: 0.1 }
    );
    gsap.fromTo(
      ".details p",
      { yPercent: 30, opacity: 0,  },
      { yPercent: 0, opacity: 1, ease: "power1.inOut", delay: 0.1 }
    );
  }, [currentIndex]);

  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#menu",
          start: "top center",
          scrub: true,
        },
      })
      .to("#m-right-leaf", { y: 200 }, 0)
      .to("#m-left-leaf", { y: -200 }, "<"); // animate at the same time as the right leaf
  })

  const totalCocktails = allCocktails.length;
  const goToSlide = (index, right) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);

    setIsRight(right ? true : false);
    console.log(isRight);
  };

  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.webp"
        alt="left leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.webp"
        alt="right leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="title">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="cocktail-navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/30 border-white/30"
              }
              md:text-3xl text-xl pb-2 cursor-pointer hover:text-yellow hover:border-yellow border-b-1 transition-colors font-modern-negra`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/left-arrow.webp"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1, true)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/right-arrow.webp"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.title}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
