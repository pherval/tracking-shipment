import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

interface ListProps<T> {
  items: T[];
  children?: (item: T, index?: number) => JSX.Element;
  isSelected?: (item: T) => boolean;
}

export default function List<T extends { id: any }>({
  isSelected,
  children,
  items = [],
}: ListProps<T>) {
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={container} className="overflow-auto outline-none" tabIndex={3}>
      <AnimatePresence>
        {items?.map((item, index) => (
          <motion.div
            variants={{
              closed: { x: -200, opacity: 0 },
              open: { x: 0, opacity: 1 },
            }}
            initial="closed"
            className={clsx(
              "outline-none flex flex-col relative after:block after:w-[90%] after:h-[1px] after:dark:bg-gray-700 after:bg-slate-200 after:bottom-[-1px] after:absolute after:left-[5%] last:after:h-0 after:rounded-lg transition duration-75",
              isSelected?.(item) && "after:h-0"
            )}
            whileInView="open"
            exit="closed"
            key={item.id}
            transition={{ duration: 0.1, delay: index * 0.1 }}
            tabIndex={index}
          >
            {children?.(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
