import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import c1 from '../assets/photos/Carousel_1.jpg';
import c2 from '../assets/photos/Carousel_2.jpg';
import c3 from '../assets/photos/Carousel_3.jpg';




const CarouselComponent = () => {
  return (
      <Carousel autoPlay infiniteLoop showArrows showThumbs={false} showStatus={false} >
        <div>
          <img src={c1} alt='C1'/>
        </div>
        <div>
          <img src={c2} alt='C2'/>
        </div>
        <div>
          <img src={c3} alt='C3'/>
        </div>
      </Carousel>
  )

}

export default CarouselComponent
