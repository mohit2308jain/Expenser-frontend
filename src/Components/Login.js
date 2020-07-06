import React from 'react';

class Login extends React.Component{

    onLogin = (event) => {
        event.preventDefault();
        this.props.onLogin('user');
    }

    render(){
        return(
            <React.Fragment>
                <h1>
                    Login
                </h1>
                <button onClick={(event) => this.onLogin(event)}>Click</button>
            </React.Fragment>
        )
    }
}

export default Login;