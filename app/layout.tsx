import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CYBER NOTICEBOARD BBS - Est. 1995",
  description: "Retro 90s BBS-style community bulletin board system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
