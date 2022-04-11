import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Wrapper>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </a>
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {isUser && user.name && (
        <h4>
          Welcome,<strong>{user.name.toUpperCase()} </strong>
        </h4>
      )}
      {isUser ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout
        </button>
      ) : (
        <button type="button" onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: #56bbf1;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  a {
    font-size: 2.2rem;
    position: absolute;
    top: 1.3rem;
    right: 1rem;
    text-decoration: none;
    color: #000;
  }

  @media (max-width: 450px) {
    a {
      visibility: hidden;
      opacity: 0;
    }
  }
`;

export default Navbar;
