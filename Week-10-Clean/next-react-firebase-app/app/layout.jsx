import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "Artist Search App",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
