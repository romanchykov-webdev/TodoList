import React from 'react';
import s from "./burger.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {burgerAction} from "./burgerSliceReducer";

const Burger = () => {
    const dispatch=useDispatch()
    const isActive=useSelector(store=>store.burgerSlice.isActive)
    return (
        <button className={isActive  ? `${s.menuBurger} ${s.active}` : `${s.menuBurger}`}
        onClick={()=>dispatch(burgerAction())}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default Burger;