import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Thermometer, Wind } from "lucide-react";

// Fix para os ícones do Leaflet não aparecerem corretamente
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type MapPopupData = {
  title?: string;
  description?: string;
  quality?: string;
  iqar?: number;
  temperature?: number;
  windSpeed?: number;
} | string;

/**
 * Componente personalizado para o popup do mapa
 */
function MapPopup({ popup }: { popup: MapPopupData }) {
  if (typeof popup === 'string') {
    return (
      <div className="text-sm text-foreground">
        {popup}
      </div>
    );
  }

  if (!popup) return null;

  const getQualityColor = (quality?: string) => {
    if (!quality) return "text-gray-600";
    const qualityUpper = quality.toUpperCase();
    if (qualityUpper === "BOM" || qualityUpper === "BOA") return "text-green-600";
    if (qualityUpper === "MODERADA" || qualityUpper === "MODERADO") return "text-yellow-600";
    if (qualityUpper === "RUIM") return "text-orange-600";
    if (qualityUpper === "MUITO RUIM") return "text-red-600";
    if (qualityUpper === "PÉSSIMA" || qualityUpper === "CRÍTICA") return "text-purple-600";
    return "text-gray-600";
  };

  return (
    <div className="min-w-[280px] p-4 bg-background border border-border border-b-0 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">
          {popup.title || "Estação de Monitoramento"}
        </h3>
      </div>

      {/* Descrição */}
      {popup.description && (
        <p className="text-sm text-muted-foreground mb-3">
          {popup.description}
        </p>
      )}

      {/* Qualidade do Ar */}
      {(popup.quality || popup.iqar) && (
        <div className="bg-muted/50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Qualidade do Ar
            </span>
            {popup.iqar && (
              <span className="text-lg font-bold text-foreground">
                {popup.iqar.toFixed(1)}
              </span>
            )}
          </div>
          {popup.quality && (
            <div className={`text-sm font-semibold mt-1 ${getQualityColor(popup.quality)}`}>
              {popup.quality}
            </div>
          )}
        </div>
      )}

      {/* Informações adicionais */}
      {(popup.temperature || popup.windSpeed) && (
        <div className="space-y-2">
          {popup.temperature && (
            <div className="flex items-center gap-2 text-sm">
              <Thermometer className="w-4 h-4 text-red-500" />
              <span className="text-muted-foreground">Temperatura:</span>
              <span className="font-medium">{popup.temperature}°C</span>
            </div>
          )}
          {popup.windSpeed && (
            <div className="flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-blue-500" />
              <span className="text-muted-foreground">Vento:</span>
              <span className="font-medium">{popup.windSpeed} km/h</span>
            </div>
          )}
        </div>
      )}

      {/* Timestamp */}
      <div className="mt-3 pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Atualizado em tempo real
        </p>
      </div>
    </div>
  );
}

interface MapProps {
  center?: LatLngExpression;
  zoom?: number;
  markers?: Array<{
    position: LatLngExpression;
    popup?: MapPopupData;
  }>;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Componente para ajustar a visualização do mapa dinamicamente
 */
function MapUpdater({ center, zoom }: { center?: LatLngExpression; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);

  return null;
}

/**
 * Componente de mapa global usando Leaflet
 * Responsável por mostrar mapas na plataforma
 */
export function Map({
  center = [-23.551871, -46.695939], // Pinheiros como padrão
  zoom = 13,

  markers = [],
  className = "w-full h-full",
  children,
}: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapUpdater center={center} zoom={zoom} />

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          {marker.popup && (
            <Popup closeButton={false} className="custom-popup" offset={[0, -20]} autoPan={false}>
              <MapPopup popup={marker.popup} />
            </Popup>
          )}
        </Marker>
      ))}

      {children}
    </MapContainer>
  );
}
