import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import CurrentWeather from "@/components/ui/current-weather";
import HourlyTemperature from "@/components/ui/hourly-temperature";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import WeatherDetails from "@/components/ui/weather-details";
import { WeatherForecast } from "@/components/ui/weather-forecast";
import { useGeoLocation } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeoLocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (locationLoading || !weatherQuery.data || !forecastQuery.data) {
    return (
      <>
        <WeatherSkeleton />;
      </>
    );
  }

  if (locationError) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Location Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>{locationError}</p>
            <Button onClick={getLocation} variant={"outline"} className="w-fit">
              <MapPin className="mr-2 h-4 w-4" />
              Prompt browser to enable Location
            </Button>
          </AlertDescription>
        </Alert>

        <Alert variant="default" className="bg-background-95 backdrop-blur">
          <AlertTitle>Need Help?</AlertTitle>
          <AlertDescription className="flex flex-col gap-2 text-sm">
            <p>
              Make sure location services are enabled in your browser or device
              privacy settings.
            </p>
            <p>
              Or, if you prefer not to share your location, you can still search
              for any place manually using the search bar above.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          className="z-[10] relative"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <div className=" grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
