import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { InputProps } from "./input";
import axios from "axios";

interface SearchSuggestionSchema {
  _id: string;
  title:string;
}

export const InputSearch: React.FC<InputProps> = ({ className }) => {
  const [search, setSearch] = useState<string | undefined>("");
  const [isFocus, setIsFocus] = useState<boolean | undefined>(false);
  const [openRecommendation, setOpenRecommendation] = useState<boolean>(false);
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestionSchema[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        // Fetch search suggestions from your backend or API
        // fetchSearchSuggestions(search)
        //   .then((suggestions) => setSearchSuggestions(suggestions))
        //   .catch((error) => console.log(error));
         axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/s/search?title=${search}`,{
          withCredentials:true
         })
         .then(res => setSearchSuggestions(res.data.data))
      } else {
        setSearchSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const fetchSearchSuggestions = async (query: string): Promise<string[]> => {
    // Simulating fetching search suggestions from an API
    return new Promise((resolve) =>
      setTimeout(() => resolve(["suggestion 1", "suggestion 2", "suggestion 3"]), 1000)
    );
  };
  // add a cross to remove from search suggestions list

  return (
    <div
      className={cn(
        "flex flex-row w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium relative",
        {
          "border-red-600": isFocus,
        },
        className
      )}
    >
      <input
        className={cn(
        "flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ",
          openRecommendation && "rounded-b-none"
        )}
        id="name"
        placeholder="Search"
        type="text"
        onFocus={() => {
          setIsFocus && setIsFocus(true);
          setOpenRecommendation(true);
        }}
        onBlur={() => {
          setIsFocus && setIsFocus(false);
          setOpenRecommendation(false);
        }}
        onChange={(e) => {
          setSearch && setSearch(e.target.value);
        }}
        value={search}
        autoComplete="off"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setSearch("");
        }}
        className={`px-2 rounded-r-md ${search ? "" : "hidden"}`}
      >
        <X size={18} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          // call backend for search
        }}
        className={`px-3 rounded-r-md `}
      >
        <Search size={18}/>
      </button>
      {openRecommendation && (
        <div className="absolute mt-12 w-full max-w-[calc(100%-2rem)] rounded-md border border-input bg-popover text-popover-foreground shadow-md dark:bg-black bg-slate-200">
          {searchSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              {suggestion.title}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

InputSearch.displayName = "Input Search";