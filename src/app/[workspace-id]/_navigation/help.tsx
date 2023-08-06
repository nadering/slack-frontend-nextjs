import React from "react";
import Image from "next/image";

const Help = React.memo(() => {
  return (
    <button className="w(26) h(26) r(4) px(3) clip hover:bg(--search-background-hover)">
      <div className="pack filter-white">
        <Image
          src="/images/help.svg"
          alt="help"
          width={20}
          height={20}
          priority
        />
      </div>
    </button>
  );
});

export default Help;
