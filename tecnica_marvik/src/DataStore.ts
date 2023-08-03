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

export function fetchProductReviews(product_id: string) {
    const reviews = [
        { 
            description: "Funciona muy bien",
            rating: 5,
        },
        {
            description: "Lo recibí muy rápido",
            rating: 4,
        },
        {
            description: "Cuando fui a buscarlo no tenían más del color que quería, pero me sirvió igual.",
            rating: 3,
        },
        {
            description: "Buena compra, recomiendo",
            rating: 5,
        },
        {
            description: "No me anduvo como esperaba.",
            rating: 1,
        }
    ];

    let totalValue = 0;
    
    for (let i = 0; i < reviews.length; i++) {
        totalValue += reviews[i].rating;
    }

    const finalReviewValue = totalValue / reviews.length;

    const response = {
        reviews: reviews,
        review_value: finalReviewValue,
    }

    return response;
}