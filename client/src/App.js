import React from "react";
import { useGitHubProfile } from "./hooks/useGitHub";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import KeyProjects from "./components/KeyProjects";
import Projects from "./components/Projects";
import Contributions from "./components/Contributions";
import Training from "./components/Training";
import Certifications from "./components/Certifications";
import Hackathons from "./components/Hackathons";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { profile, loading } = useGitHubProfile();
  const enrichedProfile = profile ? { ...profile, name: profile.name || "Abhay Lal" } : null;

  return (
    <>
      <Navbar profile={enrichedProfile} />
      <main>
        <Hero          profile={enrichedProfile} />
        <About         profile={enrichedProfile} />
        <Skills />
        <KeyProjects />
        <Projects />
        <Contributions />
        <Training />
        <Certifications />
        <Hackathons />
        <Contact       profile={enrichedProfile} />
      </main>
      <Footer profile={enrichedProfile} />
    </>
  );
}
