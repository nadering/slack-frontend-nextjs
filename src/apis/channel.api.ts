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

  console.log(response);

  if (response.message === "channel created successfully") {
    return [true, response];
  } else {
    return [false, null];
  }
}