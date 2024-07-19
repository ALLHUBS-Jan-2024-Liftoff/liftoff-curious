import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import HomeCarouselImage from './HomeCarouselImage';

function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <HomeCarouselImage src="https://placehold.co/1600x400/557589/ffffff" alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3500}>
      <HomeCarouselImage src="https://placehold.co/1600x400/12f334/ffffff" alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
      <HomeCarouselImage src="https://placehold.co/1600x400/f37589/ffffff" alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;