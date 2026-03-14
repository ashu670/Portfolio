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

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.5rem", fontFamily:"var(--font-mono)", color:"var(--text-muted)", fontSize:"0.82rem" }}>
      <div style={{ width:40, height:40, border:"2px solid var(--border)", borderTopColor:"var(--accent)", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <span>Loading portfolio…</span>
    </div>
  );

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
