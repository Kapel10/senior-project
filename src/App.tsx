import React from "react";
import SignUp from "./components/Authorization/SignUp";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Verification from "./components/Authorization/Verification";
import ForgotPassword from "./components/Authorization/ForgotPassword";
import { Provider } from "react-redux"
import {store} from "./stores/store"
import PasswordUpdate from "./components/Authorization/PasswordUpdate";
import Categories from "./components/Authorization/Category1/Categories";
import MainPage from "./pages/MainPage";
import EventCreatePage from "./pages/EventCreatePage";
import Navbar from "./components/Navbar/Navbar";
import EventPage from "./pages/EventPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<Authorization />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />

            <Route path="/verification" element={<Verification />} />
            <Route path="/forgot-pass" element={<ForgotPassword />} />
            <Route path="/change-pass" element={<PasswordUpdate />} />
            <Route path='/category' element={<Categories />} />

            <Route path="/" element={<MainPage />} />
            <Route path="/create-event" element={<EventCreatePage/>} />

            <Route path="/event" element={<EventPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
