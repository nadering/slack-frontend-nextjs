"use client";

import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";

export default function Profile() {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div
      className="hbox(right) px(16) flex-basis(5%) flex-grow(1) flex-shrink(1)
      @w(~859):w(auto~) @w(860~):w(220~) @w(1080~):w(260~) @w(~1440):flex-grow(0)"
    >
      <button
        className="w(26) h(26) r(4) clip"
        onClick={() => Auth.signOut()}
      >
        <Image src="/images/temporary-profile.png" alt="profile" width={26} height={26} priority />
      </button>
    </div>
  );
}
