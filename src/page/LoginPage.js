import React, {useState} from "react";
import LoginCard from "../component/login/LoginCard";

export default function LoginPage(props) {
    return (
        <div style={{width: '100vw', position: 'absolute', top: '30vh'}}>
            <LoginCard uploader={props.uploader}/>
        </div>
    )
}