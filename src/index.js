import React, {useState} from 'react';
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
    const [username, setUsername] = useState("");
    const [permissions, setPermissions] = useState([]);

    const updateProps = (uploaded) => {
        console.log(uploaded);
        setUsername(uploaded.username);
        if (uploaded.permissions) {
            setPermissions(uploaded.permissions);
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage uploader={updateProps}/>} />
                <Route path="/customer" element={<UserPage initializingTab='customer' username={username}/>} />
                <Route path="/agent" element={<UserPage initializingTab='agent' username={username}/> } />
                <Route path="/staff" element={<UserPage initializingTab='staff' username={username} permissions={permissions}/> } />
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
