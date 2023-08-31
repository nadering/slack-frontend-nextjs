"use client";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getWorkspace, inviteToChannel } from "@/apis";
import {
  showInviteToChannelModalState,
  workspaceInformationState,
} from "@/store";

// 채널 초대에 사용되는 전체 화면을 덮는 모달
export default function InviteToChannelModal() {
  const path = usePathname();
  const [_, currentWorkspaceId, currentChannelId] = path.split("/");

  const setShowInviteToChannelModal = useSetRecoilState(
    showInviteToChannelModalState
  );

  const setWorkspaceInformation = useSetRecoilState(workspaceInformationState);

  const [targetUserEmail, setTargetUserEmail] = useState<string>("");
  const [wrongEmailInput, setWrongEmailInput] = useState(false);
  const [activated, setActivated] = useState(false);

  // 작성된 초대할 사용자의 이메일의 변경을 반영하고, 이메일의 조건 만족 여부를 확인하고, 초대 버튼을 활성화시킵니다.
  function handleTargetUserEmail(e: { target: any }) {
    function checkTargetUserEmail(userEmail: string) {
      if (userEmail?.length !== 0) {
        return true;
      }
      return false;
    }

    setWrongEmailInput(false);
    setTargetUserEmail(e.target.value);

    if (checkTargetUserEmail(e.target.value)) {
      setActivated(true);
    } else {
      setActivated(false);
    }
  }

  async function fetchWorkspaceData() {
    const { workspaceData } = await getWorkspace(currentWorkspaceId);
    return workspaceData;
  }

  // 사용자를 초대하고 워크스페이스 정보를 갱신합니다.
  async function handleInviteToChannel() {
    const inviteToChannelData = {
      workspaceId: currentWorkspaceId,
      channelId: currentChannelId,
      targetUserEmail: targetUserEmail,
    };
    const [inviteToChannelSuccess, userList] = await inviteToChannel(
      inviteToChannelData
    );

    // 채널 생성에 성공하면 워크스페이스 정보를 새로 받아와 저장합니다.
    if (inviteToChannelSuccess) {
      const _ = fetchWorkspaceData().then((result) => {
        setWorkspaceInformation(result);
        setShowInviteToChannelModal(false);
      });
    } else {
      setWrongEmailInput(true);
    }
  }

  return (
    <div className="layer pack z(100) bg(--fullscreen-modal-dark-background)">
      <div className="relative w(520) bg(--fullscreen-modal-background) r(8) p(24/28) font-family(Larsseit) @w(~585):w(324)">
        <div className="vbox gap(24)">
          <div className="hbox space-between">
            <div className="c(--fullscreen-modal-text) font(22) bold">
              현재 채널에 초대
            </div>
          </div>
          <div className="vbox gap(4)">
            <label
              htmlFor="channel-name"
              className="c(--fullscreen-modal-text) font(15) bold"
            >
              초대할 사용자 이메일:
            </label>
            <div className="space(0)"></div>
            <input
              type="text"
              name="channel-name"
              id="channel-name"
              className="b(1/solid/--fullscreen-modal-border) r(4) p(8/12) nowrap... focus:ring(--fullscreen-modal-focus-ring/1.5)"
              value={targetUserEmail}
              onChange={handleTargetUserEmail}
              autoFocus
            ></input>
            {wrongEmailInput ? (
              <div className="c(--fullscreen-modal-alert) font(13)">
                잘못된 이메일을 입력했거나, 이미 존재하는 사용자를 다시 초대했습니다.
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="hbox(reverse)">
            <button
              className={`bg(--fullscreen-modal-button-background-deactivated) r(4) p(6/24) c(--fullscreen-modal-button-text-deactivated) bold cursor(default)
            ${activated ? "activated" : ""}
            .activated:bg(--fullscreen-modal-button-background-activated)+c(--fullscreen-modal-button-text-activated)+cursor(pointer)`}
              onClick={() => handleInviteToChannel()}
            >
              보내기
            </button>
          </div>
        </div>
        <button
          className="absolute top(20) right(20) w(36) h(36) r(4) p(8) clip hover:bg(--fullscreen-modal-background-hover)"
          onClick={() => setShowInviteToChannelModal(false)}
        >
          <div className="pack">
            <Image
              src="/images/close.svg"
              alt="close"
              width={20}
              height={20}
              priority
            />
          </div>
        </button>
      </div>
    </div>
  );
}
