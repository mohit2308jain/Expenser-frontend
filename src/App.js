import React from 'react';
import Main from './Components/Main';
import Login from './Components/Login';

class App extends React.Component {

  state = {
    isLoggedIn: false
  }

  LoggedIn = (user) => {
    this.setState({isLoggedIn: true})
  }

  render(){
    if(!this.state.isLoggedIn){
      return (
        <Login onLogin={(user) => this.LoggedIn(user)}/>
      )
    }
    else{
      return(
        <Main />
      )
    }
  }
}

export default App;
