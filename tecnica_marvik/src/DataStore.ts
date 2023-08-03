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

export async function fetchSellerDetails() { //For a hardcoded seller, could be generalized by seller id
    const response = await fetch("https://api.mercadolibre.com/sites/MLU/search?seller_id=181758050");
    const sellerInfo = await response.json();

    return sellerInfo;
}

export function fetchSellerHistory() {
    const history = [
        {
            id: 'MLU651280646',
            title: "Disco Sólido Interno Kingston Sa400s37/240g 240gb Negro",
            category_id: "MLU1672",
            thumbnail: "http://http2.mlstatic.com/D_825890-MLA54124091906_032023-I.jpg",
            currency_id: "USD",
            price: 20,
            sold_quantity: 1,
            sale_date: "01/08/2023",  
        },
        {
            id: "MLU634926770",
            title: "Taladro Atornillador Inalámbrico De 10mm Ingco Cdli20011 20v + Accesorios Con Caja De Cartón 220v - 240v 50hz/60hz",
            condition: "new",
            category_id: "MLU164668",
            thumbnail: "http://http2.mlstatic.com/D_957967-MLA48450954953_122021-I.jpg",
            currency_id: "USD",
            price: 90.44,
            sold_quantity: 1,
            sale_date: "03/07/2023",   
        },
        {
            id: "MLU649351740",
            title: "Resma Fanacopy A4 Multifunción De 500 Hojas De 75g Blanco",
            condition: "new",
            category_id: "MLU164908",
            thumbnail: "http://http2.mlstatic.com/D_785839-MLA53880430159_022023-I.jpg",
            currency_id: "UYU",
            price: 149,
            sold_quantity: 3,
            sale_date: "12/06/2023"  
        },
        {
            id: 'MLU651280646',
            title: "Disco Sólido Interno Kingston Sa400s37/240g 240gb Negro",
            category_id: "MLU1672",
            thumbnail: "http://http2.mlstatic.com/D_825890-MLA54124091906_032023-I.jpg",
            currency_id: "USD",
            price: 20,
            sold_quantity: 2,
            sale_date: "10/05/2023",  
        },
        {
            id: "MLU631463607",
            title: "Mouse Inalámbrico Logitech  M170 Negro",
            condition: "new",
            category_id: "MLU1714",
            thumbnail: "http://http2.mlstatic.com/D_744609-MLA32854739285_112019-I.jpg",
            currency_id: "UYU",
            price: 349,
            sold_quantity: 1,
            sale_date: "12/04/2023",  
        },
        {
            id: 'MLU651280646',
            title: "Disco Sólido Interno Kingston Sa400s37/240g 240gb Negro",
            category_id: "MLU1672",
            thumbnail: "http://http2.mlstatic.com/D_825890-MLA54124091906_032023-I.jpg",
            currency_id: "USD",
            price: 20,
            sold_quantity: 1,
            sale_date: "10/03/2023",  
        },
        {
            id: "MLU649351740",
            title: "Resma Fanacopy A4 Multifunción De 500 Hojas De 75g Blanco",
            condition: "new",
            category_id: "MLU164908",
            thumbnail: "http://http2.mlstatic.com/D_785839-MLA53880430159_022023-I.jpg",
            currency_id: "UYU",
            price: 149,
            sold_quantity: 1,
            sale_date: "02/03/2023"  
        },
    ];   
    
    return history;
}            
                       
                      
              