import './App.css';
import CategoriesList from './components/categoriesList/CategoriesList';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{display: "flex", height: "100vh"}}>
        <CategoriesList />
      </div>
    </div>
  );
}

export default App;
