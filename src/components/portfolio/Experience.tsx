"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { experiences } from "@/lib/portfolio-data";
import { AnimatedSection, SectionHeading } from "./AnimatedComponents";
import { Briefcase } from "lucide-react";

export function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/50 to-transparent md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.2}
              direction={index % 2 === 0 ? "right" : "left"}
            >
              <div
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-[7px] md:-translate-x-2 top-8 z-10">
                  <div className="w-4 h-4 rounded-full bg-violet-500 border-4 border-background shadow-lg shadow-violet-500/30" />
                </div>

                {/* Content */}
                <div
                  className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:pl-0 md:pr-0" : "md:pl-0 md:pr-0"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-violet-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-violet-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 mb-3">
                      {exp.period}
                    </span>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
