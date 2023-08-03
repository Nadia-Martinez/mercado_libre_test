import './ProductListItem.css';

function ProductListItem(props: any) {
    const {product, categoryId} = props;

    const handleProductClick = () => {
        window.history.pushState({categoryId: categoryId, productId: product.id}, "", `http://localhost:3000/${categoryId}/${product.id}`);
        window.history.go();
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