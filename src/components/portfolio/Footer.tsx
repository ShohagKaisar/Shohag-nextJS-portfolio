"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { developerInfo } from "@/lib/portfolio-data";
import { Heart } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50 md:mx-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>&copy; {currentYear} {developerInfo.name}.</span>
            <span>{t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>{t.footer.designedBy}</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span className="font-semibold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              SHOHAG
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
