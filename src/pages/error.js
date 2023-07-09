import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
    return (
        <ErrorsPage>
            <h1>Ссылка не работает </h1>
        </ErrorsPage>
    )
}

export default ErrorPage

const ErrorsPage = styled.div`

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