import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LWT, Let's Work Together | AI Workplace Simulator",
  description: "AI-Powered Digital Workplace Simulator by LAKSHYNiTi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-saas-canvas bg-tech-grid min-h-screen text-[#0A0F2B] antialiased selection:bg-[#CBB4FF] selection:text-[#0A0F2B]">
        {children}
      </body>
    </html>
  );
}