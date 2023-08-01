import './CategoryProductsList.css';
import React from 'react';
import Button from '@mui/material/Button';
import { fetchCategories, fetchCategoryProducts } from '../../DataStore';
import ProductListItem from '../../components/productListItem/ProductListItem';

function CategoriesProductsList() {
    const [categories, setCategories] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState<{id: string, name: string} | undefined>(undefined);
    const [categoryProducts, setCategoryProducts] = React.useState([]);

    const getCategories = async () => {
        const response = await fetchCategories()
        setCategories(response.slice(0, -1)); //To remove 'otras categorias' that will not be shown
    }
      
    React.useEffect(() => {
        getCategories()
    }, []);

    const handleCategoryClick = async (category: any) => {
        setSelectedCategory(category);
        
        const products = await fetchCategoryProducts(category.id);
        setCategoryProducts(products.results);
    }

    return (
        <>
            <div className="container">
                <div className="title">Categorías</div>
                {categories.map((category: any) => {
                    return category && <Button key={category.id} sx={{color: "#FFFFFF", fontFamily: 'Montserrat-Regular'}} variant="text" onClick={() => handleCategoryClick(category)}>{category.name}</Button>
                    })}        
            </div>

            {selectedCategory && <div className="categoryContainer">
                <h2>{selectedCategory?.name}</h2>
                {categoryProducts && categoryProducts.map((product: any) => {return <ProductListItem product={product} />})}
            </div>}
        </>
    );
}

export default CategoriesProductsList;