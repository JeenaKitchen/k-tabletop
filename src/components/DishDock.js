import React from 'react';
import './DishDock.css';
import DishTooltip from './DishTooltip';

const DishDock = ({ dishes, onDishClick }) => {
  return (
    <div className="dish-dock">
      <div className="dock-container">
        {dishes.map((dish, index) => (
          <div key={index} className="dock-item-wrapper">
            <div 
              className="dock-item"
              onClick={() => onDishClick(dish)}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('.dish-tooltip').style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('.dish-tooltip').style.opacity = '0';
              }}
            >
              <img 
                src={dish.image} 
                alt={dish.name}
                className="dish-image"
              />
              <DishTooltip name={dish.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishDock; 