import { Menu, MenuItem } from "electron";

export default function createMenu() {
  const menu = Menu.getApplicationMenu() ?? new Menu();

  menu.items?.[1]?.submenu?.insert(
    0,
    new MenuItem({
      label: "New tracking",
      accelerator: process.platform === "darwin" ? "Cmd+N" : "Ctrl+N",
    })
  );

  return menu;
}
