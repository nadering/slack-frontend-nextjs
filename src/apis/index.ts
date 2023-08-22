const API_URL = "https://dkis96n5a5.execute-api.ap-northeast-2.amazonaws.com";

import { getWorkspaces, makeWorkspace } from "./workspace.api";
import { makeChannel } from "./channel.api";

export { API_URL, getWorkspaces, makeWorkspace, makeChannel };