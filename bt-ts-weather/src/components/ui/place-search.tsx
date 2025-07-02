import { useState } from "react";
import { Button } from "./button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Loader2, Search } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";

const PlaceSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);

  const handleSelect = (cityData: string) => {
    const [lat, lon, name] = cityData.split("|");

    setOpen(false);
    navigate(`/place/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search Locations
      </Button>
      <Command className="bg-background-95 backdrop-blur">
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="bg-background-95 backdrop-blur rounded-md shadow-lg p-2">
            <CommandInput
              placeholder="Search locations..."
              value={query}
              onValueChange={setQuery}
              className="bg-background-95 backdrop-blur mb-2"
            />

            <CommandList className="bg-background-95 backdrop-blur max-h-60 overflow-y-auto">
              {query.length > 2 && !isLoading && (
                <CommandEmpty className="p-4 text-center">
                  No locations found.
                </CommandEmpty>
              )}

              {locations && locations.length > 0 && (
                <CommandGroup
                  heading="Suggestions"
                  className="bg-background-95 backdrop-blur"
                >
                  {isLoading && (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}

                  {locations.map(location => (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {location.country}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </CommandDialog>
      </Command>
    </>
  );
};

export default PlaceSearch;
