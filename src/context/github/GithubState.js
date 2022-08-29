import React, { useReducer } from "react";
import axio from "axios";
import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import {
  SEARCH_USER,
  SET_LOADING,
  CLEAR_USER,
  GETUSER,
  GET_REPOS,
} from "../Types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  // Get Users
  // Get Repos
  // Clear Users
  // Set Loading

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
      }}
    >
        {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
