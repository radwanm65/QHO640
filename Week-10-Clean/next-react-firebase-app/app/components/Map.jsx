"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

export default function Map() {
  const [L, setL] = useState(null);

  useEffect(() => {
    // client-only import
    import("leaflet").then((leaflet) => {
      const Lref = leaflet.default ?? leaflet;

      // fix marker icons
      delete Lref.Icon.Default.prototype._getIconUrl;
      Lref.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setL(Lref);
    });
  }, []);

  if (!L) return null; // prevent render before Leaflet loads

  const center = [53.38, -1.4701]; // Shiffield coordinates
  const markers = [
    { id: 1, position: [53.8008, -1.5491], label: "Leeds Education Center" },
    {
      id: 2,
      position: [53.005, -1.55],
      label: "Nottingham Cyber Security Lab",
    },
    {
      id: 3,
      position: [52.4831, -1.9025],
      label: "QAHigher Education/Birmingham",
    },
    {
      id: 4,
      position: [52.6631, -1.1325],
      label: "Leicester Higher Education Institute",
    },
  ];

  return (
    <MapContainer
      center={center}
      zoom={7.5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((m) => (
        <Marker key={m.id} position={m.position}>
          <Popup>
            Provider Name: {m.label} <br /> ID: {m.id} <br /> Location:{" "}
            {m.position}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
