import { useState } from 'react';

function FilterControls({ onFilterChange }) {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    species: '',
    severity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateFrom: '',
      dateTo: '',
      species: '',
      severity: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label>
          Date From
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleChange}
          />
        </label>
        <label>
          Date To
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="filter-group">
        <label>
          Species
          <select name="species" value={filters.species} onChange={handleChange}>
            <option value="">All Species</option>
            <option value="Ixodes ricinus">Ixodes ricinus</option>
            <option value="Ixodes hexagonus">Ixodes hexagonus</option>
            <option value="Dermacentor reticulatus">Dermacentor reticulatus</option>
            <option value="Unknown">Unknown</option>
          </select>
        </label>

        <label>
          Severity
          <select name="severity" value={filters.severity} onChange={handleChange}>
            <option value="">All Levels</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>

      <button type="button" onClick={handleReset} className="reset-button">
        Reset Filters
      </button>
    </div>
  );
}

export default FilterControls;