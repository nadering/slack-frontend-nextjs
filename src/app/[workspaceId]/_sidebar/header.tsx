import React from "react";
import Image from "next/image";

const Header = React.memo(() => {
  return (
    <div className="vbox gap(4)">
      <div className="hbox">
        <button className="hbox relative w(~100%-46px) r(8) p(4/8) gap(8) hover:bg(--sidebar-background-hover)">
          <span className="w(~90%) c(--sidebar-workspace) font-family(Larsseit) font(18) 900 translateY(1px) nowrap...">
            {/* Workspace name */}
            {"테스트 워크스페이스"}
          </span>
          <span className="c(--sidebar-workspace) font(16) ">
            {/* <Image src="/images/expand.svg" alt="expand" width={20} height={20} priority /> */}
            v
          </span>
        </button>
        <button className="inline-block pack absolute right(16) w(34) h(34) r(50%) bg(--sidebar-workspace)
        transition(transform=.1s) active:scale(0.95)+bg(--sidebar-workspace-active)">
          {/* svg icon */}
          <span className="c(black) font(16) bold">W</span>
        </button>
      </div>
    </div>
  );
});

export default Header;