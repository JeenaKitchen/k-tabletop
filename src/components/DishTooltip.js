import React from 'react';
import './DishTooltip.css';

const DishTooltip = ({ name }) => {
  return (
    <div className="dish-tooltip">
      {name}
    </div>
  );
};

export default DishTooltip;
 