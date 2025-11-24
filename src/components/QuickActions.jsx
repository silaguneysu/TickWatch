import { useNavigate } from 'react-router-dom';

function QuickActions() {
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate('/report');
  };

  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/search/veterinary+clinic+near+me', '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'TickTracker - UK Tick Sightings',
        text: 'Check out tick sightings in your area',
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>
      <div className="action-buttons">
        <button 
          className="action-button action-button-primary" 
          onClick={handleReportClick}
        >
          Report a Sighting
        </button>
        <button 
          className="action-button action-button-secondary" 
          onClick={handleGetDirections}
        >
           Get Directions
        </button>
        <button 
          className="action-button action-button-secondary" 
          onClick={handleShare}
        >
           Share
        </button>
      </div>
    </div>
  );
}

export default QuickActions;