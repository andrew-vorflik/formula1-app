import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { getData } from "../../hooks/getData";
import { CircuitStyled } from "./Circuit.styled";

const Circuit = () => {
  const [circuitData, setCircuitData] = useState([]);

  const fetchData = async () => {
    const circuitResponse = await getData("http://ergast.com/api/f1");

    setCircuitData(circuitResponse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navigation />
      <CircuitStyled>
        <h1>Circuit</h1>
      </CircuitStyled>
    </>
  );
};

export default Circuit;
