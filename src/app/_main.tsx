import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface WorkspaceInformationProps {
  src: string;
  name: string;
  id: string;
  member: number;
}

const WorkspaceInformation = React.memo(
  ({ src, name, id, member }: WorkspaceInformationProps) => {
    return (
      <div className="hbox items-center relative h(75px+32px~) bg(--background) bb(1px/solid/--main-workspace-divider) p(16) gap(16) transition(background=.15s) hover:bg(--background-hover) last-child:rb(6)+bb(0)">
        <div className="w(75) h(75) r(4) clip">
          <Image
            src={"/images/" + src}
            alt="workspace-image"
            width={75}
            height={75}
          />
        </div>
        <div className="vbox gap(4)">
          <p className="c(--main-workspace-text) font(18) font-family(Larsseit) heavy">
            {name}
          </p>
          <p className="c(--main-workspace-detail-text) font(14) font-family(Larsseit)">
            {member}명의 멤버
          </p>
        </div>
        <Link
          href={`/${id}`}
          as={"image"}
          className="absolute right(16) r(4) p(16) bg(--main-workspace-button-background) transition(background=.35s) hover:bg(--main-workspace-button-background-hover)"
        >
          <span className="c(--main-text) text(pack) font(14) font-family(Larsseit) heavy">
            SLACK 실행
          </span>
        </Link>
      </div>
    );
  }
);

const WorkspaceList = React.memo(() => {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div className="vbox r(8) b(3px/solid/--main-workspace-border)">
      <div className="h(50px+32px~) bg(--main-workspace-title-background) rt(6) p(16) c(--text) text(middle) font(18) font-family(Sailec)">
        {user.username}의 워크스페이스
      </div>
      <WorkspaceInformation
        src="workspace-test-1.png"
        name="회의"
        id="conversation"
        member={5}
      />
      <WorkspaceInformation
        src="workspace-test-2.png"
        name="테스트"
        id="test"
        member={3}
      />
      <WorkspaceInformation
        src="workspace-test-1.png"
        name="회의"
        id="conversation"
        member={5}
      />
      <WorkspaceInformation
        src="workspace-test-2.png"
        name="테스트"
        id="test"
        member={3}
      />
      <WorkspaceInformation
        src="workspace-test-1.png"
        name="회의"
        id="conversation"
        member={5}
      />
      <WorkspaceInformation
        src="workspace-test-2.png"
        name="테스트"
        id="test"
        member={3}
      />
      <WorkspaceInformation
        src="workspace-test-1.png"
        name="회의"
        id="conversation"
        member={5}
      />
      <WorkspaceInformation
        src="workspace-test-2.png"
        name="테스트"
        id="test"
        member={3}
      />
    </div>
  );
});

const Main = () => {
  return (
    <main className="vbox w(100vw) h(100vh-80px~) bg(--main-background) p(40/32) mx(auto) md:w(~1000) ~md:w(546~)">
      <section className="vbox gap(20)">
        <div className="hbox">
          {/* Image */}
          <span className="c(--main-text) font(44) font-family(Larsseit) heavy letter-spacing(-1px) word-spacing(10px)">
            또 만나게 되어 반가워요
          </span>
        </div>
        <WorkspaceList />
      </section>
    </main>
  );
};

export default Main;
