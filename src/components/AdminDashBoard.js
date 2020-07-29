import React, { Component } from 'react';
import axios from '../config/axios';
//import AdminDashBoardTable from "./AdminDashBoardTable";
import moment from 'moment';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';

export default class AdminDashBoard extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      jobProfiles: [
        'Front-End Developer',
        'Node.js Developer',
        'MEAN Stack Developer',
        'FULL Stack Developer',
      ],
      selectedJOb: 'Front-End Developer',
    };
  }
  handleSelectJob = (title) => {
    this.setState({ selectedJOb: title });
  };
  componentDidMount() {
    axios
      .get('/users/application-forms')
      .then((response) => {
        const users = response.data;
        this.setState({ users });
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  handleUpdateStatus = (id, status) => {
    axios
      .put(`/users/application-form/update/${id}`, { status: status })
      .then((response) => {
        const user = response.data;
        this.setState((prevState) => {
          return {
            users: prevState.users.map((ele) => {
              if (ele._id === user._id) {
                return Object.assign({}, ele, user);
              } else {
                return Object.assign({}, ele);
              }
            }),
          };
        });
        console.log(response.data);
        alert(`User has been ${status}`);
      });
  };

  handleViewDetails = (user) => {
    Swal.fire(
      `${user.name}'s Profile :',    
       'Email: ${user.email} 
       Skills: ${user.skills}   
       Experience: ${user.experience} `
    );
  };

  render() {
    console.log(this.state.users);
    return (
      <div align='center'>
        <h1>ADMIN DASHBOARD</h1>
        {this.state.jobProfiles.map((title) => {
          return (
            <ButtonGroup
              variant='contained'
              color='primary'
              aria-label='text primary button group'>
              <Button
                onClick={() => {
                  this.handleSelectJob(title);
                }}>
                {title}
              </Button>
            </ButtonGroup>
          );
        })}
        <p> {this.state.selectedJOb}s</p>
        <p>List of people applied for {this.state.selectedJOb} Profile</p>
        <table border='2'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Technical Skills</th>
              <th>Experience</th>
              <th> Applied Date</th>
              <th>View Deatails</th>
              <th>Update Application Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users
              .filter((user) => user.jobTitle === this.state.selectedJOb)
              .map((user, i) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.skills}</td>
                    <td>{user.experience}</td>
                    <td>{moment(user.createdAt).format('MMM Do YY')}</td>
                    <td>
                      <Button
                        variant='outlined'
                        onClick={() => {
                          this.handleViewDetails(user);
                        }}>
                        View Details
                      </Button>
                    </td>
                    <td>
                      {user.status == 'applied' ? (
                        <div>
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                              this.handleUpdateStatus(user._id, 'shortlisted');
                            }}>
                            Shortist
                          </Button>

                          <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => {
                              this.handleUpdateStatus(user._id, 'rejected');
                            }}>
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <button>{user.status}</button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
