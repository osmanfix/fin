import React from "react";
import store from "../../../store/store";
import userLogo from "../img/avatar.svg"
import { logoutUser } from "../../../store/types";
import Button from "../../Button";
import { useSelector } from "react-redux";
import css from './userinfo.module.css';

const UserInfo = ({setOpen, handleLink}) => {
    const state = useSelector((state) => state)
    const isDesktop = state.screenSize > 1439;
    
    const handleExit = () => {
        setOpen(false);
        store.dispatch(logoutUser())
    }    

    const userName = 'Алексей А.';
    return(
        <userInf className={css.authLinks}>
        {
            state.authenticated 
                ? <div className={css.authUser}>   
                        <div className={css.exitBlock}>
                            <p>{userName}</p>
                            <div className={css.exitBlock}>
                                <Button name={'Выйти'} onClick={handleExit}
                                    size={isDesktop ? 10 : 20} 
                                    height={isDesktop ? 12 : 24} 
                                    color={'#000'} bg={isDesktop ? 'unset' : '#7CE3E1'} /> 
                            </div>       
                        </div>     
                        <img className={css.userPhoto} src={userLogo} alt='user-photo'/>                                                            
                    </div>
                : <div className={css.authLinks}>
                    <Button name={'Зарегистрироваться'} bg={'#fff'} color={'#666'} size={14} height={17}/>
                    <div className={css.pipe}></div>
                    <div> 
                        <div className={css.btnLogin}>
                            <Button name={'Войти'} bg={'#7CE3E1'} color={'#000'} size={14} height={17} onClick={() => handleLink('auth')}/> 
                        </div>
                    </div>
                </div>
        }
        </userInf>
    )
}

export default UserInfo
