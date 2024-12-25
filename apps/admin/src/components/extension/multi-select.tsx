"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

// Define a type for the individual item
type SelectOption = {
  value: string;
  label: string;
};

interface FancyMultiSelectProps {
  options: SelectOption[]; // Options passed as a prop
  selectedOptions: SelectOption[]; // Currently selected options
  onSelect: (selected: SelectOption) => void; // Callback to handle selection
  onUnselect: (selected: SelectOption) => void; // Callback to handle unselection
  placeholder?: string; // Placeholder text for the input
}

export function FancyMultiSelect({
  options,
  selectedOptions,
  onSelect,
  onUnselect,
  placeholder = "Select options...",
}: FancyMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (option: SelectOption) => {
      onUnselect(option);
    },
    [onUnselect]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const lastSelected = selectedOptions[selectedOptions.length - 1];
            handleUnselect(lastSelected);
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selectedOptions, handleUnselect]
  );

  // Filter out the selected options from the list of options
  const selectables = options.filter(
    (option) =>
      !selectedOptions.some((selected) => selected.value === option.value)
  );

  // If all options are selected, show a "No more options available" message
  const noOptionsLeft = selectables.length === 0;

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-2 py-2 text-sm ">
        <div className="flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <Badge key={option.value} variant="secondary" className="rounded">
              {option.label}
              <button
                className="ml-1 rounded outline-none "
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-1 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-1">
        <CommandList>
          {open ? (
            <div className="absolute top-0 z-10 w-full rounded border bg-popover text-popover-foreground  outline-none animate-in">
              <CommandGroup className="h-full overflow-auto max-h-48">
                {noOptionsLeft ? (
                  <CommandItem disabled className="text-muted-foreground">
                    No more options available
                  </CommandItem>
                ) : (
                  selectables.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        if (
                          !selectedOptions.find((o) => o.value === option.value)
                        ) {
                          onSelect(option);
                        }
                      }}
                      className={`cursor-pointer rounded px-2 py-2 ${
                        selectedOptions.some((o) => o.value === option.value)
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                    >
                      {option.label}
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
