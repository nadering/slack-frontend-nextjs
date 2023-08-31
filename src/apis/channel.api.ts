import { API_URL } from ".";

interface makeChannelType {
  workspaceId: string;
  channelName: string;
  userEmail: string;
}

export async function makeChannel({ workspaceId, channelName, userEmail }: makeChannelType) {
  const request = await fetch(`${API_URL}/channel`, {
    method: "POST",
    body: JSON.stringify({
      workspace_id: workspaceId,
      channel_name: channelName,
      user_email: userEmail,
    }),
  });
  const response = await request.json();

  if (response.message === "channel created successfully") {
    return [true, response];
  } else {
    return [false, null];
  }
}

interface inviteToChannelType {
  workspaceId: string;
  channelId: string;
  targetUserEmail: string;
}

export async function inviteToChannel({ workspaceId, channelId, targetUserEmail }: inviteToChannelType) {
  try {
    const request = await fetch(`${API_URL}/channel`, {
      method: "PATCH",
      body: JSON.stringify({
        workspace_id: workspaceId,
        channel_id: channelId,
        user_email: targetUserEmail,
      }),
    });
    const response = await request.json();
  
    if (response.message === "invalid workspace") {
      return [false, null];
    } else {
      return [true, response];
    }
  } catch {
    return [false, null];
  }
}