import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
// import { ThemeProvider } from "styled-components";

const rootUrl = "https://api.github.com";

// Context

const GithubContext = React.createContext();

// ==> Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // Reamining Request
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  // Search function
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err);
    });
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      //repos : https://api.github.com/users/john-smilga/repos?per_page=100
      // followers : https://api.github.com/users/john-smilga/followers
      //repos
      axios(`${rootUrl}/users/${login}/repos?per_pahe=100`)
        .then((res) => setRepos(res.data))
        .catch((err) => console.log(err));
      // followers
      axios(`${followers_url}?per_page=100 `)
        .then((res) => setFollowers(res.data))
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "Sorry, No user matching your search");
    }
    checkRequests();
    setIsLoading(false);
  };

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let remaining = data.rate.remaining;

        setRequests(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            "Sorry,you consume all your available requests for an hour!"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  // Error
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export { GithubProvider, GithubContext };
