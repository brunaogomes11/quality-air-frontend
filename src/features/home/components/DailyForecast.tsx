import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/inputs/dataPicker";
import HourPicker from "@/components/inputs/hourPicker";
import { ConamaRecommendations } from "./ConamaRecommendations";
import { NO2Chart } from "./NO2Chart";
import { previsaoService } from "@/api/services/previsaoService";
import type { PrevisaoDiaResponse, PrevisaoPeriodoResponse } from "@/types/previsao";
import { Play } from "lucide-react";
import { useQuality } from "@/hooks/useQuality";

/**
 * Daily Forecast Card
 * Allows selecting date/time and viewing air quality forecast
 */
export function DailyForecast() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<PrevisaoDiaResponse | null>(null);
    const [hourlyPredictions, setHourlyPredictions] = useState<PrevisaoPeriodoResponse | null>(null);

    // Get quality information from Portuguese API response
    const qualityInfo = useQuality(prediction?.previsao.qualidade);

    // Combine date and time to form the complete dateTime
    const selectedDateTime = selectedDate && selectedTime ? `${selectedDate} ${selectedTime}` : "";

    // Initialize with current date/time when mounting the component
    useEffect(() => {
        const now = new Date();
        const dateFormatted = format(now, "yyyy-MM-dd");
        const timeFormatted = `${format(now, "HH")}:00`;

        setSelectedDate(dateFormatted);
        setSelectedTime(timeFormatted);

        // Make the initial forecast automatically
        const fullDateTime = `${format(now, "dd/MM/yyyy")} ${timeFormatted}`;
        fetchPrediction(fullDateTime);
    }, []);

    const fetchPrediction = async (dateTime: string) => {
        if (!dateTime || dateTime.length !== 16) {
            setError("Invalid date and time");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Fetch specific day prediction
            const dayPrediction = await previsaoService.obterPrevisaoDia(dateTime);
            setPrediction(dayPrediction);

            // Fetch hourly predictions for the day (00:00 to 23:00)
            // Convert date from yyyy-MM-dd format to dd/MM/yyyy
            const [datePart] = dateTime.split(" ");
            const hour = dateTime.split(" ")[1];
            const startTime = `${datePart} 00:00`;
            const endTime = `${datePart} ${hour}`;

            const periodPredictions = await previsaoService.obterPrevisaoPeriodo(
                startTime,
                endTime
            );
            setHourlyPredictions(periodPredictions);
        } catch (err: any) {
            setError(err?.mensagemErro || "Error fetching forecast");
            setPrediction(null);
            setHourlyPredictions(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePredict = () => {
        const fullDateTime = `${format(selectedDateTime, "dd/MM/yyyy")} ${selectedDateTime.split(" ")[1]}`;
        fetchPrediction(fullDateTime);
    };

    return (
        <Card className="w-full max-w-2xl bg-background/95 backdrop-blur-sm shadow-xl">
            <div className="p-6 space-y-6">
                {/* Header with DateTimePicker and Button */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-foreground">
                        Air Quality Forecast
                    </h2>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <DatePicker
                                value={selectedDate}
                                onChange={setSelectedDate}
                                placeholder="Select the date"
                            />
                        </div>
                        <div className="w-32">
                            <HourPicker
                                value={selectedTime}
                                onChange={setSelectedTime}
                            />
                        </div>
                        <Button
                            onClick={handlePredict}
                            disabled={isLoading || !selectedDateTime}
                            className="px-6"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    Loading...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    Predict
                                </span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        <p className="font-medium">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4" />
                        <p className="text-muted-foreground">Fetching forecast...</p>
                    </div>
                )}

                {/* Prediction Results */}
                {!isLoading && prediction && (
                    <div className="space-y-6">
                        {/* Overall Air Quality Index */}
                        <div className="bg-muted/30 rounded-lg p-6">
                            <div className="text-center space-y-2">
                                <p className="text-sm text-muted-foreground font-medium">
                                    Air Quality Index (AQI)
                                </p>
                                <div className="text-5xl font-bold text-foreground">
                                    {prediction.previsao.iqar_geral.toFixed(2)}
                                </div>
                                <div className={`text-xl font-semibold ${qualityInfo.className}`}>
                                    {qualityInfo.english}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Dominant Pollutant: {prediction.previsao.poluente_dominante}
                                </p>
                            </div>
                        </div>

                        {/* NO2 Chart by Hour */}
                        {hourlyPredictions && hourlyPredictions.predicoes && (
                            <NO2Chart predictions={hourlyPredictions.predicoes} />
                        )}

                        {/* CONAMA Recommendations */}
                        <ConamaRecommendations iqarGeral={prediction.previsao.iqar_geral} />

                        {/* Model Information */}
                        <div className="text-xs text-muted-foreground pt-3 border-t border-border">
                            <p>Model: {prediction.modelo}</p>
                            <p>Analyzed pollutants: {prediction.poluentes_analisados.join(", ")}</p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
