import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SidebarChannelProps {
  name: string;
  id: string;
}

const Channel = React.memo(() => {
  // temporary state and hooks
  const [activeChannelID, setActiveChannelID] = useState<string>("");
  const [channelList, setChannelList] = useState<SidebarChannelProps[]>([
    // temporary array
    // ToDo: get channel list with useEffect or React-Query
    {
      name: "회의",
      id: "conversation",
    },
    {
      name: "테스트",
      id: "test",
    },
  ]);
  const [hideChannels, setHideChannels] = useState<boolean>(false);

  const ChannelManager = React.memo(() => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
      <div
        className="hbox h(28) r(8) p(0/4/0/8)"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <button
          className={`w(26) h(28) r(8) p(4) transition(transform=.25s) .hide-channels:rotateZ(-90deg)
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
          {hovered ? (
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

  const SidebarChannel = React.memo(({ name, id }: SidebarChannelProps) => {
    return (
      <button
        className={`hbox h(28) r(8) p(0/4/0/12) gap(8)
        ${id === activeChannelID ? "active" : ""}
        .active:bg(--sidebar-active-background)+c(--sidebar-active-text)!
        hover:bg(--sidebar-background-hover)`}
        onClick={() => setActiveChannelID(id)}
      >
        <div className="fill filter-sidebar-text w(18) h(18)">
          <Image
            src={"/images/channel-tag.svg"}
            alt="channel-tag"
            width={16}
            height={16}
          />
        </div>
        <span className="c(--sidebar-text) font(15) font-family(Larsseit) semibold letter-spacing(-0.3px)">
          {name}
        </span>
      </button>
    );
  });

  const ChannelList = React.memo(() => {
    return (
      <>
        {channelList.map((channel) => {
          if (
            !hideChannels ||
            (hideChannels && channel.id === activeChannelID)
          ) {
            return <SidebarChannel key={channel.id} name={channel.name} id={channel.id} />;
          }
        })}
      </>
    );
  });

  const AddChannel = React.memo(() => {
    return (
      <button className="hbox h(28) r(8) p(0/4/0/10) gap(8)">
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
});

export default Channel;
