import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import FooterControls from "@/components/footer-controls";
import Image from "next/image"
import { auth, signIn } from "@/utils/auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LockedIn App",
  description: "Welcome to the best habit-tracking app in the world",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="text-gray-800  relative bg-[url('/grid.png')] backdrop-blur bg-slate-50 w-full min-h-screen h-full flex flex-col items-center justify-between">
          <div className="bg_gradient " />
          <ToastContainer />
          <nav className="flex sticky z-10 top-0 right-0 w-full items-center justify-between p-2 md:p-6 lg:p-8">
              <Link href="/">
              <h1 className="text-3xl text-green-600 font-extrabold">Locked<span className="text-white px-1 rounded-md bg-orange-500  border-orange-500">In</span></h1>
              </Link>
              <span className="hidden sm:flex gap-2 items-center">
                  {!session ?
                      <form action={async () => {
                          "use server"
                          await signIn("google")
                          }}
                          className=""
                      >
                          <button className="rounded-full p-2 text-white border" 
                          type="submit">Sign In </button>
                      </form>
                      : 
                  ""}
                  {session?.user ?
                      <Link href='/home/profile'>
                      <Image
                      src={session!.user.image || '/assets/images/logo.svg'}
                      width={37}
                      height={37}
                      className='rounded-full'
                      alt='profile'
                      />
                  </Link>
                  : <></>
                  }  
              </span>
          </nav> 

          <section className="w-full z-10 max-w-[1200px] flex-1 flex-grow md:w-[90%] lg:w-[65%] flex justify-center ">
              {children}
          </section>

          <FooterControls />
      </div>
      </body>
    </html>
  );
}

