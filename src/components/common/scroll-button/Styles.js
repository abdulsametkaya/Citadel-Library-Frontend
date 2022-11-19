import styled from "styled-components";

export const Heading = styled.h1`
  text-align: center;
  color: #ffc000;
  
`;

export const Content = styled.div`
  overflowy: scroll;
  height: 2500px;
  
`;

export const Button = styled.div`
  position: fixed;
  width: 100%;
  left: 95%;
  bottom: 5rem;
  height: 20px;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: grey;

  @media (max-width: 992px) {
    left: 90%;
  }
  @media (max-width: 512px) {
    left: 85%;
  }
`;
