import React, {useState} from 'react';
import s from './AllCard.module.scss'

import {useDispatch} from "react-redux";
import {favoriteToggleAction} from "../../../../reducers/getSliceReducer";
import {labelTogglePopupAction} from "../../labelChangePopup/labelChangePopupSliceReducer";
import Palette from "../../../palitra/Palette";
import RemoveCard from "../../../removeCard/RemoveCard";
import {putTodos} from "../../../../actions/todos";
import List from "../../newCard/list/List";


const AllCard = ({item}) => {

    const dispatch = useDispatch()

    const [mainTextarea, setMainTextarea] = useState('')

    const [isActiveBig, setIsActiveBig] = useState(true)

    // const quantityLabels = item.label.length - 1


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

        <div className={!isActiveBig ? `${s.wrapperCard}` : `${s.wrapperCard} ${s.wrapperCardBig}`}
             key={item.id}
             style={{backgroundColor: item.color}}
        >
            <div className={s.header}>
                <div className={s.headerTitle}>
                    <input type="text" value={item.title} readOnly={true}/>

                </div>
                <div className={s.headerIcons}>
                    <span className={s.favorites} onClick={() => handlerFavorite(item)}>
                        <svg

                            width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path fill={item.isFavorite ? 'gold' : 'black'}
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
            </div>
            <div className={s.blockHidden}>
                <div>color: {item.color}</div>
                <div>id: {item.id}</div>
                <div>isFavorite: {item.isFavorite ? 'true' : 'false'}</div>
                <div>dateCreate: {item.dateCreate}</div>
                <div>panelChangeBGColor: {item.panelChangeBGColor ? 'true' : 'false'}</div>
            </div>

            <article className={s.blockArticle}>
                {
                    item.textareaCheckBox.length > 0
                    ? <textarea rows={5}>
                        {item.textareaCheckBox}
                    </textarea>
                        : <List itemTodo={item}/>
                        // (item.labelCheckBox.map(i => (<p>{i.title}</p>)))
                }


            </article>


            <div className={s.footerCard}>

                <div className={s.blockLabel}>
                    <div className={s.blockIcons}>
                        <Palette id={item.id} color={item.color} item={item}/>
                        <RemoveCard id={item.id}/>
                    </div>
                    {
                        item.label.map((item, index) => (
                            item !== 'all'
                                ? <span className={s.labelCard} key={item + index}>{item}</span>
                                : null
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default AllCard;