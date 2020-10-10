import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { NavigationStyled, NavigationList, NavigationItem } from "./Navigation.styled";

const Navigation = () => {
  const { id } = useParams();
  return (
    <NavigationStyled>
      <NavigationList>
        <NavigationItem>
          <NavLink to={`/race/${id}`}>Race</NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to={`/race/${id}/qualification`}>Qualification</NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to={`/race/${id}/circuit`}>Circuit</NavLink>
        </NavigationItem>
      </NavigationList>
    </NavigationStyled>
  );
};

export default Navigation;
