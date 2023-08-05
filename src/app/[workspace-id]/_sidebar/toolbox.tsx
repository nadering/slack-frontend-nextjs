"use client";

import React from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Link from "next/link";
import { currentState } from "@/store";

interface LinkToolProps {
  src: string;
  id: string;
  text: string;
  canActive?: boolean;
  // onClick: function;
}

interface ToolProps {
  src: string;
  text: string;
}

const LinkTool = React.memo(({ src, text, id, canActive = true }: LinkToolProps) => {
  const [current, setCurrent] = useRecoilState(currentState);

  return (
    <Link
      href={`/${id}`}
      className={`hbox h(28) r(8) p(0/4/0/12) gap(8)
    ${id === current && canActive ? "active" : ""}
    .active:bg(--sidebar-active-background)+c(--sidebar-active-text)!
    hover:bg(--sidebar-background-hover)`}
      onClick={() => {
        if (canActive) {
          setCurrent(id);
        }
      }}
    >
      <div className="filter-sidebar-text w(18) h(18)">
        <Image
          src={"/images/" + src + ".svg"}
          alt={src}
          width={18}
          height={18}
        />
      </div>
      <span className="c(--sidebar-text) font(15) font-family(Larsseit) semibold letter-spacing(-0.3px)">
        {text}
      </span>
    </Link>
  );
});

const Tool = React.memo(({ src, text }: ToolProps) => {
  return (
    <button
      className={`hbox h(28) r(8) p(0/4/0/12) gap(8) hover:bg(--sidebar-background-hover)`}
    >
      <div className="filter-sidebar-text w(18) h(18)">
        <Image
          src={"/images/" + src + ".svg"}
          alt={src}
          width={18}
          height={18}
        />
      </div>
      <span className="c(--sidebar-text) font(15) font-family(Larsseit) semibold letter-spacing(-0.3px)">
        {text}
      </span>
    </button>
  );
});

const Toolbox = React.memo(() => {
  return (
    <div className="vbox p(4/8)">
      {/*
      <LinkTool src="mention-and-reaction" id="activity-page" text="멘션 및 반응" />
      <LinkTool src="canvas" id="browse-canvases" text="캔버스" />
      <LinkTool src="slack-connect" id="slack-connect" text="Slack Connect" />
      <LinkTool src="files" id="browses" text="파일" />
      <LinkTool src="show-more" id="show-more" text="더 보기" canActive={false} />
      */}

      <Tool src="mention-and-reaction" text="멘션 및 반응" />
      <Tool src="canvas" text="캔버스" />
      <Tool src="slack-connect" text="Slack Connect" />
      <Tool src="files" text="파일" />
      <Tool src="show-more" text="더 보기" />
    </div>
  );
});

export default Toolbox;
