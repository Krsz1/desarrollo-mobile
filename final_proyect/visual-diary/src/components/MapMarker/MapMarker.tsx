import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Entry } from "../../types/Entry";
import { formatDate } from "../../helpers/formatDate";
import { formatAddress } from "../../helpers/formatAddress";

interface Props {
  entry: Entry;
}

const MapMarker: React.FC<Props> = ({ entry }) => {
  if (!entry.latitude || !entry.longitude) return null;

  return (
    <Marker position={[entry.latitude, entry.longitude]}>
      <Popup>
        <strong>{entry.title}</strong>
        <br />
        {formatAddress(entry.address, 40)}
        <br />
        <small>{formatDate(entry.createdAt)}</small>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
