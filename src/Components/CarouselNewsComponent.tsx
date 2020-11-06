import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


interface IProps{
    showArros: boolean;
    showThums: boolean;
    images: string[];
}



const CarouselNewsComponent: React.FC<IProps> = ({showArros, showThums, images}) => {
    console.log(images[0]);
  return (
      <Carousel  showArrows={showArros} showThumbs={showThums} showStatus={false} >
        {
            images.map((image) => 
                <div>
                     <img src={image}  alt={image}/>
                </div>
            )
        }
      </Carousel>
  )

}

export default CarouselNewsComponent
