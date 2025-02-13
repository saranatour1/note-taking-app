import { cn } from "@/lib/utils";
import React from "react";
import { SearchIcon } from "../icons/Search";
import { Input } from "./Input";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex py-150 px-200 max-w-[300px] w-full items-center rounded-md border border-input bg-white  text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
      >
        <SearchIcon className="h-[20px] w-[20px]" />
        <Input
          {...props}
          type="search"
          ref={ref}
          className="w-full p-0 border-0 shadow-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  },
);

Search.displayName = "Search";

export { Search };