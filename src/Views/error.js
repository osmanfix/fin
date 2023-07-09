import React from "react";
import styled from "styled-components";

const DefaultPage = () => {
    return (
        <DefaultPage_W>
            <h1>Ссылка не работает :(</h1>
        </DefaultPage_W>
    )
}

export default DefaultPage

const DefaultPage_W = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 230px);

    h1{
        font-family: 'Ferry Black', sans-serif;
        font-size: 50px;
        letter-spacing: 0.03em;
        color: #029491;
        margin: 0 0 10px;
    }
    p{
        margin:  0;
        letter-spacing: 0.03em;
        font-size: 17px;
    }

    @media (max-width: 1226px) {
        h1{
            font-size: 22px;
            margin: 0 0 5px;
        }
        p{
            font-size: 10px;
        }
    }
`;