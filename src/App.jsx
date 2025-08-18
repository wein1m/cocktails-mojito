import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Loading from "./Loading";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <main className="scroll-container lenis lenis-scrolling">
        <ReactLenis root />
        <Navbar />
        <Hero />
        <Cocktails />
        <About />
        <Art />
        <Menu />
        <Contact />
      </main>
    </Suspense>
  )
};

export default App;
