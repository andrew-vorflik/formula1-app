import React, { useState, useEffect } from "react";
import { Table, Dimmer, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { getData } from "../../hooks/getData";
import { QualificationStyled, TableWrapStyled } from "./Qualification.styled";
import Navigation from "../Navigation/Navigation";

const Qualification = () => {
  const [qualResult, setQualResult] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    const currentQual = await getData(`http://ergast.com/api/f1/current/${id}/qualifying`);

    setQualResult(currentQual.data.MRData.RaceTable.Races[0].QualifyingResults);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navigation />
      <QualificationStyled>
        <h1>Qualifying Results</h1>

        {qualResult.length ? (
          <TableWrapStyled>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Position</Table.HeaderCell>
                  <Table.HeaderCell>Driver</Table.HeaderCell>
                  <Table.HeaderCell>Constructor</Table.HeaderCell>
                  <Table.HeaderCell>Q1</Table.HeaderCell>
                  <Table.HeaderCell>Q2</Table.HeaderCell>
                  <Table.HeaderCell>Q3</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {qualResult.map((position, index) => (
                  <Table.Row key={`${index}-driver`}>
                    <Table.Cell>{position.position}</Table.Cell>
                    <Table.Cell>
                      {position.Driver.givenName} {position.Driver.familyName}
                    </Table.Cell>
                    <Table.Cell>{position.Constructor.name}</Table.Cell>
                    <Table.Cell>{position.Q1}</Table.Cell>
                    <Table.Cell>{position.Q2}</Table.Cell>
                    <Table.Cell>{position.Q3}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </TableWrapStyled>
        ) : (
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        )}
      </QualificationStyled>
    </>
  );
};

export default Qualification;
