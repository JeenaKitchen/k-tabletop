import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchDropdown.css';

const SearchDropdown = ({ 
  results, 
  isLoading, 
  isOpen, 
  onClose,
  onResultClick,
  selectedIndex,
  maxResults = 10 
}) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleResultClick = (result) => {
    console.log('SearchDropdown - handleResultClick:', result);
    const themeName = result.themeName.toLowerCase().replace(/\s+/g, '-');
    const dishName = result.name.toLowerCase().replace(/\s+/g, '-');
    
    console.log('SearchDropdown - Generated URL:', `/k-tabletop/${themeName}/${dishName}`);
    
    // Navigate to the recipe
    navigate(`/k-tabletop/${themeName}/${dishName}`);
    
    // Call the parent callback
    if (onResultClick) {
      onResultClick(result);
    }
    
    // Close the dropdown
    onClose();
  };

  const displayResults = results.slice(0, maxResults);

  return (
    <div className="search-dropdown">
      <div className="search-dropdown-content">
        {isLoading ? (
          <div className="search-loading">
            <div className="search-loading-spinner"></div>
            <p>Searching recipes...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="search-no-results">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <p>No recipes found</p>
            <span>Try searching for a different dish or ingredient</span>
          </div>
        ) : (
          <>
            <div className="search-results-list">
              {displayResults.map((result, index) => (
                <div
                  key={`${result.themeName}-${result.name}-${index}`}
                  className={`search-result-item ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => handleResultClick(result)}
                >
                  <div className="search-result-image">
                    <img src={result.image} alt={result.name} />
                  </div>
                  <div className="search-result-info">
                    <h4 className="search-result-name">{result.name}</h4>
                    <p className="search-result-theme">{result.themeName}</p>
                    {result.description && (
                      <p className="search-result-description">
                        {result.description.length > 80
                          ? `${result.description.substring(0, 80)}...`
                          : result.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {results.length > maxResults && (
              <div className="search-results-footer">
                <p>Showing {maxResults} of {results.length} results</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;

