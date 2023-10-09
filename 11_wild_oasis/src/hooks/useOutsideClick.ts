import { useEffect, useRef } from "react";

export function useOutsideclick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true,
) {
  const ref = useRef<T>(null);

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
