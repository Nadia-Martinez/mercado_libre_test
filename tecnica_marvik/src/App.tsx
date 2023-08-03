import React from 'react';
import './App.css';
import Header from './components/header/Header';
import CategoriesProductsList from './pages/categoryProductsList/CategoryProductsList';
import ProductDetails from './pages/productDetails/ProductDetails';

function App() {
  const [showCategories, setShowCategories] = React.useState(true);
  const [showProductDetails, setShowProductDetails] = React.useState(false);

  React.useEffect(() => {
    const url = window.history;

    if (url.state !== null) {
      const {state} = url;
      if (state.categoryId !== undefined && state.productId !== undefined) {
        setShowProductDetails(true);
        setShowCategories(false);
      }
      else {
        setShowProductDetails(false);
        setShowCategories(true);
      }
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <div className='bodyContainer'>
        {showCategories && <CategoriesProductsList />}
        {showProductDetails && <ProductDetails />}
      </div>
    </div>
  );
}

export default App;
