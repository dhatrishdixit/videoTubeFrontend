import { cn } from "@/lib/utils";
import React from "react";
import { Search, X } from "lucide-react";

interface propsType {
  className: string;
}
export const InputSearch = ({ className }: propsType) => {
  // add debouncing to this also
  const [search, setSearch] = React.useState<string | undefined>("");
  const [isFocus, setIsFocus] = React.useState<boolean | undefined>(false);
  // add clear button and search button in this after learning about forward ref

  return (
    <div
      className={cn(
        "flex flex-row w-full rounded-md border border-input bg-transparent  text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium ",
        {
          "border-red-600": isFocus,
        },
        className,
      )}
    >
      <input
        className={cn(
          "flex h-9 w-full rounded-md  bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50  ",
        )}
        id="name"
        placeholder="Search"
        type="text"
        onFocus={() => {
          setIsFocus && setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus && setIsFocus(false);
        }}
        onChange={(e) => {
          setSearch && setSearch(e.target.value);
        }}
        value={search}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          setSearch("");
        }}
        className={`
            px-2  rounded-r-md 
            ${search ? "" : "hidden"}`}
      >
        <X size={18} />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          // call backend for search
        }}
        className={`
            px-3  rounded-r-md 
            `}
      >
        <Search size={18} />
      </button>
    </div>
  );
};

InputSearch.displayName = "Input Search";
