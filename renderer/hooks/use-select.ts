import { useCallback, useEffect, useReducer } from "react";

type SelectedState<T> = {
  selected: T | null;
  items: T[];
  selectedIndex: number;
};

type SelectedAction<T> =
  | { type: "select"; payload: { filter: Filter<T> } }
  | { type: "deselect" }
  | { type: "setItems"; payload: { items: T[] } }
  | { type: "previous" }
  | { type: "next" }
  | { type: "selectByIndex"; payload: { index: number } };

type Filter<T> = (i: T) => boolean;

const reducer = <T>(
  state: SelectedState<T>,
  action: SelectedAction<T>
): SelectedState<T> => {
  switch (action.type) {
    case "select":
      const selected = state.items.find((item) => action.payload.filter(item));

      return {
        ...state,
        selected: selected ?? null,
        selectedIndex: selected ? state.items.indexOf(selected) : -1,
      };

    case "deselect":
      return {
        ...state,
        selected: null,
        selectedIndex: -1,
      };

    case "setItems":
      return {
        ...state,
        selectedIndex: -1,
        selected: null,
        items: action.payload.items,
      };

    case "previous":
      if (state.selectedIndex === -1) {
        return state;
      }

      const previousIndex = Math.max(state.selectedIndex - 1, 0);

      return {
        ...state,
        selectedIndex: previousIndex,
        selected: state.items[previousIndex],
      };

    case "next":
      if (state.selectedIndex === -1) {
        return state;
      }

      const nextIndex = Math.min(
        state.selectedIndex + 1,
        state.items.length - 1
      );

      return {
        ...state,
        selectedIndex: nextIndex,
        selected: state.items[nextIndex],
      };

    case "selectByIndex":
      if (
        action.payload.index < 0 ||
        action.payload.index >= state.items.length
      ) {
        console.warn("selecting index out of bounds");
        return state;
      }

      return {
        ...state,
        selectedIndex: action.payload.index,
        selected: state.items[action.payload.index],
      };

    default:
      throw new Error("Invalid useSelect action type");
  }
};

export function useSelect<T>(items: T[] = []) {
  const [state, dispatch] = useReducer(reducer<T>, {
    selected: null,
    selectedIndex: -1,
    items,
  });

  const select = useCallback(
    (filter: Filter<T>) => dispatch({ type: "select", payload: { filter } }),
    [dispatch]
  );

  const reset = useCallback(() => dispatch({ type: "deselect" }), [dispatch]);
  const selectNext = useCallback(() => dispatch({ type: "next" }), [dispatch]);
  const selectPrevious = useCallback(
    () => dispatch({ type: "previous" }),
    [dispatch]
  );

  const selectIndex = useCallback(
    (index: number) => dispatch({ type: "selectByIndex", payload: { index } }),
    [dispatch]
  );

  const selectFirst = useCallback(() => selectIndex(0), [selectIndex]);

  const setItems = useCallback(
    (items: T[]) => dispatch({ type: "setItems", payload: { items } }),
    []
  );

  const selectLast = useCallback(
    () => selectIndex(state.items.length - 1),
    [selectIndex, state.items.length]
  );

  const isSelected = useCallback(
    (filter?: Filter<T>) =>
      filter && state.selected
        ? filter(state.selected)
        : state.selectedIndex !== -1,
    [state.selectedIndex, state.selected]
  );

  useEffect(() => {
    dispatch({ type: "setItems", payload: { items } });
  }, [items]);

  return {
    selected: state.selected,
    selectedIndex: state.selectedIndex,
    isSelected,
    select,
    reset,
    selectNext,
    selectPrevious,
    selectLast,
    selectFirst,
    selectIndex,
    setItems,
  };
}
