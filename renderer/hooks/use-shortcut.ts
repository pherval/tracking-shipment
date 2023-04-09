import { MutableRefObject, RefObject, useEffect, useRef } from "react";

interface UseShortcutOptions {
  // TODO: usar plataforma para definir o tipo correto
  // @example {mac: {}, windows: {}, linux: {}}
  shortcut: Shortcut;
  useGlobal: boolean;
}

type Shortcut =
  | {
      (e: KeyboardEvent): boolean;
    }
  | Partial<{
      key: string;
      code: string;
      metaKey: boolean;
      type: string;
    }>;

type UseShortcutHandler = {
  (e?: KeyboardEvent): void;
};

export function useShortcut(
  handler: UseShortcutHandler,
  options: Partial<UseShortcutOptions> = {},
  target?: HTMLElement | null
) {
  const optionsRef = useRef<Partial<UseShortcutOptions>>(options);

  const { shortcut, useGlobal = true } = optionsRef.current;

  useEffect(() => {
    const actualTarget = target ?? (useGlobal ? window?.document : null);

    if (!actualTarget?.addEventListener) return;

    const targetAbort = new AbortController();

    actualTarget.addEventListener(
      "keydown",
      (e) => {
        const ev = e as KeyboardEvent;

        const isValid =
          shortcut instanceof Function
            ? shortcut(ev)
            : Object.keys(shortcut ?? {}).every(
                (key) =>
                  ev[key] ===
                  Object.getOwnPropertyDescriptor(shortcut, key)?.value
              );

        isValid && handler(ev);
      },
      {
        passive: true,
        signal: targetAbort.signal,
      }
    );

    return () => {
      targetAbort.abort();
    };
  }, [target, useGlobal, handler, shortcut]);
}
