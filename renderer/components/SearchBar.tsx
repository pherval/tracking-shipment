import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDebounce, useShortcut } from "../hooks";
import { ButtonIcon } from "./Button";
import FormField from "./FormField";

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  delay?: number;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const { register, watch, setFocus, resetField } = useForm();

  useShortcut(() => setFocus("searchTerm"), {
    shortcut: { code: "KeyF", metaKey: true },
  });

  const value = watch("searchTerm");
  // don't use debounce for now
  useDebounce(value, onSearch, 0);

  return (
    <FormField
      placeholder="Search"
      leftAdornment={
        <ButtonIcon>
          <BiSearch />
        </ButtonIcon>
      }
      onClick={() => setFocus("searchTerm")}
      rightAdornment={
        <ButtonIcon
          onClick={() => resetField("searchTerm")}
          className={value?.length > 0 ? "visible" : "invisible"}
        >
          <IoCloseCircleSharp />
        </ButtonIcon>
      }
      {...register("searchTerm")}
    ></FormField>
  );
}
