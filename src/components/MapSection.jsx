
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_URL = "https://dev-task.elancoapps.com/data/tick-sightings";

// UK city coordinates mapping (latitude, longitude)
const UK_CITY_COORDS = {
  London: [51.5074, -0.1278],
  Manchester: [53.4808, -2.2426],
  Birmingham: [52.4862, -1.8904],
  Leeds: [53.8008, -1.5491],
  Glasgow: [55.8642, -4.2518],
  Edinburgh: [55.9533, -3.1883],
  Liverpool: [53.4084, -2.9916],
  Bristol: [51.4545, -2.5879],
  Sheffield: [53.3811, -1.4701],
  Newcastle: [54.9783, -1.6178],
  Cardiff: [51.4816, -3.1791],
  Belfast: [54.5973, -5.9301],
  Nottingham: [52.9548, -1.1581],
  Leicester: [52.6369, -1.1398],
  Southampton: [50.9097, -1.4044],
  Brighton: [50.8225, -0.1372],
  Plymouth: [50.3755, -4.1427],
  Aberdeen: [57.1497, -2.0943],
  Dundee: [56.462, -2.9707],
  Inverness: [57.4778, -4.2247],
  Oxford: [51.752, -1.2577],
  Cambridge: [52.2053, 0.1218],
  York: [53.96, -1.0873],
  Bath: [51.3811, -2.359],
  Norwich: [52.6309, 1.2974],
  Exeter: [50.7184, -3.5339],
  Canterbury: [51.2802, 1.0789],
  Chester: [53.1908, -2.8908],
  Durham: [54.7761, -1.5733],
  Stirling: [56.1165, -3.9369],
};

// Tick species risk levels
const SPECIES_RISK = {
  "Ixodes ricinus": "high",
  "Ixodes hexagonus": "medium",
  "Ixodes acuminatus": "low",
  "Dermacentor reticulatus": "high",
  "Haemaphysalis punctata": "medium",
};

function getRiskColor(latinName) {
  const risk = SPECIES_RISK[latinName] || "medium";
  switch (risk) {
    case "high":
      return "#dc2626";
    case "medium":
      return "#f59e0b";
    case "low":
      return "#10b981";
    default:
      return "#6b7280";
  }
}

function isRecentSighting(dateStr) {
  if (!dateStr) return false;
  const sightingDate = new Date(dateStr);
  const now = new Date();
  const daysDiff = (now - sightingDate) / (1000 * 60 * 60 * 24);
  return daysDiff <= 7;
}


function normaliseSighting(item, index) {
  if (!item) return null;

  const city =
    item.city ||
    item.town ||
    item.cityTown ||
    item.location ||
    item.county ||
    null;

  let lat =
    typeof item.latitude === "number"
      ? item.latitude
      : typeof item.lat === "number"
      ? item.lat
      : null;

  let lng =
    typeof item.longitude === "number"
      ? item.longitude
      : typeof item.lng === "number"
      ? item.lng
      : null;

  // error handle
  if ((lat == null || lng == null) && city && UK_CITY_COORDS[city]) {
    [lat, lng] = UK_CITY_COORDS[city];
  }

  if (lat == null || lng == null) return null;

  const species =
    item.species || item.commonName || item.tickName || "Unknown species";
  const latinName =
    item.latinName || item.latin_name || item.scientificName || "";
  const date =
    item.date || item.sightingDate || item.reportedAt || item.createdAt || null;

  return {
    ...item,
    id: item.id || `${city || "loc"}-${date || "unknown"}-${index}`,
    latitude: lat,
    longitude: lng,
    location: city || "Unknown location",
    species,
    latinName,
    risk: SPECIES_RISK[latinName] || "medium",
    isRecent: isRecentSighting(date),
    date,
  };
}

