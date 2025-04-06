import {React, useContext, useState} from "react";
import {PageContext} from '../helpers/Contexts'
import "../index.css"

function Login(){
    const {pageState, setPageState} = useContext(PageContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className="Login">
            <h1>Login</h1>
            <div>
                <h2>Username:</h2>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <h2>Password:</h2>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button>Sign Up</button>
                <button>Login</button>
            </div>
        </div>
    )
}

export default Login