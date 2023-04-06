import { ipcMain } from "electron";
import createWindow from "./create-window";

ipcMain.handle("ping", () => "pong");

export { createWindow };
