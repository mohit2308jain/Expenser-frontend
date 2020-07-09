import React from 'react';
import axios from 'axios';
import './login.css';
import Register from './Register';
class Login extends React.Component{
    state = {
        register: false,
        email: '',
        password: ''
    }

    onLogin = (event) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'https://expenser-backend.herokuapp.com/signin',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .then((res) => {
            console.log(res)
            this.props.onLogin(res.data);
        })
        .catch((err) => console.log(err))
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
        return(
            <React.Fragment>
                {(this.state.register) ? <Register onRegister={(event) => this.handleRegister(event)} /> : (
                    <div className="container">  
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
                    </div>
             
                )
                }
                </React.Fragment>
        )
    }
}

export default Login;