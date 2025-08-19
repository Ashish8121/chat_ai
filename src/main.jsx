import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Registration from './registration/reg';
import LoginPage from './login/loginPage';
import Message from './registration/msg';
import Account from './account/account';
import WelMessage from './login/message';
import TopBar from './account/topBar';
import Sidebar from './account/sidebar';
import './index.css' 
import { Provider } from 'react-redux';
import store from './redux/store';



createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/account" element={<Account />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/message" element={<Message />} />
        <Route path="/welcome-message" element={<WelMessage />} />
        <Route path="/top-bar" element={<TopBar />} />
        <Route path="/side-bar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
