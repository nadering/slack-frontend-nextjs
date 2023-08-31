"use client";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { makeChannel, getWorkspace } from "@/apis";
import {
  showAddChannelModalState,
  workspaceInformationState,
} from "@/store";

// 채널 추가에 사용되는 전체 화면을 덮는 모달
export default function AddChannelModal() {
  const { user } = useAuthenticator((context) => [context.user]);

  const router = useRouter();
  const path = usePathname();
  const [_, currentWorkspaceId, currentChannelId] = path.split("/");

  const setShowAddChannelModal = useSetRecoilState(
    showAddChannelModalState
  );

  const setWorkspaceInformation = useSetRecoilState(workspaceInformationState);

  const [channelName, setChannelName] = useState<string>("");
  const [activated, setActivated] = useState(false);

  // 작성된 채널 이름의 변경을 반영하고, 이름의 조건 만족 여부를 확인하고, 채널 생성 버튼을 활성화시킵니다.
  function handleChannelName(e: { target: any }) {
    function checkChannelName(name: string) {
      if (name?.length !== 0) {
        return true;
      }
      return false;
    }

    setChannelName(e.target.value);

    if (checkChannelName(e.target.value)) {
      setActivated(true);
    } else {
      setActivated(false);
    }
  }

  async function fetchWorkspaceData() {
    const { workspaceData } = await getWorkspace(currentWorkspaceId);
    return workspaceData;
  }

  // 채널을 생성하고 해당 채널로 이동합니다.
  async function handleMakeChannel() {
    const makeChannelData = {
      workspaceId: currentWorkspaceId,
      channelName: channelName as string,
      userEmail: user.attributes?.email as string,
    };
    const [makeChannelSuccess, channelData] = await makeChannel(
      makeChannelData
    );

    // 채널 생성에 성공하면 워크스페이스 정보를 새로 받아와 저장하고, 모달을 닫으며 해당 채널로 이동합니다.
    if (makeChannelSuccess) {
      const _ = fetchWorkspaceData().then((result) => {
        setWorkspaceInformation(result);
        setShowAddChannelModal(false);
        router.push(`/${currentWorkspaceId}/${channelData.channel_id}`);
      });
    }
  }

  return (
    <div className="layer pack z(100) bg(--fullscreen-modal-dark-background)">
      <div className="relative w(520) bg(--fullscreen-modal-background) r(8) p(24/28) font-family(Larsseit) @w(~585):w(324)">
        <div className="vbox gap(24)">
          <div className="hbox space-between">
            <div className="c(--fullscreen-modal-text) font(22) bold">
              채널 추가
            </div>
          </div>
          <div className="vbox gap(4)">
            <label
              htmlFor="channel-name"
              className="c(--fullscreen-modal-text) font(15) bold"
            >
              이름
            </label>
            <div className="space(0)"></div>
            <input
              type="text"
              name="channel-name"
              id="channel-name"
              className="b(1/solid/--fullscreen-modal-border) r(4) p(8/12) nowrap... focus:ring(--fullscreen-modal-focus-ring/1.5)"
              value={channelName}
              onChange={handleChannelName}
              autoFocus
            ></input>
            <div className="c(--fullscreen-modal-hint) font(13)">
              채널에서는 특정 주제에 대한 대화가 이루어집니다. 찾고 이해하기
              쉬운 이름을 사용하세요.
            </div>
          </div>
          <div className="hbox(reverse)">
            <button
              className={`bg(--fullscreen-modal-button-background-deactivated) r(4) p(6/24) c(--fullscreen-modal-button-text-deactivated) bold cursor(default)
            ${activated ? "activated" : ""}
            .activated:bg(--fullscreen-modal-button-background-activated)+c(--fullscreen-modal-button-text-activated)+cursor(pointer)`}
              onClick={() => handleMakeChannel()}
            >
              생성
            </button>
          </div>
        </div>
        <button
          className="absolute top(20) right(20) w(36) h(36) r(4) p(8) clip hover:bg(--fullscreen-modal-background-hover)"
          onClick={() => setShowAddChannelModal(false)}
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
