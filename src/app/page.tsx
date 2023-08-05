"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Header = React.memo(() => {
  return (
    <div className="hbox space-between w(100vw) h(80) px(32) mx(auto) md:w(~1200) ~md:w(546~)">
      <Link href="/" className="pack">
        <Image
          src="/images/slack-logo.svg"
          alt="slack-logo"
          width={100}
          height={25}
        />
      </Link>
      <div className="hbox gap(8)">
        <button
          className="relative r(8) p(12/16) 
      after::layer+r(8)+box-shadow(0/0/0/2px/--background/inset)+content()+opacity(0)+transition(opacity=.3s)
      hover:after::opacity(1)"
          onClick={() => Auth.signOut()}
        >
          <span className="c(--main-text) text(pack) font(14) font-family(Larsseit) heavy">
            로그아웃
          </span>
        </button>
        <button
          className="relative r(8) bg(--background) p(12/16) 
      after::layer+r(8)+box-shadow(0/0/0/2px/--primary-light/inset)+content()+opacity(0)+transition(opacity=.3s)
      hover:after::opacity(1)"
        >
          <span className="c(--primary) text(pack) font(14) font-family(Larsseit) heavy">
            새 워크스페이스 개설
          </span>
        </button>
      </div>
    </div>
  );
});

const Main = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const WorkspaceInformation = () => {
    return (
      <div className="hbox h(75px+32px~) bg(--background) p(16) bb(1px/solid/--main-workspace-divider) transition(background=.15s) hover:bg(--background-hover) last-child:rb(6)+bb(0)"></div>
    );
  };

  return (
    <main className="vbox w(100vw) h(100vh-80px~) p(40/32) mx(auto) md:w(~1000) ~md:w(546~)">
      <section className="vbox gap(20)">
        <div className="hbox">
          {/* Image */}
          <span className="c(--main-text) font(44) font-family(Larsseit) heavy letter-spacing(-1px) word-spacing(10px)">
            또 만나게 되어 반가워요
          </span>
        </div>
        <div className="vbox r(8) b(3px/solid/--main-workspace-border)">
          <div className="h(50px+32px~) bg(--main-workspace-title-background) rt(6) p(16) c(--text) text(middle) font(18) font-family(Sailec)">
            {user.username}의 워크스페이스
          </div>
          <WorkspaceInformation />
          <WorkspaceInformation />
        </div>
      </section>
    </main>
  );
};

export default function Home() {
  return (
    <div className="vbox bg(--main-background)">
      <Header />
      <Main />
    </div>
  );
}
