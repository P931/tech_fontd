import {
  Grid,

} from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Customer from "./Components/Customer/Customer";
import Admin from "./Components/Admin/Admin";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Grid>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/customer" element={<Customer />} />

        </Routes>

      </BrowserRouter>
    </Grid>
  );
}

export default App;
