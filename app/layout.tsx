"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/axios/query-client";
import { ToastContainer, Slide } from "react-toastify";
import { useVerifyJWT } from "@/hooks/use-verify-jwt";

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
  const verifyJWT = useVerifyJWT();

  const handleTokenVerification = async () => {
    await verifyJWT();
  };

  handleTokenVerification();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-r from-white via-[#E85D041a] to-white text-black`}
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
          transition={Slide}
        />
        <QueryClientProvider client={queryClient}>
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
