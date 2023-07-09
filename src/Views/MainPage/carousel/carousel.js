import React from "react";
import styled from "styled-components";
import img1 from "./img/carousel1.svg"
import img2 from "./img/carousel2.svg"
import img3 from "./img/carousel3.svg"
import {settings} from "./carouselSetting";
import Slider from "react-slick";



const Carousel = () => {
  const data = [
      {
      text: 'Высокая и оперативная скорость обработки заявки',
      img: img1
      },{
      text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
      img: img2
      },{
      text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
      img: img3
      },{
      text: 'Дополнительный слайд',
      img: img3
      },
  ]


  return(
      <CarouselBlock>
              <Slider {...settings}>
                  {
                      data.map(e =>
                          <div className={'card-Block'} key={e.text}>
                              <div className={'card'} >
                                  <img  src={e.img} alt='image'/>
                                  <div className={'text'}>{e.text}</div>
                              </div>
                          </div>
                          )
                  }
              </Slider>
      </CarouselBlock>
  )
}
export default Carousel

const CarouselBlock = styled.div`
position: relative;
margin-top: -20px;
.card-Block{
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: calc(100% - 40px);
  
  .card{
    padding: 22px 20px 40px;
    
    .text{
      font-size: 18px;
      line-height: 22px;
      padding: 12px 35px 0 0;
    }  
  }
} 

.slick-arrow{
  position: absolute;
  top: 40%;
}
.slick-prev, .slick-next{
  margin: auto;
  cursor: pointer;
  background: none;
  right: 0;
}
.slick-prev{
  transform: rotate(180deg);
  right: unset;
}

.slick-list{
  margin: 0 20px;
}
.slick-track{
  height: 100%;
}
.slick-slide > div{
  margin: 20px 20px;
  height: 100%;
}
.slick-slider{
  /* display: flex; */
  display: grid;
  margin-top: 70px;
}
.slick-disabled{
  opacity: 0.2;
}

@media (max-width: 1439px) {

  .card-Block {
    .card {
      padding: 22px 0 20px 20px;
    }
  }
  .slick-arrow{
    z-index: 5;
  }
  .slick-prev {
    margin-left: -20px;
  }
  .slick-next {
    margin-right: -30px;
  }
  .slick-list{
    margin: 0 -10px 0 0;
  }
}
`;