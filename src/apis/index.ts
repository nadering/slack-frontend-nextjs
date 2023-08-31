const API_URL = "https://dkis96n5a5.execute-api.ap-northeast-2.amazonaws.com";

import { getWorkspace, getWorkspaces, makeWorkspace, inviteToWorkspace } from "./workspace.api";
import { makeChannel, inviteToChannel } from "./channel.api";

export { API_URL, getWorkspace, getWorkspaces, makeWorkspace, inviteToWorkspace, makeChannel, inviteToChannel };