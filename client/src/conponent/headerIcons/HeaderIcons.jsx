import React from 'react';
import s from './headerIcons.module.scss'
import {labelTogglePopupAction} from "../main/labelChangePopup/labelChangePopupSliceReducer";
import {useDispatch, useSelector} from "react-redux";
import {expandCardToBigAction, favoriteToggleAction} from "../../reducers/getSliceReducer";
import {putTodos} from "../../actions/todos";
import {isBigCardAction} from "./HeaderIconsSliceReducer";
import {updateTodo} from "../../actions/user";

const HeaderIcons = ({item, isFavorite, quantityLabels, id,isSectionFavorite}) => {

    const dispatch = useDispatch()

    const isBigWindow = useSelector(state => state.isBigCard.isActive)

    const handlerFavorite = (item) => {
        const newTodo = {...item, isFavorite: !item.isFavorite}
        // console.log(newItem)
        const id = item.id
        dispatch(favoriteToggleAction(id))
        // dispatch(putTodos({idItem: item.id, newCard: newItem}))
        dispatch(updateTodo(newTodo))
    }

    function handlerBookmark(item) {

        dispatch(labelTogglePopupAction(item))

        // console.log(id)
    }


    function handlerExpandCard(item) {
        console.log(item)
        dispatch(expandCardToBigAction(item.id))
        dispatch(isBigCardAction(item))
    }

    return (
        <div className={s.headerIcons}>
            {/*{isSectionFavorite}*/}
            {/*{*/}
            {/*    isSectionFavorite!=='isFavorite' &&(*/}
            {/*        !isBigWindow && <span*/}
            {/*            className={s.draggable}*/}
            {/*        >*/}
            {/*        <svg fill="#000000"*/}
            {/*             width="800px" height="800px" viewBox="0 0 52 52"*/}
            {/*             enableBackground="new 0 0 52 52">*/}
            {/*        <path d="M48.8,2H33.3c-1,0-1.3,0.9-0.5,1.7l4.9,4.9l-9,9c-0.5,0.5-0.5,1.3,0,1.9l3.7,3.7c0.5,0.5,1.3,0.5,1.9,0*/}
            {/*            l9.1-9.1l4.9,4.9c0.8,0.8,1.7,0.5,1.7-0.5V3.1C50,2.5,49.4,2,48.8,2z"/>*/}
            {/*        <path d="M3.5,50h15.4c1,0,1.3-1.1,0.5-1.9l-4.9-5l9-9.1c0.5-0.5,0.5-1.4,0-1.9l-3.7-3.7c-0.5-0.5-1.3-0.5-1.9,0l-9,9*/}
            {/*            l-5-4.9C3,31.7,2,32,2,33v15.4C2,49.1,2.8,50,3.5,50z"/>*/}
            {/*        <path d="M50,48.8V33.3c0-1-0.9-1.3-1.7-0.5l-4.9,4.9l-9-9c-0.5-0.5-1.3-0.5-1.9,0l-3.7,3.7c-0.5,0.5-0.5,1.3,0,1.9*/}
            {/*            l9.1,9.1L33,48.3c-0.8,0.8-0.5,1.7,0.5,1.7h15.4C49.5,50,50,49.4,50,48.8z"/>*/}
            {/*        <path d="M2,3.5v15.4c0,1,1.1,1.3,1.9,0.5l5-4.9l9.1,9c0.5,0.5,1.4,0.5,1.9,0l3.7-3.7c0.5-0.5,0.5-1.3,0-1.9l-9-9*/}
            {/*            l4.9-5C20.3,3,20,2,19,2H3.6C2.9,2,2,2.8,2,3.5z"/>*/}
            {/*        </svg>*/}
            {/*    </span>*/}
            {/*    )*/}
            {/*}*/}



            <span className={s.favorites} onClick={() => handlerFavorite(item)}>
                <svg

                            width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path fill={isFavorite ? 'gold' : 'black'}
                                  d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"/>
                        </svg>
                    </span>
            <span className={s.bookmark} onClick={() => handlerBookmark(item)}>
                <svg x="0px" y="0px" viewBox="0 0 48 48"><path fill="#000"
                                                               d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path></svg>
                <span className={s.quantityLabels}>
                    {quantityLabels > 0 ? quantityLabels : null}

                </span>
            </span>
            <span className={s.expand}
                  onClick={() => handlerExpandCard(item)}
            >
                {
                    isBigWindow
                        ? <span>

                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 3.25H6C5.27065 3.25 4.57118 3.53973 4.05546 4.05546C3.53973 4.57118 3.25 5.27065 3.25 6V12C3.25 12.1989 3.32902 12.3897 3.46967 12.5303C3.61032 12.671 3.80109 12.75 4 12.75C4.19891 12.75 4.38968 12.671 4.53033 12.5303C4.67098 12.3897 4.75 12.1989 4.75 12V6C4.75 5.66848 4.8817 5.35054 5.11612 5.11612C5.35054 4.8817 5.66848 4.75 6 4.75H18C18.3315 4.75 18.6495 4.8817 18.8839 5.11612C19.1183 5.35054 19.25 5.66848 19.25 6V18C19.25 18.3315 19.1183 18.6495 18.8839 18.8839C18.6495 19.1183 18.3315 19.25 18 19.25H12C11.8011 19.25 11.6103 19.329 11.4697 19.4697C11.329 19.6103 11.25 19.8011 11.25 20C11.25 20.1989 11.329 20.3897 11.4697 20.5303C11.6103 20.671 11.8011 20.75 12 20.75H18C18.7293 20.75 19.4288 20.4603 19.9445 19.9445C20.4603 19.4288 20.75 18.7293 20.75 18V6C20.75 5.27065 20.4603 4.57118 19.9445 4.05546C19.4288 3.53973 18.7293 3.25 18 3.25Z"
                                fill="#000000"/>
                            <path
                                d="M11.21 13.19C11.3017 13.2291 11.4003 13.2495 11.5 13.25H15.5C15.6989 13.25 15.8897 13.171 16.0303 13.0304C16.171 12.8897 16.25 12.6989 16.25 12.5C16.25 12.3011 16.171 12.1104 16.0303 11.9697C15.8897 11.829 15.6989 11.75 15.5 11.75H13.31L16.53 8.53003C16.6625 8.38785 16.7346 8.19981 16.7312 8.00551C16.7277 7.81121 16.649 7.62582 16.5116 7.48841C16.3742 7.35099 16.1888 7.27228 15.9945 7.26885C15.8002 7.26543 15.6122 7.33755 15.47 7.47003L12.25 10.69V8.50003C12.25 8.30112 12.171 8.11035 12.0303 7.9697C11.8897 7.82905 11.6989 7.75003 11.5 7.75003C11.3011 7.75003 11.1103 7.82905 10.9697 7.9697C10.829 8.11035 10.75 8.30112 10.75 8.50003V12.5C10.7505 12.5997 10.7709 12.6983 10.81 12.79C10.8457 12.8806 10.8996 12.9628 10.9684 13.0316C11.0373 13.1004 11.1195 13.1543 11.21 13.19Z"
                                fill="#000000"/>
                            <path
                                d="M8 14.25H5C4.53668 14.2526 4.09309 14.4378 3.76546 14.7655C3.43784 15.0931 3.25263 15.5367 3.25 16V19C3.25263 19.4633 3.43784 19.9069 3.76546 20.2345C4.09309 20.5622 4.53668 20.7474 5 20.75H8C8.46332 20.7474 8.90691 20.5622 9.23454 20.2345C9.56216 19.9069 9.74738 19.4633 9.75 19V16C9.74738 15.5367 9.56216 15.0931 9.23454 14.7655C8.90691 14.4378 8.46332 14.2526 8 14.25ZM8.25 19C8.25 19.0663 8.22366 19.1299 8.17678 19.1768C8.12989 19.2237 8.0663 19.25 8 19.25H5C4.9337 19.25 4.87011 19.2237 4.82322 19.1768C4.77634 19.1299 4.75 19.0663 4.75 19V16C4.75 15.9337 4.77634 15.8701 4.82322 15.8232C4.87011 15.7763 4.9337 15.75 5 15.75H8C8.0663 15.75 8.12989 15.7763 8.17678 15.8232C8.22366 15.8701 8.25 15.9337 8.25 16V19Z"
                                fill="#000000"/>
                            </svg>
                        </span>
                        : <span>
                              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M18 20.75H12C11.8011 20.75 11.6103 20.671 11.4697 20.5303C11.329 20.3897 11.25 20.1989 11.25 20C11.25 19.8011 11.329 19.6103 11.4697 19.4697C11.6103 19.329 11.8011 19.25 12 19.25H18C18.3315 19.25 18.6495 19.1183 18.8839 18.8839C19.1183 18.6495 19.25 18.3315 19.25 18V6C19.25 5.66848 19.1183 5.35054 18.8839 5.11612C18.6495 4.8817 18.3315 4.75 18 4.75H6C5.66848 4.75 5.35054 4.8817 5.11612 5.11612C4.8817 5.35054 4.75 5.66848 4.75 6V12C4.75 12.1989 4.67098 12.3897 4.53033 12.5303C4.38968 12.671 4.19891 12.75 4 12.75C3.80109 12.75 3.61032 12.671 3.46967 12.5303C3.32902 12.3897 3.25 12.1989 3.25 12V6C3.25 5.27065 3.53973 4.57118 4.05546 4.05546C4.57118 3.53973 5.27065 3.25 6 3.25H18C18.7293 3.25 19.4288 3.53973 19.9445 4.05546C20.4603 4.57118 20.75 5.27065 20.75 6V18C20.75 18.7293 20.4603 19.4288 19.9445 19.9445C19.4288 20.4603 18.7293 20.75 18 20.75Z"
                                    fill="#000000"/>
                                <path
                                    d="M16 12.75C15.8019 12.7474 15.6126 12.6676 15.4725 12.5275C15.3324 12.3874 15.2526 12.1981 15.25 12V8.75H12C11.8011 8.75 11.6103 8.67098 11.4697 8.53033C11.329 8.38968 11.25 8.19891 11.25 8C11.25 7.80109 11.329 7.61032 11.4697 7.46967C11.6103 7.32902 11.8011 7.25 12 7.25H16C16.1981 7.25259 16.3874 7.33244 16.5275 7.47253C16.6676 7.61263 16.7474 7.80189 16.75 8V12C16.7474 12.1981 16.6676 12.3874 16.5275 12.5275C16.3874 12.6676 16.1981 12.7474 16 12.75Z"
                                    fill="#000000"/>
                                <path
                                    d="M11.5 13.25C11.3071 13.2352 11.1276 13.1455 11 13C10.877 12.8625 10.809 12.6845 10.809 12.5C10.809 12.3155 10.877 12.1375 11 12L15.5 7.5C15.6422 7.36752 15.8302 7.29539 16.0245 7.29882C16.2188 7.30225 16.4042 7.38096 16.5416 7.51838C16.679 7.65579 16.7578 7.84117 16.7612 8.03548C16.7646 8.22978 16.6925 8.41782 16.56 8.56L12 13C11.8724 13.1455 11.6929 13.2352 11.5 13.25Z"
                                    fill="#000000"/>
                                <path
                                    d="M8 20.75H5C4.53668 20.7474 4.09309 20.5622 3.76546 20.2345C3.43784 19.9069 3.25263 19.4633 3.25 19V16C3.25263 15.5367 3.43784 15.0931 3.76546 14.7655C4.09309 14.4378 4.53668 14.2526 5 14.25H8C8.46332 14.2526 8.90691 14.4378 9.23454 14.7655C9.56216 15.0931 9.74738 15.5367 9.75 16V19C9.74738 19.4633 9.56216 19.9069 9.23454 20.2345C8.90691 20.5622 8.46332 20.7474 8 20.75ZM5 15.75C4.9337 15.75 4.87011 15.7763 4.82322 15.8232C4.77634 15.8701 4.75 15.9337 4.75 16V19C4.75 19.0663 4.77634 19.1299 4.82322 19.1768C4.87011 19.2237 4.9337 19.25 5 19.25H8C8.0663 19.25 8.12989 19.2237 8.17678 19.1768C8.22366 19.1299 8.25 19.0663 8.25 19V16C8.25 15.9337 8.22366 15.8701 8.17678 15.8232C8.12989 15.7763 8.0663 15.75 8 15.75H5Z"
                                    fill="#000000"/>
                            </svg>
                        </span>

                }

            </span>
        </div>
    );
};

export default HeaderIcons;
