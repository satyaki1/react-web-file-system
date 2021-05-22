import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { Route, Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import reducers from "./reducers";
import generateFileSystem from "./utils/defaultFileSystem";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import System from "./components/System";
import styled from "styled-components";
import "./App.css";

const store = createStore(reducers, {
  fileSystem:
    localStorage.getItem("fileSystem") && Object.keys(localStorage.getItem("fileSystem")).length > 0
      ? JSON.parse(localStorage.getItem("fileSystem"))
      : generateFileSystem(),
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Sidebar />
          <Container>
            <TopBar>
              <Navigation />
              <SearchBar />
            </TopBar>
            <Route path="*" component={System} />
          </Container>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

const Container = styled.div`
  padding: 41px;
  margin-left: 300px;
  transition: margin-left 250ms ease-in;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
    padding: 55px 15px 15px 15px;
  }
`;

const TopBar = styled.div`
  display: flex;
`;

export default App;
