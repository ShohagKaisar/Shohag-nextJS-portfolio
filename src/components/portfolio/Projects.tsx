"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { projects } from "@/lib/portfolio-data";
import { AnimatedSection, SectionHeading } from "./AnimatedComponents";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function WebsitePreview({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [scrollDistance, setScrollDistance] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const calculateScroll = () => {
      if (!containerRef.current || !imageRef.current) return;

      const containerHeight = containerRef.current.clientHeight;
      const imageHeight = imageRef.current.clientHeight;

      const distance = imageHeight - containerHeight;

      setScrollDistance(distance > 0 ? distance : 0);
    };

    calculateScroll();

    window.addEventListener("resize", calculateScroll);

    return () => {
      window.removeEventListener("resize", calculateScroll);
    };
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] overflow-hidden bg-muted/30"
    >
      {/* Website Screenshot */}
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        draggable={false}
        initial={{ y: 0 }}
        whileHover={
          scrollDistance > 0
            ? {
              y: -scrollDistance,
            }
            : {}
        }
        transition={{
          duration: Math.max(4, scrollDistance / 500),
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-full h-auto min-h-full object-cover object-top"
      />

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent" />

      {/* Preview indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          Scroll Preview
        </div>
      </div>
    </div>
  );
}

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
                {/* Website Screenshot Preview */}
                <div className="relative overflow-hidden">
                  <WebsitePreview
                    src={project.image}
                    alt={`${project.title} website preview`}
                  />

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-violet-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  >
                    <Button
                      size="sm"
                      className="rounded-full gap-2 shadow-lg pointer-events-auto"
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