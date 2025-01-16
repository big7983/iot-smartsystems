import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navber from "@/components/Navber";
import Navberdebug from "@/components/Navberdebug";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Navber />
          <div className="mt-20">
            <Navberdebug />
          </div>
        </header>
        <main className="w-full h-screen px-8 md:px-20 mx-auto py-4 mb-20">
          {children}
        </main>
        <footer className="fixed bottom-0 bg-danger text-white flex justify-center items-center w-full shadow-lg">
          Debug Mode
        </footer>
      </body>
    </html>
  );
}
