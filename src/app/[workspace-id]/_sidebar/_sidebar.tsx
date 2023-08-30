"use client";

import Header from "./header";
import Toolbox from "./toolbox";
import ChannelList, { SidebarChannelProps } from "./channel";
import DirectMessage from "./direct-message";
import Divider from "./divider";

interface SidebarProps {
  workspaceName: string;
  channelList: SidebarChannelProps[];
}

export default function Sidebar({ workspaceName, channelList }: SidebarProps) {
  return (
    <div
      className="vbox relative w(0~260) h(100%) py(8) gap(8) bg(--sidebar-background) flex-basis(200px) user-select-none
    transition(transform=.15s/visibility=.15s) @w(~585):translateX(-100%)+hidden+blind @w(~859):w(200~) @w(860~):w(220~) @w(1080~):w(260~)"
    >
      <Header workspaceName={workspaceName} />
      <Divider />
      <Toolbox />
      <Divider />
      <ChannelList channelList={channelList}  />
      <DirectMessage />
    </div>
  );
}
