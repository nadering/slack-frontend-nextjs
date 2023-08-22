"use client";

import Main from "./main";
import Header from "./header";

export default function Home() {
  return (
    <div className="vbox bg(--main-background)">
      <Header />
      <Main />
    </div>
  );
}

