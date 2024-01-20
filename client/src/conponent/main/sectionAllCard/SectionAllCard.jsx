import React from 'react';
import s from './sectionAllCard.module.scss'

import { useSelector} from "react-redux";
import AllCard from "./card/AllCard";



const SectionAllCard = ({todos}) => {



    // ?get all card





    // ?get all card
    const toggleTiles=useSelector(state => state.tilesSlice.toggleTiles)


    return (
        <section className={s.allCard} key={'sectionAllCard'}>
            <div className={toggleTiles==="tiles" ? "wrapperTiles" : "wrapperList"} key={toggleTiles}>
                {/*<PopupBigCard key={item.id} item={item}/>*/}
                    {
                        todos.map(item=>(


                                <AllCard key={item.id}  item={item}/>

                        ))
                    }

            </div>

        </section>
    );
};

export default SectionAllCard;