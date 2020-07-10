import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Stats from './Stats';
import ExpenseList from './ExpenseList';
import Profile from './Profile';
import SideNav from './SideNav';

class Main extends React.Component{

    render(){
        console.log(this.props.user)
        return(
            <BrowserRouter>
            <SideNav />
            <main>
            <Switch>
                <Route exact path='/expenses' component={() => <ExpenseList user={this.props.user}/>} />
                <Route exact path='/stats' component={() => <Stats user={this.props.user}/>} />
                {/*<Route exact path='/profile' component={() => <Profile user={this.props.user}/>} /> */}
                <Redirect to='/expenses' />
            </Switch>
            </main>
            </BrowserRouter>
        )
    }
}

export default Main;