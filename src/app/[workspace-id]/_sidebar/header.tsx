import React, { useRef } from "react";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import useModal from "@/hooks/useModal";
import { showInviteToWorkspaceModalState } from "@/store";

const Header = React.memo(({ workspaceName }: { workspaceName: string }) => {
  const headerModalRef = useRef(null);
  const headerModal = useModal(headerModalRef);

  const setShowInviteToWorkspaceModal = useSetRecoilState(showInviteToWorkspaceModalState);

  function HeaderModal() {
    return (
      <div className="vbox absolute top(100%) left(20) w(260~) bg(--modal-background) r(4) mt(8) py(12) gap(16) z(100) c(--text) font(15) font-family(Larsseit) medium box-shadow(0/0/5/--modal-shadow)">
        <button
          className="p(4/20) text-left hover:bg(--modal-hover-background)+c(--modal-hover-text)"
          onClick={() => {
            setShowInviteToWorkspaceModal(true);
          }}
        >
          현재 워크스페이스에 사용자 초대
        </button>
      </div>
    );
  }

  return (
    <div className="relative vbox gap(4)" ref={headerModalRef}>
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
      {headerModal && <HeaderModal />}
    </div>
  );
});

export default Header;
