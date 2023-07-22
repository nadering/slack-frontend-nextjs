import React from "react";

const History = React.memo(() => {
  return (
    <div className="hbox(right) c(white) p(4) px(20) flex-basis(5%) flex-grow(1) flex-shrink(1)
    @w(~859):w(auto~) @w(860~):w(220~) @w(1080~):w(260~) @w(~1440):flex-grow(0)">
      <button className="r(4) px(4) hover:bg(--search-background-hover)">{/* svg icon */}H</button>
    </div>
  );
});

export default History;