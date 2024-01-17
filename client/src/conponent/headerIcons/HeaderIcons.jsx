import React from 'react';
import s from './headerIcons.module.scss'
import {labelTogglePopupAction} from "../main/labelChangePopup/labelChangePopupSliceReducer";
import {useDispatch} from "react-redux";
import {favoriteToggleAction} from "../../reducers/getSliceReducer";
import {putTodos} from "../../actions/todos";
const HeaderIcons = ({item,isFavorite,id}) => {

    const dispatch=useDispatch()


    const handlerFavorite = (item) => {
        const newItem = {...item, isFavorite: !item.isFavorite}
        console.log(newItem)
        const id = item.id
        dispatch(favoriteToggleAction(id))
        dispatch(putTodos({idItem: item.id, newCard: newItem}))
    }

    function handlerBookmark(item) {

        dispatch(labelTogglePopupAction(item))

        // console.log(id)
    }


    return (
        <div className={s.headerIcons}>
                    <span className={s.favorites} onClick={() => handlerFavorite(item)}>
                        <svg

                            width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path fill={isFavorite ? 'gold' : 'black'}
                                  d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"/>
                        </svg>
                    </span>
            <span className={s.bookmark} onClick={() => handlerBookmark(item)}>
                        <svg x="0px" y="0px" viewBox="0 0 48 48"><path fill="#f4efef"
                                                                       d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path></svg>
                        <span className={s.quantityLabels}>
                            {/*{quantityLabels > 0 ? quantityLabels : null}*/}
                        </span>
                    </span>
        </div>
    );
};

export default HeaderIcons;