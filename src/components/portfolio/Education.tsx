"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { education } from "@/lib/portfolio-data";
import { AnimatedSection, SectionHeading } from "./AnimatedComponents";
import { GraduationCap } from "lucide-react";

export function Education() {
  const { t } = useTranslation();

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.education.title}
          subtitle={t.education.subtitle}
        />

        <div className="space-y-6">
          {education.map((edu, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="up">
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center border border-violet-500/20">
                      <GraduationCap className="h-7 w-7 text-violet-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <span className="text-sm text-muted-foreground font-medium">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-violet-500 dark:text-violet-400 font-medium mb-1">
                      {edu.field}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
