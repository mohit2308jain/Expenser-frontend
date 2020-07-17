import React from 'react';
import { Spinner } from 'reactstrap';

import Main from './Components/Main';
import Login from './Components/Login';
import Footer from './Components/Footer';

class App extends React.Component {

  state = {
    token: localStorage.login,
    isLoggedIn: false,
    user : localStorage.user
  }

  componentDidMount(){
    if(localStorage.login !== undefined && localStorage.user !== undefined){
      this.setState({token: localStorage.login, user: localStorage.user, isLoggedIn: true});
    }
  }

  LoggedIn = (user) => {
    this.setState({token: localStorage.login, user: localStorage.user, isLoggedIn: true});
  }

  render(){
    const user = (this.state.user) ? JSON.parse(this.state.user) : undefined;
    let screen;

    if(!this.state.isLoggedIn){
      screen = <Login onLogin={(user) => this.LoggedIn(user)}/>
    }
    else if(this.state.isLoggedIn){
      screen = <Main user={user.user}/>
    }
    else{
      screen = (
        <div className="container">
          <Spinner style={{ width: '3rem', height: '3rem' }} />
          <h1>Loading..</h1>
        </div>
      )
    }

    return(
      <React.Fragment>
        {screen}
      </React.Fragment>
    )
  }
}

export default App;
