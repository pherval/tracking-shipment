export const btnIcon = {
  themes: {
    danger: "text-red-500",
    default: "text-slate-900 dark:text-slate-200",
  },
  sizes: {
    base: "text-xl",
    lg: "text-2xl",
  },
};

export type BtnIconTheme = keyof typeof btnIcon.themes;
export type BtnIconSize = keyof typeof btnIcon.sizes;
