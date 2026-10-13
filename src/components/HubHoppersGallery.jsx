import React from 'react';

export function HubHoppersGallery({ images, label = 'Image gallery', showNumbers = false }) {
  return (
    <div
      className="hub-hoppers-gallery"
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <div
        className="hub-hoppers-track"
        style={{ '--hub-hoppers-duration': `${Math.max(52, images.length * 8)}s` }}
      >
        {[0, 1].map(group => (
          <div
            className="hub-hoppers-group"
            key={`hub-hoppers-group-${group}`}
            aria-hidden={group === 1}
          >
            {images.map((image, index) => (
              <figure
                className={`hub-hoppers-card${image.orientation ? ` hub-hoppers-card--${image.orientation}` : ''}`}
                key={`${group}-${image.src}`}
              >
                <img
                  src={image.src}
                  alt={group === 0 ? image.alt : ''}
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
                {showNumbers && group === 0 && (
                  <span className="hub-hoppers-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
