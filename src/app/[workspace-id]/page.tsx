"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { SetupSidebar } from "./_sidebar";
import { SetupNavigation } from "./_navigation";
import { getWorkspace } from "@/apis";
import { workspaceInformationState } from "@/store";

export default function Workspace() {
  // API를 호출하여 워크스페이스의 정보를 받아와 저장하고, /[workspace-id]/[channel-id] 경로로 이동합니다.
  // useEffect() >> Recoil에 저장 >> Router를 이용해 경로 이동
  const router = useRouter();
  const path = usePathname();
  const [_, currentWorkspaceId] = path.split("/");
  const searchParams = useSearchParams();

  const setWorkspaceInformation = useSetRecoilState(workspaceInformationState);

  useEffect(() => {
    // 워크스페이스의 정보를 받아와 저장합니다.
    async function fetchWorkspaceData() {
      const { workspaceData } = await getWorkspace(currentWorkspaceId);
      return workspaceData;
    }
    const _ = fetchWorkspaceData().then((result) => {
      setWorkspaceInformation(result);

      // 리다이렉트할 채널이 지정되어 있다면 해당 채널로 이동하고,
      // 그렇지 않다면 API에서 0번 인덱스로 반환한 채널로 이동합니다.
      if (searchParams.has("redirect-channel")) {
        const redirectText = searchParams.get("redirect-channel");
        router.push(`/${currentWorkspaceId}/${redirectText}`)
      } else {
        const channelSK = result.channels[0].SK as string;
        const channelId = channelSK.substring(channelSK.indexOf("#") + 1);

        router.push(`/${currentWorkspaceId}/${channelId}`);
      }
    });
  }, []);

  return (
    <>
      <SetupNavigation />
      <div className="hbox(stretch) h(100vh-44px)">
        <SetupSidebar />
      </div>
    </>
  );
}
