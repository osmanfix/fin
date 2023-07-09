import React from "react";
import pic from "./img/search.svg"
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Button from "../../../components/Button";

const LinkToSearch = () => {
    const state = useSelector((state) => state)
    const navigate = useNavigate()
    const handleNavigate = () => navigate('/search');
    return(
        <Search>
            <div>
              <div className={'main-head'}>
                <span className={'first-line'}>
                  сервис по поиску
                  </span>
                  <br/>
                  публикаций 
                  <br/>
                  о компании 
                  <br/>
                  по его ИНН
                  </div>
              <div className={'description'}>
                Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
              </div>
              {
                state.authenticated &&
                <div className={'btnSearch'}> 
                  <Button name={'Запросить данные'} onClick={handleNavigate}
                    size={state.screenSize > 1400 ? 22 : 20}
                    height={state.screenSize > 1400 ? 27 : 24}
                  />
                </div>
              }
            </div>
            <img className={'pic'} src={pic} alt='Pic'/>
        </Search>
    )
}
export default LinkToSearch

const Search = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  .main-head{
    font-size: 60px;
    line-height: 72px;
    padding-top: 70px;
    font-family: "Ferry Black", sans-serif;
    .first-line{
      position: absolute;
    }
  }
  .description{
    font-size: 20px;
    line-height: 24px;
    //width: 75%;
    width: 510px;
    margin: 20px 0;
  }
  .btnSearch{
    width: 335px;
    height: 59px;
    margin: 50px 0;
  }

  .pic{
    padding: 20px 0 100px;
    width: 630px;
  }



  @media (max-width: 1439px) {
     justify-content: center;
     flex-direction: column;
    
     .main-head{
         font-size: 28px;
         line-height: 34px;
         padding-top: 10px;
         font-family: "Ferry Black", sans-serif;
     }
    
     .description{
         font-size: 18px;
         line-height: 22px;
         width: 80%;
         margin: 20px 0 30px;
     }
    
     .btnSearch{
         width: 100%;
         margin: 0;
     }
     .pic{
         padding: 40px 0 50px;  
         width: 100%;
     }
   }
  
`;