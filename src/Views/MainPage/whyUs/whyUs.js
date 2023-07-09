import React from "react";
import styled from "styled-components";
import Carousel from "../carousel/carousel";
import image from "./img/why.svg"

const whyUs = () => {
  return(
    <WhyUsBlock>
      <div className={'ferry-text head'}>Почему именно мы</div>
      <Carousel/>
      <div className={'image-block'}>
        <img className={'image'} src={image} alt={'image'}/>
      </div>
    </WhyUsBlock>
  )
}

export default whyUs

const WhyUsBlock = styled.div`
  .image{
    margin: 50px 0 100px;
    width: 100% ;
  }

  @media (max-width: 1226px) {
    .head{
      width: 70%;
    }
    .image{
      margin: 80px 0 ;
      height: 400px;
      width: unset;
      overflow: hidden;
    }
  }
`;