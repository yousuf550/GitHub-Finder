import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layouts/Alert'

class App extends React.Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  }

  // Comment out below code we didnt need any more, this simple calling users api to show data
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }

  // This function is called from the search component by passing props up
  searchUsers = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    )
    this.setState({ users: res.data.items, loading: false })
  }

  // This function is called from the search component to clear users froms state
  clearUsers = () => this.setState({ users: [], loading: false })

  // This function is called from the search component to raise alert for empty text field
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    // Remove the alert msg after 5 seconds
    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  render() {
    const { users, loading } = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    )
  }
}

export default App
