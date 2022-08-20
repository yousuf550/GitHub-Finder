import React from "react";
import Navbar from "./components/layouts/Navbar";
import "./App.css";
import Users from "./components/users/Users";

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