function MapSection({ onSelectSighting }) {
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSightings() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Elanco API raw data:", data);

        const processedSightings = (Array.isArray(data) ? data : [])
          .map((item, index) => normaliseSighting(item, index))
          .filter(Boolean);

        console.log(`Loaded ${processedSightings.length} tick sightings`);
        setSightings(processedSightings);
      } catch (err) {
        console.error("Map API error:", err);
        setError("Could not load tick sightings. Please try again later.");
        setSightings([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSightings();
  }, []);

  const handleMarkerClick = (sighting) => {
    if (onSelectSighting) {
      onSelectSighting(sighting);
    }
  };

  const recentCount = sightings.filter((s) => s.isRecent).length;
  const highRiskCount = sightings.filter((s) => s.risk === "high").length;

  return (
    <div
      style={{
        padding: "24px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          margin: "0 0 16px 0",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        Track UK Tick Sightings
      </h2>

      {loading && <p>Loading map data…</p>}
      {error && (
        <p
          style={{
            color: "#dc2626",
            padding: "12px",
            background: "#fef2f2",
            borderRadius: "6px",
            margin: "12px 0",
          }}
        >
          {error}
        </p>
      )}

      {/* REAL MAP HERE */}
      <div
        style={{
          marginTop: "16px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={[54.5, -3]}
          zoom={5.5}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {!loading &&
            !error &&
            sightings.map((sighting) => {
              const color = getRiskColor(sighting.latinName);
              const radius = sighting.isRecent ? 9 : 6;

              return (
                <CircleMarker
                  key={sighting.id}
                  center={[sighting.latitude, sighting.longitude]}
                  radius={radius}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: 0.85,
                  }}
                  eventHandlers={{
                    click: () => handleMarkerClick(sighting),
                  }}
                >
                  <Popup>
                    <div style={{ fontSize: "14px", maxWidth: "220px" }}>
                      <strong>{sighting.location}</strong>
                      {sighting.isRecent && (
                        <span
                          style={{
                            display: "inline-block",
                            marginLeft: "6px",
                            padding: "1px 6px",
                            borderRadius: "4px",
                            background: "#3b82f6",
                            color: "white",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          RECENT
                        </span>
                      )}

                      <div style={{ marginTop: "6px" }}>
                        <strong>Species:</strong> {sighting.species}
                      </div>

                      {sighting.latinName && (
                        <div style={{ color: "#6b7280" }}>
                          <em>{sighting.latinName}</em>
                        </div>
                      )}

                      {sighting.date && (
                        <div style={{ marginTop: "4px", color: "#6b7280" }}>
                          {new Date(sighting.date).toLocaleDateString("en-GB")}
                        </div>
                      )}

                      <div style={{ marginTop: "4px" }}>
                        <strong>Risk:</strong>{" "}
                        <span
                          style={{
                            display: "inline-block",
                            padding: "1px 6px",
                            borderRadius: "4px",
                            background: color,
                            color: "white",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          {sighting.risk.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div
        style={{
          background: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            fontWeight: "600",
            marginBottom: "12px",
            fontSize: "16px",
          }}
        >
          Risk levels
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          {/* High */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#dc2626", 
                marginRight: "8px",
                border: "2px solid white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            ></div>
            <span style={{ fontSize: "14px" }}>High risk</span>
          </div>

          {/* Medium */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#f59e0b", 
                marginRight: "8px",
                border: "2px solid white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            ></div>
            <span style={{ fontSize: "14px" }}>Medium risk</span>
          </div>

          {/* Low */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#10b981", 
                marginRight: "8px",
                border: "2px solid white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            ></div>
            <span style={{ fontSize: "14px" }}>Low risk</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      {sightings.length > 0 && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            background: "#f3f4f6",
            borderRadius: "6px",
          }}
        >
          <strong>Total Sightings:</strong> {sightings.length} |
          <strong style={{ marginLeft: "12px" }}>Recent (7 days):</strong>{" "}
          {recentCount} |
          <strong style={{ marginLeft: "12px" }}>High Risk:</strong>{" "}
          {highRiskCount}
        </div>
      )}
    </div>
  );
}

export default MapSection;
