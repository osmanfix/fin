import React from "react";
import Search from "./search/search";
import WhyUs from "./whyUs/whyUs";
import Card from "./card/card";
import css from "./main.module.css"

const Main = () => {
    return(
        <main className={css.head}>
            <Search />
            <WhyUs />
            <Card />
        </main>
    )
}
export default Main
