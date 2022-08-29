import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  // Comment out below code we did'nt need any more, this function was direct called users api to show data without using function parameters

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }

  return (
    <GithubState>
      <AlertState>
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
                    <Alert />
                    <Search />
                    <Users />
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
              path="/user/:user_login"
              element={
                <Fragment>
                  <Navbar />
                  <User />
                </Fragment>
              }
            />
          </Routes>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
};

export default App;
