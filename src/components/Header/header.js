import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "./img/scan-logo.svg"
import logoWhite from "./img/logo-white.svg"
import Links from "./links/links";
import UserLimit from "./user/userlimit";
import {useSelector} from "react-redux";
import store from "../../store/store";
import {setScreenSize} from "../../store/types";
import Menu from "./menu/menu";
import UserInfo from "./user/userinfo";
import { expireCheck } from "../expireCheck";
import cn from "classnames"


const Header = () => {

  const state = useSelector((state) => state)
  const  [open, setOpen] = useState(false)

  const setSize = () =>{
      store.dispatch(setScreenSize(window.innerWidth))
  }
  useEffect(() => {
      window.addEventListener('resize', setSize);
      return( () => window.removeEventListener('resize', setSize ))
  }, [state.screenSize])

  useEffect(() => {
    expireCheck()
  }, [])

  const navigate = useNavigate()
  const handleLink = (address) => navigate(`/${address}`)
  
  return (
    <HeaderBlock>
      <div className={'Block'} onClick={() => handleLink('')}>
        {
          state.screenSize > 1439
            ? <img className="logo" src={logo} alt={'logo'}/>
            : !open 
              ? <img className="logo" src={logo} alt={'logo'}/>
              : <img className="logo" src={logoWhite} alt={'logo'}/>
        }
      </div>
{
  state.screenSize > 1439 && <Links/>
}

<div className={cn('Block', {onlyInfo: !state.authenticated})}>
      {
          state.authenticated &&
          <div className={' limit'}>
          <UserLimit open={open}/>
          </div>
      }
      {
        state.screenSize > 1439 && 
        <UserInfo setOpen={setOpen} handleLink={handleLink}/>
      }
</div>  
      {
        state.screenSize < 1440 && 
        <Menu open={open} setOpen={setOpen} handleLink={handleLink}/>
      }
    </HeaderBlock>
  )
}
export default Header

const HeaderBlock = styled.div`
    height: 93px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 60px;
    background-color: #fff;
    font-family: Inter, sans-serif;
    letter-spacing: 0.01em;
    
    .subText{
      font-size: 10px;
      line-height: 12px;
      color: rgba(0,0,0, 0.4);
    }
  
  .Block{
    width: 400px;
    margin-left: -5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo{
    cursor: pointer;
  }
  .onlyInfo{
    justify-content: right;
  }
  .limit{
    justify-content: right;
  }
  
  @media (max-width: 1226px) {
    max-width: 335px;
    padding: 0 26px 0 14px;
    justify-content: unset;
    position: relative;
    
    .subText{
      font-size: 8px;
      line-height: 10px;
    }
    .Block{
      width: auto;
      z-index: 5;
      
    }
  }
`;
