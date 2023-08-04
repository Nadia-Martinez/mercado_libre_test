import Carousel from "nuka-carousel";

import { Image } from '../../DataStore';

export interface ImagesCarouselProps {
	images: Image[];
}

function ImagesCarousel(props: ImagesCarouselProps) {
    return (
        <Carousel wrapAround style={{backgroundColor: "white", width: 500}}>
            {props.images.map((image: Image, index: number) => {return <img key={index} src={image.url} alt={`Imagen ${index}`} />})}
        </Carousel>
    )
};

export default ImagesCarousel;