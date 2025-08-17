import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
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
  );
};

export default App;
