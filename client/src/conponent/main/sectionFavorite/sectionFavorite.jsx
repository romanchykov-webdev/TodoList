import React from 'react';
// import s from './sectionFavorite.scss'
import './sectionFavorite.scss'
import AllCard from "../sectionAllCard/card/AllCard";
import {useSelector} from "react-redux";
const SectionFavorite = ({isFavorite}) => {

    const toggleTiles=useSelector(state => state.tilesSlice.toggleTiles)
const isSectionFavorite='isFavorite'
    // console.log(toggleTiles)
    return (
        <section className={'favorite' }>
            <div className={toggleTiles==="tiles" ? "wrapperTiles" : "wrapperList"}>
                {isFavorite.map(item=>(
                    <AllCard
                        key={item.id+"isFavorite"}
                             item={item}
                        isSectionFavorite={isSectionFavorite}
                    />
                ))}
            </div>


        </section>
    );
};

export default SectionFavorite;