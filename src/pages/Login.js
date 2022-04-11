import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login1-.png";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github user" />
        <h1>Github Search</h1>
        <button onClick={loginWithRedirect} className="btn">
          login / Sign up
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-image: linear-gradient(
    to right bottom,
    #56bbf1,
    #4bc7f3,
    #47d2f2,
    #4edcf0,
    #5ee6eb
  );
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
    border-radius: 50%;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
  .btn {
    background: #4d77ff;
    height: 2.5rem;
  }
`;
export default Login;
