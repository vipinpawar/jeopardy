import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "./nexttoast";
import NextAuthSessionProvider from "./SessionProvider";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jeopardy Quiz",
  description: "Quiz Game built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        suppressHydrationWarning
      >
        <NextAuthSessionProvider>
        <Navbar/>
        {children}
        <ToastContainer autoClose={2000} />
        <Footer/>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
