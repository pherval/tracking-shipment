import { AnimatePresence, motion } from "framer-motion";
import Divider from "./Divider";
import { useRef } from "react";
import { useShortcut } from "../hooks";

interface ListProps<T> {
  items: T[];
  children?: (item: T, index?: number) => JSX.Element;
  filter?: (item: T) => boolean;
  onSelect: (item: T) => void;
}

// TODO: mudar selected usando setas
export default function List<T extends { id: any }>({
  filter = () => true,
  onSelect,
  children,
  items = [],
}: ListProps<T>) {
  const container = useRef<typeof motion.div | null>(null);
  const filteredResults = items?.filter(filter);

  if (items.length === 0) {
    return (
      <motion.div
        ref={container}
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
            className="flex flex-col"
            whileInView="open"
            exit="closed"
            key={item.id}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            onClick={() => onSelect(item)}
          >
            {children?.(item, index)}
            {<Divider />}
          </motion.div>
        ))
      )}
    </AnimatePresence>
  );
}
