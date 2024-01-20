import React from 'react';
import s from './sectionFavorite.module.scss'
import AllCard from "../sectionAllCard/card/AllCard";
import {useSelector} from "react-redux";
const SectionFavorite = ({isFavorite}) => {

    const toggleTiles=useSelector(state => state.tilesSlice.toggleTiles)

    // console.log(toggleTiles)
    return (
        <section className={s.favorite }>
            <div className={toggleTiles==="tiles" ? "wrapperTiles" : "wrapperList"}>
                {isFavorite.map(item=>(
                    <AllCard key={item.id+"isFavorite"} item={item}/>
                ))}
            </div>


        </section>
    );
};

export default SectionFavorite;