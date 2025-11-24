// src/AboutTicks.jsx
import React from "react";
import { Link } from "react-router-dom";
import elancoLogo from "./assets/elanco-logo.png";

function AboutTicks() {
  return (
    <div className="app">
      {/* Header reusing your main styles */}
      <header className="app-header full-width-header">
        <div className="header-inner">
          <div className="header-top">
            <div className="logo-title">
              <img
                src={elancoLogo}
                alt="Elanco logo"
                className="elanco-logo"
              />
              <h1>TickWatch</h1>
            </div>
            <nav className="header-nav">
              <Link to="/" className="secondary-button header-link">
                Home
              </Link>
              <Link to="/about-ticks" className="secondary-button header-link">
                About Ticks
              </Link>
              <Link to="/report" className="secondary-button header-link">
                Report a Sighting
              </Link>
            </nav>
          </div>
          <div className="header-divider" />
          <p className="header-subtitle">
            Learn how to identify ticks and protect your pets.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <section className="left-panel">
          <section className="panel-section">
            <h2>About Ticks</h2>
            <p className="panel-text">
              Ticks are small parasites that feed on the blood of animals and
              humans. In the UK, several tick species are becoming more common,
              especially in warmer months and in areas with wildlife, long grass
              or woodland. Knowing how to identify them and where they live helps
              you protect your pets and yourself.
            </p>
          </section>

          {/* SPECIES IDENTIFICATION GUIDE */}
          <section className="panel-section species-section">
            <h2>Species Identification Guide</h2>
            <p className="panel-text">
              The UK is home to several tick species. Here are the most common
              ones you may encounter:
            </p>

            <div className="species-grid">
              <div className="species-card">
                <h3>Ixodes ricinus</h3>
                <div className="species-subtitle">
                  Sheep Tick / Castor Bean Tick
                </div>
                <div className="species-content">
                  <p>
                    <strong>Appearance:</strong> Dark brown to black, 3–4mm when
                    unfed, can grow to 11mm when engorged. Teardrop-shaped body.
                  </p>
                  <p>
                    <strong>Habitat:</strong> Grasslands, moorlands, woodland
                    edges, and areas with vegetation. Most common in rural and
                    semi-rural areas.
                  </p>
                  <p>
                    <strong>Peak Activity:</strong> Spring and autumn, but active
                    year-round in mild weather.
                  </p>
                  <p>
                    <strong>Hosts:</strong> Sheep, cattle, deer, dogs, cats, and
                    humans.
                  </p>
                  <p>
                    <strong>Disease Risk:</strong> Can transmit Lyme disease and
                    other tick-borne illnesses.
                  </p>
                </div>
              </div>

              <div className="species-card">
                <h3>Ixodes hexagonus</h3>
                <div className="species-subtitle">Hedgehog Tick</div>
                <div className="species-content">
                  <p>
                    <strong>Appearance:</strong> Reddish-brown, slightly smaller
                    than I. ricinus. Distinctive hexagonal basis capituli (base
                    of mouthparts).
                  </p>
                  <p>
                    <strong>Habitat:</strong> Urban and suburban areas, gardens,
                    parks. Often found in hedgehog nests and burrows.
                  </p>
                  <p>
                    <strong>Peak Activity:</strong> Active throughout the year,
                    particularly in spring and summer.
                  </p>
                  <p>
                    <strong>Hosts:</strong> Primarily hedgehogs, but also dogs,
                    cats, and occasionally humans.
                  </p>
                  <p>
                    <strong>Disease Risk:</strong> Lower disease transmission
                    risk compared to I. ricinus, but can still carry pathogens.
                  </p>
                </div>
              </div>

              <div className="species-card">
                <h3>Dermacentor reticulatus</h3>
                <div className="species-subtitle">
                  Ornate Cow Tick / Marsh Tick
                </div>
                <div className="species-content">
                  <p>
                    <strong>Appearance:</strong> Larger than Ixodes species
                    (4–5mm unfed), distinctive white/cream marbled pattern on
                    dark brown shield.
                  </p>
                  <p>
                    <strong>Habitat:</strong> Wetlands, marshes, meadows.
                    Increasingly found in southern England and Wales.
                  </p>
                  <p>
                    <strong>Peak Activity:</strong> Two peaks – early spring
                    (March–May) and autumn (September–November).
                  </p>
                  <p>
                    <strong>Hosts:</strong> Large mammals including cattle,
                    horses, dogs, and occasionally humans.
                  </p>
                  <p>
                    <strong>Disease Risk:</strong> Can transmit canine
                    babesiosis, a serious disease in dogs.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Right panel can be kept simple for now */}
        <section className="right-panel">
          <section className="panel-section">
            <h2>Prevention Tips</h2>
            <p className="panel-text">
              Check your pets regularly for ticks, especially after walks in
              long grass or woodland. Use vet-recommended tick prevention
              products and remove any ticks promptly and safely.
            </p>
          </section>
        </section>
      </main>
    </div>
  );
}

export default AboutTicks;
