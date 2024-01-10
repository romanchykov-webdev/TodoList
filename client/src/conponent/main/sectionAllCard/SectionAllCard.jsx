import React, {useEffect, useState} from 'react';
import s from './sectionAllCard.module.scss'
import axios from "axios";
import NewCard from "../newCard/NewCard";
import AllCard from "./card/AllCard";


const SectionAllCard = () => {


    // ?get all card
    const [data,setData]=useState([])
    const getData=async ()=>{
        try {
            const response=await axios.get(
                'http://localhost:5000/boards',
                {params:{_page:0,_limit: 1000}}
            )
            console.log(response)
            setData(response.data)
            const totalCard=response.headers['x-total-count']
            console.log("totalCard: "+ totalCard)
        }catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getData()
    }, []);
    // ?get all card



    return (
        <section className={s.allCard}>
            {
                data.map(item=>(
                    <AllCard key={item.id} item={item}/>
                ))
            }

        </section>
    );
};

export default SectionAllCard;