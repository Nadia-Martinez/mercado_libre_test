import './ProductDetails.css';
import React from "react";
import { fetchProductInfo } from "../../DataStore";
import CircularProgress from "@mui/material/CircularProgress";
import ImagesCarousel from "../../components/imagesCarousel/ImagesCarousel";
import Button from "@mui/material/Button";

function ProductDetails() {
    const [productInfo, setProductInfo] = React.useState<any>(undefined);
    const [loadingProduct, setLoadingProduct] = React.useState(false);

    const getProductInfo = React.useCallback(async (id: string) => {
        setLoadingProduct(true);
        
        const response = await fetchProductInfo(id);
        setProductInfo(response);

        setLoadingProduct(false);
    }, [])

    React.useEffect(() => {
        const {productId} = window.history.state;

        getProductInfo(productId);
    }, [getProductInfo])
      
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
                        <div className='productPrimaryDetail'>{productInfo.shipping.free_shipping ? "Envío gratis: Sí" : "Envío gratis: No"}</div>
                        <div className='productPrimaryDetail'>{productInfo.shipping.local_pick_up ? "Retiro en tienda: Sí" : "Retiro en tienda: No"}</div>

                        {productInfo.seller_address.search_location && 
                        <div className='infoContainer'>
                            <div className='otherInfoTitle'>Detalles del Vendedor</div>
                            <div className='productPrimaryDetail'>{"Departamento: " + productInfo.seller_address.search_location.state!.name}</div>
                            <div className='productPrimaryDetail'>{"Ciudad/Barrio: " + productInfo.seller_address.search_location.city.name}</div>
                            <div className='productPrimaryDetail'>{"Vendedor: " + productInfo.seller_id}</div>
                        </div>}

                        {productInfo.sale_terms.length > 0 && 
                        <div className='infoContainer'>
                            <div className='otherInfoTitle'>Condiciones de venta</div>
                            {productInfo.sale_terms.map((term: any) => {return <div className='productPrimaryDetail' key={term.value_id}>{term.name + ": " + term.value_name}</div>})}
                        </div>}
                    </div>

                    <Button variant="contained" sx={{height: 50, width: "20%"}}>Comprar ahora</Button>
                </div>

                <div className='otherDetailsContainer'>
                    <div className='otherDetailsTitle'>Detalles del producto</div>
                    {productInfo.attributes.map((value: any) => {return value.value_name !== null && <div className='productAttribute' key={value.id}>{value.name + ": " + value.value_name}</div>})}
                </div>
            </div>
            }
        </>
    )
}

export default ProductDetails;