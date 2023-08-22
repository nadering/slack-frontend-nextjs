"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { SetupNavigation } from "../[workspace-id]/_navigation";
import { SetupSidebar } from "../[workspace-id]/_sidebar";
import { inviteToChannel, makeChannel, makeWorkspace } from "@/apis";

interface SetupWorkspaceType {
  workspaceName: string;
  channelName: string;
}

export default function SetupWorkspace() {
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]);
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [channelName, setChannelName] = useState<string>("");
  const [activated, setActivated] = useState(false);

  // 워크스페이스의 이름이 적합한지 확인합니다.
  function checkWorkspaceName(name: string) {
    if (name?.length !== 0) {
      return true;
    }
    return false;
  }

  // 채널의 이름이 적합한지 확인합니다.
  function checkChannelName(name: string) {
    if (name?.length !== 0) {
      return true;
    }
    return false;
  }

  // 워크스페이스의 이름 변경을 반영하고, 워크스페이스 및 채널의 생성 가능 여부를 설정합니다.
  function handleWorkspaceName(e: { target: any }) {
    setWorkspaceName(e.target.value);
    handleActivation({
      workspaceName: e.target.value,
      channelName: channelName,
    });
  }

  // 채널의 이름 변경을 반영하고, 워크스페이스 및 채널의 생성 가능 여부를 설정합니다.
  function handleChannelName(e: { target: any }) {
    setChannelName(e.target.value);
    handleActivation({
      workspaceName: workspaceName,
      channelName: e.target.value,
    });
  }

  // 워크스페이스 및 채널의 생성 가능 여부를 설정합니다.
  function handleActivation({
    workspaceName,
    channelName,
  }: SetupWorkspaceType) {
    if (checkWorkspaceName(workspaceName) && checkChannelName(channelName)) {
      setActivated(true);
    } else {
      setActivated(false);
    }
  }

  // 워크스페이스를 생성하고, 생성된 워크스페이스에 채널을 생성한 후, 해당 워크스페이스로 이동합니다.
  async function handleMakeWorkspace() {
    // 워크스페이스를 생성
    const makeWorkspaceData = {
      workspaceName: workspaceName,
      userEmail: user.attributes?.email as string,
    };
    const [makeWorkspaceSuccess, workspaceData] = await makeWorkspace(
      makeWorkspaceData
    );

    if (!makeWorkspaceSuccess) {
      console.log("워크스페이스 생성에 실패했습니다.");
      return;
    }

    // 워크스페이스 생성에 성공했다면, 채널을 해당 워크스페이스에 생성
    const makeChannelData = {
      workspaceId: workspaceData.workspace_id,
      channelName: channelName,
      userEmail: user.attributes?.email as string,
    };
    const [makeChannelSuccess, channelData] = await makeChannel(
      makeChannelData
    );

    if (!makeChannelSuccess) {
      console.log("채널 생성에 실패했습니다.");
      return;
    }

    // 채널 생성에 성공했다면, 채널에 유저를 추가
    const inviteToChannelData = {
      workspaceId: workspaceData.workspace_id,
      channelId: channelData.channel_id,
      userEmail: user.attributes?.email as string,
    };
    const [inviteToChannelSuccess, usersData] = await inviteToChannel(
      inviteToChannelData
    );

    if (!inviteToChannelSuccess) {
      console.log("채널 초대에 실패했습니다.");
      return;
    }

    // 생성된 워크스페이스로 이동
    router.push(`/${workspaceData.workspace_id}`);
  }

  return (
    <>
      <SetupNavigation />
      <div className="hbox(stretch) h(100vh-44px)">
        <SetupSidebar />
        <div className="vbox gap(16) p(64/80) flex-grow(1)">
          <div className="c(--text) font(35) font-family(Larsseit) heavy">
            새 워크스페이스 개설 중
          </div>
          <div className="vbox gap(8)">
            <label
              htmlFor="workspace-name"
              className="c(--setup-workspace-text) font(15) font-family(Larsseit) bold"
            >
              워크스페이스 이름
            </label>
            <input
              type="text"
              name="workspace-name"
              id="workspace-name"
              className="b(1/solid/--setup-workspace-border) r(4) p(8/12) nowrap... focus:ring(--setup-workspace-focus-ring/1.5)"
              value={workspaceName}
              onChange={handleWorkspaceName}
              autoFocus
            ></input>
          </div>
          <div className="vbox gap(8)">
            <label
              htmlFor="channel-name"
              className="c(--setup-workspace-text) font(15) font-family(Larsseit) bold"
            >
              채널 이름
            </label>
            <input
              type="text"
              name="channel-name"
              id="channel-name"
              className="b(1/solid/--setup-workspace-border) r(4) p(8/12) nowrap... focus:ring(--setup-workspace-focus-ring/1.5)"
              value={channelName}
              onChange={handleChannelName}
            ></input>
          </div>
          <div className="space(16)"></div>
          <button
            className={`w(80) bg(--setup-workspace-button-background-deactivated) r(4) p(6/24) c(--setup-workspace-button-text-deactivated) bold cursor(default) ${
              activated ? "activated" : "disabled"
            } .activated:bg(--setup-workspace-button-background-activated)+c(--setup-workspace-button-text-activated)+cursor(pointer)`}
            onClick={() => handleMakeWorkspace()}
          >
            생성
          </button>
        </div>
      </div>
    </>
  );
}
