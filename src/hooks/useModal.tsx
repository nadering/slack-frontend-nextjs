import { RefObject, useEffect, useState } from "react";

export default function useModal(wrapperRef: RefObject<HTMLElement>, event: "click" | "contextmenu" = "click") {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: { target: any }) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    wrapperRef.current?.addEventListener(event, () => setModalOpen(true));

    return () => {
      document.removeEventListener('click', handleClickOutside);
      wrapperRef.current?.removeEventListener(event, () => setModalOpen(true));
    }
  }, []);

  return modalOpen;
}