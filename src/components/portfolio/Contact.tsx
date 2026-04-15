"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { developerInfo } from "@/lib/portfolio-data";
import { AnimatedSection, SectionHeading } from "./AnimatedComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  Facebook,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t.contact.nameRequired;
    if (!formData.email.trim()) newErrors.email = t.contact.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t.contact.emailInvalid;
    if (!formData.message.trim()) newErrors.message = t.contact.messageRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        "service_wtov8ck",
        "template_syejxgv",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: developerInfo.name,
        },
        "6ToSd4r0vmxRi_zYC"
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Let&apos;s talk about your project
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Feel free to reach out if you want to collaborate, have a
                  question, or simply want to connect.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Mail className="h-5 w-5" />,
                    label: developerInfo.email,
                    href: `mailto:${developerInfo.email}`,
                  },
                  {
                    icon: <Phone className="h-5 w-5" />,
                    label: developerInfo.phone,
                    href: `tel:${developerInfo.phone}`,
                  },
                  {
                    icon: <MapPin className="h-5 w-5" />,
                    label: developerInfo.location,
                    href: "#",
                  },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Social */}
              <div className="pt-4">
                <p className="text-sm font-medium mb-3">Find me on</p>
                <div className="flex gap-3">
                  {[
                    {
                      icon: <Github className="h-4 w-4" />,
                      href: developerInfo.social.github,
                    },
                    {
                      icon: <Linkedin className="h-4 w-4" />,
                      href: developerInfo.social.linkedin,
                    },
                    {
                      icon: <Facebook className="h-4 w-4" />,
                      href: developerInfo.social.facebook,
                    },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-violet-500 hover:border-violet-500/30 transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" delay={0.2} className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 sm:p-8 bg-card/50 backdrop-blur-sm border border-border/50 space-y-5"
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium"
                >
                  {t.contact.name}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`rounded-xl ${
                    errors.name
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                >
                  {t.contact.email}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`rounded-xl ${
                    errors.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium"
                >
                  {t.contact.message}
                </label>
                <Textarea
                  id="message"
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className={`rounded-xl resize-none ${
                    errors.message
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium text-sm">{t.contact.success}</span>
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium text-sm">{t.contact.error}</span>
                  </motion.div>
                ) : (
                  <motion.div key="button" layout>
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full rounded-xl py-6 text-base font-semibold bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {t.contact.sending}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t.contact.send}
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
