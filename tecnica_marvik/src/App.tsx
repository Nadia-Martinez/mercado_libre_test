import './App.css';
import Header from './components/header/Header';
import CategoriesProductsList from './pages/categoryProductsList/CategoryProductsList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='bodyContainer'>
        <CategoriesProductsList />
      </div>
    </div>
  );
}

export default App;
