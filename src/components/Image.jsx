import React from 'react';

const Image = ({ imageUrl, tags }) => (
  <div className="image-card">
    <img src={imageUrl} alt="Gallery" />
    <div className="image-tags">
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default Image;
