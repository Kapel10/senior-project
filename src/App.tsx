import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Verification from "./components/Authorization/Verification";
import ForgotPassword from "./components/Authorization/ForgotPassword";
import { Provider } from "react-redux"
import {store} from "./stores/store"
import PasswordUpdate from "./components/Authorization/PasswordUpdate";
import MainPage from "./pages/MainPage";
import EventCreatePage from "./pages/EventCreatePage";
import EventPage from "./pages/EventPage";
import UserPage from "./pages/UserPage";
import PersonPage from "./pages/PersonPage";
import SearchPage from "./pages/SearchPage";
import ChatPage from "./pages/ChatPage";
import SecurityRoute from "./security/SecurityRoute";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route element={<SecurityRoute/>}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/verification" element={<Verification />} />
                  <Route path="/forgot-pass" element={<ForgotPassword />} />
                  <Route path="/change-pass" element={<PasswordUpdate />} />
                  <Route path="/create-event" element={<EventCreatePage/>} />
                  <Route path="/me" element={<UserPage />} />
                  <Route path="/user/:username" element={<PersonPage/>} />
                  <Route path="/search" element={<SearchPage/>} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/event/:id" element={<EventPage/>} />
              </Route>
                <Route path="/sign-in" element={<Authorization />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
/*

//<Route path="/event" element={<EventPage />} />
 */
