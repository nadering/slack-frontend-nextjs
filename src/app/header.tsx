import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Auth } from "aws-amplify";

const Header = React.memo(() => {
  const router = useRouter();

  return (
    <div className="hbox space-between sticky top(0) w(100vw) h(80) z(10) bg(--main-background) px(32) mx(auto) md:w(~1200) ~md:w(546~)">
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
          className="relative r(4) p(12/16) 
      after::layer+r(4)+box-shadow(0/0/0/2px/--background/inset)+content()+opacity(0)+transition(opacity=.3s)
      hover:after::opacity(1)"
          onClick={() => Auth.signOut()}
        >
          <span className="c(--main-text) text(pack) font(14) font-family(Larsseit) heavy">
            로그아웃
          </span>
        </button>
        <button
          className="relative r(4) bg(--background) p(12/16) 
      after::layer+r(4)+box-shadow(0/0/0/2px/--primary-light/inset)+content()+opacity(0)+transition(opacity=.3s)
      hover:after::opacity(1)"
          onClick={() => {
            router.push(`/setup-workspace`);
          }}
        >
          <span className="c(--main-background) text(pack) font(14) font-family(Larsseit) heavy">
            새 워크스페이스 개설
          </span>
        </button>
      </div>
    </div>
  );
});

export default Header;
