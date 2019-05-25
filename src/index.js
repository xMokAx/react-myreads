import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import BooksApp from "./App";
import "./index.css";

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <BooksApp />
  </BrowserRouter>,
  document.getElementById("root")
);
