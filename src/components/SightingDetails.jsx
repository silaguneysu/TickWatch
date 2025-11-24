import { useState } from 'react';

function getRiskBadge(risk) {
  if (!risk) return null;
  const level = risk.toLowerCase();
  let className = 'badge';
  if (level.includes('high')) className += ' badge-high';
  else if (level.includes('medium') || level.includes('moderate')) className += ' badge-medium';
  else className += ' badge-low';
  return <span className={className}>{risk}</span>;
}

function SightingDetails({ selectedSighting }) {
  if (!selectedSighting) {
    return (
      <section className="panel-section">
        <h2>Sighting details</h2>
        <p className="panel-text">
          Tap a marker on the map to see more information about that tick
          sighting.
        </p>
      </section>
    );
  }

  const {
    species,
    location,
    city,
    county,
    date,
    host,
    animal,
    risk_level,
    severity,
    notes,
  } = selectedSighting;

  const risk = risk_level || severity;

  return (
    <section className="panel-section">
      <h2>Sighting details</h2>
      <div className="detail-row">
        <span className="detail-label">Location</span>
        <span className="detail-value">
          {location || city || county || 'Not specified'}
        </span>
      </div>
      {date && (
        <div className="detail-row">
          <span className="detail-label">Date</span>
          <span className="detail-value">{date}</span>
        </div>
      )}
      {species && (
        <div className="detail-row">
          <span className="detail-label">Species</span>
          <span className="detail-value species-value">{species}</span>
        </div>
      )}
      {(animal || host) && (
        <div className="detail-row">
          <span className="detail-label">Host animal</span>
          <span className="detail-value">{animal || host}</span>
        </div>
      )}
      {risk && (
        <div className="detail-row">
          <span className="detail-label">Risk level</span>
          <span className="detail-value">{getRiskBadge(risk)}</span>
        </div>
      )}
      {notes && (
        <div className="detail-row">
          <span className="detail-label">Notes</span>
          <span className="detail-value">{notes}</span>
        </div>
      )}
    </section>
  );
}

export default SightingDetails;