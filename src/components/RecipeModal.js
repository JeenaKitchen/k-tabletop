import React, { useState } from 'react';
import Modal from 'react-modal';
import './RecipeModal.css';

const RecipeModal = ({ isOpen, dish, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);



  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : '';
  };

  // Early return after all hooks are declared
  if (!dish) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={`recipe-modal ${isClosing ? 'closing' : ''}`}
      overlayClassName={`recipe-modal-overlay ${isClosing ? 'closing' : ''}`}
      contentLabel="Recipe Modal"
    >
      <div className="modal-content">
        {/* Simple Header with Close Button */}
        <div className="modal-header">
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="modal-content-body">
          <div className="modal-image-container">
            <img 
              src={dish.modalImage} 
              alt={dish.name} 
              className="modal-dish-image"
            />
          </div>
          
          <div className="modal-info">
            {/* Section 1: Basic Info */}
            <div className="cooking-time-text"> {dish.cookingTime} </div>
            {/* Section 2: Title, Description & Categories (Keep existing styling) */}
              <h2 className="modal-title">{dish.name}</h2>
              <p className="modal-dish-description">{dish.description}</p>
            <div className="category-tags">
              {dish.categories?.map((category, index) => (
                <span key={index} className="category-tag">
                  {category}
                </span>
              ))}
            </div>
            
            {/* Section 3: Time & Portion */}
            {dish.timePortion && (
              <>
                <hr className="section-separator" />
                <h3 className="sub-h1">Time & Portion</h3>
                <p className="modal-time-portion-description">{dish.timePortion}</p>
              </>
            )}
            
            {/* Section 4: Ingredients */}
            {dish.ingredients && dish.ingredients.length > 0 && (
              <>
                <hr className="section-separator" />
                <h3 className="sub-h1">Ingredients</h3>
                <ul className="modal-ingredients-description">
                  {dish.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </>
            )}
            
            {/* Section 5: Instructions */}
            {dish.instructions && dish.instructions.length > 0 && (
              <>
                <hr className="section-separator" />
                <h3 className="sub-h1">Instructions</h3>
                {dish.instructions?.map((step, index) => (
                  <div key={index} className="instruction-step">
                    <h4 className="sub-h2">Step {index + 1} - {step.stepName}</h4>
                    <p className="modal-each-step-description">{step.description}</p>
                  </div>
                ))}
              </>
            )}
            
            {/* YouTube Video (if available) */}
            {dish.youtubeUrl && (
              <>
                <hr className="section-separator" />
                <h3 className="sub-h1">Video Tutorial</h3>
                <div className="youtube-container">
                  <iframe 
                    src={getYouTubeEmbedUrl(dish.youtubeUrl)}
                    title="Recipe Video Tutorial"
                    allowFullScreen
                  />
                </div>
              </>
            )}
            
            {/* Additional Images (if available) */}
            {dish.additionalImages && dish.additionalImages.length > 0 && (
              <>
                <hr className="section-separator" />
                <h3 className="sub-h1">Step Photos</h3>
                <div className="additional-images">
                  {dish.additionalImages?.map((img, index) => (
                    <img key={index} src={img} alt={`Step ${index + 1}`} />
                  ))}
                </div>
              </>
            )}
            

          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal; 