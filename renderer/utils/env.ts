import electron from "electron";

export function isDev(): boolean {
  const ipcRenderer = electron?.ipcRenderer ?? false;

  if (ipcRenderer) {
    return !!ipcRenderer.sendSync("env", "dev");
  }

  return false;
}
