import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

interface ListProps<T> {
  items: T[];
  children?: (item: T, index?: number) => JSX.Element;
  filter?: (item: T) => boolean;
  onSelect: (item: T) => void;
  onExit?: () => void;
  selectedIndex: number;
}

export default function List<T extends { id: any }>({
  filter = () => true,
  onSelect,
  selectedIndex,
  children,
  items = [],
}: ListProps<T>) {
  const container = useRef<HTMLDivElement | null>(null);
  const filteredResults = items?.filter(filter);

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
        className="flex items-center justify-center grow"
      >
        no items registered
      </motion.div>
    );
  }

  return (
    <div ref={container} className="overflow-auto outline-none">
      <AnimatePresence>
        {filteredResults?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { delay: items?.length * 0.15 },
            }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="flex items-center justify-center grow"
          >
            no results
          </motion.div>
        ) : (
          filteredResults?.map((item, index) => (
            <motion.div
              variants={{
                closed: {
                  x: -150,
                  opacity: 0,
                  transition: { duration: 0.1, delay: index * 0.15 },
                },
                open: { x: 0, opacity: 1 },
              }}
              initial="closed"
              className={clsx(
                "outline-none flex flex-col relative after:block after:w-[90%] after:h-[1px] after:dark:bg-gray-700 after:bg-slate-200 after:bottom-[-1px] after:absolute after:left-[5%] last:after:h-0 after:rounded-lg",
                selectedIndex === index && "after:w-0"
              )}
              whileInView="open"
              exit="closed"
              key={item.id}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              tabIndex={index}
              onClick={() => {
                onSelect(item);
              }}
            >
              {children?.(item, index)}
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
