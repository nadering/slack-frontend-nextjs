"use client";

import Image from "next/image";

export default function Search() {
  return (
    <div
      className="hbox pack relative h(26) flex-basis(40%) flex-grow(2) flex-shrink(1)
    @w(~1440):w(~none) @w(1440~):w(~732px)"
    >
      <button
        className="hbox space-between h(100%) bg(--search-background) r(4) px(8)
          flex-basis(40%) flex-grow(1) flex-shrink(1) hover:bg(--search-background-hover)"
      >
        <span className="c(--search-text) font-family(Larsseit) font(14) semibold letter-spacing(-0.7px) translateY(1.5px) nowrap...">
          {/* Workspace name */}
          {"테스트 워크스페이스 검색"}
        </span>
        <div className="fill filter-white">
          <Image src="/images/search.svg" alt="search" width={15} height={15} />
        </div>
      </button>
      <button className="absolute right(32)">
        <div className="fill filter-white">
          <Image
            src="/images/search-filter.svg"
            alt="search-filter"
            width={15}
            height={15}
          />
        </div>
      </button>
    </div>
  );
}