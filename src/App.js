import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage, SignupPage,  MainPage, MyPage, ChatPage, MarkedShop, ShopDetail, AccentShops,CurrentLocationPage,ShopList} from "./routes/Routes.js";


function App() {
  return (
    <Router>
      <div classname = "App" >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/accentshops" element={<AccentShops />} />
          <Route path="/currentlocationpage" element={<CurrentLocationPage />} />
          <Route path="/shop-list" element={<ShopList />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/marked" element={<MarkedShop />} />
          <Route path="/details" element={<ShopDetail />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
