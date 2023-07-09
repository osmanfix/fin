import React from "react";
import styled from "styled-components";
import imageBg from "./img/resultPage.svg"
import ResultCarousel from "./resultCarusel/ResultCarousel";
import ResultCards from "./resultCard/ResultCards";


const ResultPage = () => {

    return(
        <ResultPageBlock>
            <div className={'header'}>
                <div className={'text-block'}>
                    <div className={'ferry-text head'}>Ищем. Скоро <br/>будут результаты</div>
                    <div className={'reg-text description'}>Поиск может занять некоторое время, <br/>просим сохранять терпение.</div>
                </div>
                <img className={'bg-image'} src={imageBg} alt={'bg logo'}/>
            </div>
            <ResultCarousel />
            <ResultCards />
           
        </ResultPageBlock>
    )
}
export default ResultPage

const ResultPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  
  .header {
    display: flex;
    justify-content: space-between;
    height: 370px;
    
    .text-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 500px;
      .head{
        font-size: 40px;
        line-height: 48px;
      }
      .description {
        margin: 35px 0;
      }
    }
  }
  .bg-image{
    position: relative;
    right: 50px;
    top: 25px;
  }
  

  @media (max-width: 1226px) {
    
    
    .header{
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      .text-block {
        width: 100%;

        .head{
          font-size: 28px;
          line-height: 34px;
          white-space: nowrap;
        }
        .description {
          margin: 20px 0;
        }
      }

      .bg-image{
        position: inherit;
      }
      
    }
    
  }
`;