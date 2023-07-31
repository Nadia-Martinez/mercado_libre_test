import React from 'react';
import { fetchCategories } from '../../DataStore';

function CategoriesList() {
    const [categories, setCategories] = React.useState([]);

    const getCategories = async () => {
        const response = await fetchCategories()
        setCategories(response.slice(0, -1));
    }
      
    React.useEffect(() => {
        getCategories()
    }, []);

    return (
        <div style={{backgroundColor: "rgb(51, 51, 51)", paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
            <h1 style={{color: "white"}}>Categorias</h1>
            <div>
                {categories.map((category: any, index: number) => {return category && <div key={index} style={{color: "white"}}>{category.name}</div>})}
            </div>
        </div>
    );
}

export default CategoriesList;