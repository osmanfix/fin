import React from "react";
import loadImg from "./img/load.svg";
import styled from "styled-components";

export const Spiner = ({size}) => {
    return(
        <SpinerBlock size={size}>
            <div className="load" >
                <img src={loadImg} alt='Loding...' />
            </div>
        </SpinerBlock>

    )
}
const SpinerBlock = styled.div`
  @keyframes Spiner {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }

  display: grid;
  justify-content: center;
  align-items: center;

  //width: ?{props => props.size ? props.size : 24}px;
  
  .load {
    img{
      width: ${props =>  props.size ? props.size : 24}px;
      height: ${props =>  props.size ? props.size : 24}px;
    }
    
    animation: Spiner 1.5s linear infinite;
  }
`;