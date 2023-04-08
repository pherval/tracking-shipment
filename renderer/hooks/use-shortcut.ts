import { useEffect } from "react";

interface UseShortcutOptions {
  // TODO: usar plataforma para definir o tipo correto
  // @example {mac: {}, windows: {}, linux: {}}
  shortcut: Shortcut;
  target: HTMLElement | null;
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
    }>;

type UseShortcutHandler = {
  (e?: KeyboardEvent): void;
};

export function useShortcut(
  handler: UseShortcutHandler,
  { shortcut, target, useGlobal = true }: Partial<UseShortcutOptions> = {}
) {
  useEffect(() => {
    const actualTarget = target ?? (useGlobal ? window?.document : null);

    const targetListener: EventListener = (e) => {
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
    };

    actualTarget?.addEventListener("keydown", targetListener, true);

    return () => {
      actualTarget?.removeEventListener("keydown", targetListener, true);
    };
  }, [handler, target, shortcut, useGlobal]);
}
