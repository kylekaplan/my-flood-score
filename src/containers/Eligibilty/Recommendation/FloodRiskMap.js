import React from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { ImgContainer } from "./StyledComponents"

const FloodRiskMap = props => {
  const { imgUrl, setModalShow } = props
  return (
    <>
      {imgUrl ? (
        <ImgContainer>
          <MapImg src={imgUrl} onClick={() => setModalShow(true)} />
        </ImgContainer>
      ) : (
          <Loader animation="grow" />
        )}
    </>
  )
}

export default FloodRiskMap;

const MapImg = styled.img`
 cursor: pointer;
 height: 100%;
 width: 100%;
`