"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TranslationProvider } from "@/context/TranslationContext";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { TechStackSection } from "@/components/portfolio/TechStack";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { WhatsAppChat } from "@/components/portfolio/WhatsAppChat";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TranslationProvider>
        <div className="min-h-screen bg-background text-foreground relative">
          <Navbar />
          <main>
            <Hero />
            <About />
            <TechStackSection />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </main>
          <Footer />
          <WhatsAppChat />
          <ScrollToTop />
        </div>
      </TranslationProvider>
    </ThemeProvider>
  );
}
