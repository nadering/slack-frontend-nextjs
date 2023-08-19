"use client";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import Image from "next/image";
import { showAddChannelFullscreenModalState } from "@/store";

export default function AddChannelFullscreenModal() {
  const setShowAddChannelFullscreenModal = useSetRecoilState(
    showAddChannelFullscreenModalState
  );

  const [channelName, setChannelName] = useState<string>();
  const [activated, setActivated] = useState(false);

  // Handles changes of channel name, checks channel name condition, and sets button activation.
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
            >
              {/* onClick: 채널을 생성하는 API를 호출, 완료되면 채널 정보를 가져오는 API를 다시 호출, 그 후 모달을 닫고 해당 채널로 이동 */}
              생성
            </button>
          </div>
        </div>
        <button
          className="absolute top(20) right(20) w(36) h(36) r(4) p(8) clip hover:bg(--fullscreen-modal-background-hover)"
          onClick={() => setShowAddChannelFullscreenModal(false)}
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
