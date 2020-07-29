import React from "react";
import UserForm from "./components/UserForm";
import AdminDashBoard from "./components/AdminDashBoard";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <h1 align='center'>User Job Application</h1>

        <Route path='/' component={UserForm} exact />
        <Route path='/AdminDashBoard' component={AdminDashBoard} />
      </Router>
    </div>
  );
}

export default App;
