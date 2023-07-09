import React, {useState} from "react";
import styled from "styled-components";
import cn from "classnames";
import {Link, useNavigate} from "react-router-dom";
import yandex from "./img/yandex.svg"
import facebook from "./img/facebook.svg"
import google from ".//img/google.svg"
import store from "../../store/store";
import {getUserInfo, loginUser} from "../../store/types";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";

function Token(userData, reset, handleNavigate,setIsError){
  fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
        .then(response => response.json())
        .then( (data) =>  {
            localStorage.setItem('user', JSON.stringify(data) )
            store.dispatch(loginUser(data))

            if (data.accessToken){
              handleNavigate()
              setIsError(false)
              reset() 
            } else {
              setIsError(true)  
            }
            data.accessToken  &&
              fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {headers: {Authorization: `Bearer ${data.accessToken}`}})
                  .then(res => res.json())
                  .then(infoData => {
                      localStorage.setItem('user-info', JSON.stringify(infoData))
                      store.dispatch(getUserInfo(infoData))
                  })
            
        })
}


const AuthBlock = () => {
    const navigate = useNavigate()
    const handleNavigate = () => navigate('/');
    const isSignIn = true
    const {
      register,
      formState: {errors, isValid},
      handleSubmit,
      reset,
  } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
  })

  const [isError, setIsError] = useState(false);

  const onSubmit =  (data) => {
    Token(data, reset, handleNavigate, setIsError)
  }

  return(
    <AuthBlockBlock onSubmit={handleSubmit(onSubmit)}>
      <div className={'auth'}>
        <div className={cn({'active': isSignIn}, 'sign-in same-opt')}>Войти</div>
        <div className={cn({'active': !isSignIn},'sign-up same-opt')}>Зарегистрироваться</div>
      </div>
      <div className={'label same-opt'}>Логин или номер телефона:</div>
      <div className="input-block">
        <input className={'input same-opt'}
          {...register('login', {
            required: 'Обязательное поле',
            pattern: {
              value: /(^[a-zA-Z]+([._-]?[a-zA-Z0-9]+)*$)|(^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$)/,
              message: 'Введите корректные данные'
          }})}
        />
        <div className={'error-text'}>
          {errors?.login && errors?.login?.message}
        </div>
      </div>  
      <div className={'label same-opt'}>Пароль:</div>
      <div className="input-block">
        <input className={'input same-opt'} type={"password"}
          {...register('password', {required: 'Обязательное поле'})}
        />
        <div className={'error-text'}>
        {errors?.password && errors?.password?.message}
        {isError && 'Неправильный логин/пароль'}
        </div>
      </div>
      <div className={'btn same-opt'}>
        <Button name={'Войти'} size={22} height={26} type={'submit'} bg={isValid ? null: '#A4B0FF'}/>
      </div>
      <div className={'same-opt resetPass'}>
        <Link className={'link'} to={'#'}>Восстановить пароль</Link>
      </div>
      <div className={'label same-opt'}>Войти через:</div>
      <div className={'otherAuth same-opt'}>
        <button className={'authLink'}><img src={google} alt={'google'}/></button>
        <button className={'authLink'}><img src={facebook} alt={'facebook'}/> </button>
        <button className={'authLink'}><img src={yandex} alt={'yandex'}/> </button>
      </div>
    </AuthBlockBlock>
  )
}
export default AuthBlock

const AuthBlockBlock = styled.form`

    width: 430px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 80px;
    .auth{
      display: flex;
      justify-content: space-between;
      color: #C7C7C7;
      margin-bottom: 25px;
    }
  .same-opt{
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 15px;
    width: 100%;
  }
  .sign-in, .sign-up {
    text-align: center;
    padding-bottom: 8px;
    border-bottom: 2px solid #C7C7C7;
    cursor: pointer;
  }
  .sign-in{
    width: 37%;
  }
  .sign-up{
    width: 57%;
  }
  .active{
    color: #029491;
    border-color: #029491;
  }
  .label{
    color: #949494;
  }
  .input-block{
    position: relative  ;

    .input{
      border: 1px solid #C7C7C7;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      font-size: 20px;
      line-height: 40px;
      padding: 0 5px;
      box-sizing: border-box;

      position: relative;

      &:focus{
        outline: none;
        border-color: #029491;
        box-shadow: 0 0 3px #029491;
      }
    }
    .error-text{
      position: absolute;
      bottom: -5px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      line-height: 17px;
      color: #FF5959;
    }
  }
  
  .btn{
    margin-top: 15px;
    height: 59px;
  }
  .resetPass{
    text-align: center;
    color: #5970FF ;
    margin-bottom: 30px;
    .link:visited{
      color: #5970FF ;
    }
  }
  .otherAuth{
    display: flex;
    
    .authLink{
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-right: 10px;
      background-color: #FFFFFF;
      border: 1px solid rgba(89, 112, 255, 0.51);
      border-radius: 3px;
      cursor: pointer;  
      &:hover{
        background-color: rgba(89, 112, 255, 0.1);
      }
    }
  }

  @media (max-width: 1226px) {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 50px;

    .otherAuth .authLink{
      padding: 0 13px;
    }
  }
`;