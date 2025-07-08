import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, Section } from "lucide-react";

export const FULL_TEXT = "All";

const weeks = Array.from({ length: 52 }, (_, i) => (i + 1).toString());
weeks.push(FULL_TEXT);

export function WeekSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghostLineAlt"
          role="combobox"
          className={`w-[300px] justify-center gap-1 font-medium cursor-pointer`}
        >
          {value ? (
            <>
              <Section className="w-4 h-4" />
              {value}
            </>
          ) : (
            "Select week..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-[300px] p-0 bg">
        <Command>
          <CommandInput placeholder="Search week..." />
          <CommandList>
            {weeks.map(week => (
              <CommandItem
                key={week}
                value={week}
                onSelect={() => {
                  onChange(week);
                  setOpen(false);
                }}
                className="justify-center gap-2 relative"
              >
                <Section className="h-4 w-4" /> {week}
                {value === week && (
                  <Check className="absolute right-2 h-4 w-4 opacity-60" />
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
