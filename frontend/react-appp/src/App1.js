// App1.js
import React from 'react';
import Header from './components/header/header'; // Corrected component name and file path
import Slider from './components/slider/slider';
import Text from './components/Text/text';
import Products from './components/products/prod';
import './App1.css';

function App() {
  return (
    <div>
      <Header />
      <Slider />
      <Text  />
      <Products />
    </div>
  );
}

export default App;
