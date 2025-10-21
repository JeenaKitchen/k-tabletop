import React from 'react';
import './DishTooltip.css';

const DishTooltip = ({ name, position }) => {
  return (
    <div 
      className="dish-tooltip dish-tooltip-visible"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {name}
    </div>
  );
};

export default DishTooltip;
 