import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header/header";
import Footer from "./components/footer/footer";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/authPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import "./style.css"
import store from "./store/store";
import {Provider, useSelector} from "react-redux";
import DefaultPage from "./pages/error";


function RequireAuth({ children, redirectTo }) {
    const state = useSelector((state) => state)
    return state.authenticated ?  children : <Navigate to={redirectTo}/> ;
}

const App = () => {

    
  return (
      <BrowserRouter>
          <Provider store={store}>
              <Header />
              <AppBlock>
                  <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/search" element={
                            <RequireAuth redirectTo="/auth">
                                <SearchPage />
                            </RequireAuth>
                          }
                      />
                      <Route path="/result" element={
                            <RequireAuth redirectTo="/auth">
                                <ResultPage />
                            </RequireAuth>
                          }
                      />
                      <Route path="*" element={<DefaultPage />} />
                  </Routes>
              </AppBlock>
              <Footer/>
          </Provider>
      </BrowserRouter>
  );
}
export default App;

const AppBlock = styled.div`
  margin: 0 auto;
  font-family: Inter, sans-serif;
  letter-spacing: 0.01em;

  max-width: 1320px;
  padding: 0 60px;
  min-height: calc(100vh - 230px);
  
  .ferry-text{
    font-family: 'Ferry Black', sans-serif;
    text-transform: uppercase;
  }

  @media (max-width: 1226px) {
    max-width: 335px;
    padding: 0 26px 0 14px;
    overflow: hidden;
  }
  
`;
