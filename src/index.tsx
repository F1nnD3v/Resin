import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from './Pages/Index';
import CodeEditor from "./Pages/CodeEditor";
import Register from "./Pages/Register";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Index />}/>
            <Route path={"/code"} element={<CodeEditor/>}/>
            <Route path={"/Register"} element={<Register/>}/>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
