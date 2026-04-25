import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import RecentProjects from "@/components/RecentProjects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNav";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex flex-col items-center overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        {/* Navbar */}
        <FloatingNav
          navItems={[
            { name: "Home", link: "#home" },
            { name: "About", link: "#about" },
            { name: "Projects", link: "#projects" },
            { name: "Contact", link: "#contact" },
          ]}
        />

        {/* Sections with IDs */}
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <Grid />
        </section>

        <section id="projects">
          <RecentProjects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="contact">
          <Footer />
        </section>
      </div>
    </main>
  );
}
