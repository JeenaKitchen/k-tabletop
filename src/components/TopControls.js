import React, { useState, useEffect, useRef } from 'react';
import './TopControls.css';
import { themeConfig } from '../data/themeConfig';
import SearchDropdown from './SearchDropdown';
import searchService from '../services/searchService';

const TopControls = ({ 
  currentTheme, 
  isAccordionOpen, 
  onAccordionToggle, 
  isMuted, 
  volume, 
  onMuteToggle, 
  onVolumeChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const getThemeDescription = (themeName) => {
    const theme = themeConfig.find(t => t.name === themeName);
    return theme?.description || "Experience the authentic Korean dining atmosphere.";
  };

  // Handle search
  const handleSearch = async (query) => {
    const searchTerm = query || searchQuery;
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    setIsSearching(true);
    setIsSearchOpen(true);
    
    try {
      const results = await searchService.searchRecipes(searchTerm);
      setSearchResults(results);
      setSelectedResultIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
      setSelectedResultIndex(-1);
    } else if (e.key === 'ArrowDown' && isSearchOpen && searchResults.length > 0) {
      e.preventDefault();
      setSelectedResultIndex((prev) => 
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp' && isSearchOpen && searchResults.length > 0) {
      e.preventDefault();
      setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : -1));
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Handle input change - search as user types with debounce
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // If input is empty, clear immediately
    if (!value.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      setIsSearching(false);
      return;
    }
    
    // Show loading state immediately
    setIsSearching(true);
    setIsSearchOpen(true);
    
    // Debounce search by 300ms
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleResultClick = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSelectedResultIndex(-1);
  };

  return (
    <div className="top-controls">
      <div className="top-controls-left">
        <div className="search-control" ref={searchContainerRef}>
          <div className="search-input-container">
            <button 
              className="search-button"
              onClick={handleSearch}
              aria-label="Search recipes"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              aria-label="Search recipes"
            />
          </div>
          <SearchDropdown
            results={searchResults}
            isLoading={isSearching}
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onResultClick={handleResultClick}
            selectedIndex={selectedResultIndex}
          />
        </div>
      </div>

      <div className="top-controls-center">
      </div>

      <div className="top-controls-right">
        <div className="theme-accordion">
          <button 
            className="theme-accordion-button"
            onClick={onAccordionToggle}
            aria-label={`${isAccordionOpen ? 'Collapse' : 'Expand'} theme information`}
          >
            <div className="theme-title-section">
              <h2 className="theme-title">{currentTheme.name}</h2>
              <svg 
                className={`caret-icon ${isAccordionOpen ? 'open' : ''}`}
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </button>
          
          <div className={`theme-description ${isAccordionOpen ? 'open' : ''}`}>
            <p>{getThemeDescription(currentTheme.name)}</p>
          </div>
        </div>

        <div className="sound-control">
          <button 
            className={`sound-button ${isMuted ? 'muted' : ''}`}
            onClick={() => onMuteToggle(!isMuted)}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
            aria-label="Volume control"
          />
        </div>
      </div>
    </div>
  );
};

export default TopControls;
