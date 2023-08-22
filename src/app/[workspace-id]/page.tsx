"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SetupSidebar } from "./_sidebar";
import { SetupNavigation } from "./_navigation";
import { getWorkspace } from "@/apis";

interface WorkspaceProps {
  workspaceData: any;
}

export default function Workspace({ workspaceData }: WorkspaceProps) {
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
    const workspaceData = fetchWorkspaceData();
    
    router.push(`/${currentWorkspaceId}/${workspaceData}`)
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

