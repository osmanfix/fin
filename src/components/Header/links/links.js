import React from "react";
import {Link} from "react-router-dom"
import css from './links.module.css';

const Links = ({setOpen}) => {
  return(
    <nav className={css.Nav}>
        <Link className={css.link} to={`/`} onClick={() => setOpen && setOpen(false)}>Главная</Link>
        <Link className={css.link} to={`#`} onClick={() => setOpen && setOpen(false)}>Тарифы</Link>
        <Link className={css.link} to={`#`} onClick={() => setOpen && setOpen(false)}>FAQ</Link>
    </nav>
  )
}

export default Links
