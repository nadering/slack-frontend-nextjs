import { redirect } from "next/navigation";

export default function Home() {
  // temporary redirect to workspaceId 123
  redirect("/123");

  return <div></div>;
}
