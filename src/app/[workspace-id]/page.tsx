import { SetupSidebar } from "./_sidebar";
import { SetupNavigation } from "./_navigation";

export default function Workspace() {
  // Fetch workspace data using API, and routes to /{channel-id}
  // React-Query or getStaticProps (Next.js) >> Store at Recoil >> Push with routes >> Display with data, and fetch channel data (chatting / socket)
  return (
    <>
      <SetupNavigation />
      <div className="hbox(stretch) h(100vh-44px)">
        <SetupSidebar />
      </div>
    </>
  )
}
