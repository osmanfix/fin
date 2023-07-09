import React from "react";
import {Controller, useForm} from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";
import Button from "../../../components/Button";
import checkboxLogo from "./img/check.svg"
import correctness from "../correctness";
import cn from "classnames";
import dropdownIcon from "./img/drop.svg"
import {useNavigate} from "react-router-dom";
import store from "../../../store/store";
import {setResultHistogram, setResultID, setSearchData, resetResult} from "../../../store/types";
import { docFetch } from "../../../components/fetchrequest/fetch";
import { searchOptions } from "../searchOptions";




const SearchSettings = () => {
    const date = new Date;
    const options = [
        {value: 'any', label: 'Любая'},
        {value: 'positive', label: 'Позитивная'},
        {value: 'negative', label: 'Негативная'},
    ];

    const checkboxes = [
        {
            label: 'Признак максимальной полноты',
            name: 'maxFullness',
            disabled: false
        },{
            label: 'Упоминания в бизнес-контексте',
            name: 'inBusinessNews',
            disabled: false
        },{
            label: 'Главная роль в публикации',
            name: 'onlyMainRole',
            disabled: false
        },{
            label: 'Публикации только с риск-факторами',
            name: 'onlyWithRiskFactors',
            disabled: true
        },{
            label: 'Включать технические новости рынков',
            name: 'excludeTechNews',
            disabled: true
        },{
            label: 'Включать анонсы и календари',
            name: 'excludeAnnouncements',
            disabled: false
        },{
            label: 'Включать сводки новостей',
            name: 'excludeDigests',
            disabled: true
        },
    ]

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
        control,
        watch
    } = useForm({
          mode: 'all',
          reValidateMode: 'onChange',
          defaultValues:{
              select: options[0].value,
              [checkboxes[0].name]: true,
              [checkboxes[1].name]: true,
              [checkboxes[2].name]: true,
              [checkboxes[3].name]: false,
              [checkboxes[4].name]: false,
              [checkboxes[5].name]: true,
              [checkboxes[6].name]: false,
          }
    })
    const navigate = useNavigate()
    const handleNavigate = (address) => navigate(`/${address}`);

    const searching = () => {
        fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', searchOptions())
          .then(response => response.json())
          .then(res => {
            if (res.data[0]){                                                   
              res.data[0].data.sort((a ,b) => a.date > b.date ? 1 : -1);  
              store.dispatch(setResultHistogram(res.data))
              handleNavigate('result')
            }
          })
        
        fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', searchOptions())
          .then(res => res.json())
          .then(data => {
            if (data.items[0]){ 
              store.dispatch(setResultID(data));
              let array = [];
              data.items.map(e => array.push(e.encodedId));
              docFetch(array.slice(0, 10))
            } else {
              alert('К сожалению статей по данному запросу нет.')
            }
        })
    }

    const onSubmit = (data) => {
      store.dispatch(resetResult())
      store.dispatch(setSearchData(data))
      reset();
      searching()
    }

    return(
        <SearchSettingsBlock onSubmit={handleSubmit(onSubmit)}>
            <div className={'main-settings'}>
                <label className={'input-block'}>
                    <p>ИНН компании<span className={cn({'isErr': errors?.inn}, 'required')}>*</span></p>
                    <input className={cn( 'input', {'isErrBlock': errors?.inn})}
                           placeholder={'10 цифр'}
                           {...register('inn', {
                               validate: (input) => correctness(input).result || correctness(input).error,
                               valueAsNumber: true
                           })}
                    />
                    <div style={{height: 27}}>
                        {errors?.inn && <p className={'error-place'}>{errors?.inn?.message}</p>}
                    </div>
                </label>
                
                <label className={'input-block'}>
                    <p>Тональность</p>
                    <Controller
                        name='tonality'
                        control={control}
                        render={ ({field: {onChange, value}, fieldState: {error }}) => (
                            <Select
                                classNamePrefix={'select'}
                                options={options}
                                placeholder={options[0].label}
                                value={options.find(c => c.value === value)}
                                onChange={val => onChange(val.value)}
                            />
                        )}
                    />

                </label>

                <label className={'input-block'}>
                    <p>Количество документов в выдаче<span className={cn({'isErr': errors?.amount}, 'required')}>*</span></p>
                    <input className={cn( 'input', {'isErrBlock': errors?.amount})}
                           placeholder={'От 1 до 1000'}
                           type={'number'}
                           {...register('limit', {
                                required: 'Обяза тельное поле',
                                min: {
                                    value: 1,
                                    message: 'Минимальное число: 1',
                                },
                                max: {
                                    value: 1000,
                                    message: 'Максимальное число: 1000',
                                },
                               valueAsNumber: true,
                            })}
                    />
                    <div className={'error-text'}>
                        {errors?.amount && <p className={'error-place'}>{errors?.amount?.message}</p>}
                    </div>
                </label>

                <div className={'input-block twice'}>
                    <p>Диапазон поиска<span className={cn({'isErr': errors?.start || errors?.end}, 'required')}>*</span></p>
                    <div className={'dates-block'}>
                        <input className={cn( 'input dates', {'isErrBlock': errors?.start})}
                               placeholder={'Дата начала'}
                                type="date"
                               {...register('startDate', {
                                   required: 'Обяза тельное поле',
                                   valueAsDate: true,

                                   max: {
                                       value: watch("endDate"),
                                       message: 'Введите корректные данные'
                                   }
                                })}
                        />
                        <input className={cn( 'input dates', {'isErrBlock': errors?.end})}
                               placeholder={'Дата конца'}
                               type='date'
                               
                               {...register('endDate', {
                                   required: 'Обяза тельное поле',
                                   valueAsDate: true,
                                   max: {
                                       value: date,
                                       message: 'Введите корректные данные'
                                   }
                               })}
                        />
                    </div>

                    <div className={'error-text'}>
                        {(errors?.start || errors?.end) && <p className={'error-place'}>{errors?.start?.message || errors?.end?.message}</p>}
                    </div>
                </div>

            </div>
            <div className={'other-settings'}>
                <div className={'checkboxes'}>
                    {
                        checkboxes.map(elem =>
                            <div className={'checkbox-block'} key={elem.name}>
                                <input className={'checkbox-input'}

                                       type={"checkbox"}
                                       disabled={elem.disabled}

                                       {...register(`${elem.name}`)}
                                />
                                <label htmlFor={elem.id}>{elem.label}</label>
                            </div>
                        )
                    }
                </div>
                <div className={'btn-block'}>
                    <div className={'btn-Block'}>
                        <div className={'btn'} >
                            <Button size={22} height={27} name={'Поиск'} type={'submit'} bg={isValid ? null: '#A4B0FF'}/>
                        </div>
                        <p className={'error-place align-left'}>* Обязательные к заполнению поля</p>
                    </div>
                </div>
            </div>
        </SearchSettingsBlock>
    )
}
export default SearchSettings

