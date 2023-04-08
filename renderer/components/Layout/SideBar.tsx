import { Variants, motion } from "framer-motion";
import { useLayoutContext } from ".";

interface SideBarProps {
  children: React.ReactNode;
}

const variants: Variants = {
  open: {
    width: "initial",
    opacity: 1,
    x: 0,
  },
  closed: {
    width: 0,
    opacity: 0,
    x: "-100%",
  },
};
export default function SideBar({
  children,
}: SideBarProps): JSX.Element | null {
  const { showSideBar } = useLayoutContext();

  return (
    <motion.div
      animate={showSideBar ? "open" : "closed"}
      variants={variants}
      className="flex flex-col justify-between shadow-inner"
    >
      {children}
    </motion.div>
  );
}
