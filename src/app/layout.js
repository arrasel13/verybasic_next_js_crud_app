import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/navbar";
import NextAuthSessionProvider from "@/providers/nextauthsessionprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Create Next App",
    template: "%s | Create Next App",
  },
  description: "Trying to learn NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavBar />
          {children}
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
