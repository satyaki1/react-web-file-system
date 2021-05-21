import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import generateFileSystem from "./utils/defaultFileSystem";
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
      Setting up
    </Provider>
  );
}

export default App;
