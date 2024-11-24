import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage, SignupPage,  MainPage, MyPage, ChatPage} from "./routes/Routes.js";


function App() {
  return (
    <Router>
      <div classname = "App" >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chatpage" element={<ChatPage />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
