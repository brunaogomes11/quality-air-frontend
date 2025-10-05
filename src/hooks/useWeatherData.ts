import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: number;
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
}

/**
 * Hook para buscar dados meteorológicos da API Open-Meteo
 */
export function useWeatherData(latitude: number, longitude: number) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!latitude || !longitude) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m`
        );

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data: OpenMeteoResponse = await response.json();

        setWeatherData({
          temperature: data.current.temperature_2m,
          windSpeed: data.current.wind_speed_10m,
          windDirection: data.current.wind_direction_10m,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        console.error("Erro ao buscar dados meteorológicos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return { weatherData, loading, error };
}