"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SetupSidebar } from "./_sidebar";
import { SetupNavigation } from "./_navigation";
import { getWorkspace } from "@/apis";


export default function Workspace() {
  // Fetch workspace data using API, and routes to /{channel-id}
  // React-Query or getStaticProps (Next.js) >> Store at Recoil >> Push with routes >> Display with data, and fetch channel data (chatting / socket)
  const router = useRouter();
  const path = usePathname();
  const [_, currentWorkspaceId] = path.split("/");

  useEffect(() => {
    async function fetchWorkspaceData() {
      const { workspaceData } = await getWorkspace(currentWorkspaceId);
      return workspaceData;
    }
    const _ = fetchWorkspaceData().then(
      result => {
        const channelSK = result.channels[0].SK as string;
        const channelId = channelSK.substring(channelSK.indexOf('#') + 1);
        router.push(`/${currentWorkspaceId}/${channelId}`);
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
