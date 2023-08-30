import { API_URL } from ".";


export async function getWorkspace(workspaceId: string) {
  const request = await fetch(`${API_URL}/workspace/${workspaceId}`);
  const response = await request.json();
  const workspaceData = response;

  return { workspaceData };
}

interface getWorkspacesType {
  userEmail: string;
}

export async function getWorkspaces({ userEmail }: getWorkspacesType) {
  const request = await fetch(`${API_URL}/workspaces/${userEmail}`);
  const response = await request.json();
  const workspaces = response;

  return { workspaces };
}

interface makeWorkspaceType {
  workspaceName: string;
  userEmail: string;
}

export async function makeWorkspace({ workspaceName, userEmail }: makeWorkspaceType) {
  const request = await fetch(`${API_URL}/workspace`, {
    method: "POST",
    body: JSON.stringify({
      workspace_name: workspaceName,
      user_email: userEmail,
    }),
  });
  const response = await request.json();

  if (response.message === "workspace created successfully") {
    return [true, response];
  } else {
    return [false, null];
  }
}
