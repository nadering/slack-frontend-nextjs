"use client";

export default function Search() {
  return (
    <div className="hbox pack relative flex-basis(40%) flex-grow(2) @w(~1440):w(~none) @w(1440~):w(~732px)">
      <button
        className="hbox space-between bg(--search-background) r(4) px(8) py(2)
          flex-basis(40%) flex-grow(1) hover:bg(--search-background-hover)"
      >
        <span className="c(--search-text) font-family(Larsseit) font(14) bold letter-spacing(-0.5px) translateY(2px) nowrap...">
          {/* Workspace name */}
          {"테스트 워크스페이스 검색"}
        </span>
        <div className="c(--search-text)">{/* svg icon (search) */}@</div>
      </button>
      <button className="absolute right(32) c(--search-text)">
        {/* filter */}#
      </button>
    </div>
  );
};