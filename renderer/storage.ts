export function getItem<T>(key: string): T | undefined {
  if (typeof window === "undefined") {
    throw new Error("getItem() can only be used in the browser");
  }

  const item = localStorage.getItem(key);
  return parseJSON(item);
}

export function setItem<T>(key: string, item: T) {
  localStorage.setItem(key, JSON.stringify(item));
}

function parseJSON<T>(value?: string | null): T | undefined {
  try {
    return typeof value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return undefined;
  }
}
