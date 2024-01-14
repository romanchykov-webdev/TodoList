import React, {useState} from 'react';
import s from './AllCard.module.scss'
import textarea from "../../newCard/textarea/Textarea";
import Textarea from "../../newCard/textarea/Textarea";
import List from "../../newCard/list/List";


const AllCard = ({item}) => {

    const [mainTextarea, setMainTextarea] = useState('')

    const [isActiveBig, setIsActiveBig] = useState(true)

    const quantityLabels = item.label.length - 1


    return (

        <div className={!isActiveBig ? `${s.wrapperCard}` : `${s.wrapperCard} ${s.wrapperCardBig}`}

             style={{backgroundColor: item.color}}
        >
            <div className={s.header}>
                <div className={s.headerTitle}>
                    <input type="text" value={item.title}/>
                </div>
                <div className={s.headerIcons}>
                <span className={s.favorites}>
                    <svg

                        width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path fill={item.isFavorite ? 'gold' : 'black'}
                              d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"/>
                    </svg>
                </span>
                    <span className={s.bookmark}>
                    <svg x="0px" y="0px" viewBox="0 0 48 48"><path fill="#f4efef"
                                                                   d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path></svg>
                    <span className={s.quantityLabels}>
                        {quantityLabels > 0 ? quantityLabels : null}
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

            {
                item.textareaCheckBox.length>0
                ? <Textarea
                setMainTextarea={setMainTextarea} mainTextarea={mainTextarea}
                />
                   : <List item={item.labelCheckBox}/>
            }

            {/*<div>textareaBox: {item.textareaCheckBox.length}</div>*/}

            {/*<div className={s.blockHidden}>labelCheckBox:*/}
            {/*    {item.labelCheckBox.length > 0 &&*/}

            {/*        <ul>*/}
            {/*            {item.labelCheckBox.map(i => (*/}
            {/*                <li key={i.id}>{i.title}</li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}


            {/*    }*/}
            {/*</div>*/}


            <br/>

            <div className={s.footerCard}>
                <div className={s.blockLabel}>
                    {
                        item.label.map(item=>(
                            item!=='all'
                                ? <span className={s.labelCard}>{item}</span>
                                : null
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default AllCard;