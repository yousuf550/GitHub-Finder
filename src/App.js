import React from 'react'
import Navbar from './components/layouts/Navbar'
import './App.css'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'

class App extends React.Component {
  state = {
    users: [],
    loading: false,
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

  render() {
    const { users, loading } = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    )
  }
}

export default App
