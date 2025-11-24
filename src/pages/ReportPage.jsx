// src/pages/ReportPage.jsx
import ReportForm from '../components/ReportForm.jsx';
import { Link } from 'react-router-dom';
import elancoLogo from '../assets/elanco-logo.png';

function ReportPage() {
  return (
    <div className="app report-page">
      {/* Full-width blue header */}
      <header className="app-header full-width-header">
        <div className="header-inner">
          {/* Top row: logo left, nav right */}
          <div className="header-top">
            <div className="logo-title">
              <img
                src={elancoLogo}
                alt="Elanco logo"
                className="elanco-logo"
              />
              <h1>TickTracker</h1>
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
          {/* match main dashboard header */}
          <div className="header-divider" />
          <p className="header-subtitle">Elancos Tick Tracker System</p>
        </div>
      </header>

      {/* Centered form area */}
      <main className="report-page-main">
        <section className="report-section-centered">
          <div className="report-header-row">
            <h2>Report a Tick Sighting</h2>
            {/* Back to dashboard button */}
            <Link to="/" className="secondary-button back-button">
              ← Back to Dashboard
            </Link>
          </div>
          <p className="panel-text">
            Please fill in all required fields to report a new tick sighting.
          </p>
          <ReportForm />
        </section>
      </main>
    </div>
  );
}

export default ReportPage;