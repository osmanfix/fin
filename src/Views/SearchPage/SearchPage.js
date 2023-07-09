import React from "react";
import styled from "styled-components";
import document from "./img/document.svg"
import folders from "./img/folders.svg"
import bgLogo from "./img/search-bg.svg"
import SearchForm from "./searchForm/form";

const SearchPage = () => {
    return(
        <SearchPageBlock>
            <div className={'first-block'}>
                <div className={'text-box'}>
                    <div className={'ferry-text head'}>Найдите необходимые данные в пару кликов</div>
                    <div className={'description sub-text'}>Задайте параметры поиска.<br/>Чем больше заполните, тем точнее поиск.</div>
                </div>
                <div className={'img-box'}>
                    <img className={'document'} src={document} alt={'logo-doc'}/>
                    <img className={'folders'} src={folders} alt={'logo-folders'}/>
                </div>
            </div>
            <div className={'second-block'}>
                <SearchForm/>
                <div className={'img-box bg-Block'}>
                    <img className={'bg'} src={bgLogo} alt={'logo-bg'} />
                </div>
            </div>
        </SearchPageBlock>
    )
}
export default SearchPage

const SearchPageBlock = styled.div`
    display: flex;
    flex-direction: column;
    
    
    padding: 70px 0 50px;
    letter-spacing: 0.02em;
    .first-block, .second-block{
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    
    .sub-text{
      font-size: 20px;
      line-height: 24px;
    }
    .text-box{
        width: 62%;
      
      .head{
        width: 80%;
        font-size: 40px;
        line-height: 48px;
      }
      .description{
        margin: 25px 0 50px;
      }
    }
    
  .img-box{
    width: 37%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .document{
      //margin: 0 60px;
      height: 110px;
    }
    .folders{
      margin: 0 45px;
      height: 70px;
    }
  }
  .bg-Block{
      justify-content: right;
      align-items: end;
  }

  @media (max-width: 1226px) {
    padding: 20px 0;
    
    
    .text-box {
      width: auto;

      .head {
        font-size: 28px;
        line-height: 34px;
        width: 100%;
      }
      .description {
        margin: 20px 0;
      }
    }
    
    .img-box{
      display: none;
    }
    .second-block{
      flex-direction: column;
      
      .bg-Block{
        display: flex;
        width: 100%;
        img{
          width: 100%;
          margin: 25px 0 0;
        }
      }  
    }
    
  }
  
`;