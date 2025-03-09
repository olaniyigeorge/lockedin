"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JoinWaitlistModal } from "@/components/modals/JoinWaitlistModal";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <JoinWaitlistModal />

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
