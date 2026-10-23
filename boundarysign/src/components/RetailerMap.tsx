import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (Leaflet + bundlers)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export interface MapLocation {
  retailer: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  address?: string;
}

interface RetailerMapProps {
  locations: MapLocation[];
  activeKey?: string | null;
}

function FlyTo({ locations, activeKey }: RetailerMapProps) {
  const map = useMap();
  useEffect(() => {
    if (!activeKey) return;
    const loc = locations.find((l) => `${l.retailer}-${l.city}` === activeKey);
    if (loc) map.flyTo([loc.lat, loc.lng], 9, { duration: 0.8 });
  }, [activeKey, locations, map]);
  return null;
}

export const RetailerMap = ({ locations, activeKey }: RetailerMapProps) => {
  return (
    <div className="h-[420px] md:h-[520px] w-full rounded-sm overflow-hidden border border-border">
      <MapContainer
        center={[46, -114]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={`${loc.retailer}-${loc.city}`} position={[loc.lat, loc.lng]}>
            <Popup>
              <div className="font-semibold">{loc.retailer}</div>
              <div className="text-sm">
                {loc.city}, {loc.state}
              </div>
              {loc.address && (
                <div className="text-xs mt-1 text-gray-600">{loc.address}</div>
              )}
            </Popup>
          </Marker>
        ))}
        <FlyTo locations={locations} activeKey={activeKey} />
      </MapContainer>
    </div>
  );
};