import styled from "styled-components";

export const RaceStyled = styled.div`
  padding-top: 20px;
  width: 80%;
  margin: 0 auto;
`;

export const TitleStyled = styled.h2`
  color: red;
`;
export const WonBackWrapStyled = styled.div`
  position: relative;
  width: 15px;
  margin-left: 15px;
  text-align: right;

  svg {
    position: absolute;
    top: 25%;
    right: 100%;
    margin-right: 5px;
  }
`;

export const TableWrapStyled = styled.div`
  margin: 0 auto;
`;

export const RaceInfoStyled = styled.div`
  display: inline-block;
  margin-bottom: 50px;
`;

export const RaceInfoTopStyled = styled.div`
  display: flex;
  align-items: baseline;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
`;

export const RaceNameStyled = styled.h1`
  margin: 0;
  margin-right: 30px;
  font-size: 42px;
`;

export const RaceRoundStyled = styled.div`
  font-size: 20px;
  margin-right: 30px;
  font-weight: bold;
`;

export const RaceDateStyled = styled.div`
  font-size: 20px;
`;

export const CircuitNameStyled = styled.div`
  margin-top: 5px;
  font-size: 21px;
  color: #888;
`;

export const TeamStyled = styled.span`
  color: #888;
`;

export const DriverNoteStyled = styled.sub`
  margin-left: 3px;
  color: #888;
`;
