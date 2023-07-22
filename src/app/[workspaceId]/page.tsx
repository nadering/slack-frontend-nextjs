"use client";

import { Sidebar } from "./_sidebar";
import { Channel } from "./_channel";
import { Navigation } from "./_navigation";

export default function Workspace() {
  return (
    <>
      <Navigation />
      <div className="hbox(stretch) h(calc(100vh-44px))">
        <Sidebar />
        <Channel />
      </div>
    </>
  );
}
