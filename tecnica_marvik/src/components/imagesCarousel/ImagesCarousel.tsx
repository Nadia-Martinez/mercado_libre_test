import Carousel from "nuka-carousel"

function ImagesCarousel(props: any) {
    return (
        <Carousel wrapAround style={{backgroundColor: "white", width: 500}}>
            {props.images.map((image: any, index: number) => {return <img key={index} src={image.url} alt={`Imagen ${index}`} />})}
        </Carousel>
    )
};

export default ImagesCarousel;