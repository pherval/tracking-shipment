import clsx from "clsx";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={clsx(styles.container, "flex h-screen")}>{children}</div>
  );
}
