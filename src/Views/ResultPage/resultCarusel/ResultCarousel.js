import React from "react";
import styled from "styled-components";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import {settings} from "./carouselSetting";
import {useSelector} from "react-redux";
import { Spiner } from "../../../components/spiner/spiner";

const ResultCarousel = () => {

    const state = useSelector((state) => state)
    settings.slidesToShow = state.screenSize > 1439 ? 8 : 1;
    
    return(
      <CarouselBlock resultIDs={state.resultIDs}>
        <p className={'head ferry-text'}>Общая сводка</p>
        {
          state.resultIDs && 
          <p className={'description reg-text'}>
            Найдено {Math.floor(state.resultIDs.items.length/1000) !== 0 ? Math.floor(state.resultIDs.items.length/1000) : null} 
            {state.resultIDs.items.length % 1000} вариантов
          </p>
        }
        <div className={'carousel'}>
          <div className={'Block'}>
            <div className={'main-Block'}>
              <div className={'main'} >
                <div>Период</div>
                <div>Всего</div>
                <div>Риски</div>
              </div>
            </div>
          </div>
        </div>
        <Slider {...settings} >
          {
            state.resultHistogram 
              ? 
              state.resultHistogram[0].data.map(e =>
                <React.Fragment  key={e.date}>
                  <div className={'others'} >
                    <div>{new Date(e.date).toLocaleDateString('en-GB').replaceAll('/', '.')}</div>
                    <div>{e.value}</div>
                    <div>{state.resultHistogram[1].data.map(elem => elem.date === e.date ? elem.value : null)}</div>
                  </div>
                </React.Fragment>
              )
              :
              <div className={'Spiner-block'} >
                <Spiner size={50}/>
                {
                  state.screenSize > 1439 ? <p style={{width: '160px'}}>Загружаем данные...</p> : null
                }
              </div>         
          }
        </Slider>
      </CarouselBlock>
    )
}

export default ResultCarousel

const CarouselBlock = styled.div`
  position: relative;
  .head{
    margin: 0;
    font-size: 30px;
    line-height: 36px;
    margin-bottom: ${props => props.resultIDs ? 0 : 65}px;
  }
  .description{
    margin: 17px 0 27px;
    color: #949494;
  }
  
  .carousel{
    margin: 0 auto 100px;
    width: 95%;
    .Block{
      display: flex;
      height: 160px;
      border: 2px solid #029491;
      border-radius: 10px;
      overflow: hidden;

      .main-Block {
        background-color: #029491;
        
        .main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 130px;
          height: calc(100% - 30px);
          padding: 15px 0;
          color: #fff;
          font-size: 20px;
          line-height: 24px;
        }
      }
    }
  }
  
  .slick-arrow{
    display: flex;
  }
  .slick-prev, .slick-next{
    cursor: pointer;
    
    position: absolute;
    right: 0;
    top: 60px;
  }
  .slick-prev{
    transform: rotate(180deg);
    right: initial;
  }
  .slick-list{
    width: 100%;
    height: 160px;
    margin: 0 41px 0 170px;
    display: flex;
    align-items: center;
  } 
  
  .slick-track{
    display: flex;
    height: calc(100% - 30px);
  }
  .slick-slide {
    display: flex;
    justify-content: center;
    position: relative;
    border-right: ${props =>  props.data === null ? '3px #D4D4D4 solid' : 'none'};
  }
  .slick-slide > div{
    margin: 0 5px;
    height: 100%;
    align-items: center;
    display: flex;  
  }
  .slick-slider{
    display: flex;
    max-width: 100vw;
    width: 100%;
    height: 160px;
    overflow: hidden;
    position: absolute;
    bottom: 101px;
    
  }
  .slick-disabled{
    opacity: 0.2;
  }

  .others{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 125px;
    height: 100%;
    font-size: 18px;
    line-height: 22px;
  }

  @media (max-width: 1226px) {
    margin-top: 60px;
    
    .carousel{
      width: 85%;
        .Block{
          flex-direction: column;
          height: 140px;
          .main-Block{
            width: 100%;
            
            .main{
              flex-direction: row;
              width: 100%;
              height: 40px;              
              font-size: 18px;
              line-height: 22px;
              
              div{
                width: 28%;
                text-align: center;
              }
              div:nth-of-type(1){
                width: 44%;
              } 
            }
          }
        }
    }
    .slick-list{
      margin: 0 30px;
      height: auto;
    }
    .slick-track{
      height: 50px;
      margin: 0;
    }
    .slick-prev, .slick-next{
      top: 10px;
      right: -10px;
    }
    .slick-prev{
      right: unset;
      left: -10px;
    }
    .slick-slider{
      height: auto;
      bottom: 112px;
    }
    .slick-slide {
      border-right: none;
    }
    .slick-slide > div {
      width: 100%;
      margin: 0;
    }
    .others{
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      
      div{
        width: 28%;
        text-align: center;
        &:first-of-type{
          width: 44%;
        }
      }
    }
  }
`;