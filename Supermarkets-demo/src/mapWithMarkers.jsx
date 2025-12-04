import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const orders = [
  { id: 1, name: "Pizza Place", lat: 51.505, lng: -0.09 },
  { id: 2, name: "Burger Joint", lat: 51.51, lng: -0.1 },
  { id: 3, name: "Sushi Spot", lat: 51.507, lng: -0.08 },
  { id: 4, name: "Tesco Extra Supermarket", lat: 51.707, lng: -0.2 },
  { id: 5, name: "Morrisons Supermarket", lat: 51.807, lng: -0.04 },
];

const MapWithMarkers = () => {
  const handleOrder = (order) => {
    alert(`Order placed for ${order.name}!`);
  };
  const item1 = "Baby Formula";
  const item2 = "Banana";
  const item3 = "Greek Yugurt";
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {orders.map((order) => (
        <Marker key={order.id} position={[order.lat, order.lng]}>
          <Popup>
            <div>
              <h4>{order.name}</h4>
              <h4>{item3}</h4>
              <input type="text" id="item" placeholder="Enter Quantity"></input>

              <button onClick={() => handleOrder(order)}>Order</button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithMarkers;
