import React from 'react';

import Main from './Components/AppComponents/Main';
import Login from './Components/AuthComponents/Login';

const App = () => {

    const [user, setUser] = React.useState(localStorage.user);

    React.useEffect(() => {
        if(localStorage.login !== undefined && localStorage.user !== undefined){
            setUser(localStorage.user);
        }
    }, [])

    const userDetails = (user) ? JSON.parse(user) : undefined;
    let screen;

    if(user === undefined){
        screen = <Login onLogin={() => setUser(localStorage.user)}/>
    }
    else if(user){
        screen = <Main user={userDetails.user}/>
    }

    return(
        <React.Fragment>
            {screen}
        </React.Fragment>
    )
}

export default App;
