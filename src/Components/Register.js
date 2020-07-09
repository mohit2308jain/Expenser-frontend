import React from 'react';
import axios from 'axios';
import './login.css';

class Register extends React.Component{

    state = {
        name: '',
        email: '',
        password: ''
    }

    onRegister = (event) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'https://https://expenser-backend.herokuapp.com/register',
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
        })
        .then((res) => {
            this.props.onRegister();
        })
        .catch((err) => console.log(err))
    }

    handleEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }

    handleName = (event) => {
        this.setState({name: event.target.value})
    }

    render(){
        return(
            <React.Fragment>
                <div className="container">  
                <form id="contact" action="" method="post">
                    <h3>Sign Up</h3>
                    <fieldset>
                    <input placeholder="Your name" type="text" required onChange={(e) => this.handleName(e)}/>
                    </fieldset>
                    <fieldset>
                    <input placeholder="Your Email Address" type="email" required onChange={(e) => this.handleEmail(e)} />
                    </fieldset>
                    <fieldset>
                    <input placeholder="Your Password" type="password" required onChange={(e) => this.handlePassword(e)} />
                    </fieldset>
                    <fieldset>
                    <button name="submit" type="submit" id="contact-submit"  onClick={(event) => this.onRegister(event)}>Register</button>
                    </fieldset>
                </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Register;