import { useRef } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDebounce, useShortcut } from "../hooks";
import { IconButton } from "./buttons";
import FormField from "./FormField";

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  delay?: number;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const { register, watch, setFocus, resetField } = useForm();
  const { ref: formRef, ...searchTermRegister } = register("searchTerm");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const value = watch("searchTerm");

  useDebounce(value, onSearch, 100);

  useShortcut(() => setFocus("searchTerm"), {
    shortcut: { code: "KeyF", metaKey: true },
  });

  useShortcut(
    () => resetField("searchTerm"),
    {
      shortcut: { code: "Escape" },
      useGlobal: false,
    },
    searchRef?.current
  );

  return (
    <FormField
      ref={(input) => {
        searchRef.current = input;
        formRef(input);
      }}
      placeholder="Search"
      leftAdornment={
        <IconButton>
          <BiSearch />
        </IconButton>
      }
      onClick={() => setFocus("searchTerm")}
      rightAdornment={
        <IconButton
          onClick={() => resetField("searchTerm")}
          className={value?.length > 0 ? "visible" : "invisible"}
        >
          <IoCloseCircleSharp />
        </IconButton>
      }
      {...searchTermRegister}
    ></FormField>
  );
}
