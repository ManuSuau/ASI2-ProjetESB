
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthComponent from "./auth-component/AuthComponent";
import HomeComponent from "./home-component/HomeComponent";
import StoreComponent from "./store-component/StoreComponent";

function App() {
  return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthComponent/>} />
                <Route path="/home" element={<HomeComponent/>} />
                <Route path="/buy" element={<StoreComponent data={"buy"}/>} />
                <Route path="/sell" element={<StoreComponent data={"sell"}/>} />

            </Routes>
        </Router>
  );
}

export default App;
