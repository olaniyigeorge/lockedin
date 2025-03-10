"use client";

import { Footer } from "@/components/Footer";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
