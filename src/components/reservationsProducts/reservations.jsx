import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UseStatePopup from '../newStatus/newStatus';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import '../reservationsProducts/reservations.css';


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
       console.log(searchValueBackend);
        const response = await axios.post('http://localhost:3003/admin/Cars/searchReservation', { searchValueBackend });
        console.log('Response:', response.data);
        const data = response.data;
        const message = response.data.message || 'An error occurred';
        console.log("response message: ", data);
        if (message !== 'No Reservation matches!') {
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
    fetchData('http://localhost:3003/getAllReservations');
  }, []);

  useEffect(() => {
    if (searchValue) {
      fetchData('http://localhost:3003/admin/Cars/searchCustomer');
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
    fetchData('http://localhost:3003/admin/Cars/searchCar');
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
            <div className="row">
            <div className="row ">
                                <div className="col-lg-4"></div>

                                <div className="col-lg-4 text-right">
                                    <h1 className="heading-cars">Our Reservations</h1>
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
                                        onClick={() => handleReserveClick()}
                                        className="btn btn-primary update"
                                        
                                              >
                                                Update Status
                                              </button>

                                </div>
                            </div>
              <table className='tableOfCustomers'>
                <tr className='table-title'>
                    <th>Customer Id</th>
                    <th>Car Id</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Price</th>
                    <th>status</th>
                    
                </tr>
                {products.map((product, index) => {
                    return (
                        <tr key={product.id}>
                        <td className='id'>{product.customerId}</td>
                        <td>{product.carId}</td>
                            <td>{product.startDate}</td>
                            <td>{product.endDate}</td>
                            <td>{product.totalPrice}</td>
                            <td>{product.status}</td>
                        </tr>
                    )
                })}
            </table>
            </div>
          </div>
        </div>
      </div>
      {console.log('bottom prod:', userId)}
      {console.log('prod product id: ', selectedProductId)}
      {showPopup && <UseStatePopup  setShowPopup={setShowPopup} onClose={handleClosePopup} />}
    </div>
  );
}

export default App;
