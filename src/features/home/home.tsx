import { Map } from "@/components/map/Map";
import { DailyForecast } from "./components/DailyForecast";
import { useWeatherData } from "@/hooks/useWeatherData";

// Default coordinates - São Paulo
const DEFAULT_POSITION: [number, number] = [-23.551871, -46.695939];

/**
 * Home Page - Air Quality
 * Displays a global map and the daily forecast card
 */
export function Home() {
  const { weatherData } = useWeatherData(
    DEFAULT_POSITION[0],
    DEFAULT_POSITION[1]
  );

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-screen map */}
      <div className="absolute inset-0">
        <Map
          center={DEFAULT_POSITION}
          zoom={12}
          markers={[
            {
              position: DEFAULT_POSITION,
              popup: {
                title: "São Paulo - Pinheiros",
                description: "Air Quality Monitoring Station",
                temperature: weatherData?.temperature,
                windSpeed: weatherData?.windSpeed,
              },
            },
          ]}
        />
      </div>

      {/* Daily Forecast Card - Floating over the map */}
      <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-[1000]">
        <DailyForecast />
      </div>
    </div>
  );
}

