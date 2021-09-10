import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '@/_services';
import { Role } from '@/_helpers';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      selectedUser: {},
      activeLink: null,
      isActive: false
    };
  }

  componentDidMount() {
    userService.getAll().then((users) => { 
      const temp = users.filter( (value, index, err) => {
        return value.role !== Role.Admin
      })
      users = temp
      this.setState({ users })});
  }

  handleClick = (activeLink) => {
    userService.getById(activeLink).then(selectedUser => this.setState({ selectedUser }));
    this.setState({activeLink});
    this.setState({isActive: true})
  };

  render() {
    const { users, isActive, selectedUser } = this.state;
    return (
      <div>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
        <h1>Admin Dashboard</h1>
        <div className="row">
          <div className="col">
            <span className="font-weight-bold">All users:</span>
            {users && (
              <ul className="list-group">
                {users.map((user) => (
                  <li
                    onClick={() => this.handleClick(`${user.id}`)}
                    className={`list-group-item ${
                      this.state.activeLink === `${user.id}` ? "active" : ""
                    }`}
                    key={user.id}
                  >
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          { isActive && 
            <div className="col">
            <span className="font-weight-bold">Editor Details:</span>
                <p>Name: {selectedUser.firstName} {selectedUser.lastName} <br></br> Details: {selectedUser.info}</p>
          </div>}
        </div>
      </div>
    );
  }
}

export { AdminPage };