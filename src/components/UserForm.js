import React, { Component } from "react";

import axios from "../config/axios";
import Swal from "sweetalert2";

export default class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      jobs: [
        { id: 1, job: "Front-End Developer" },
        { id: 2, job: "Node.js Developer" },
        { id: 3, job: "MEAN Stack Developer" },
        { id: 4, job: "FULL Stack Developer" },
      ],
      jobTitle: "",
      experience: "",
      skills: "",
      count: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelectChange = (e) => {
    const select = e.target.value;
    this.setState({ jobTitle: select });
  };
  componentDidMount() {
    axios.get("/users/application-forms").then((response) => {
      const count = response.data.length;
      this.setState({ count });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      jobTitle: this.state.jobTitle,
      experience: this.state.experience,
      skills: this.state.skills,
    };
    console.log(formData);

    axios
      .post("/users/application-form", formData)
      .then((response) => {
        //console.log("resolve", response.data);
        if (response.data.hasOwnProperty("errrors")) {
          Swal.fire(response.data.message);
        } else {
          Swal.fire("successfully submitted");
        }
        this.setState({
          name: "",
          email: "",
          phone: "",
          jobTitle: "",
          experience: "",
          skills: "",
        });
      })
      .catch((err) => {
        alert("reject", err.message);
      });
  };
  render() {
    return (
      <div align='center'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='Fullname'>Full Name </label>
          <input
            type='text'
            value={this.state.name}
            name='name'
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor='email'>Email Address </label>
          <input
            type='email'
            value={this.state.email}
            name='email'
            placeholder='example@mail.com'
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor='contact'>Contact </label>
          <input
            type='text'
            value={this.state.phone}
            name='phone'
            placeholder='+91 9988554344'
            onChange={this.handleChange}
          />
          <br />
          <label>Applying for Job </label>
          <select onChange={this.handleSelectChange}>
            <option value='' name=''>
              ---Select---
            </option>
            {this.state.jobs.map((job, i) => {
              return <option key={i}>{job.job}</option>;
            })}
          </select>
          <br />
          <label htmlFor='experience'>Experience</label>
          <input
            type='text'
            value={this.state.experience}
            placeholder='Experience(2 years,3 months'
            onChange={this.handleChange}
            name='experience'
          />
          <br />
          <label htmlFor='skills'>Technical Skills</label>
          <textarea
            value={this.state.skills}
            name='skills'
            onChange={this.handleChange}
            placeholder='Technical skills'></textarea>
          <br />
          <button
            type='submit'
            style={{
              colour: "white",
              font: "inherit",
              border: "1px solid blue",
              cursor: "pointer",
            }}>
            Send Application
          </button>
        </form>
        <br />
        <br />
        {this.state.count} Applications so far and counting
      </div>
    );
  }
}
