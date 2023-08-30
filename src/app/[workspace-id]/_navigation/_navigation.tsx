"use client";

import React from "react";
import History from "./history";
import Search from "./search";
import Profile from "./profile";
import Help from "./help";

export default function Navigation({
  workspaceName,
}: {
  workspaceName: string;
}) {
  return (
    <div className="hbox h(44) bg(--navigation-background) bb(1/solid/--sidebar-border) z(10)">
      <History />
      <Search workspaceName={workspaceName} />
      <div
        className="hbox(right) p(0/16/0/16) gap(12) flex-basis(5%) flex-grow(1) flex-shrink(1)
    @w(~859):w(auto~) @w(860~):w(220~) @w(1080~):w(260~) @w(~1440):flex-grow(0)"
      >
        <Help />
        <Profile />
      </div>
    </div>
  );
}
