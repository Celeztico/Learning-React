import axios from 'axios';
import Header from '../../components/Header.jsx';
import { useEffect , useState } from 'react';
import { ProductGrid } from './ProductGrid.jsx';
import './HomePage.css';


export function HomePage({ cart, loadCart }) {
  // fetch('http://Localhost:3000/api/products')
  //   .then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //       console.log(data);
  //   });
  //same thing as done below using axios

  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/products')
  //     .then((response) => {
  //       setProducts(response.data);
  //     });
  // }, []);

  //same thing as done above using async await
  useEffect(()=> {
    const fetchProductData = async() => {
      const response = await axios.get('/api/products');
      setProducts (response.data);
    }
    fetchProductData();
  },[]);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}