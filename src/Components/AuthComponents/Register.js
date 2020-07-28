import React from 'react';
import { Spinner } from 'reactstrap';

import baseURL from '../../baseUrl';
import './login.css';

const Register = ({ onRegister }) => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [registerError, setRegisterError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSubmitRegisterForm = async(event) => {
        event.preventDefault();

        try{
            setLoading(true);
            setRegisterError(false);
            
            await baseURL.post('/register', {
                name: name,
                email: email,
                password: password
            })
            setLoading(false);
            onRegister();
        }
        catch(err){
            setLoading(false);
            setRegisterError(true);
        }
    }

    const form = (
        <form id="contact" onSubmit={(event) => onSubmitRegisterForm(event)}>
                {(registerError) ? (<div><h4 className="color-red">User Already Exists..</h4><h3>Sign Up</h3></div>) : 
                ((loading) ? (<h2 className="text-center">Registering...</h2>) : (<h3>Sign Up</h3>))}

                {(loading) ? (<div className="text-center p-2">
                    <Spinner style={{ width: '5rem', height: '5rem' }} />
                </div>) : (
                <div>
                <fieldset>
                        <input placeholder="Your name" name="umane"
                            type="text" required onChange={(event) => setName(event.target.value)}/>
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Email Address" name="email"
                            type="email" required onChange={(event) => setEmail(event.target.value)} />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Password" name="password" minLength='6'
                            type="password" required onChange={(event) => setPassword(event.target.value)} />
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit" id="contact-submit">Register</button>
                    </fieldset>
                    <h4 className="text-center">OR</h4>
                    <fieldset>
                        <button name="submit" type="button" onClick={() => onRegister()}>Login</button>
                    </fieldset>
                </div>
                )}
            </form>
    )
    return(
        <React.Fragment>
            <div className="container"> 
                {form}
            </div>
        </React.Fragment>
    )
}

export default Register;