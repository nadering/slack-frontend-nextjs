"use client";

import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRef } from "react";
import Image from "next/image";
import useModal from "@/hooks/useModal";

export default function Profile() {
  const { user } = useAuthenticator((context) => [context.user]);

  const profileModalRef = useRef(null);
  const profileModal = useModal(profileModalRef);

  function ProfileModal() {
    return (
      <div className="vbox absolute top(100%) right(0) w(200~) bg(--modal-background) r(4) mt(8) p(20/0/12/0) gap(16) c(--text) font(15) font-family(Larsseit) medium box-shadow(0/0/5/--modal-shadow)">
        <div className="hbox px(20) gap(12) items-start">
          <div className="w(36) h(36) r(4) clip">
            <Image
              src="/images/temporary-profile.png"
              alt="profile"
              width={36}
              height={36}
            />
          </div>
          <div className="vbox ">
            <div className="bold">{user.username}</div>
            <div className="hbox gap(4)">
              <div className="w(9) h(9) r(100%) bg(--user-status-active)"></div>
              <span className="c(--user-status-text) font(13) light">
                대화 가능
              </span>
            </div>
          </div>
        </div>
        <button
          className="p(4/20) text-left hover:bg(--modal-hover-background)+c(--modal-hover-text)"
          onClick={() => {
            console.log(`sign out from account ${user.username}`);
            Auth.signOut();
          }}
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="relative w(26) h(26)" ref={profileModalRef}>
      <button className="w(26) h(26) r(4) clip">
        <Image
          src="/images/temporary-profile.png"
          alt="profile"
          width={26}
          height={26}
          priority
        />
      </button>
      {profileModal && <ProfileModal />}
    </div>
  );
}
