import React, {useEffect, useState} from 'react';
import s from './Main.module.scss'
import Nav from "./nav/Nav";
import NewCard from "./newCard/NewCard";
import SectionAllCard from "./sectionAllCard/SectionAllCard";
import SectionFavorite from "./sectionFavorite/sectionFavorite";
import {getColorsPalette, getTodos} from "../../actions/todos";
import {useDispatch, useSelector} from "react-redux";

const Main = () => {
    const dispatch=useDispatch()

    // get color palette
    useEffect(()=>{
        dispatch(getColorsPalette())
    },[dispatch])
    // get color palette

    // get all todos
    const [todos,setTodos]=useState([])
    useEffect(()=>{
        dispatch(getTodos())
    },[dispatch])
    // get all todos

    const gTodos=useSelector(state => state.getSlice.getTodos)

    useEffect(() => {
        setTodos(gTodos)
    }, [gTodos]);


    const isFavorite =todos.filter(item=>item.isFavorite===true)
    // console.log(isFavorite)




    return (
        <main className={s.main}>
            <div className={"container"}>
                <Nav/>
                <NewCard/>
                <SectionFavorite isFavorite={isFavorite}/>
                <SectionAllCard todos={todos}/>
            </div>
        </main>
    );
};

export default Main;