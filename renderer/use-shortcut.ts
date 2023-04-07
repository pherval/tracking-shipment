import { useEffect } from "react";

export function useShortcut(
  listener: (e: KeyboardEvent) => void,
  el?: HTMLElement | null
) {
  useEffect(() => {
    const target = el ?? (typeof window !== "undefined" ? window : undefined);

    function targetListener(e: Event) {
      listener(e as KeyboardEvent);
    }

    target?.addEventListener("keydown", targetListener, true);

    return () => {
      target?.removeEventListener("keyup", targetListener);
    };
  }, [listener, el]);
}
