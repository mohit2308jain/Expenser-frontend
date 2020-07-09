import React from 'react';
import Main from './Components/Main';
import Login from './Components/Login';

class App extends React.Component {

  state = {
    isLoggedIn: false,
    user : {}
  }

  LoggedIn = (user) => {
    this.setState({isLoggedIn: true, user: user})
  }

  render(){
    if(!this.state.isLoggedIn){
      return (
        <Login onLogin={(user) => this.LoggedIn(user)}/>
      )
    }
    else{
      return(
        <Main user={this.state.user}/>
      )
    }
  }
}

export default App;
