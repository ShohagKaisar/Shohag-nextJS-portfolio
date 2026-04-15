import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Md. Shohag Kaisar | Full-Stack Developer Portfolio",
  description:
    "Professional portfolio of Md. Shohag Kaisar — WordPress Developer, MERN Stack Developer, and Next.js Developer based in Bangladesh. 9+ years of IT experience building fast, scalable, and beautiful web experiences.",
  keywords: [
    "Shohag Kaisar",
    "Full-Stack Developer",
    "MERN Stack",
    "Next.js Developer",
    "WordPress Developer",
    "React Developer",
    "Node.js Developer",
    "Bangladesh",
    "Web Developer",
    "Frontend Developer",
  ],
  authors: [{ name: "Md. Shohag Kaisar" }],
  openGraph: {
    title: "Md. Shohag Kaisar | Full-Stack Developer Portfolio",
    description:
      "Building fast, scalable & beautiful web experiences. WordPress | MERN Stack | Next.js Developer.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Shohag Kaisar | Full-Stack Developer",
    description:
      "Building fast, scalable & beautiful web experiences. WordPress | MERN Stack | Next.js Developer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
