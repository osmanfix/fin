import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Spiner } from "../../../components/spiner/spiner";
import { docFetch } from "../../../components/fetchrequest/fetch";

const ResultCards = () => {
    const state = useSelector((state) => state);
    const [isLoad, setIsLoad] = useState(false)
    const [count, setCount] = useState(1)

    async function getMore(){
      setIsLoad(true)
      const array =  (state.resultIDs.items.map(e => e.encodedId))
      const maxCount = Math.ceil(array.length / 10) 
      
      if ( count < maxCount ){
        await docFetch(array.slice(count*10, (count*10)+10))
        setCount(count + 1)
        setIsLoad(false)
      }
    }
  
    function sanitize(text){
      const nodes = (new DOMParser()).parseFromString( text , "text/xml").documentElement.querySelectorAll("sentence");
      if(nodes[0].textContent.startsWith('(')) nodes[0].textContent = '' ;
      if(nodes[0].textContent.startsWith('/')) nodes[0].textContent = '' ;
      
      let resultText = '';
      for(let i = 0; i < nodes.length; i++){
        resultText += nodes[i].textContent.replace(/(\<(\/?[^>]+)>)/g, '').replace(/\&gt;/g, '').replace(/\&lt;/g, '');
      }
      
      return resultText.length > 1000 ? resultText.substring(0, 1000) + '...' : resultText;
    }

    function imgSearch(markup){

      const haveImg = markup.match(/img src=\"(.*?)\"/);
      const result = !haveImg ? null :
        <div className={'card-img'} >
          <div className={'Block'}>
            <img src={haveImg[1]} alt='news image' className="news-img"/>
          </div>
        </div> 
      return result 
    }

    return(
        <CardsBlock>
            <p className={'ferry-text head'}>Список документов</p>
            <div className={'cards'}>
                {   
                  state.resultDocs ?
                    state.resultDocs.map(elem =>
                        <div className={'card'} key={elem.ok.id}>
                            <div className={'card-head'}>
                                <div className={'date'}>
                                  {new Date(elem.ok.issueDate).toLocaleDateString('en-GB').replaceAll('/', '.')}
                                </div>
                                <div className={'source'}>
                                  {elem.ok.source.name}
                                </div>
                            </div>
                            <div className={'card-name'}>
                              <a href={elem.ok.url} target="_blank" rel="noopener noreferrer">
                                {elem.ok.title.text}
                              </a>
                            </div>

                            <div className={classNames({'no-type': !elem.ok.attributes.isTechNews && !elem.ok.attributes.isAnnouncement && !elem.ok.attributes.isDigest}, 'card-type')} >
                              {
                                elem.ok.attributes.isTechNews ? 'Техническая новость': 
                                  elem.ok.attributes.isAnnouncement ? 'Анонс' : 
                                    elem.ok.attributes.isDigest ? 'Дайджест' : 
                                      null
                              }
                            </div>
                            {   
                              imgSearch(elem.ok.content.markup) 
                            }
                            <div className={'card-text'}>
                                { sanitize(elem.ok.content.markup) }
                            </div>
                            <div className={'card-footer'}>
                                <div className={'btn'}>
                                    <a href={elem.ok.url !== '' ? elem.ok.url : 404} target="_blank" className="full-text">
                                      Читать в источнике
                                    </a>  
                                </div>
                                <div className={'length'}>
                                    {elem.ok.attributes.wordCount > 1000 && Math.floor(elem.ok.attributes.wordCount/1000) } 
                                    {elem.ok.attributes.wordCount > 1000 ? String(elem.ok.attributes.wordCount % 1000).padStart(3, '0') : (elem.ok.attributes.wordCount % 1000)}
                                    {
                                      elem.ok.attributes.wordCount % 10 === 1 ? ' слово' :
                                      elem.ok.attributes.wordCount % 10 > 1 && elem.ok.attributes.wordCount % 10 < 5 ? ' слова' : ' слов'
                                    }
                                </div>
                            </div>
                        </div>
                    )
                  : <div className="card-loading">
                      <Spiner size={50}/>  
                    </div>
                }
            </div>
            {
              state.resultDocs && (state.resultDocs.length < state.resultIDs.items.length) &&
              <div className={'show-more'}>
                    <div className={'btn'}>
                      <Button name={'Показать больше'} size={22} height={27} onClick={() => !isLoad && getMore()} />
                    </div>
              </div>
            }
        </CardsBlock>
    )
}

export default ResultCards

const CardsBlock = styled.div`
    .head{
      margin: 0 0 55px;
      font-size: 30px;
      line-height: 36px;
    }
  .cards{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
    .card-loading{
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  .card{
    width: calc(100% / 2 - 60px - 18px );
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px 30px 35px;
    margin-bottom: 36px;
    
    position: relative;

    .card-head{
      display: flex;
      font-size: 16px;
      line-height: 19px;
      color: #949494;
      .source{
        margin-left: 15px;
        text-decoration: underline;
      }
    }
    
    .card-name{
      margin: 25px 0 15px;
      font-size: 26px;
      line-height: 31px;
      letter-spacing: 0.02em;
      width: 90%;
      
      a{
        text-decoration: none;
        color: #000;
      }
    }
    .card-type{
      padding: 4px 12px 3px;
      background-color: #FFB64F;
      border-radius: 5px;
      width: fit-content;
      height: 22px;
    }
    .no-type{
      background-color: #fff;
    }
    .card-img{
      height: 160px;
      border-radius: 10px;
      overflow: hidden;
      margin: 15px 0 20px;

      display: flex;
      justify-content: center;
      align-items: center;
      
      .Block{
        height: 100%;
        width: 100%;
        display: flex;
        .news-img {
          width: 100%;
          align-self: center;
        }
      }  
    }
      
  }
  .card-text{
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.02em;
    margin-bottom: 75px;
  }
  .card-footer{
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 35px;
    width: calc(100% - 60px);
    .btn{
      height: 46px;
      width: 220px;
      background-color: #7CE3E1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      .full-text{
        text-decoration: none;
        color: #000;
        font-size: 16px;
        line-height: 19px;
      }
    }
    
    .length{
      color: #949494;
      display: flex;
      align-items: end;
    }
  }

  .show-more{
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    .btn{
      width: 305px;
      height: 60px;
    }
  }


  @media (max-width: 1226px) {
    .head{
      margin-bottom: 35px;
    }
    .cards{
      justify-content: unset;
      flex-direction: column;
      
      .card{
        width: 100%;
        box-sizing: border-box;
        padding: 20px 14px 20px 24px;
        margin-bottom: 20px;
        
        .date, .source{
          font-size: 14px;
          line-height: 17px;
        }
        .card-name{
          font-size: 19px;
          line-height: 23px;
        }
        .card-type{
          height: 20px;
        }
        .card-text{
          font-size: 12px;
          line-height: 14px;
        }
        .card-footer{
          width: calc(100% - 38px);
          font-size: 14px;
          line-height: 17px;
        }
        .btn{
          height: 40px;
          width: 190px;
          .full-text{
            font-size: 14px;
            line-height: 16px;
          }
        }
      }
    }

    .show-more{
      margin: 15px 0 50px;
    }
  }
`;