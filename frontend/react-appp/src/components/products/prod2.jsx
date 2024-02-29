import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdatePopup from '../updatePopup/updatePopup.jsx';
import AddPopup from '../addPopup/addPopup.jsx'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import '../products/products2.css';
import { FaPlus } from 'react-icons/fa';

const getAllCars = async (setProducts) => {
    try {
      const response = await axios.get('https://car-renting-project.vercel.app/getAllCars');
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
    }
  };

function App({toggleState }) {
    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const fetchData = async (url) => {
        try {
            const searchValueBackend = searchValue.searchVal;
            if (typeof searchValue.searchVal !== 'undefined') {

                const response = await axios.post('https://car-renting-project.vercel.app/admin/Cars/searchCar', { searchValueBackend });
                const data = response.data;
                const message = response.data.message || 'An error occurred';
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

    const handleReserveClick = () => {
        setShowAddPopup(true);
      };
    
    
      const handleClosePopup = () => {
        setShowPopup(false);
      };

    const handleUpdateCarState = (newState) => {
        console.log('Updating car state:', newState);
        setShowPopup(false);
    };
    const handleUpdateClick=(productId)=>{
        setShowPopup(true);
        setSelectedProductId(Number(productId));
    }

   

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

              
                <div className="row ">
                    <div className="col-sm-9 mx-auto">
                        <div className="row">
                            <div className="row ">
                                <div className="col-lg-4"></div>

                                <div className="col-lg-4 text-right">
                                    <h1 className="heading-cars">Our Cars</h1>
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
                                    <button
                                          type="button"
                                          className="btn btn-primary btn-plus"
                                          onClick={() => handleReserveClick()}
                                         //onClick={() => handlePlusButtonClick()}
        >
                                                                     <FaPlus />
                                                                                </button>
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
                                                <h3 class="card-title pricing-card-title text-center">${product.pricePerDay}<small class="text-body-secondary fw-light">/day</small></h3>
                                                
                                                
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
                                                <div className="container-flex-contents-features">
                                                    <div className="features">
                                                        <p style={{ fontWeight: 'bold'}}>Car Id:{product.id}</p>
                                                    </div>
                                                    <div className="features">
                                                    <p >{product.status}</p>
                                                    </div>
                                                    <div className="features"><p >{product.features}</p></div>
                                                </div>
                                             
                                                <div className="cart">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={() => handleUpdateClick(product.id)}
                                                    >
                                                        Update
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
            
            
            {showPopup && (
                <UpdatePopup
                carId={selectedProductId} 
                setShowPopup={setShowPopup}
                />
            )}
            {showAddPopup && (
                <AddPopup
                setShowPopup={setShowAddPopup}
                 getAllCars={() => getAllCars(setProducts)}
                />
            )}
        </div>
        
    );
}

export default App;
