import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import SocialLinks from "@/components/SocialLinks";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Stats from "@/components/Stats";
import Competitions from "@/components/Competitions";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-6 lg:px-8">
      {/* Hero + Marquee */}
      <div className="mb-5">
        <Hero />
        <Marquee />
      </div>

      {/* About */}
      <div className="animate-fade-up delay-2 mb-5">
        <About />
      </div>

      {/* Tech Stack + Social Links */}
      <div className="animate-fade-up delay-3 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px] mb-5 items-start">
        <TechStack />
        <SocialLinks />
      </div>
      {/* Stats */}
      <div className="mb-5">
        <Stats />
      </div>
      {/* Projects */}
      <div className="mb-5">
        <Projects />
      </div>
      {/* Competitions */}
      <div className="mb-5">
        <Competitions />
      </div>
      {/* Gallery */}
      <div className="mb-10">
        <Gallery />
      </div>
      {/* Contact */}
      <div className="mb-10">
        <Contact />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
