import React from 'react';
import s from './Header.module.scss'
import Burger from "./burger/burger";
import Search from "./search/Search";
import Tiles from "./tile/Tiles";
import {Link} from "react-router-dom";


const Header = () => {
    return (
        <header>
            <div className={"container"}>
                <div className={s.wrapper}>
                    <Burger/>
                    <div className={s.wrapRight}>
                        <Search/>
                        <Tiles/>
                        <Link to="/profile" className={s.avatar}>
                            <svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0" fill="#2e3436"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;