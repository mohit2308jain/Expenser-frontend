import React from 'react';
import './login.css';
import Register from './Register';
import baseURL from '../baseUrl';

class Login extends React.Component{
    state = {
        register: false,
        email: '',
        password: '',
        loginError: false,
        loading:false
    }

    onLogin = async(event) => {
        event.preventDefault();

        try{
            this.setState({loading: true, loginError: false});
            const resp = await baseURL.post('/signin', {
                email: this.state.email,
                password: this.state.password
            })
            this.props.onLogin(resp.data);
            this.setState({loading: false});
        }
        catch(err){
            this.setState({loginError: true, loading: false})
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
            <form id="contact" onSubmit={(event) => this.onLogin(event)}>
                {(this.state.loginError) ? (<div><h4 className="color-red">Please Check Ur Credentials..</h4><h3>Sign In</h3></div>) : 
                ((this.state.loading) ? (<h2>Logging You In...</h2>) : (<h3>Sign In</h3>))}
                <fieldset>
                    <input placeholder="Your Email Address" name="email" 
                        type="email" required onChange={(e) => this.handleEmail(e)} />
                </fieldset>
                <fieldset>
                    <input placeholder="Your Password" name="password" minLength='5'
                        type="password" required onChange={(e) => this.handlePassword(e)} />
                </fieldset>
                <fieldset>
                    <button name="submit" type="submit">Login</button>
                </fieldset>
                <h4 className="text-center">OR</h4>
                <fieldset>
                    <button name="submit" type="button" onClick={(event) => this.showRegisterForm(event)}>Register</button>
                </fieldset>
            </form>
        )
        return(
            <React.Fragment>
                {(this.state.register) ? <Register 
                    onRegister={(event) => this.handleRegister(event)} /> :
                    <div className="container">{form}</div> 
                }
                </React.Fragment>
        )
    }
}

export default Login;