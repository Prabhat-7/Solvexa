import React, { ReactNode } from "react";
import SideBar from "./_components/sideBar";
import Header from "./_components/header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <SideBar />
      </div>
      <div className="md:ml-64 flex flex-col">
        <div className="fixed top-0 right-0 left-64 z-10">
          <Header />
        </div>
        <div className="pt-16">{children}</div>
      </div>
    </div>
  );
}
