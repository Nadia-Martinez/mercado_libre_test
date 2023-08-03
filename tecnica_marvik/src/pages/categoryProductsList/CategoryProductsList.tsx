import './CategoryProductsList.css';
import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { fetchCategories, fetchCategoryProducts } from '../../DataStore';
import ProductListItem from '../../components/productListItem/ProductListItem';

function CategoriesProductsList() {
    const [categories, setCategories] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState<{id: string, name: string} | undefined>(undefined);
    const [categoryProducts, setCategoryProducts] = React.useState([]);
    const [loadingCategory, setLoadingCategory] = React.useState(false);
    const [currentOrderProducts, setCurrentOrderProducts] = React.useState([]);
    const [order, setOrder] = React.useState('default');
    const [shipping, setShipping] = React.useState(false);
    const [isNew, setIsNew] = React.useState(false);
   

    const handleOrderChange = (event: SelectChangeEvent) => {
      setOrder(event.target.value);
      const products = categoryProducts;
      
      if (order === "less") {
        products.sort((item1: any, item2: any) => item2.price - item1.price);
        setCurrentOrderProducts(products);
      } else if (order === "more") {
        products.sort((item1: any, item2: any) => item1.price - item2.price);
        setCurrentOrderProducts(products);
      } else {
        setCurrentOrderProducts(categoryProducts);
      }  
    };

    const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShipping(event.target.checked);

        if (event.target.checked) {
            const products = currentOrderProducts.filter((product: any) => {return product.shipping.free_shipping === true})
            setCurrentOrderProducts(products);
        } else setCurrentOrderProducts(categoryProducts);
    };

    const handleIsNewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsNew(event.target.checked);

        if (event.target.checked) {
            const products = currentOrderProducts.filter((product: any) => {return product.condition === "new"})
            setCurrentOrderProducts(products);
        } else setCurrentOrderProducts(categoryProducts);
    };

    const getCategories = async () => {
        const response = await fetchCategories()
        setCategories(response.slice(0, -1)); //To remove 'otras categorias' that will not be shown
    }
      
    React.useEffect(() => {
        getCategories()
    }, []);

    const handleCategoryClick = async (category: any) => {
        window.history.pushState({categoryId: category.id}, "", `http://localhost:3000/${category.id}`);
        setSelectedCategory(category);
        
        setLoadingCategory(true);

        const products = await fetchCategoryProducts(category.id);
        setCategoryProducts(products.results);
        setCurrentOrderProducts(products.results);

        setOrder("default");

        setLoadingCategory(false);
    }

    return (
        <>
            <div className="container">
                <div className="title">Categorías</div>
                {categories.map((category: any) => {
                    return category && <Button key={category.id} sx={{color: "#FFFFFF", fontFamily: 'Montserrat-Regular'}} variant="text" onClick={() => handleCategoryClick(category)}>{category.name}</Button>
                    })}        
            </div>

            <div className="categoryContainer">
                {loadingCategory ? 
                    <div className='loadingContainer'>
                        <CircularProgress color='inherit'/>
                    </div> 
                : 
                selectedCategory ?
                    <>
                        <div className='categoryHeader'>
                            <div className='categoryName'>{selectedCategory?.name}</div>

                            <div className='sorterContainer'>
                                <div className='sortByText'>Ordenar por</div>
                                
                                <FormControl sx={{ m: 1, width: 160 }} size="small">
                                    <Select
                                        labelId="select-label"
                                        id="select"
                                        value={order}
                                        onChange={handleOrderChange}
                                        label=""
                                        >
                                        <MenuItem value="default" sx={{fontFamily: 'Montserrat-Light'}}>Más relevantes</MenuItem>
                                        <MenuItem value="less" sx={{fontFamily: 'Montserrat-Light'}}>Menor Precio</MenuItem>
                                        <MenuItem value="more" sx={{fontFamily: 'Montserrat-Light'}}>Mayor Precio</MenuItem>
                                    </Select>
                                </FormControl>  
                            </div>
                        </div>
                        {currentOrderProducts && currentOrderProducts.map((product: any) => {return <ProductListItem key={product.id} product={product} categoryId={selectedCategory.id} />})}
                    </>
                :
                <div className='emptyText'>Seleccione una categoría para ver los productos</div>
                }
            </div>

            <div className='filtersContainer'>
                {!loadingCategory && selectedCategory && 
                <>
                    <div className='filtersTitle'>Filtros</div>
                    
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={handleShippingChange} value={shipping} /> } label="Envío gratis" />
                        <FormControlLabel control={<Switch onChange={handleIsNewChange} value={isNew} /> } label="Condición: Nuevo" />
                    </FormGroup>
                </>}
            </div>
            
        </>
    );
}

export default CategoriesProductsList;