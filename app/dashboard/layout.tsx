import React, { ReactNode } from "react";
import SideBar from "./_components/sideBar";
import Header from "./_components/header";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <SideBar />
      </div>

      <div className="md:ml-64 ">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}
