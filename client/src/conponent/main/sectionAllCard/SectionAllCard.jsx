import React, {useEffect, useState} from 'react';
import s from './sectionAllCard.module.scss'
import axios from "axios";
import NewCard from "../newCard/NewCard";
import AllCard from "./card/AllCard";
import {getTodos} from "../../../actions/todos";
import {useDispatch, useSelector} from "react-redux";


const SectionAllCard = ({todos}) => {
const dispatch=useDispatch()


    // ?get all card





    // ?get all card
    const toggleTiles=useSelector(state => state.tilesSlice.toggleTiles)


    return (
        <section className={s.allCard}>
            <div className={toggleTiles==="tiles" ? "wrapperTiles" : "wrapperList"}>
                {
                    todos.map(item=>(
                        <AllCard key={item.id} item={item}/>
                    ))
                }
            </div>

        </section>
    );
};

export default SectionAllCard;