import React from "react";
import styled from "styled-components";
import Check from "./img/check.svg"


const CostCard = ({data}) => {

  return(
    <CostCardBlock data={data}>
      <HeadBlock data={data}>
        <div className={'card'}>
          <div className={'large-font'}>{data.head}</div>
          <div className={'card-subHead reg-font'}>{data.subHead}</div>
        </div>
        <img className={'img'} src={data.img} alt={'image'} />
      </HeadBlock>
      <InfoBlock>
        <TagBlock data={data}>
          <div className={'tag active'}>Текущий тариф</div>
        </TagBlock>
        <PriceBlock data={data}>
          <div className={'price'}>
            <div className={'discount large-font'}>{data.price} ₽</div>
            <div className={'fullPrice'}>{data.subPrice} ₽</div>
          </div>
          <div className={'maxPrice reg-font'}>
            {
              window.innerWidth > 1400
                ? `или ${data.maxPrice} ₽/мес. при рассрочке на 24 мес.`
                : null
            }
          </div>
        </PriceBlock>
          <Odds >
            <div className={'odds-head'}>
              В тариф входит:
            </div>
            <ul className={'ul reg-font'}>
              <li>{data.opt1}</li>
              <li>{data.opt2}</li>
              <li>{data.opt3}</li>
            </ul>
          </Odds>
          <CardBtn data={data}>
            {
              data.active === false
              ? 'Подробнее'
              : 'Перейти в личный кабинет'
            }
          </CardBtn>
      </InfoBlock>
    </CostCardBlock>
  )
}
export default CostCard

const CostCardBlock = styled.div`
  width: 31%;
  border: ${props =>  props.data.active ? `${props.data.bg} 2px solid` : 'none'} ;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 115px;
  overflow: hidden;
  user-select: none;
  margin-top:70px;
  .large-font{
    font-size: 30px;
    line-height: 36px;
  }
  .reg-font{
    font-size: 18px;
    line-height: 22px;
  }
  .btn{
    width: 100%;
    padding: 10px 10px;
  }

  @media (max-width: 1226px) {
    width: 100%;
    margin-bottom: 45px;
  }
`;

const HeadBlock = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.data.bg};
  padding: 30px 0 0 30px;
  color: ${props => props.data.bg === '#000' ? '#fff' : '#000'};

  position: relative;
  
  .card{
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    
    .card-subHead{
      padding: 10px 0 34px;
    }
  }
  .img{
    position: absolute;
    right: 5px;
    bottom: 30px;

    @media (max-width: 1400px) {
      width: 85px;
      bottom: 50px;
      right: 5px;
    }
  }

  
`;
const InfoBlock = styled.div`
  padding: 0 30px 24px;
  
`;
const TagBlock = styled.div`
  display: flex;
  justify-content: end;
  .tag{
    padding: 3px 13px 4px;
    color: #fff;
    background-color: ${props => props.data.active ? '#3BA5E0' : '#fff' };
    border-radius: 10px;
    font-size: 14px;
    line-height: 17px;
    margin: 10px 0 5px;
    position: relative;
    right: -20px;
  }
`;
const PriceBlock = styled.div`
  .price{
    display: flex;
    .fullPrice{
      font-size: 25px;
      line-height: 31px;
      text-decoration: line-through;
      opacity: 0.5;
      margin-left: 20px;
    }
  }
  .maxPrice{
    margin: 10px 0 60px;
    color: ${props => props.data.bg === '#000' ? '#fff' : '#000'};
  }
`;
const Odds = styled.div`
  .odds-head{
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
  }
  .ul{
    list-style-image: url(${Check});
    padding-left: 28px;
  }
`;
const CardBtn = styled.button`
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  background-color: ${props => props.data.active ? '#D2D2D2' : '#5970FF'};
  color: ${props => props.data.active ? '#000' : '#fff'};
  
  padding: 18px 0 17px;
  border-radius: 5px;
  border: none;
  margin-top: 55px;
  cursor: pointer;
`;