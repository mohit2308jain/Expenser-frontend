import React from 'react';
import { Spinner } from 'reactstrap';

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

        try {
            this.setState({ loading: true, loginError: false });
            const resp = await baseURL.post("/signin", {
              email: this.state.email,
              password: this.state.password,
            });
      
            localStorage.setItem('login', JSON.stringify({
                login: true, 
                token: resp.data.token
            }))
            localStorage.setItem('user', JSON.stringify({
                user: resp.data.user
            }))
      
            this.setState({ loading: false });
            this.props.onLogin(resp.data.user);
            
          } catch (err) {
            this.setState({ loginError: true, loading: false });
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
                ((this.state.loading) ? (<h2 className="text-center">Logging You In...</h2>) : (<h3>Sign In</h3>))}

                {(this.state.loading) ? (<div className="text-center p-2">
                        <Spinner style={{ width: '5rem', height: '5rem' }} />
                    </div>) : (
                    <div>
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
                    </div>
                )}
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