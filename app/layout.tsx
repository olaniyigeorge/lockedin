import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { ToastContainer, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AuthStoreProvider } from "@/providers/auth-store-provider";

const comfortaa = localFont({
  src: "./fonts/comfortaa.ttf",
  variable: "--comfortaa",
  display: "swap",
});

const nunito = localFont({
  src: "./fonts/nunito.ttf",
  variable: "--nunito",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} ${nunito.variable} antialiased main relative min-h-screen bg-[url('/imgs/grid.png')] backdrop-blur-lg bg-opacity-80`} >

        <ToastContainer /> 
        <AuthStoreProvider>
          <Header />
          <main className="w-full h-full flex-1 flex-col flex lockedin_bg_gradient  items-center min-h-[500px]  ">
              {children}
          </main>
          <Footer />
        </AuthStoreProvider>
      </body>
    </html>
  );
}
