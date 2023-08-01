import './ProductListItem.css';

function ProductListItem(props: any) {
    const {product} = props;

    const handleProductClick = () => {
        console.log(product);
    }

    return (
        <div className="itemContainer" onClick={handleProductClick}>
            <img src={product.thumbnail} alt={product.title} />
            <div className="detailsContainer">
                <div>{product.title}</div>
                <div className="price">{product.currency_id === "UYU" ? "$ " + product.price : "US$ " + product.price}</div>
            </div>
        </div>
    )
}

export default ProductListItem;