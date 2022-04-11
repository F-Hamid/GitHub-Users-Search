import React, { useContext } from "react";
import { GithubContext } from "../context/context";
import styled from "styled-components";
import { MdBusiness, MdLocationOn, MdLink } from "react-icons/md";

const Card = () => {
  const { githubUser } = useContext(GithubContext);
  const {
    avatar_url,
    html_url,
    name,
    company,
    blog,
    bio,
    location,
    twitter_username,
  } = githubUser;

  return (
    <Wrapper>
      <header>
        <div className="img-container">
          <img src={avatar_url} alt={name}></img>
        </div>
        <div>
          <h4>{name}</h4>
          {/* <p>@{twitter_username || ""}</p> */}
          <p>{twitter_username ? `@${twitter_username}` : ""}</p>
        </div>
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          follow
        </a>
      </header>
      <p className="bio">{bio || ""}</p>
      <div className="links">
        <p>
          <MdBusiness></MdBusiness> {company || ""}
        </p>
        <p>
          <MdLocationOn></MdLocationOn> {location || ""}
        </p>
        <a href={`https://${blog}`} target="_blank" rel="noopener noreferrer">
          <MdLink></MdLink>
          {blog}
        </a>
      </div>
    </Wrapper>
  );
};

// Styling
const Wrapper = styled.article`
  background-image: linear-gradient(
    to right top,
    #42c2ff,
    #6ed4f9,
    #9ae4f4,
    #c6f2f5,
    #effffd
  );

  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  max-width: 90vw;
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    position: relative;

    .img-container {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: var(--clr-grey-10);
      z-index: 20;
      position: absolute;
      bottom: 50%;
      left: 42%;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 4px;
    }

    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0rem;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      width: 5rem;
      position: absolute;
      top: 0;
      right: 0.5rem;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .links {
    p,
    a {
      margin-bottom: 0.25rem;

      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
`;
export default Card;
