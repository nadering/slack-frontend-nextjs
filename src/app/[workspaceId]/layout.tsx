import { Sidebar } from "./_sidebar";
import { Navigation } from "./_navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="hbox(stretch) h(calc(100vh-44px))">
        <Sidebar />
        {children}
      </div>
    </>
  )
}