import React from "react";
import { NotFoundStyled, NotFoundWrap } from "./NotFound.styled";

const NotFound = () => {
  return (
    <NotFoundStyled>
      <NotFoundWrap>
        <span>Sorry... </span>
        <img src="img/404.jpg" alt="" />
        <h2>404 Page not found :(</h2>
      </NotFoundWrap>
    </NotFoundStyled>
  );
};

export default NotFound;
