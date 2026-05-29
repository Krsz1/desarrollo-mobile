import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Entry } from "../../types/Entry";
import { formatDate } from "../../helpers/formatDate";
import { formatAddress } from "../../helpers/formatAddress";

interface Props {
  entry: Entry;
}

// Premium burgundy teardrop pin — no gradient IDs to avoid SVG conflicts
const pinHtml = `
<span class="lunara-pin-inner">
  <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Pin body -->
    <path d="M16 1C7.72 1 1 7.72 1 16C1 26.5 16 41 16 41C16 41 31 26.5 31 16C31 7.72 24.28 1 16 1Z"
          fill="#8B1E3F" stroke="#4A0E1F" stroke-width="0.8"/>
    <!-- Glossy highlight -->
    <ellipse cx="11" cy="9.5" rx="5" ry="3" fill="rgba(255,255,255,0.3)"
             transform="rotate(-12 11 9.5)"/>
    <!-- Inner depth circle -->
    <circle cx="16" cy="16" r="4.8" fill="rgba(0,0,0,0.18)"
            stroke="rgba(255,255,255,0.28)" stroke-width="1.2"/>
  </svg>
</span>`;

const customIcon = L.divIcon({
  className: "",
  html: pinHtml,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -44],
});

const MapMarker: React.FC<Props> = ({ entry }) => {
  if (!entry.latitude || !entry.longitude) return null;

  return (
    <Marker position={[entry.latitude, entry.longitude]} icon={customIcon}>
      <Popup className="lunara-popup">
        <strong>{entry.title}</strong>
        {formatAddress(entry.address, 40)}
        <small>{formatDate(entry.createdAt)}</small>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
