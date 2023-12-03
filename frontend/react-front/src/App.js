
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthComponent from "./auth-component/AuthComponent";
import HomeComponent from "./home-component/HomeComponent";
import StoreComponent from "./store-component/StoreComponent";
import {Provider} from "react-redux";
import {store} from "./store/store";
import GameComponent from "./game-component/GameComponent";
import CardChoiceComponent from "./game-component/CardChoiceComponent";
import ChatComponent from "./chat-component/ChatComponent";

function App() {
  return (
      <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<AuthComponent/>} />
                <Route path="/home" element={<HomeComponent/>} />
                <Route path="/buy" element={<StoreComponent data={"buy"}/>} />
                <Route path="/sell" element={<StoreComponent data={"sell"}/>} />
                <Route path="/cardChoice" element={<CardChoiceComponent/>} />
                <Route path="/play" element={<GameComponent/>} />
                <Route path="/chat" element={<ChatComponent/>} />
            </Routes>
        </Router>
      </Provider>
  );
}

export default App;
