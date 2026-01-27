import type { Metadata } from "next";
import { Antic, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Footer from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";

// DÜZELTME: 'latin-ext' kaldırıldı çünkü Antic fontu bu parametreyi desteklemiyor.
// Ancak "latin" subset'i içinde Türkçe karakterler zaten mevcut, sorun olmayacak.

const antic = Antic({
  weight: "400",
  subsets: ["latin"], // Sadece latin bıraktık
  variable: "--font-antic",
});

const firaCode = Fira_Code({
  subsets: ["latin"], // Sadece latin bıraktık
  variable: "--font-fira-code",
});

// --- SİTE KİMLİĞİ AYARLARI ---
export const metadata: Metadata = {
  title: "Ayşe Melda Güzel | Industrial Product Designer",
  description: "Portfolio of Ayşe Melda Güzel, an Industrial Product Designer based in Istanbul. Focusing on functional aesthetics, sustainable materials, and innovative production techniques.",
  icons: {
    icon: [
      { url: '/meldalogo2.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/meldalogo2.svg' } // Apple/Safari için özel tanımlama
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${antic.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}