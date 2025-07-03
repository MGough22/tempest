import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CurrentWeather from "@/components/ui/current-weather";
import HourlyTemperature from "@/components/ui/hourly-temperature";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import WeatherDetails from "@/components/ui/weather-details";
import { WeatherForecast } from "@/components/ui/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import { BackgroundBeams } from "@/components/ui/background-beams";

const PlacePage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coorrdinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coorrdinates);
  const forecastQuery = useForecastQuery(coorrdinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to load data. Please try again</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.placeName) {
    return (
      <>
        <div>
          <BackgroundBeams />
        </div>
        <WeatherSkeleton />;
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <BackgroundBeams />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.placeName}, {weatherQuery.data.sys.country}
        </h1>
      </div>
      <div className=" grid gap-6">
        <div className="flex flex-col gap-4">
          <CurrentWeather data={weatherQuery.data} />
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

export default PlacePage;
