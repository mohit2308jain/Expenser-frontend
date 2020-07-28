import React from 'react';
import { Spinner } from 'reactstrap';

import './login.css';
import Register from './Register';
import baseURL from '../../baseUrl';

const Login = ({ onLogin }) => {

    const [register, setRegister] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginError, setLoginError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSubmitLoginForm = async(event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setLoginError(false);

            const resp = await baseURL.post("/signin", {
              email: email,
              password: password,
            });
      
            localStorage.setItem('login', JSON.stringify({
                login: true, 
                token: resp.data.token
            }))
            localStorage.setItem('user', JSON.stringify({
                user: resp.data.user
            }))
      
            setLoading(false);
            onLogin();
            
          } catch (err) {
            setLoading(false);
            setLoginError(true);
          }
    }

    const form = (
        <form id="contact" onSubmit={(event) => onSubmitLoginForm(event)}>
            {(loginError) ? (<div><h4 className="color-red">Please Check Ur Credentials..</h4><h3>Sign In</h3></div>) : 
            ((loading) ? (<h2 className="text-center">Logging You In...</h2>) : (<h3>Sign In</h3>))}

            {(loading) ? (<div className="text-center p-2">
                    <Spinner style={{ width: '5rem', height: '5rem' }} />
                </div>) : (
                <div>
                    <fieldset>
                        <input placeholder="Your Email Address" name="email" 
                            type="email" required onChange={(event) => setEmail(event.target.value)} />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Password" name="password" minLength='5'
                            type="password" required onChange={(event) => setPassword(event.target.value)} />
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit">Login</button>
                    </fieldset>
                    <h4 className="text-center">OR</h4>
                    <fieldset>
                        <button name="submit" type="button" onClick={() => setRegister(true)}>Register</button>
                    </fieldset>
                </div>
            )}
        </form>
    )
    return(
        <React.Fragment>
            {(register) ? <Register 
                onRegister={() => setRegister(false)} /> :
                <div className="container">{form}</div> 
            }
            </React.Fragment>
    )
}

export default Login;