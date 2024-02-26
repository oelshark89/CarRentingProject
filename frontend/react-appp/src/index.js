import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./loginComponent";
import Layout from "./loginComponent";
import Signup from "./signupComponent";
import Homepage from './homepage';
import AdminPage from "./adminpage";
export default function App() {
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/CarRentingProject" element={<Signin  />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage  />} />
        <Route path="/adminpage" element={<AdminPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));