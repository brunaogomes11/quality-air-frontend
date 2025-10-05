import { useMemo } from "react";
import { Input } from "../../components/inputs/input";

export const AirQualityView = () => {
  const today = useMemo(() => new Date(), []);
  const date = today.toISOString().slice(0, 10);
  const time = today.toTimeString().slice(0, 5);

  const airQuality = {
    category: "Good" as "Good" | "Moderate" | "Unhealthy" | "Very Unhealthy" | "Hazardous",
    aqi: 42,
    source: "Mock API",
    updatedAt: "2025-10-04T12:00:00Z",
    details: "Concentrations are within recommended standards.",
  };

  const categoryClass =
    airQuality.category === "Good"
      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
      : airQuality.category === "Moderate"
      ? "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-200"
      : airQuality.category === "Unhealthy"
      ? "bg-orange-50 text-orange-800 ring-1 ring-orange-200"
      : airQuality.category === "Very Unhealthy"
      ? "bg-red-50 text-red-800 ring-1 ring-red-200"
      : "bg-purple-50 text-purple-800 ring-1 ring-purple-200";

  return (
    <div className="w-full">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Air Quality Monitor</h1>
          <p className="text-sm text-muted-foreground">
            Visualization (read-only)
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="p-6 md:p-8 space-y-8">
            {/* Date and Time */}
            <section>
              <h2 className="text-base font-medium mb-4">When</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="date" label="Date" value={date} readOnly disabled />
                <Input type="time" label="Time" value={time} readOnly disabled />
              </div>
            </section>

            {/* Air Quality */}
            <section>
              <h2 className="text-base font-medium mb-4">Air Quality</h2>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${categoryClass}`}
                    title={airQuality.details}
                  >
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-current/60" />
                    {airQuality.category}
                  </span>
                  <span className="text-sm font-medium">
                    AQI <span className="tabular-nums">{airQuality.aqi}</span>
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Source: {airQuality.source} •{" "}
                  {new Date(airQuality.updatedAt).toLocaleString()}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  { t: "Good", c: "bg-emerald-100 text-emerald-700" },
                  { t: "Moderate", c: "bg-yellow-100 text-yellow-700" },
                  { t: "Unhealthy", c: "bg-orange-100 text-orange-700" },
                  { t: "Very Unhealthy", c: "bg-red-100 text-red-700" },
                  { t: "Hazardous", c: "bg-purple-100 text-purple-700" },
                ].map((item) => (
                  <div
                    key={item.t}
                    className={`rounded-md px-2 py-1 text-center ${item.c}`}
                  >
                    {item.t}
                  </div>
                ))}
              </div>
            </section>

            {/* Map */}
            <section>
              <h2 className="text-base font-medium mb-4">Location</h2>
              <div
                id="map-container"
                aria-label="Map placeholder"
                className="w-full h-72 md:h-96 rounded-xl border border-dashed bg-neutral-50 flex items-center justify-center text-sm text-muted-foreground"
              >
                Map will be displayed here
              </div>
              <div className="mt-3">
                <span className="text-sm text-muted-foreground">
                  Location: <span className="font-medium">—</span>
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
