import "./styles/globals.css";
import React from "react";

export const metadata = {
  title: "The Sweeterie – Handmade cakes in Sydney",
  description: "Small‑batch, made-to-order celebration cakes and sweets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
