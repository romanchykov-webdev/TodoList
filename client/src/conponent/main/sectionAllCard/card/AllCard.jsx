import React, {useEffect, useState} from 'react';
import s from './AllCard.module.scss'

import {useDispatch} from "react-redux";
import Palette from "../../../palitra/Palette";
import RemoveCard from "../../../removeCard/RemoveCard";
import {putTodos} from "../../../../actions/todos";
import List from "../../newCard/list/List";
import HeaderIcons from "../../../headerIcons/HeaderIcons";


const AllCard = ({item}) => {


    const dispatch = useDispatch()

    const [itemTextarea, setItemTextarea] = useState(item.textareaCheckBox)

    const isActiveBig=item.expandSizeCard
    const [is,stIs]=useState()
    useEffect(() => {
        stIs(isActiveBig)
    }, [isActiveBig]);

    const quantityLabels = item.label.length - 1

const [writeTimeout,setWriteTimeout]=useState(false)
    function handlerChangeTextTextarea(e) {
        setItemTextarea(e.target.value)
        const newCard={
            ...item,
            textareaCheckBox:e.target.value
        }
        // console.log(newCard)

        if(writeTimeout!==false){
            clearTimeout(writeTimeout)
        }
        setWriteTimeout(
            setTimeout((value)=>{
                dispatch(putTodos({idItem: item.id, newCard: newCard}))
                console.log("putTodos textarea")
        },1000,e.target.value)
        )
    }


    // change name card
const [nameCard,setNameCard]=useState(item.title)
    function handlerChangeName(e) {
        setNameCard(e.target.value)
        const newCard={
            ...item,
            title: e.target.value
        }

        if(writeTimeout!==false){
            clearTimeout(writeTimeout)
        }

        setWriteTimeout(
            setTimeout((value)=>{

                dispatch(putTodos({idItem: item.id, newCard: newCard}))
                console.log("setWriteTimeout changeName card")
                console.log(newCard)
            },1000, e.target.value)
        )

    }

    // change name card

    return (
        <div
            className={s.wrapperCard +" "+ "wrapperCardBig"}
            // className={!isActiveBig ? `${s.wrapperCard}` : `${s.wrapperCard} ${s.wrapperCardBig}`}
            //  key={!isActiveBig ? `${item.id}` : `${item.id+'isActiveBig'}`}
            key={item.id+23}
            style={{ backgroundColor: item.color, ...(is && { opacity: 0 }) }}

            draggable
        >

            <div className={s.header}>
                <div className={s.headerTitle}>
                    <input type="text"
                           value={nameCard}
                           onChange={(e)=>handlerChangeName(e)}
                    />

                </div>
                <HeaderIcons
                    item={item}
                    isFavorite={item.isFavorite}
                    quantityLabels={quantityLabels}
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
                                    onChange={(e)=>handlerChangeTextTextarea(e)}
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