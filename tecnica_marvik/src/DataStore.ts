export async function fetchCategories() {
    const response = await fetch("https://api.mercadolibre.com/sites/MLU/categories");
    const categories = await response.json();

    return categories;
}

export async function fetchCategoryProducts(category_id: string) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLU/search?category=${category_id}`);
    const categoryProducts = await response.json();

    return categoryProducts;
}

export async function fetchProductInfo(product_id: string) {
    const response = await fetch(`https://api.mercadolibre.com/items/${product_id}`);
    const productDetails = await response.json();

    return productDetails;
}