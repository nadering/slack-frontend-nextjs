import { atom } from "recoil";

export const showAddChannelModalState = atom<boolean>({
  key: "showAddChannelModalState",
  default: false
});

export const showInviteToChannelModalState = atom<boolean>({
  key: "showInviteToChannelModalState",
  default: false
});

export const showInviteToWorkspaceModalState = atom<boolean>({
  key: "showInviteToWorkspaceModalState",
  default: false
});

export const workspaceListState = atom<any[]>({
  key: "workspaceListState",
  default: []
});

export const workspaceInformationState = atom<any>({
  key: "workspaceInformationState",
  default: null
});