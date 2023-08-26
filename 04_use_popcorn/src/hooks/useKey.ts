import { useEffect } from "react";

export function useKey(key: string, cb: () => void) {
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        cb();
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [cb, key]);
}
