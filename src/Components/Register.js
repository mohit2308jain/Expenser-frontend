import React from 'react';
import baseURL from '../baseUrl';
import './login.css';

class Register extends React.Component{

    state = {
        name: '',
        email: '',
        password: '',
        registerError: false,
        loading: false
    }

    onRegister = async(event) => {
        event.preventDefault();

        try{
            this.setState({loading: true, registerError: false});
            await baseURL.post('/register', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            this.props.onRegister();
            this.setState({loading: false});
        }
        catch(err){
            this.setState({registerError: true, loading: false})
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
            <form id="contact" onSubmit={(event) => this.onRegister(event)}>
                    {(this.state.registerError) ? (<div><h4 className="color-red">User Already Exists..</h4><h3>Sign Up</h3></div>) : 
                    ((this.state.loading) ? (<h2>Registering...</h2>) : (<h3>Sign Up</h3>))}
                    <fieldset>
                        <input placeholder="Your name" name="umane"
                            type="text" required onChange={(e) => this.handleName(e)}/>
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Email Address" name="email"
                        type="email" required onChange={(e) => this.handleEmail(e)} />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Password" name="password" minLength='6'
                            type="password" required onChange={(e) => this.handlePassword(e)} />
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit" id="contact-submit">Register</button>
                    </fieldset>
                </form>
        )
        console.log(this.state)
        return(
            <React.Fragment>
                <div className="container"> 
                    {form}
                </div>
            </React.Fragment>
        )
    }
}

export default Register;