import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use the fetch function to fetch product data from the Express server
    fetch('http://localhost:3002/getAllCars')
      .then(response => {
        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
          throw new Error(`Error fetching product data: ${response.status} ${response.statusText}`);
        }
        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error(`Fetch error: ${error.message}`);
        console.log("emad khawall");
      });
  }, []);

  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              {products.map((product) => (
                <div className="product-list col-xs-12" key={product.id}>
                  <div className="product-item">
                    <div className="item-overlay">
                      <div className="clickable">
                        <a href="#/">{product.name}</a>
                      </div>
                    </div>
                    <div className="image">
                      <a href="#/">
                        {/* Add your image rendering code here */}
                      </a>
                    </div>
                    <div className="caption">
                      <div className="name">
                        <a href="#/">{product.model}</a>
                      </div>
                      <div className="description">
                        <p>{product.description}</p>
                      </div>
                      <div className="rating">
                        {/* Your rating code here */}
                      </div>
                      <div className="price">
                        
                      </div>
                      <div className="cart">
                        <button type="button" className="btn btn-primary">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-default wishlist"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Wishlist"
                    >
                      <i className="fa fa-heart"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-default compare"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Compare"
                    >
                      <i className="fa fa-circle-o"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
