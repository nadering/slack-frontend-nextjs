import React from "react";
import Image from "next/image";

const History = React.memo(() => {
  return (
    <div
      className="hbox(right) p(0/20/0/16) flex-basis(5%) flex-grow(1) flex-shrink(1)
    @w(~859):w(auto~) @w(860~):w(220~) @w(1080~):w(260~) @w(~1440):flex-grow(0)"
    >
      <button className="w(26) h(26) r(4) px(3) clip hover:bg(--search-background-hover)">
        <div className="pack filter-white">
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
