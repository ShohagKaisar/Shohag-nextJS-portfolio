"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { developerInfo } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Facebook } from "lucide-react";
import {
  TypewriterText,
  FloatingParticles,
  GradientOrb,
} from "./AnimatedComponents";

export function Hero() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-8"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <GradientOrb
          className="w-125 h-125 -top-20 -left-20"
          color="from-violet-500/20 via-purple-500/10 to-transparent"
        />
        <GradientOrb
          className="w-100 h-100 top-1/3 -right-20"
          color="from-cyan-500/20 via-teal-500/10 to-transparent"
        />
        <GradientOrb
          className="w-75 h-75 bottom-0 left-1/3"
          color="from-rose-500/10 via-pink-500/5 to-transparent"
        />
        <FloatingParticles />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-violet-500/30 mx-auto shadow-2xl shadow-violet-500/20">
              <img
                src={developerInfo.profileImage}
                alt={developerInfo.name}
                className="object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-background flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-[10px] font-bold text-white">9+</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-violet-500 dark:text-violet-400 font-medium text-lg mb-3"
        >
          {t.hero.greeting.split(" ").slice(0, 2).join(" ")}{" "}
          <span className="inline-block animate-bounce">👋</span>
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Shohag Kaisar
          </span>
        </motion.h1>

        {/* Tagline - Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/80">
            <TypewriterText text={t.hero.tagline} speed={40} />
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            onClick={() => scrollTo("projects")}
            className="rounded-full px-8 py-6 text-base font-semibold bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            {t.hero.viewProjects}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("contact")}
            className="rounded-full px-8 py-6 text-base font-semibold border-2 hover:bg-violet-500/10 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            {t.hero.contactMe}
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex items-center justify-center gap-3 pt-4"
        >
          {[
            {
              icon: <Github className="h-5 w-5" />,
              href: developerInfo.social.github,
              label: "GitHub",
            },
            {
              icon: <Linkedin className="h-5 w-5" />,
              href: developerInfo.social.linkedin,
              label: "LinkedIn",
            },
            {
              icon: <Facebook className="h-5 w-5" />,
              href: developerInfo.social.facebook,
              label: "Facebook",
            },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-violet-500 hover:border-violet-500/30 hover:bg-violet-500/5 transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollTo("about")}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-violet-500 transition-colors"
          >
            <span className="text-xs font-medium">{t.hero.scrollDown}</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
