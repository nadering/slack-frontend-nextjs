import { atom } from "recoil";

// export const currentChannelNameState = atom<string>({
//   key: "currentChannelNameState",
//   default: ""
// });

// export const currentWorkspaceNameState = atom<string>({
//   key: "currentWorkspaceNameState",
//   default: ""
// });

export const showAddChannelFullscreenModalState = atom<boolean>({
  key: "showAddChannelFullscreenModalState",
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