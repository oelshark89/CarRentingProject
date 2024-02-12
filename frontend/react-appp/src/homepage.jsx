// App1.js
import React,{useState} from 'react';
import Header from './components/header/header'; // Corrected component name and file path
import Slider from './components/slider/slider';
import Text from './components/Text/text';
import Products from './components/products/prod';
import Banner from './components/banner/banner'
import './App1.css';
import { useLocation } from 'react-router-dom';
import Footer from './components/footer/footer';

function App() {
  const [visibility, setVisibility] = useState(false);
const [toggleState, setToggleState] = useState(1);

  const handleToggleChange = (index) => {
    setToggleState(index);
  };
  const location = useLocation();
  const userId = location?.state?.userId;
  return (
    <div>
      <Header />
      <Slider />
      <Text   toggleState={toggleState} onToggleChange={handleToggleChange} visibility={visibility}/>
      <Products userId={userId}/>
     <Banner />
     <Footer />
    </div>
  );
}

export default App;
