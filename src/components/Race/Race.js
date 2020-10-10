import React, { useState, useEffect } from "react";
import { Table, Loader, Dimmer } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { getData } from "../../hooks/getData";
import {
  RaceStyled,
  WonBackWrapStyled,
  TableWrapStyled,
  RaceInfoStyled,
  RaceInfoTopStyled,
  RaceNameStyled,
  RaceRoundStyled,
  RaceDateStyled,
  CircuitNameStyled,
  TeamStyled,
  DriverNoteStyled,
} from "./Race.styled";

const Race = () => {
  const [raceResult, setRaceResult] = useState([]);
  const [points, setPoints] = useState([]);
  const [raceInfo, setRaceInfo] = useState("");
  /* const [raund, setRaund] = useState(""); */
  const { id } = useParams();

  const fetchData = async () => {
    const currentRace = await getData(`http://ergast.com/api/f1/current/${id}/results`);
    const totalPoints = await getData("http://ergast.com/api/f1/current/driverStandings");

    setRaceResult(currentRace.data.MRData.RaceTable.Races[0].Results);
    setPoints(totalPoints.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    setRaceInfo(currentRace.data.MRData.RaceTable.Races[0]);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  /* Add field totalPoints to raseResult array */
  points.forEach((pointsItem) => {
    raceResult.find((driverItem) => {
      if (pointsItem.Driver.driverId === driverItem.Driver.driverId) {
        driverItem["totalPoints"] = pointsItem.points;
      }

      return null;
    });
  });

  
  const renderWonBack = (start, finish) => {
    const wonBackPosition = start - finish;
    return (
      <WonBackWrapStyled>
        {wonBackPosition > 0 ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 451.847 451.847"
              transform="rotate(180)"
              fill="green"
            >
              <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
            </svg>
            <span>{wonBackPosition}</span>
          </>
        ) : wonBackPosition < 0 ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 451.847 451.847" fill="red">
              <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
            </svg>
            <span>{wonBackPosition}</span>
          </>
        ) : (
          <span>{wonBackPosition}</span>
        )}
      </WonBackWrapStyled>
    );
  };

  const isPole = driver => driver.grid && driver.grid === '1';
  const isFastestLap = driver => driver.FastestLap && driver.FastestLap.rank === '1';

  const renderNote = (driver) => {
    let note = '';

    if (isPole(driver) && isFastestLap(driver)) {
      note = 'pole & best lap'
    } else if(isPole(driver)) {
      note = 'pole'
    } else if(isFastestLap(driver)) {
      note = 'best lap'
    }

    return (
      <DriverNoteStyled>{note}</DriverNoteStyled>
    )
  }

  const isOnePoints = (driver) => {
    if(isFastestLap(driver) && +driver.position <= 10) {
      return <DriverNoteStyled>(+1)</DriverNoteStyled>
    }
  }
  
  console.log(raceResult, 'raceResult');
  return (
    <>
      <Navigation />
      <RaceStyled>
        {raceInfo ? (
          <RaceInfoStyled>
            <RaceInfoTopStyled>
              <RaceNameStyled>{raceInfo.raceName}</RaceNameStyled>
              <RaceRoundStyled>Round {raceInfo.round}</RaceRoundStyled>
              <RaceDateStyled>{raceInfo.date}</RaceDateStyled>
            </RaceInfoTopStyled>
            <CircuitNameStyled>{raceInfo.Circuit.circuitName}</CircuitNameStyled>
          </RaceInfoStyled>
        ) : (
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        )}
        <TableWrapStyled>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Driver</Table.HeaderCell>
                <Table.HeaderCell>Constructor</Table.HeaderCell>
                <Table.HeaderCell>Points</Table.HeaderCell>
                <Table.HeaderCell>Total points</Table.HeaderCell>
                <Table.HeaderCell>Race time</Table.HeaderCell>
                <Table.HeaderCell>Fastest lap</Table.HeaderCell>
                <Table.HeaderCell>Won back</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {raceResult.map((driver, index) => (
                <Table.Row key={`${index}-driver`}>
                  <Table.Cell collapsing>{driver.position}</Table.Cell>
                  <Table.Cell>
                    {driver.Driver.givenName} {driver.Driver.familyName} {renderNote(driver)}
                  </Table.Cell>
                  <Table.Cell>
                    <TeamStyled>{driver.Constructor.name}</TeamStyled>
                  </Table.Cell>
                  <Table.Cell>{driver.points} {isOnePoints(driver)}</Table.Cell>
                  <Table.Cell>{driver.totalPoints}</Table.Cell>
                  <Table.Cell>{driver.Time ? driver.Time.time : driver.status}</Table.Cell>
                  <Table.Cell>{driver.FastestLap ? driver.FastestLap.Time.time : "No data"}</Table.Cell>
                  <Table.Cell>{renderWonBack(driver.grid, driver.position)} </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </TableWrapStyled>
      </RaceStyled>
    </>
  );
};

export default Race;
