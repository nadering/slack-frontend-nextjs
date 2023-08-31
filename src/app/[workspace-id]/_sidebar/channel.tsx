"use client";

import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  showAddChannelModalState,
  showInviteToChannelModalState,
} from "@/store";
import useModal from "@/hooks/useModal";

export interface SidebarChannelProps {
  name: string;
  id: string;
}

const Channel = React.memo(
  ({ channelList }: { channelList: SidebarChannelProps[] }) => {
    // Next.js 13+ 라우팅
    const router = useRouter();
    const path = usePathname();
    const [_, currentWorkspaceId, currentChannelId] = path.split("/");

    // 채널 관리
    const [channelManagerHovered, setChannelManagerHovered] = useState(false);
    const [hideChannels, setHideChannels] = useState(false);

    // 채널 추가 모달
    const setShowAddChannelModal = useSetRecoilState(showAddChannelModalState);

    // 선택되지 않은 채널의 숨김 여부를 결정합니다.
    const ChannelManager = React.memo(() => {
      return (
        <div
          className="hbox items-center h(28) r(8) p(0/4/0/8)"
          onMouseOver={() => setChannelManagerHovered(true)}
          onMouseOut={() => setChannelManagerHovered(false)}
        >
          <button
            className={`w(26) h(26) r(8) p(4) transition(transform=.25s) .hide-channels:rotate(-90)
          hover:bg(--sidebar-background-hover) ${
            hideChannels ? "hide-channels" : ""
          }`}
            onClick={() => {
              setHideChannels((prev) => !prev);
            }}
          >
            <div className="filter-sidebar-text translateX(3px)">
              <Image
                src={"/images/channel-hide.svg"}
                alt="channel-hide"
                width={11}
                height={11}
              />
            </div>
          </button>
          <button className="hbox gap(4) r(8) p(4) hover:bg(--sidebar-background-hover)">
            <span className="c(--sidebar-text) font(15) font-family(Larsseit) semibold letter-spacing(-0.3px)">
              채널
            </span>
            {channelManagerHovered ? (
              <span className="filter-white">
                <Image
                  src="/images/workspace-detail.svg"
                  alt="workspace-detail"
                  width={18}
                  height={18}
                />
              </span>
            ) : (
              <span className="w(18) h(18)"></span>
            )}
          </button>
        </div>
      );
    });

    // 사이드바에 표시되는 채널 하나를 나타내는 컴포넌트
    const SidebarChannel = React.memo(({ name, id }: SidebarChannelProps) => {
      const channelModalRef = useRef(null);
      const channelModal = useModal(channelModalRef, "contextmenu");

      const setShowInviteToChannelModal = useSetRecoilState(
        showInviteToChannelModalState
      );

      function ChannelModal() {
        return (
          <div className="vbox absolute top(100%) left(20) w(260~) bg(--modal-background) r(4) mt(8) py(12) gap(16) z(100) c(--text) font(15) font-family(Larsseit) medium box-shadow(0/0/5/--modal-shadow)">
            <button
              className="p(4/20) text-left hover:bg(--modal-hover-background)+c(--modal-hover-text)"
              onClick={() => {
                setShowInviteToChannelModal(true);
              }}
            >
              현재 채널에 사용자 초대
            </button>
          </div>
        );
      }

      return (
        <div className="relative">
          <button
            className={`hbox items-center w(100%) h(28) r(8) p(0/4/0/12) gap(8) ${
              id === currentChannelId ? "active" : ""
            } .active:bg(--sidebar-active-background)+c(--sidebar-active-text) hover:bg(--sidebar-background-hover)`}
            onClick={() => {
              router.push(`/${currentWorkspaceId}/${id}`);
            }}
            onContextMenu={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
            }}
            ref={channelModalRef}
          >
            <div className="filter-sidebar-text w(18) h(18)">
              <Image
                src={"/images/channel-tag.svg"}
                alt="channel-tag"
                width={16}
                height={16}
              />
            </div>
            <span className="c(--sidebar-text) font(15) font-family(Larsseit) semibold letter-spacing(-0.3px) translateY(1.4px)">
              {name}
            </span>
            <div className="flex"></div>
          </button>
          {channelModal && id === currentChannelId && <ChannelModal />}
        </div>
      );
    });

    // 사이드바에 채널 전체를 나타내는 컴포넌트
    const ChannelList = React.memo(() => {
      return (
        <>
          {channelList.map((channel) => {
            if (
              !hideChannels ||
              (hideChannels && channel.id === currentChannelId)
            ) {
              return (
                <SidebarChannel
                  key={channel.id}
                  name={channel.name}
                  id={channel.id}
                />
              );
            }
          })}
        </>
      );
    });

    // 채널 추가 컴포넌트
    const AddChannel = React.memo(() => {
      return (
        <button
          className="hbox h(28) r(8) p(0/4/0/10) gap(8)"
          onClick={() => setShowAddChannelModal(true)}
        >
          <div className="w(20) h(20) r(4) bg(--sidebar-add-channel-background)">
            <div className="text(pack) c(--sidebar-text) font(15) font-family(Larsseit)">
              +
            </div>
          </div>
          <span className="c(--sidebar-text) font(15) font-family(Larsseit) semibold letter-spacing(-0.3px)">
            채널 추가
          </span>
        </button>
      );
    });

    return (
      <div className="vbox p(4/8)">
        <ChannelManager />
        <ChannelList />
        <AddChannel />
      </div>
    );
  }
);

export default Channel;
