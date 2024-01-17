import React, {useState} from 'react';
import s from './AllCard.module.scss'

import {useDispatch} from "react-redux";
import {favoriteToggleAction} from "../../../../reducers/getSliceReducer";
import {labelTogglePopupAction} from "../../labelChangePopup/labelChangePopupSliceReducer";
import Palette from "../../../palitra/Palette";
import RemoveCard from "../../../removeCard/RemoveCard";
import {putTodos} from "../../../../actions/todos";
import List from "../../newCard/list/List";
import HeaderIcons from "../../../headerIcons/HeaderIcons";


const AllCard = ({item}) => {

    const dispatch = useDispatch()

    const [itemTextarea, setItemTextarea] = useState(item.textareaCheckBox)

    const [isActiveBig, setIsActiveBig] = useState(true)

    // const quantityLabels = item.label.length - 1






    return (

        <div className={!isActiveBig ? `${s.wrapperCard}` : `${s.wrapperCard} ${s.wrapperCardBig}`}
             key={item.id}
             style={{backgroundColor: item.color}}
             draggable
        >
            <div className={s.header}>
                <div className={s.headerTitle}>
                    <input type="text" value={item.title} readOnly={true}/>

                </div>
                <HeaderIcons
                    item={item}
                    isFavorite={item.isFavorite}

                />
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
                    ? <textarea rows={5}
                                value={itemTextarea}
                                onChange={(e)=>setItemTextarea(e.target.value)}
                        >

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