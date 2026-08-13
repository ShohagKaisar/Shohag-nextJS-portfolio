"use client";

import { useTranslation } from "@/context/TranslationContext";
import { developerInfo, skills } from "@/lib/portfolio-data";
import { AnimatedSection, SectionHeading } from "./AnimatedComponents";
import { MapPin, Mail, Phone, Briefcase, Code2, Layers } from "lucide-react";

export function About() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      value: "9+",
      label: t.about.yearsExp,
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      value: "50+",
      label: t.about.projectsDone,
    },
    {
      icon: <Layers className="h-6 w-6" />,
      value: "20+",
      label: t.about.technologies,
    },
  ];

  return (
    <section id="about" className="py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.about.title} />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection direction="left">
              <div className="rounded-2xl p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-violet-500/20">
                    <img
                      src={developerInfo.profileImage}
                      alt={developerInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{developerInfo.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {developerInfo.role}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-violet-500" />
                    {developerInfo.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-violet-500" />
                    {developerInfo.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-violet-500" />
                    {developerInfo.phone}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
                  >
                    <div className="text-violet-500 dark:text-violet-400 flex justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - Description */}
          <div className="lg:col-span-3 space-y-5">
            <AnimatedSection direction="right" delay={0.1}>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t.about.description}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t.about.description2}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.3}>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t.about.description3}
              </p>
            </AnimatedSection>

          </div>
        </div>
            {/* Skills Progress Bars */}
            <AnimatedSection direction="up" delay={0.4}>
              <div className="mt-8 space-y-4">
                <h3 className="text-4xl font-semibold mb-4 text-center">Skills</h3>
                {skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                        style={{
                          width: `${skill.level}%`,
                          transition: `width 1.5s ease ${i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
      </div>
    </section>
  );
}
