import arrow from "./img/rightArrow.svg";
import React from "react";

export const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <LeftArrow />,
        nextArrow: <RightArrow />   ,
        responsive: [{
            breakpoint: 1400,
            settings:{
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]
    };
export function RightArrow (props) {
        const { className, onClick } = props;
        return (
            <div className={className}  >
                <img src={arrow} alt='' onClick={onClick}/>
            </div>

        );
    }
export function LeftArrow (props) {
        const { className, onClick } = props;
        return (
            <div className={className}  >
                <img src={arrow} alt='' onClick={onClick}/>
            </div>

        );
    }
