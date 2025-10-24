import React, { useState } from 'react';
import './ItemsPage.css';
import { itemsData, categories } from '../data/itemsData';
import { useTranslation } from '../hooks/useTranslation';

const ItemsPage = () => {
  const { currentLanguage } = useTranslation();
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
          <h1 className="items-title">
            {currentLanguage === 'ko' ? '아이템' : 'Items'}
          </h1>
          <p className="items-description">
            {currentLanguage === 'ko' 
              ? '지나키친에서 사용하는 주방 필수품과 식기류의 큐레이션된 컬렉션을 탐색해보세요. 조리기구부터 도구까지, 한국 요리와 일반 요리에 필요한 모든 것을 찾아보세요. 일부 아이템은 제휴 링크를 포함할 수 있습니다!'
              : 'Explore our curated collection of kitchen essentials and tableware. From cookware to utensils, find everything you need for Korean and general cooking. Some items may contain affiliate links!'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="filter-section">
          <h4 className="filter-label">
            {currentLanguage === 'ko' ? '카테고리' : 'Category'}
          </h4>
          <div className="filter-pills-container">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`filter-pill ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {currentLanguage === 'ko' && category.koreanLabel ? category.koreanLabel : category.label}
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
                  <h3 className="item-name">
                    {currentLanguage === 'ko' && item.koreanName ? item.koreanName : item.name}
                  </h3>
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

