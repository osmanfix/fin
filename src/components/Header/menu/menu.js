import React from "react";
import closeb from "./img/menu.svg"
import openb from "./img/menu-close.svg"
import Links from "../links/links";
import Button from "../../Button";
import UserInfo from "../user/userinfo";
import { useSelector } from "react-redux";
import css from './menu.module.css';



const Menu = ({open,setOpen, handleLink}) => {
  
const handleNavigate = (address) => {
    setOpen(!open);
    handleLink(`${address}`)
}
const state = useSelector((state) => state)


return(
    <mblock className={css.block} open={open} >
      <div className={css.logo}>
        <button  onClick={() => setOpen(!open)}>
          {
          !open 
            ? <img src={closeb} alt={'logo'} />
            : <img src={openb} alt={'logo'} />
          }
        </button>
      </div>
      <div  className={css.navBlock}>
        { open && 
          <>
            <Links setOpen={setOpen}/>
            {
              state.authenticated
                ? <UserInfo setOpen={setOpen}/>
                : <div >
                    <div className={'btn-register'}>
                      <Button name={'Зарегистрироваться'} className={css.buttonReg} onClick={() => handleNavigate('auth')}/>
                    </div>
                    <div className={css.btnlogin}>
                      <Button name={'Войти'} className={css.btEnter}  onClick={() => handleNavigate('auth')}/>
                    </div>
                  </div>
            }
          </>
        }
      </div>
    </mblock>
  )
}
export default Menu
