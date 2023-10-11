import { useEffect, useRef } from "react";

export function useOutsideclick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      // FIX: this logic will always be true if we're using a Modal (modal will
      // be located in document.body and e.target will be somewhere else and so
      // the ref won't contain the e.target)
      if (
        // modal is present
        ref.current &&
        // the target is not inside modal (clicked outside the modal)
        !ref.current?.contains(e.target as T) // FIX: BUG when using portal
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
