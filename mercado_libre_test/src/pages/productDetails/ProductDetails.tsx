import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';

import { Product, ProductReview, fetchProductInfo, fetchProductReviews } from "../../DataStore";
import ImagesCarousel from "../../components/imagesCarousel/ImagesCarousel";

import './ProductDetails.css';

function ProductDetails() {
    const [productInfo, setProductInfo] = React.useState<Product | undefined>(undefined);
    const [productReviews, setProductReviews] = React.useState<ProductReview | undefined>(undefined);
    const [loadingProduct, setLoadingProduct] = React.useState(false);

    const getProductInfo = React.useCallback(async (id: string) => {
        setLoadingProduct(true);
        
        const response = await fetchProductInfo(id);
        setProductInfo(response);

        setLoadingProduct(false);
    }, []);

    const getProductReviews = React.useCallback((id: string) => {
        const response = fetchProductReviews(id);
        setProductReviews(response);
    }, []);

    React.useEffect(() => {
        const {productId} = window.history.state;

        getProductInfo(productId);
        getProductReviews(productId);
    }, [getProductInfo, getProductReviews]);
      
    return (
        <>
            {loadingProduct ? 
                <div className='loadingContainer'>
                    <CircularProgress color='inherit'/>
                </div>
            :
            productInfo && 
            <div className='productInfoContainer'>
                <div className='primaryDetailsWrapper'>
                    <ImagesCarousel images={productInfo.pictures} />

                    <div className='primaryDetailsContainer'>
                        <div className='productTitle'>{productInfo?.title}</div>
                        <div className='productPrice'>{productInfo.currency_id === "USD" ? "US$ " + productInfo.price : "$ " + productInfo.price}</div>
                        <div className='productCondition'>{`Condición: ${productInfo.condition === "new" ? "Nuevo" : "Usado"}`}</div>
                        {productInfo.accepts_mercadopago && <div className='productPrimaryDetail'>Acepta Mercado Pago</div>}
                        <div className='productPrimaryDetail'>{productInfo.shipping.local_pick_up ? "Retiro en tienda: Sí" : "Retiro en tienda: No"}</div>
                        
                        {productInfo.seller_address.search_location && 
                        <div className='infoContainer'>
                            <div className='otherInfoTitle'>Detalles del Vendedor</div>
                            <div className='productPrimaryDetail'>{"Departamento: " + productInfo.seller_address.search_location.state.name}</div>
                            <div className='productPrimaryDetail'>{"Ciudad/Barrio: " + productInfo.seller_address.search_location.city.name}</div>
                        </div>}

                        {productInfo.sale_terms.length > 0 && 
                        <div className='infoContainer'>
                            <div className='otherInfoTitle'>Condiciones de venta</div>
                            {productInfo.sale_terms.map((term: any) => {return <div className='productPrimaryDetail' key={term.value_id}>{term.name + ": " + term.value_name}</div>})}
                        </div>}
                    </div>

                    <div className='buyContainer'>
                        {productReviews && <div className='reviewValueContainer'>
                            <Rating name="read-only" value={productReviews.review_value} readOnly />
                            <div className='reviewValue'>{"(" + productReviews.reviews.length + ")"}</div>
                        </div>}

                        <Button variant="contained" sx={{height: 50}}>Comprar ahora</Button>
                        <div className='shippingDetail'>{productInfo.shipping.free_shipping && "¡Envío gratis!"}</div>
                    </div>
                </div>

                <div className='otherDetailsContainer'>
                    <div className='otherDetailsTitle'>Detalles del producto</div>
                    {productInfo.attributes.map((value: any) => {return value.value_name !== null && <div className='productAttribute' key={value.id}>{value.name + ": " + value.value_name}</div>})}
                </div>

                <div className='allReviewsContainer'>
                    <div className='otherDetailsTitle'>Reseñas</div>

                    {productReviews && productReviews.reviews.map((review: {description: string, rating: number, date: string}, index: number) => {
                        return (
                        <div className='reviewContainer' key={index}>
                            <div className='reviewDate'>{review.date}</div>
                            <Rating name="read-only" value={review.rating} readOnly />
                            <div className='reviewDescription'>{review.description}</div>
                        </div>
                    )})}
                </div>
            </div>
            }
        </>
    )
}

export default ProductDetails;