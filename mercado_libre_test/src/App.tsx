import React from 'react';
import Header from './components/header/Header';
import CategoriesProductsList from './pages/categoryProductsList/CategoryProductsList';
import ProductDetails from './pages/productDetails/ProductDetails';
import SellerDetails from './pages/sellerDetails/SellerDetails';

import './App.css';

function App() {
  const [pageToShow, setPageToShow] = React.useState<"categories" | "product" | "seller">("categories");

  React.useEffect(() => {
    const url = window.history;

    if (url.state !== null) {
      const {state} = url;
      if (state.categoryId !== undefined && state.productId !== undefined) setPageToShow("product");
      else if (state.categoryId !== undefined) setPageToShow("categories");
      else if (state.sellerId !== undefined) setPageToShow("seller");
    } else setPageToShow("categories");
  }, [])

  return (
    <div className="App">
      <Header />

      <div className='bodyContainer'>
        {pageToShow === "categories" && <CategoriesProductsList />}
        {pageToShow === "product" && <ProductDetails />}
        {pageToShow === "seller" && <SellerDetails />}
      </div>
    </div>
  );
}

export default App;
