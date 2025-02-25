import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navber from "@/components/Navber";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  bg-slate-50`}
      >
        <header className="sticky top-0 z-50">
          <Navber />
        </header>
        <main className=" relative px-4 py-4 sm:px-8 sm:py-8">{children}</main>
      </body>
    </html>
  );
}
