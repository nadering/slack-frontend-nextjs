import React from "react";
import Image from "next/image";

const History = React.memo(() => {
  return (
    <div
      className="hbox(right) px(20) flex-basis(5%) flex-grow(1) flex-shrink(1)
    @w(~859):w(auto~) @w(860~):w(220~) @w(1080~):w(260~) @w(~1440):flex-grow(0)"
    >
      <button className="w(26) h(26) r(4) px(4) hover:bg(--search-background-hover)">
        <div className="fill filter-white">
          <Image
            src="/images/history.svg"
            alt="history"
            width={20}
            height={20}
            priority
          />
        </div>
      </button>
    </div>
  );
});

export default History;
