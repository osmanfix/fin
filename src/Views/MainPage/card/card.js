import React from "react";
import styled from "styled-components";
import CostCard from "./costCard"
import logo1 from "./img/Costs1.svg"
import logo2 from "./img/Costs2.svg"
import logo3 from "./img/Costs3.svg"

const Cards = () => {
    const costsData = [
        {
            head: 'Beginner',
            subHead: 'Для небольшого исследования',
            img: logo1,
            price: 799,
            subPrice: 1200,
            maxPrice: 150,
            opt1: 'Безлимитная история запросов',
            opt2: 'Безопасная сделка',
            opt3: 'Поддержка 24/7',
            bg: '#FFB64F',
            active: true
        },{
            head: 'Pro',
            subHead: 'Для HR и фрилансеров',
            img: logo2,
            price: 1299,
            subPrice: 2600,
            maxPrice: 279,
            opt1: 'Все пункты тарифа Beginner',
            opt2: 'Экспорт истории',
            opt3: 'Рекомендации по приоритетам',
            bg: '#7CE3E1',
            active: false
        },{
            head: 'Business',
            subHead: 'Для корпоративных клиентов',
            img: logo3,
            price: 2379,
            subPrice: 3700,
            maxPrice: null,
            opt1: 'Все пункты тарифа Pro',
            opt2: 'Безлимитное количество запросов',
            opt3: 'Приоритетная поддержка',
            bg: '#000',
            active: false
        },
    ]
    return(
        <CardsBlock>
            <div className={'ferry-text head'}>наши тарифы</div>
            <div className="costs">
                {
                    costsData.map(e =>
                    <CostCard data={e} key={e.head}/>
                    )
                }
            </div>
        </CardsBlock>
    )
}
export default Cards

const CardsBlock = styled.div`
  .costs{
    display: flex;
    justify-content: space-between;

  @media (max-width: 1226px) {
    flex-direction: column;
  }
  }
`;
