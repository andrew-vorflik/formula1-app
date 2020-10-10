import styled from "styled-components";

export const NotFoundStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const NotFoundWrap = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 30px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 5px;
  }

  h2 {
    font-size: 40px;
  }

  img {
    width: 450px;
  }
`;
