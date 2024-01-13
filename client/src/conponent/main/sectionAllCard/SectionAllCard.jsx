import React, {useEffect, useState} from 'react';
import s from './sectionAllCard.module.scss'
import axios from "axios";
import NewCard from "../newCard/NewCard";
import AllCard from "./card/AllCard";
import {getTodos} from "../../../actions/toos";
import {useDispatch, useSelector} from "react-redux";


const SectionAllCard = () => {
const dispatch=useDispatch()


    // ?get all card

    // const getData=async ()=>{
    //     try {
    //         const response=await axios.get(
    //             'http://localhost:5000/boards',
    //             {params:{_page:0,_limit: 1000}}
    //         )
    //         console.log(response)
    //         setData(response.data)
    //         const totalCard=response.headers['x-total-count']
    //         console.log("totalCard: "+ totalCard)
    //     }catch (e) {
    //         console.error(e)
    //     }
    // }

    const [todos,setTodos]=useState([])
    useEffect(()=>{
        dispatch(getTodos())
    },[dispatch])

    const gTodos=useSelector(state => state.getSlice.getTodos)

    useEffect(() => {
        setTodos(gTodos)
    }, [gTodos]);

    // ?get all card



    return (
        <section className={s.allCard}>
            {
                todos.map(item=>(
                    <AllCard key={item.id} item={item}/>
                ))
            }

        </section>
    );
};

export default SectionAllCard;