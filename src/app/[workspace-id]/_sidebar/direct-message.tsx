"use client";

import React, { useState } from "react";
import Image from "next/image";

const DirectMessage = React.memo(() => {
  const [directMessageManagerHovered, setDirectMessageManagerHovered] =
    useState<boolean>(false);
  const [hideDirectMessages, setHideDirectMessages] = useState<boolean>(false);

  const DirectMessageManager = React.memo(() => {
    return (
      <div
        className="hbox items-center h(28) r(8) p(0/4/0/8)"
        onMouseOver={() => setDirectMessageManagerHovered(true)}
        onMouseOut={() => setDirectMessageManagerHovered(false)}
      >
        <button
          className={`w(26) h(26) r(8) p(4) transition(transform=.25s) .hide-channels:rotateZ(-90deg)
          hover:bg(--sidebar-background-hover) ${
            hideDirectMessages ? "hide-channels" : ""
          }`}
          onClick={() => {
            setHideDirectMessages((prev) => !prev);
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
            다이렉트 메시지
          </span>
          {directMessageManagerHovered ? (
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

  return (
    <div className="vbox p(4/8)">
      <DirectMessageManager />
    </div>
  );
});

export default DirectMessage;
