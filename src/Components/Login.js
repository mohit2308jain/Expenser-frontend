import React from 'react';
import './login.css';
import Register from './Register';
import baseURL from '../Redux/baseUrl';

class Login extends React.Component{
    state = {
        register: false,
        email: '',
        password: '',
        loginError: false
    }

    onLogin = async(event) => {
        event.preventDefault();

        try{
            const resp = await baseURL.post('/signin', {
                email: this.state.email,
                password: this.state.password
            })
            this.props.onLogin(resp.data);
        }
        catch(err){
            this.setState({loginError: true})
            console.log(err);
        }
    }

    showRegisterForm = (event) => {
        this.setState({register: true});
    }

    handleRegister = (event) => {
        this.setState({register: false});
    }

    handleEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }

    render(){
        const form = (
            <form id="contact" action="" method="post">
                <h3>Sign In</h3>
                <fieldset>
                    <input placeholder="Your Email Address" type="email" required onChange={(e) => this.handleEmail(e)} />
                </fieldset>
                <fieldset>
                    <input placeholder="Your Password" type="password" required onChange={(e) => this.handlePassword(e)} />
                </fieldset>
                <fieldset>
                    <button name="submit" type="submit" onClick={(event) => this.onLogin(event)}>Login</button>
                </fieldset>
                <fieldset>
                    <button name="submit" type="button" onClick={(event) => this.showRegisterForm(event)}>Register</button>
                </fieldset>
            </form>
        )
        return(
            <React.Fragment>
                {(this.state.register) ? <Register onRegister={(event) => this.handleRegister(event)} /> : 
                    ((this.state.loginError) ? 
                        (<div className="container"> 
                            <h1>Error In Login..</h1>
                            {form}
                        </div>) : 
                        (<div className="container"> 
                            {form}
                        </div>)    
                    )
                }
                </React.Fragment>
        )
    }
}

export default Login;