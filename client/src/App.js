import React from "react";
import { useGitHubProfile } from "./hooks/useGitHub";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import KeyProjects from "./components/KeyProjects";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { profile, loading } = useGitHubProfile();
  const enrichedProfile = profile ? { ...profile, name: profile.name || "Abhay Lal" } : null;

  // Removed global blocking spinner to allow parallel fetching in child components.

  return (
    <>
      <Navbar profile={enrichedProfile} />
      <main>
        <Hero        profile={enrichedProfile} />
        <About       profile={enrichedProfile} />
        <KeyProjects />
        <Projects    />
        <Contact     profile={enrichedProfile} />
      </main>
      <Footer profile={enrichedProfile} />
    </>
  );
}
