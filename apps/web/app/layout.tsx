import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../redux/reduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"


const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turbo - Portfolio ",
  description: "Hi, I'm Kirti 💕 I don’t just build apps, I own the game 🌸 ✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>

          <ToastContainer/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
