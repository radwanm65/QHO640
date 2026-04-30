import React from "react";
import Link from "next/link";
import "./style.css";

export const metadata = {
  title: "HitTastic App",
  description: "Songs and Artists management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>HitTastic!</h1>
          <div id="imgdiv">
            <img src="/hittastic.png" alt="HitTastic! logo" />
          </div>
          <nav>
            <Link href="/">Home | </Link>
            <Link href="/about">About | </Link>
            <Link href="/search">Search</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>© {new Date().getFullYear()} HitTastic</p>
        </footer>
      </body>
    </html>
  );
}
