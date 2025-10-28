import React, { useState, useRef } from 'react';
import './DishDock.css';
import DishTooltip from './DishTooltip';

const DishDock = ({ dishes, onDishClick }) => {
  const [hoveredDish, setHoveredDish] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const dockRef = useRef(null);

  const handleMouseEnter = (e, dish) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setHoveredDish(dish);
  };

  const handleMouseLeave = () => {
    setHoveredDish(null);
  };

  const handleTouchStart = (e) => {
    // Allow touch scrolling to work properly
    e.stopPropagation();
  };

  const handleTouchMove = (e) => {
    // Prevent default only if we're not scrolling
    if (Math.abs(e.touches[0].clientX - e.touches[0].clientX) > 10) {
      e.stopPropagation();
    }
  };

  return (
    <>
      <div className="dish-dock">
        <div 
          ref={dockRef}
          className="dock-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {dishes.map((dish, index) => (
            <div key={index} className="dock-item-wrapper">
              <div 
                className="dock-item"
                onClick={() => onDishClick(dish)}
                onMouseEnter={(e) => handleMouseEnter(e, dish)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="dish-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Render tooltip outside dock container */}
      {hoveredDish && (
        <DishTooltip 
          name={hoveredDish.name} 
          position={tooltipPosition}
        />
      )}
    </>
  );
};

export default DishDock; 