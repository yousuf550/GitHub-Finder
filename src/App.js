import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import GithubState from "./context/github/GithubState";

const App = () => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Comment out below code we didnt need any more, this direct calling users api to show data without using function parameters

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }

  // This function is called from the search component by passing props up
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // This function is called from User Item Component to display user details from github
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  // This function is called from User Component to display latest repos from GitHub
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // This function is called from the search component to clear users froms state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // This function is called from the search component to raise alert for empty text field
  const displayAlert = (msg, type) => {
    setAlert({ msg, type });
    // Remove the alert msg after 5 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
      <BrowserRouter>
        <Routes>
          {/* Route for the Home Page */}
          <Route
            exact
            path="/"
            element={
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alert alert={alert} />
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    displayAlert={displayAlert}
                  />
                  <Users loading={loading} users={users} />
                </div>
              </Fragment>
            }
          />

          {/* Route for the About Page */}
          <Route
            exact
            path="/about"
            element={
              <Fragment>
                <Navbar />
                <About />
              </Fragment>
            }
          />

          {/* Route for the User Detail Page */}
          <Route
            exact
            path="/user/:login"
            element={
              <Fragment>
                <Navbar />
                <User
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={getUserRepos}
                  repos={repos}
                />
              </Fragment>
            }
          />
        </Routes>
      </BrowserRouter>
    </GithubState>
  );
};

export default App;
