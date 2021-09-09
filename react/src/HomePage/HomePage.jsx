import React from 'react';

import { userService, authenticationService } from '@/_services';
import { Role } from '@/_helpers';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }

    render() {
        const { currentUser, userFromApi, isAdmin } = this.state;
        return (
            <div>
                <h1>Home</h1>
                <p>Your role is: <strong>{currentUser.role}</strong>.</p>
                {userFromApi &&
                    <div>
                        <p>Name: {userFromApi.firstName} {userFromApi.lastName}</p>
                        <p>Details: {userFromApi.info}</p>
                    </div>
                }
            </div>
        );
    }
}

export { HomePage };