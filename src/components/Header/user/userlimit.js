import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Spiner} from "../../spiner/spiner";

const UserLimit = ({open}) => {
  const state = useSelector((state) => state)

  return (
    <Limit open={open}>
      { state.authenticated !== null &&
        <div className={'limits-block'}>
          {
            state.userInfo === null
              ? <Spiner />
              : <div className={'limits'}>
                  <p className={'description subText'}>
                    Использовано компаний {" "}
                    <span className={'count'}>
                      {state.userInfo.eventFiltersInfo.usedCompanyCount}
                    </span>
                  </p>
                  <p className={'description subText'}>
                    Лимит по компаниям {" "}
                    <span className={'count available'}>
                      {state.userInfo.eventFiltersInfo.companyLimit}
                    </span>
                  </p>
                </div>
          }
        </div>
      }
    </Limit>
  )
}
export default UserLimit


const Limit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  

  .burgerBtn {
    border: none;
    padding: 0;
    height: 25px;
    background-color: #fff;
  }
  
  .limits-block {
    width: 175px;
    height: 63px;
    background-color: ${props => props.open ? '#fff' : 'rgba(217, 217, 217, 0.3)'};
    transition: background-color 300ms ease-out;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: auto 0;
    box-sizing: border-box;

    .loading-icon {
      width: 100%;
      height: 50%;

      display: flex;
      justify-content: center;
    }

    .limits {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      padding-left: 11px;
      
      .description {
        margin: 4px 0;

        &:last-child {
          position: relative;
          left: 16px;
          
        }
      }

      .count {
        text-align: left;
        font-size: 14px;
        font-weight: 700;
        line-height: 11px;
        padding-left: 7px;
        color: #000;
        position: relative;
        top: 2px;
      }

      .available {
        color: #8AC540;
      }
    }


    @media (max-width: 1226px) {

      width: 130px;
      position: relative;
      margin-left: 20px;
      
      .limits{
        .description {
          position: initial;
          width: 100px;
          margin: 2px 0;

          &:last-child {
            position: initial;
            width: 90px;
          }

          .count {
            padding-left: 0;
          }
        }
      }
    }
  }
`;
