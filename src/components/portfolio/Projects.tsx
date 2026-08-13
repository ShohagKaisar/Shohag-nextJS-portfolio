"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { projects } from "@/lib/portfolio-data";
import { AnimatedSection, SectionHeading } from "./AnimatedComponents";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.title}
              delay={index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-violet-500/30 transition-all duration-300 h-full"
              >
                {/* Project Image/Emoji Area */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}
                >
                  <motion.span
                    className="text-7xl opacity-80 group-hover:scale-125 transition-transform duration-500"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    {project.image}
                  </motion.span>
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-violet-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button
                      size="sm"
                      className="rounded-full gap-2 shadow-lg"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t.projects.liveDemo}
                      </a>
                    </Button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Live Link */}
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    {t.projects.viewProject}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
