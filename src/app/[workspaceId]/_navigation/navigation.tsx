"use client";

import React from "react";
import History from "./history";
import Search from "./search";
import Profile from "./profile";

export default function Navigation() {
  return (
    <div className="hbox center h(44) bg(--navigation-background) bb(1/solid/--sidebar-border) z(10)">
      <History />
      <Search />
      <Profile />
    </div>
  );
}