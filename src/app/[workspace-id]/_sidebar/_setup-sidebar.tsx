export default function SetupSidebar() {
  return (
    <div
      className="vbox relative w(0~260) h(100%) py(8) gap(8) bg(--sidebar-background) flex-basis(200px) user-select-none
    transition(transform=.15s/visibility=.15s) @w(~585):translateX(-100%)+hidden+blind @w(~859):w(200~) @w(860~):w(220~) @w(1080~):w(260~)"
    >
    </div>
  );
}