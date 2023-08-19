"use client";

import { useRecoilValue } from "recoil";
import { showAddChannelFullscreenModalState } from "@/store";
import { Sidebar, AddChannelFullscreenModal } from "../_sidebar";
import { Navigation } from "../_navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showAddChannelFullscreenModal = useRecoilValue(showAddChannelFullscreenModalState);

  return (
    <>
      {showAddChannelFullscreenModal && <AddChannelFullscreenModal />}
      <Navigation />
      <div className="hbox(stretch) h(100vh-44px)">
        <Sidebar />
        {children}
      </div>
    </>
  )
}