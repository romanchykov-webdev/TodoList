import React, {useState} from 'react';
import s from './ListCompleted.module.scss'
import {useDispatch} from "react-redux";
import {listToggleCompletedAction, removeListTempItemAction} from "../../newCardSliceReducer";


const ListCompleted = ({mockArray,num}) => {
    const dispatch=useDispatch()



    return (
        <div className={s.wrapperListNoCompleted}>
            {num &&
                <div className={s.checkedItems}>
                   {num} checked items
                </div>
            }
            {
                mockArray.map(item => (
                    <div className={s.wrapperItem} key={item.id}>
                        <div className={s.iconDrag}>
                            <svg width="30px" height="30px" viewBox="0 0 25 25" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
                                      fill="#121923"/>
                            </svg>
                        </div>
                        <div className={s.iconCompleted}>
                            {
                                item.completed
                                    ? <span className={s.iCompleted}
                                            onClick={()=>dispatch(listToggleCompletedAction(item.id))}
                                    >
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" >
                                        <g id="Interface / Checkbox_Check">
                                        <path id="Vector" d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        </svg>
                                      </span>
                                    : <span className={s.iNonCompleted}
                                            onClick={()=>dispatch(listToggleCompletedAction(item.id))}
                                    >
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" >
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6 5C5.44772 5 5 5.44772 5 6V13V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V13V6C19 5.44772 18.5523 5 18 5H6ZM3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V13V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V13V6Z" fill="#000000"/>
                                        </svg>
                                      </span>
                            }


                        </div>
                        <input type="text"
                               className={item.completed ? `${s.itemCompleted}` : ''}
                               defaultValue={item.title}
                            // value={changeTitle}
                            // onChange={(e)=>changeHandler(e)}

                        />
                        <button className={s.btnClose}
                            onClick={()=>dispatch(removeListTempItemAction(item.id))}
                        >
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                                    fill="#0F0F0F"/>
                            </svg>
                        </button>
                    </div>
                ))
            }

        </div>

    );
};

export default ListCompleted;