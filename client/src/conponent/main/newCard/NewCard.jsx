import React, {useState} from 'react';
import s from './NewCard.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {listAction, newCardHiddenAction, newCardShowAction, textareaAction} from "./newCardSliceReducer";
import Textarea from "./textarea/Textarea";


const NewCard = () => {
    const dispatch=useDispatch()
    const isActive=useSelector(state => state.newCardSlice.isActive)
    const isTextarea=useSelector(state => state.newCardSlice.isTextarea)
    const isList=useSelector(state => state.newCardSlice.isList)
    //
    const [headerInput,setHeaderInput]=useState('')
    const [mainTextarea,setMainTextarea]=useState('')
    //



    function closeHandler() {
        dispatch(newCardHiddenAction())
        setHeaderInput('')
        setMainTextarea('')
    }

    function createHandles() {
        setHeaderInput('')
        setMainTextarea('')
    }


    function listHandler() {
        // listAction
        dispatch(listAction())
    }

    return (
        <div className={s.wrapperNewCard}>
            <div className={s.wrapper}>
                {
                    isActive && <div className={s.wrapperHeader}>
                        <input type="text"
                               placeholder={"Enter title"}
                               value={headerInput}
                               onChange={(e)=>setHeaderInput(e.target.value)}/>
                        <div className={s.favorites}>
                            <svg width="48" height="48" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path fill="#000"
                                      d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"/>
                            </svg>
                        </div>
                    </div>
                }


                <div className={s.wrapperMain}>
                    {
                        isTextarea &&    <Textarea/>

                    }

                    {
                        isList   ? <span className={s.icon}
                        onClick={()=>listHandler()}>
                        <svg height="48" viewBox="0 0 48 48" width="48"><linearGradient id="a"
                                                                                        gradientUnits="userSpaceOnUse"
                                                                                        x1="2" x2="41.929472" y1="24"
                                                                                        y2="42.483432"><stop offset="0"
                                                                                                             stopColor="#4568dc"/><stop
                            offset=".98695652174" stopColor="#b06ab3"/></linearGradient><path
                            d="m42 24.14c0-1.104.896-2 2-2 1.104 0 2 .896 2 2v14.86c0 3.863-3.137 7-7 7h-30c-3.863 0-7-3.137-7-7v-30c0-3.863 3.137-7 7-7h30c3.863 0 7 3.137 7 7v1.54c0 1.104-.68 2.583-1.519 3.301l-19.132 16.398c-.839.718-2.123.639-2.868-.176l-7.961-8.713c-.745-.817-.687-2.085.13-2.83.817-.745 2.085-.687 2.83.13l6.016 6.591c.372.408 1.014.447 1.433.088l16.312-13.978c.419-.359.759-1.099.759-1.651v-.7c0-1.656-1.344-3-3-3h-28c-2.76 0-5 2.24-5 5v26c0 2.76 2.24 5 5 5h26c2.76 0 5-2.24 5-5z"
                            fill="url(#a)"/></svg>
                </span>
                            : !isTextarea ? <span>list false</span> :null

                    }


                </div>
                {
                    isActive &&   <div className={s.wrapperBottom}>
                    <button
                        onClick={()=>createHandles()}
                    ><span>Create new card</span></button>

                        <button
                            onClick={()=>closeHandler()}
                        ><span>close</span></button>
                    </div>
                }


            </div>

        </div>
    );
};

export default NewCard;