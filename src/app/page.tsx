"use client";

import Main from "./_main";
import Header from "./_header";

export default function Home() {
  return (
    <div className="vbox bg(--main-background)">
      <Header />
      <Main />
    </div>
  );
}
