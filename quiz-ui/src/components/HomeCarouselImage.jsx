import React from 'react'

function HomeCarouselImage({src, alt}) {
  return (
    <div>
        <img
        className="d-block w-100"
        src={src}
        alt={alt}
        />
    </div>
  );
}

export default HomeCarouselImage