"use client";

import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";

export default function Profile() {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <button
      className="w(26) h(26) r(4) clip"
      onClick={() => {
        console.log(`sign out from account ${user.username}`);
        Auth.signOut();
      }}
    >
      <Image
        src="/images/temporary-profile.png"
        alt="profile"
        width={26}
        height={26}
        priority
      />
    </button>
  );
}
