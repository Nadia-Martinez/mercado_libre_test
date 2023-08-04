export type HistoryProduct = {
    id: string;
    title: string;
    category_id: string;
    thumbnail: string;
    currency_id: string;
    price: number;
    sold_quantity: number;
    sale_date: string;
};

export type Image = {
    id: string;
    url: string;
    secure_url: string;
    size: string;
    max_size: string;
    quality: string;
};

export type Product = {
    id: string;
    title: string;
    seller_id: string;
    category_id: string;
    price: number;
    currency_id: string;
    sale_terms: any;
    condition: string;
    thumbnail: string;
    pictures: Image[];
    accepts_mercadopago: boolean;
    shipping: any;
    seller_address: any;
    attributes: any;
};

export type Review = {
    description: string;
    rating: number;
    date: string;
};

export type ProductReview = {
    reviews: Review[];
    review_value: number;
};

export type SellerInfo = {
    seller: {
        id: number;
        nickname: string;
        registration_date: string;
        seller_reputation: {
            level_id: string;
            metrics: {
                sales: {
                    period: string;
                    completed: number;
                },
                claims: {
                    period: string;
                    value: number;
                },
                cancellations: {
                    period: string;
                    value: number;
                }
            }
        }
    }
};

export type Category = {
    id: string;
    name: string;
}

export async function fetchCategories(): Promise<Category[]> {
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
    console.log(productDetails);

    return productDetails;
}

export function fetchProductReviews(product_id: string): ProductReview { //product_id would be used to fetch real reviews for a product
    const reviews = [
        { 
            description: "Funciona muy bien",
            rating: 5,
            date: "20/07/2023"
        },
        {
            description: "Lo recibí muy rápido",
            rating: 4,
            date: "26/06/2023"
        },
        {
            description: "Cuando fui a buscarlo no tenían más del color que quería, pero me sirvió igual.",
            rating: 3,
            date: "15/06/2023"
        },
        {
            description: "Buena compra, recomiendo",
            rating: 5,
            date: "08/05/2023"
        },
        {
            description: "No me anduvo como esperaba.",
            rating: 1,
            date: "02/05/2023"
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

export async function fetchSellerDetails(): Promise<SellerInfo> { //For a hardcoded seller, could be generalized by seller id
    const response = await fetch("https://api.mercadolibre.com/sites/MLU/search?seller_id=181758050");
    const sellerInfo = await response.json();

    return sellerInfo;
}

export function fetchSellerHistory(): HistoryProduct[] {
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
                       
                      
              