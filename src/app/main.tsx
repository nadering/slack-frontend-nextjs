import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getWorkspaces } from "@/apis";
import { workspaceListState } from "@/store";

interface WorkspaceInformationProps {
  name: string;
  id: string;
  memberCount: number;
}

const WorkspaceInformation = React.memo(
  ({ id, name, memberCount }: WorkspaceInformationProps) => {
    return (
      <div className="hbox items-center relative h(75px+32px~) bg(--background) bb(1px/solid/--main-workspace-divider) p(16) gap(16) transition(background=.15s) hover:bg(--background-hover) last-child:rb(6)+bb(0)">
        <div className="vbox gap(4)">
          <p className="c(--main-workspace-text) font(18) font-family(Larsseit) break-word">
            {name}
          </p>
          <p className="c(--main-workspace-detail-text) font(14) font-family(Larsseit)">
            {memberCount}명의 멤버
          </p>
        </div>
        <Link
          href={`/${id}`}
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
  const [workspaceList, setWorkspaceList] = useRecoilState(workspaceListState);

  useEffect(() => {
    async function fetchWorkspaces() {
      const { workspaces } = await getWorkspaces({
        userEmail: user.attributes?.email as string,
      });
      return workspaces;
    }
    const _ = fetchWorkspaces().then((result) => {
      setWorkspaceList(result);
    });
  }, []);

  return (
    <div className="vbox r(8) b(3px/solid/--main-workspace-border)">
      <div className="h(50px+32px~) bg(--main-workspace-title-background) rt(6) p(16) c(--text) text(middle) font(18) font-family(Sailec)">
        {user.username}의 워크스페이스
      </div>
      {workspaceList?.length !== 0 ? (
        workspaceList?.map((workspace) => {
          return (
            <WorkspaceInformation
              key={workspace.id}
              id={workspace.id}
              name={workspace.name}
              memberCount={workspace.cnt}
            />
          );
        })
      ) : (
        <div className="hbox items-center relative h(75px+32px~) bg(--background) bb(1px/solid/--main-workspace-divider) p(16) gap(16) transition(background=.15s) hover:bg(--background-hover) last-child:rb(6)+bb(0)">
          <div className="vbox gap(4)">
            <p className="c(--main-workspace-text) font(18) font-family(Larsseit) break-word">
              현재 워크스페이스가 없습니다. 새로운 워크스페이스를 개설하세요.
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

const Main = () => {
  return (
    <main className="vbox w(100vw) h(100vh-80px~) bg(--main-background) p(40/32) mx(auto) md:w(~1000) ~md:w(546~)">
      <section className="vbox gap(20)">
        <div className="hbox">
          <span className="c(--main-text) font(44) font-family(Larsseit) heavy letter-spacing(-1px) word-spacing(10px) break-word">
            또 만나게 되어 반가워요
          </span>
        </div>
        <WorkspaceList />
      </section>
    </main>
  );
};

export default Main;
