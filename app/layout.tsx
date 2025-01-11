import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastContainer, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
      <body
        className={`${comfortaa.variable} ${nunito.variable} antialiased bg-black text-white max-w-[1440px] mx-auto font-noto`}
      >

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
        <div className="flex flex-col">
          <Header />
            <main className="flex-">{children}</main>
          <Footer />
        </div>

      </body>
    </html>
  );
}
