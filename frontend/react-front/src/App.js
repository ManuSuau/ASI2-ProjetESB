
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthComponent from "./auth-component/AuthComponent";
import HomeComponent from "./home-component/HomeComponent";
import StoreComponent from "./store-component/StoreComponent";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {
  return (
      <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<AuthComponent/>} />
                <Route path="/home" element={<HomeComponent/>} />
                <Route path="/buy" element={<StoreComponent data={"buy"}/>} />
                <Route path="/sell" element={<StoreComponent data={"sell"}/>} />
            </Routes>
        </Router>
      </Provider>
  );
}

export default App;
