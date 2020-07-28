import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

import BudgetForm from './BudgetForm';

const Profile = ({ user, budget, onUpdateBudget}) => {

    const handleUpdateBudget = async(values) => {
        await onUpdateBudget(values);
    }

    return(
        <React.Fragment>
            <Card className="text-center border border-light" style={{background: '#111'}}>
                
                <CardHeader className="text-light">
                    <h1 className="display-4">Profile</h1>
                    <p className="lead">View Your Info</p>
                </CardHeader>

                <CardBody style={{background: 'linear-gradient(180.53deg, rgb(21, 37, 48) 50%, rgb(4, 2, 3) 100%)'}}>
                    
                    <div className="row">
                        <div className="offset-2 col-8 offset-md-2 col-md-3">
                            <p className="list-group-item">Name</p>
                        </div>
                        <div className="offset-2 col-8 offset-md-0 col-md-5">
                            <p className="list-group-item bg-dark text-light text-capitalize">{user.name}</p>
                        </div>            
                    </div>

                    <div className="row">
                        <div className="offset-2 col-8 offset-md-2 col-md-3">
                            <p className="list-group-item">Email</p>
                        </div>
                        <div className="offset-2 col-8 offset-md-0 col-md-5">
                            <p className="list-group-item bg-dark text-light">{user.email}</p>
                        </div>            
                    </div>

                    <div className="row">
                        <div className="offset-2 col-8 offset-md-2 col-md-3">
                            <p className="list-group-item">Budget</p>
                        </div>
                        <div className="offset-2 col-8 offset-md-0 col-md-5">
                            <p className="list-group-item bg-dark text-light">{budget}</p>
                        </div>            
                    </div>

                    <BudgetForm budget={budget} onSubmit={(values) => handleUpdateBudget(values)} />
                    
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default Profile;