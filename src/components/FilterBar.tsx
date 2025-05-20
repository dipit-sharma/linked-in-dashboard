import React from 'react';
import './FilterBar.css';

export interface FilterOptions {
  showReshared: boolean;
  showOriginal: boolean;
  showWithVideo: boolean;
}

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key: keyof FilterOptions) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key]
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label className="filter-label">
          <input
            type="checkbox"
            checked={filters.showReshared}
            onChange={() => handleFilterChange('showReshared')}
            className="filter-checkbox"
          />
          <span className="filter-text">Reshared Posts</span>
        </label>

        <label className="filter-label">
          <input
            type="checkbox"
            checked={filters.showOriginal}
            onChange={() => handleFilterChange('showOriginal')}
            className="filter-checkbox"
          />
          <span className="filter-text">Original Posts</span>
        </label>

        <label className="filter-label">
          <input
            type="checkbox"
            checked={filters.showWithVideo}
            onChange={() => handleFilterChange('showWithVideo')}
            className="filter-checkbox"
          />
          <span className="filter-text">Posts with Video</span>
        </label>
      </div>
    </div>
  );
};

export default FilterBar; 