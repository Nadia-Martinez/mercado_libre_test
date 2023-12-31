import { HistoryProduct } from '../../DataStore';

import './ProductHistoryItem.css';

export interface ProductHistoryItemProps {
	product: HistoryProduct;
}

function ProductHistoryItem(props: ProductHistoryItemProps) {
    const {product} = props;

    return (
        <div className="historyItemContainer">
            <img src={product.thumbnail} alt={product.title} />

            <div className="detailsContainer">
                <div>{product.title}</div>
                <div className="price">{product.currency_id === "UYU" ? "$ " + product.price : "US$ " + product.price}</div>
            </div>

            <div className='saleDetailsContainer'>
                <div className='saleDate'>{"Fecha de venta: " + product.sale_date}</div>
                <div className='soldQuantity'>{"Cantidad vendida: " + product.sold_quantity}</div>
            </div>
        </div>
    )
}

export default ProductHistoryItem;