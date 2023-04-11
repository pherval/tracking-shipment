export const themes = {
  primary: "bg-blue-500 dark:bg-blue-800 text-white",
  dark: "bg-black text-white",
  secondary:
    "text-black border bg-transparent dark:text-slate-50 dark:border-slate-300",
  flat: "bg-transparent text-slate-500 dark:text-slate-300 py-0 px-0",
};

export type BtnTheme = keyof typeof themes;
