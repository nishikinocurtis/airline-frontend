import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from "./homepage";
import LoginPage from "./page/LoginPage";
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css"
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import {Routes} from "react-router-dom";
import UserPage from "./page/UserPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/customer" element={<UserPage initializingTab='customer'/>} />
                <Route path="/agent" element={<UserPage initializingTab='agent'/> } />
                <Route path="/staff" element={<UserPage initializingTab='staff'/> } />
            </Routes>
        </Router>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
