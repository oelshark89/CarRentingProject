import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReservePopup from '../reservePopup/reservePopup';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import '../products/products.css';


function App({ userId }) {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const fetchData = async (url) => {
    try {
      console.log('searchValue:', searchValue.searchVal);
      const searchValueBackend = searchValue.searchVal;
      if (typeof searchValue.searchVal !== 'undefined') {

        const response = await axios.post('https://car-renting-project.vercel.app/admin/Cars/searchCar', { searchValueBackend });
        console.log('Response:', response.data);
        const data = response.data;
        const message = response.data.message || 'An error occurred';
        console.log("response message: ", data);
        if (message !== 'No Car matches!') {
          console.log("enter data.success");
          setProducts(data);
        } else {
          setProducts([]);
        }

      } else {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error fetching product data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
    }
  };


  useEffect(() => {
    fetchData('https://car-renting-project.vercel.app/getAllCars');
  }, []);

  useEffect(() => {
    if (searchValue) {
      fetchData('https://car-renting-project.vercel.app/admin/Cars/searchCar');
    }
  }, [searchValue]);

  const handleReserveClick = (productId) => {
    setShowPopup(true);
    setSelectedProductId(Number(productId));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData('https://car-renting-project.vercel.app/admin/Cars/searchCar');
  };

  return (
    <div>
      <head>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        />
      </head>

      <div className="containerProducts">
        <div className="row">
          <div className="col-sm-9 mx-auto">
            <div className="row products">
              <div className="row ">
                <div className="col-lg-4"></div>

                <div className="col-lg-4 text-right">
                  <h1 className="heading-cars">Cars For Rent</h1>
                </div>
                <div className="col-lg-4 flex-Search">
                  <div className="input-wrapper">
                    <FaSearch id="search-icon" />
                    <input
                      className="search-bar"
                      placeholder="Search"
                      value={searchValue.searchVal}
                      onChange={(e) => setSearchValue({ searchVal: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {products.map((product, index) => (
                <React.Fragment key={product.id}>
                  <div className="product-list col-xs-12 col-md-4">
                    <div className="product-item">
                      <div className="item-overlay"></div>
                      <div className="details">
                        <div className="image">
                          <a href="#/">
                          <img
                            src={product.imageUrl}
                            alt={product.model}
                         />
                          </a>
                        </div>
                        <div> 
                        <h3 class="card-title pricing-card-title text-center">${product.pricePerDay}<small class="text-body-secondary fw-light">/day</small></h3>
                        </div>

                        <div className="container-flex-contents">
                          <div className="name">
                            <p style={{ fontWeight: 'bold', marginBottom: '0' }}>{product.model}</p>
                          </div>
                          <div className="clickable">
                          <p style={{ marginBottom: '0' }}>{product.year} - {product.city}</p>
                            
                          </div>
                          <div className="description">
                            <p>{product.mileage} mile</p>
                          </div>
                          
                        </div>
                      
                        <div className="features">{product.features}</div>
                        <div className="cart">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleReserveClick(product.id)}
                          >
                            Reserve Car
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {(index + 1) % 3 === 0 && index + 1 !== products.length && <div className="row"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      {console.log('bottom prod:', userId)}
      {console.log('prod product id: ', selectedProductId)}
      {showPopup && <ReservePopup userId={userId} carId={selectedProductId} setShowPopup={setShowPopup} onClose={handleClosePopup} />}
    </div>
  );
}

export default App;
