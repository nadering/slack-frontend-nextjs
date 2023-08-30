import React from "react";
import Image from "next/image";

const Header = React.memo(({ workspaceName }: { workspaceName: string }) => {
  return (
    <div className="vbox gap(4)">
      <div className="hbox px(12)">
        <button className="hbox relative w(~100%-46px) r(8) p(4/4/4/8) gap(4) hover:bg(--sidebar-background-hover)">
          <span className="w(~90%) c(--sidebar-workspace) font-family(Larsseit) font(18) heavy translateY(1px) nowrap...">
            {workspaceName}
          </span>
          <span className="filter-white">
            <Image
              src="/images/workspace-detail.svg"
              alt="workspace-detail"
              width={18}
              height={18}
            />
          </span>
        </button>
        <button
          className="inline-block pack absolute right(16) w(34) h(34) r(50%) bg(--sidebar-workspace)
        transition(transform=.1s) active:scale(0.95)+bg(--sidebar-workspace-active)"
        >
          <div className="filter-sidebar">
            <Image
              src="/images/new-message.svg"
              alt="new-message"
              width={18}
              height={18}
            />
          </div>
        </button>
      </div>
    </div>
  );
});

export default Header;
