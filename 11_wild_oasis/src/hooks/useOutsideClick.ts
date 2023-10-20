import { useEffect, useRef } from "react";

export function useOutsideclick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (
        // modal is present
        ref.current &&
        // the target is not inside modal (clicked outside the modal)
        !ref.current?.contains(e.target as T)
      ) {
        handler();
      }
    }

    document.addEventListener("click", handleDocumentClick, listenCapturing); // see MDN

    return () =>
      document.removeEventListener(
        "click",
        handleDocumentClick,
        listenCapturing,
      );
  }, [handler, listenCapturing]);

  return ref;
}
