import React, { useState } from 'react';
import './ItemsPage.css';
import { itemsData, categories } from '../data/itemsData';

const ItemsPage = () => {
  const [items] = useState(itemsData);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter items by category
  const filteredItems = items.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="items-page">
      <div className="items-page-content">
        {/* Page Header */}
        <div className="items-header">
          <h1 className="items-title">Items</h1>
          <p className="items-description">
            Explore our curated collection of kitchen essentials and tableware. 
            From cookware to utensils, find everything you need for Korean and generalcooking. Some items may contain affiliate links!
          </p>
        </div>

        {/* Category Filter */}
        <div className="filter-section">
          <h4 className="filter-label">Category</h4>
          <div className="filter-pills-container">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`filter-pill ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>


        {/* Items Grid - 4 columns × dynamic rows */}
        <div className="items-grid">
          {filteredItems.map((item) => {
            // If item has a link, wrap in <a> tag, otherwise use <div>
            const ItemWrapper = item.link ? 'a' : 'div';
            const wrapperProps = item.link 
              ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <ItemWrapper 
                key={item.id} 
                className="item-card"
                {...wrapperProps}
              >
                <div className="item-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                </div>
              </ItemWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;

