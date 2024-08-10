import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import HomeCarouselImage from './HomeCarouselImage';

function HomeCarousel() {
  return (
    <Carousel className="d-none d-lg-block">
      <Carousel.Item interval={7000}>
        <HomeCarouselImage src="./assets/banner-images/Home-Banner1.jpg" alt="First slide" />
        <Carousel.Caption>
        <h3 className="carousel-primary-text">Think Coding is Tough?</h3>
        <p className="carousel-secondary-text">It only feels so until you put your skills to the test <br/>and discover what you truly know.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={8000}>
      <HomeCarouselImage src="./assets/banner-images/Home-Banner2.jpg" alt="Second slide" />
        <Carousel.Caption>
          <h3 className="carousel-primary-text">Learning A New Programming Language?</h3>
          <p className="carousel-secondary-text">Don't worry! Test what you learned<br/>and see how much you can retain.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={9000}>
      <HomeCarouselImage src="./assets/banner-images/Home-Banner3.jpg" alt="Third slide" />
        <Carousel.Caption className="ps-5">
          <h3 className="carousel-primary-text">&nbsp;&nbsp;Tests are Boring; Quizzes are Fun!</h3>
          <p className="carousel-secondary-text">
            &nbsp;&nbsp;Especially when you play it on our responsive quiz environment.<br/>&nbsp;&nbsp;Supports dark-mode, review flags, listen-to-it, and more! 
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;