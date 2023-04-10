import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import SearchBar from "./SearchBar";

interface SearchListProps<T> {
  items: T[];
  children?: (filteredResults: T[]) => React.ReactNode;
  emptyState?: React.ReactNode;
  noResults?: React.ReactNode;
  filter: (searchTerm: string, item: T) => boolean;
}

export default function SearchList<T>({
  items,
  emptyState,
  filter,
  children,
  noResults,
}: SearchListProps<T>) {
  const [filteredResults, setFilteredResults] = useState<T[]>(items);
  const searchByTrackingNumber = useCallback(
    (searchTerm: string) => {
      setFilteredResults(items.filter((item) => filter(searchTerm, item)));
    },
    [filter, items]
  );

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
        className="flex items-center justify-center grow"
      >
        {emptyState ?? "no items registered"}
      </motion.div>
    );
  }

  return (
    <>
      <SearchBar onSearch={searchByTrackingNumber} />
      {filteredResults.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { delay: items?.length * 0.15 },
          }}
          className="flex items-center justify-center grow"
        >
          {noResults ?? "no results"}
        </motion.div>
      )}
      {children?.(filteredResults)}
    </>
  );
}
