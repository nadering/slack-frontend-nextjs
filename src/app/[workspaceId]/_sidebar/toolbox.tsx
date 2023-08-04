import React from "react";
import Image from "next/image";

interface ToolProps {
  src: string;
  text: string;
  // onClick: function;
}

const Tool = React.memo(({ src, text }: ToolProps) => {
  return (
    <button className="hbox h(28) r(8) p(0/4/0/12) gap(8) hover:bg(--sidebar-background-hover)">
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
      <Tool src="mention-and-reaction" text="멘션 및 반응" />
      <Tool src="canvas" text="캔버스" />
      <Tool src="slack-connect" text="Slack Connect" />
      <Tool src="files" text="파일" />
      <Tool src="show-more" text="더 보기" />
    </div>
  );
});

export default Toolbox;
