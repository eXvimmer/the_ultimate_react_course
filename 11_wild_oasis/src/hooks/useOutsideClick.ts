import { useEffect, useRef } from "react";

export function useOutsideclick(handler: () => void, listenCapturing = true) {
  // TODO: make the type of element more flexible
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (
        ref.current && // modal is present
        !ref.current?.contains(e.target as Node) // the target is not inside modal (clicked outside the modal)
      ) {
        handler();
      }
    }

    document.addEventListener("click", handleDocumentClick, listenCapturing);

    return () =>
      document.removeEventListener(
        "click",
        handleDocumentClick,
        listenCapturing,
      );
  }, [handler, listenCapturing]);

  return ref;
}
