"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { experiences } from "@/lib/portfolio-data";
import { AnimatedSection, SectionHeading } from "./AnimatedComponents";
import { CalendarDays } from "lucide-react";

export function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-violet-500/[0.02] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="relative mt-16">
          {/* Timeline Line */}
          <div className="absolute left-1.75 md:left-1/2 top-0 bottom-0 w-px bg-border/50 md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.15}
              direction={index % 2 === 0 ? "right" : "left"}
            >
              <div
                className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Timeline Glowing Dot */}
                <div className="absolute left-0 md:left-1/2 top-8 z-10 -translate-x-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-background border-[3px] border-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                </div>

                {/* Content Card */}
                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                    }`}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group rounded-2xl p-6 bg-card/60 backdrop-blur-sm border border-border/50 hover:border-violet-500/40 shadow-lg shadow-black/5 hover:shadow-violet-500/5 transition-all duration-300 h-full"
                  >
                    {/* Header Section */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-4">
                        {/* Company Logo Placeholder */}
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500/20 to-cyan-500/20 border border-border/50 flex items-center justify-center text-lg font-bold text-violet-400 shrink-0 shadow-inner">
                          {exp.company.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground group-hover:text-violet-400 transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Desktop Date Badge */}
                      <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/30 whitespace-nowrap">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {exp.period}
                      </div>
                    </div>

                    {/* Mobile Date Badge */}
                    <div className="sm:hidden mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/30 w-fit">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {exp.period}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Tech Stack / Skills Footer */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="pt-4 border-t border-border/30">
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 text-xs font-medium rounded-md bg-violet-500/5 text-violet-400 border border-violet-500/10 transition-colors group-hover:border-violet-500/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}