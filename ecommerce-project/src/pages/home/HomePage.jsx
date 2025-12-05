import axios from 'axios';
import Header from '../../components/Header.jsx';
import { useEffect , useState } from 'react';
import { ProductGrid } from './ProductGrid.jsx';
import './HomePage.css';


export function HomePage({ cart }) {
  // fetch('http://Localhost:3000/api/products')
  //   .then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //       console.log(data);
  //   });
  // same thing done using axios

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      });
  }, []);


  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products}/>
      </div>
    </>
  );
}