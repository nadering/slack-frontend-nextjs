import { atom } from "recoil";

export const currentState = atom<string>({
  key: "currentState",
  default: ""
});

export const currentWorkspaceState = atom<string>({
  key: "currentWorkspaceState",
  default: ""
});