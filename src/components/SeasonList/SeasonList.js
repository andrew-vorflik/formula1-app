import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List } from "semantic-ui-react";
import { getData } from "../../hooks/getData";
import { SeasonListStyled } from "./SeasonList.styled";

const SeasonList = () => {
  const [seasonList, setSeasonList] = useState([]);
  const [round, setRound] = useState();

  const fetchData = async () => {
    const currentSeason = await getData("http://ergast.com/api/f1/current");
    const currentRound = await getData(`http://ergast.com/api/f1/current/last/results`);

    setSeasonList(currentSeason.data.MRData.RaceTable.Races);
    setRound(+currentRound.data.MRData.RaceTable.round);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SeasonListStyled>
      <h3>Season 2020</h3>
      <List>
        {seasonList.map((race, index) => (
          <List.Item key={`race-${index}`}>
            {index < round ? (
              <Link to={`/race/${race.round}`}>
                {race.round}. {race.raceName}
              </Link>
            ) : (
              <>
                {race.round}. {race.raceName}
              </>
            )}
          </List.Item>
        ))}
      </List>
    </SeasonListStyled>
  );
};

export default SeasonList;
