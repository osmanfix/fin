import React from "react"
import logo from "./img/logo-white.svg"
import css from "./footer.module.css"

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <div className={css.logoBlock}>
          <img src={logo} alt='logo' />
        </div>
        <div className={css.contacts}>
          <p className={css.text}>г. Москва, Цветной б-р, 40</p>
          <p className={css.text}>+7 495 771 21 11</p>
          <p className={css.text}>info@skan.ru</p>
          <p className={css.copyright}>copyright, {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer