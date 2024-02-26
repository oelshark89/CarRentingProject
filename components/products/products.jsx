import React, { useState, useEffect } from 'react';
import '../products/products.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the JSON file
    fetch('../products/product.json') // Update the path
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
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
                        <img src={product.image} alt={product.name} />
                      </a>
                    </div>
                    <div className="caption">
                      <div className="name">
                        <a href="#/">{product.name}</a>
                      </div>
                      <div className="description">
                        <p>{product.description}</p>
                      </div>
                      <div className="rating">
                        {/* Your rating code here */}
                      </div>
                      <div className="price">
                        <span>${product.price.toFixed(2)}</span>
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
