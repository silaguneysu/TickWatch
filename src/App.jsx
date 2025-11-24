import { useState } from "react"; // using state for selected sighting
import "./App.css";
import elancoLogo from "./assets/elanco-logo.png";
import Tick1Image from "./assets/Tick1Image.png";
import Tick2Image from "./assets/Tick2Image.png";
import { speakText } from "./speak.js";
import "leaflet/dist/leaflet.css";
import MapSection from "./components/MapSection.jsx";
import SightingDetails from "./components/SightingDetails.jsx";
import { Link } from "react-router-dom";


const filtersDescription = `
  Here you will be able to filter sightings by date range, species and severity.
`;

const educationDescription = `
  This section will contain a species identification guide
  and prevention tips for pet owners, helping them recognise ticks
  and reduce the risk to their animals.
`;

const seasonalDescription = `
  A chart will show tick sightings per month for a selected city and year.
`;

const mapDescription = `
  Displaying tick sightings across the UK.
`;

const detailsDescription = `
  When you click a marker on the map, detailed information and a
  small timeline for that area will appear here.
`;

function App() {
  
  const [selectedSighting, setSelectedSighting] = useState(null);

  return (
    <div className="app">
      {/* Top header */}
      <header className="app-header">
        <div className="header-inner">
          {/* Top row: logo/title left, nav right */}
          <div className="header-top">
            <div className="logo-title">
              <img
                src={elancoLogo}
                alt="Elanco logo"
                className="elanco-logo"
              />
              <h1>TickWatch</h1>
            </div>

            {/* Navigation: Track sightings, About Ticks, Report a sighting */}
            <nav className="header-nav">
              <a
                href="#track-sightings"
                className="secondary-button header-link"
              >
                Track sightings
              </a>

              <Link to="/about-ticks" className="secondary-button header-link">
                About Ticks
              </Link>

              <Link to="/report" className="secondary-button header-link">
                Report a sighting
              </Link>
            </nav>
          </div>

          {/* Thin divider line below logo/title + nav */}
          <div className="header-divider" />

          {/* Subtitle under the divider */}
          <p className="header-subtitle">Tick Tracker System</p>
        </div>
      </header>

      {/* Header images with text overlay */}
      <div className="header-images">
        <img
          src={Tick1Image}
          alt="Close-up illustration of a tick"
          className="header-image"
        />
        <img
          src={Tick2Image}
          alt="Tick on animal fur"
          className="header-image"
        />

        <div className="image-text-overlay">
          <h2>Tick sightings near you</h2>
          <p>Protecting pets across the United Kingdom</p>
        </div>
      </div>

      {/* Main two-column layout */}
      <main className="app-main">
        {/* LEFT SIDE: about + education + seasonal chart */}
        <section className="left-panel" aria-label="Filters and education">
          <section className="panel-section">
            <h2>More About Ticks</h2>
            <p className="panel-text">
              Ticks are becoming more common across the UK, carrying diseases
              like Lyme disease that can affect both pets and people. Tick
              Tracker brings this growing risk to life through an easy-to-use
              dashboard, combining an interactive map, detailed sighting
              information, and educational content. You can explore recent
              reports by species, severity, and location, learn how to identify
              different tick types, and quickly submit your own sightings to
              support a richer, more accurate picture of tick activity
              nationwide.
              <button
                type="button"
                className="primary-button"
                onClick={() => speakText(filtersDescription)}
              >
                🔊 Read aloud
              </button>
            </p>
          </section>

          {/* EDUCATION SECTION */}
          <section className="panel-section">
            <h2>Types</h2>
            <p className="panel-text">
              Ixodes ricinus - Ixodes ricinus (sheep tick) is the most common UK
              tick, found in damp grass and woodland, and can transmit Lyme
              disease to pets and people.
              <br />
              <br />
              Ixodes hexagonus - Ixodes hexagonus, known as the hedgehog tick,
              is a nest-dwelling tick found across the UK and Europe, mainly
              living in hedgehog nests but also biting foxes, cats, dogs and
              occasionally humans.
              <br />
              <br />
              Dermacentor reticulatus - Dermacentor reticulatus (ornate
              dog/meadow tick) is a larger patterned tick found in open
              grassland that often bites dogs and can spread diseases like
              Babesia.
            </p>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={() => speakText(educationDescription)}
              >
                🔊 Read aloud
              </button>
            </div>
          </section>
        </section>

        {/* RIGHT SIDE: map + sighting details */}
        <section className="right-panel" aria-label="Map and reporting">
          <div className="map-and-details">
            <section className="map-section" id="track-sightings">
              <h2>Track UK Tick sightings</h2>
              <p className="panel-text">
                Displaying tick sightings across the UK
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => speakText(mapDescription)}
                >
                  🔊 Read aloud
                </button>
              </p>

              {/* Map sends selected sighting back up */}
              <MapSection onSelectSighting={setSelectedSighting} />
            </section>

            <section className="details-section">
              <h2>Sighting Details</h2>
              <p className="panel-text">
                When you click a marker on the map, detailed information and a
                small timeline for that area will appear here.
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => speakText(detailsDescription)}
                >
                  🔊 Read aloud
                </button>
              </p>

              <SightingDetails selectedSighting={selectedSighting} />
            </section>
          </div>
        </section>
      </main>

      {/* 2-minute tick check video at the very bottom */}
      <section className="panel-section video-section">
        <h2>
          2-Minute Tick Check – Watch this short Elanco video to see how to
          check your pet for ticks and remove them safely.
        </h2>
        <p className="panel-text">
          Watch this short Elanco video to see how to check your pet for ticks
          and remove them safely.
        </p>
        <button
                type="button"
                className="primary-button"
                onClick={() => speakText(filtersDescription)}
              >
                🔊 Read aloud
              </button>

        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/lwYsc5VGM2M"
            title="2-minute tick check"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}

export default App;
