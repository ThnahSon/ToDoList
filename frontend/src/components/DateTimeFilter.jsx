import * as React from "react";
import { Check, ChevronsUpDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { options } from "@/lib/data";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full lg:w-[200px] justify-between",
            "bg-white/80", 
            "border-2 border-gray-200",
            "hover:border-purple-300 hover:bg-white",
            "transition-all duration-300",
            "shadow-lg hover:shadow-xl",
            "rounded-xl sm:rounded-2xl",
            "px-4 sm:px-6 py-2.5 sm:py-3",
            open && "border-purple-500 ring-4 ring-purple-500/20"
          )}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <span className="font-medium text-sm sm:text-base">
              {dateQuery
                ? options.find((option) => option.value === dateQuery)?.label
                : options[0].label}
            </span>
          </div>
          <ChevronsUpDown className={cn(
            "w-4 h-4 opacity-50 transition-transform duration-300",
            open && "rotate-180"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-[250px] p-0",
          "shadow-2xl border-2 border-gray-100", 
          "rounded-xl sm:rounded-2xl",
         
          "bg-white/95" 
        )}
        align="end"
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setDateQuery(currentValue);
                    setOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    "px-4 py-3 rounded-lg mx-2 my-1",
                    "text-sm sm:text-base",
                    dateQuery === option.value
                      ? "bg-purple-50 text-purple-700 font-semibold"
                      : "hover:bg-gray-100" 
                  )}
                >
                  <Calendar className={cn(
                    "w-4 h-4 mr-2",
                    dateQuery === option.value ? "text-purple-600" : "text-gray-400"
                  )} />
                  <span className="font-medium">{option.label}</span>
                  <Check
                    className={cn(
                      "ml-auto w-4 h-4 text-purple-600",
                      dateQuery === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimeFilter;