import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//import Components
import Home from './Components/Home';
import AddRecipe from "./Components/addRecipe";
import UpdateRecipe from "./Components/updateRecipe";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <ToastContainer/>
          <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/recipe/add" element={<AddRecipe/>}/>
            <Route path="/recipe/update/:id" element={<UpdateRecipe/>}/>

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
