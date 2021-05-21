import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { Route, Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import reducers from "./reducers";
import generateFileSystem from "./utils/defaultFileSystem";
import "./App.css";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";

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
            <Sidebar></Sidebar>
          </Fragment>
        </BrowserRouter>
    </Provider>
  );
}

const Container = styled.div`
  padding: 41px;
  margin-left: 320px;
  transition: margin-left 250ms ease-in;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
    padding: 55px 15px 15px 15px;
  }
`;

const TopBar = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;


export default App;
