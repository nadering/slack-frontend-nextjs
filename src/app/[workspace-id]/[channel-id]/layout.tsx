"use client";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRouter, usePathname } from "next/navigation";
import {
  showAddChannelFullscreenModalState,
  workspaceInformationState,
} from "@/store";
import { Sidebar, AddChannelFullscreenModal } from "../_sidebar";
import { Navigation } from "../_navigation";
import { SidebarChannelProps } from "../_sidebar/channel";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const [_, currentWorkspaceId, currentChannelId] = path.split("/");

  const workspaceInformation = useRecoilValue(workspaceInformationState);
  const showAddChannelFullscreenModal = useRecoilValue(
    showAddChannelFullscreenModalState
  );

  // 워크스페이스 페이지로 돌아가 워크스페이스 정보를 새롭게 가져옵니다.
  function GetWorkspaceInformation() {
    router.push(`/${currentWorkspaceId}?redirect-channel=${currentChannelId}`);
  }

  // 워크스페이스 정보에서 채널 리스트를 선택해 반환합니다.
  function getChannelList() {
    const channelList = (workspaceInformation.channels as Array<any>).map(
      (channel) => {
        const name = channel.channel_name;
        const sk = channel.SK as string;
        const id = sk.substring(sk.indexOf("#") + 1);

        return { name: name, id: id };
      }
    );
    return channelList as SidebarChannelProps[];
  }

  // 현재 워크스페이스 정보가 없으면, 워크스페이스 정보를 새롭게 가져옵니다.
  useEffect(() => {
    if (workspaceInformation === null) {
      GetWorkspaceInformation();
    }
  });

  return (
    <>
      {workspaceInformation === null ? (
        <>{GetWorkspaceInformation()}</>
      ) : (
        <>
          {showAddChannelFullscreenModal && <AddChannelFullscreenModal />}
          <Navigation workspaceName={workspaceInformation.workspace_name} />
          <div className="hbox(stretch) h(100vh-44px)">
            <Sidebar
              workspaceName={workspaceInformation.workspace_name}
              channelList={getChannelList()}
            />
            {children}
          </div>
        </>
      )}
    </>
  );
}
