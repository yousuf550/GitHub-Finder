import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  }

  //This method is used to dynamically update state when input text changes in the search form
  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  //This method is used to submit search form
  onSubmit = (e) => {
    e.preventDefault();

    this.props.searchUsers(this.state.text);
    this.setState({text: ""})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users"
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
      </div>
    )
  }
}

export default Search
