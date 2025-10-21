import React, { useState } from 'react';
import './DishDock.css';
import DishTooltip from './DishTooltip';

const DishDock = ({ dishes, onDishClick }) => {
  const [hoveredDish, setHoveredDish] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  return (
    <>
      <div className="dish-dock">
        <div className="dock-container">
          {dishes.map((dish, index) => (
            <div key={index} className="dock-item-wrapper">
              <div 
                className="dock-item"
                onClick={() => onDishClick(dish)}
                onMouseEnter={(e) => handleMouseEnter(e, dish)}
                onMouseLeave={handleMouseLeave}
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