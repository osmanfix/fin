import React from "react";
import styled from "styled-components";
import AuthBlock from "./authBlock";
import lock from  "./img/lock.svg"
import authBack from "./img/authBack.svg";


const AuthPage= () => {
    return(
        <AuthPageBlock >
                <div className={'head ferry-text'}>Для оформления подписки <br/>на тариф, необходимо авторизоваться</div>

            <div className={'auth-block'}>
                <img className={'img-lock'} src={lock} alt={'lock'}/>
                <AuthBlock />
            </div>
            <div className={'img-bg'}>
                <img src={authBack} alt={''} />
            </div>
        </AuthPageBlock>
    )
}
export default AuthPage

const AuthPageBlock = styled.div`
  padding: 70px 0 0;
  //display: flex;

  display: grid;
  margin-right: 3%;
  .head{
    font-family: 'Ferry Black', sans-serif;
    font-size: 40px;
    line-height: 48px;
    //text-transform: uppercase;
    //width: 55%;
    height: 150px;

    grid-column: span 2;
    width: 790px;
  }
  .auth-block{
    display: flex;

    grid-column: 3;
    grid-row: span 3;
    .img-lock{
      width: 76px;
      height: 93px;
      position: relative;
      left: 25px;
      bottom: 55px;
    }
  }
  .img-bg{
    grid-row: 2;
    margin: 10px 0 0  30%;
  }

  @media (max-width: 1439px) {
    max-width: 375px;
    display: flex;
    flex-direction: column;
    padding: 30px 0 80px;
    margin: 0;
    position: relative;
    
    .head{
      margin-bottom: 125px;
      width: 100%;
      height: auto;
      font-size: 22px;
      line-height: 26px;
    }
    .auth-block {
      position: relative;

      .img-lock {
        position: absolute;
        top: -80px;
        left: 105px;
      }
    }
      .img-bg {
        margin: 0;
        img {
          width: 100%;
        }
      }
    }
`;