import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe | A little friendly competition",
  description: "A simple, thoughtful Tic-Tac-Toe game for two players.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
