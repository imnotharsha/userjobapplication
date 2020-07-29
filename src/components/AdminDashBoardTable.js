import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

export default class AdminDashBoardTable extends Component {
  constructor() {
    super();
    this.state = {
      applicants: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://dct-application-form.herokuapp.com/users/application-forms")
      .then((response) => {
        const applicants = response.data;
        console.log(applicants);
        this.setState({ applicants });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  handleViewDetails = (applicant) => {
    Swal.fire(`${applicant.name}'s Profile :    
    Email: ${applicant.email} 
    Skills: ${applicant.skills}   
    Experience: ${applicant.Experience} `);
    /*   alert(
      `${applicant.name}'s Profile :    
       Email: ${applicant.email} 
       Skills: ${applicant.skills}   
       Experience: ${applicant.Experience} `
    );*/
  };

  render() {
    return (
      <div>
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
            {this.state.applicants.map((applicant, i) => {
              return (
                <tr key={i}>
                  <td>{applicant.name}</td>
                  <td>{applicant.skills}</td>
                  <td>{applicant.experience}</td>
                  <td>{moment(applicant.createdAt).format("MMM Do YY")}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleViewDetails(applicant);
                      }}>
                      View Details
                    </button>
                  </td>
                  <td>
                    <button>ShortList</button>
                    <button>Reject</button>
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
