import React from 'react';
import baseURL from '../baseUrl';
import './login.css';

class Register extends React.Component{

    state = {
        name: '',
        email: '',
        password: '',
        registerError: false
    }

    onRegister = async(event) => {
        event.preventDefault();

        try{
            await baseURL.post('/register', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            this.props.onRegister();
        }
        catch(err){
            this.setState({registerError: true})
            console.log(err);
        }

        /*
        axios({
            method: 'post',
            url: 'http://localhost:3001/register',
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
        */
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
        const form = (
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
        )

        return(
            <React.Fragment> 
                {(this.state.registerError) ? (
                    <div className="container"> 
                    <h1>Error In Resistration..</h1>
                    {form}
                    </div>) : 
                    (<div className="container"> 
                        {form}
                    </div>)
                }
            </React.Fragment>
        )
    }
}

export default Register;