import { Variants, motion } from "framer-motion";

interface SideBarProps {
  children: React.ReactNode;
  open?: boolean;
}

const variants: Variants = {
  open: {
    width: "initial",
  },
  closed: {
    width: 0,
  },
};
export default function SideBar({
  open = true,
  children,
}: SideBarProps): JSX.Element | null {
  return (
    <motion.div
      animate={open ? "open" : "closed"}
      variants={variants}
      className="flex flex-col justify-between shadow-inner"
    >
      {children}
    </motion.div>
  );
}