const SearchSettingsBlock = styled.form`
    display: flex;
    justify-content: space-between;
    height: 460px;
    width: 57%;
  
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 30px 40px;
    
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.03em;
    .required{  
        font-size: 25px;
        line-height: 30px;
    }
      .isErr{
        color: #FF5959;
      }
  
  .error-text{
    height: 27px;
    color: #FF5959;
  }
    .input-block{
      display: flex;
      flex-direction: column;
      width: 65%;
      white-space: nowrap;
      &:first-line{
        white-space: normal;
      }
      p{
        margin: 0 0 10px;
      }
      .select{
        &__control{
          
          font-size: 14px;
          line-height: 17px;
          height: 43px;
          padding-top: 5px;
          text-align: center;
          cursor: pointer;
        }
        &__placeholder, &__single-value{
          margin-left: 36px;
        }
        &__control--is-focused{
          border-color: #029491;
          box-shadow: 0 0 0 1px  #029491;
        }
        &__indicator-separator{
          display: none;
        }
        &__menu{
          font-size: 14px;
          line-height: 17px;
          text-align: center;
        }
        &__option{
          cursor: pointer;
          &--is-focused{
            background-color: #E3E3E3;
          }
          &--is-selected{
            background-color: #029491;
          }
        }
      }

      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="date"] {
        position: relative;
      }

      input[type="date"]::-webkit-calendar-picker-indicator {
        position: relative;
        padding-top: 10px;
        z-index: 10;
        cursor: pointer;
        background-image: url(${dropdownIcon});
      }
    }
  .twice{
    width: 100%;
  }
  .dates-block{
    display: flex;
    justify-content: space-between;
  }
  .dates{
    width: 40%;
    
  }
    .input{
    //.inn{
      font-family: Inter, sans-serif;
      letter-spacing: 0.03em;
      
      border: 1px solid #C7C7C7;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
      background-color: #fff;
      border-radius: 5px;
      height: 43px;
      padding: 0 10px;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      &:focus{
        outline: none;
        border-color: #029491;
        box-shadow: 0 0 3px #029491;
      }
    }
  .isErrBlock{
    border-color: #FF5959;
    color: #FF5959;
  }
  .error-place{
    display: block;
    color: #FF5959  ;
    height: 27px;
    padding-top: 3px;
    line-height: 17px;
    font-size: 14px;
    align-items: start;
    text-align: center;
    margin: 0;
  }
    .main-settings{
      width: 370px;
    }
  .other-settings{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .checkboxes{
      display: flex;
      flex-direction: column;
      .checkbox-block{
        margin-bottom: 10px;
        
        .checkbox-input{
          scale: 1.5;
          position: absolute;
          z-index: 0;
          opacity: 0;
        }
        .checkbox-input+label {
          display: inline-flex;
          align-items: center;
          user-select: none;
        }
        .checkbox-input+label:before {
          content: '';
          display: inline-block;
          width: 1em;
          height: 1em;
          flex-shrink: 0;
          flex-grow: 0;
          border: 1px solid #000;
          margin-right: 0.5em;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 80% 80%;
        }
        .checkbox-input:checked+label:before {
          background-image: url(${checkboxLogo});
        }
        .checkbox-input:disabled+label:before, .checkbox-input:disabled+label {
          opacity: 0.4;
        }
      }
    }
    .btn-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .btn {
        width: 300px;  
        height: 60px;
      }
      .align-left{
        text-align: left;
        color: #949494;
      ;
      }
    }
  }

  @media (max-width: 1226px) {
    
    flex-direction: column;
    width: 100%;
    padding: 24px 26px 37px 14px;
    margin: 0px -26px 0px -14px;
    height: auto;
    
    .main-settings{
      width: 100%;
      .input-block{
        width: 100%;
        .input{
          width: 100%;
          box-sizing: border-box;
        }
        .dates-block{
          flex-direction: column;
          
          .dates{
            margin-bottom: 15px;
          }  
        }
      }
    }
    
    .other-settings{
      .checkboxes{
        display: none;
      }
      
      .btn-Block{
        width: 100%;
        .btn{
          width: 100%;
        }
      }
    }
    
  }
  
`;