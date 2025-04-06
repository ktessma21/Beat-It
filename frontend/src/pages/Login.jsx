import {React, useContext, useState} from "react";
import {PageContext} from '../helpers/Contexts'
import "../index.css"

function Login(){
    const {pageState, setPageState} = useContext(PageContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className="body">
            <img
                className="w-40 m-10"
                src="/pictures/logo.png"
                alt="Logo"
            />
            <div className="Login">
                
                <h1>Login</h1>
                <div>
                    <h2>Username:</h2>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <h2>Password:</h2>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button className="login-button" onClick={() => setPageState("habits")}>Sign Up</button>
                    <button className="login-button" onClick={() => setPageState("habits")}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login