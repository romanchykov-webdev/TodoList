import React from 'react';
import s from './Header.module.scss'
import Burger from "./burger/burger";
import Search from "./search/Search";
import Tiles from "./tile/Tiles";
import {Link, NavLink} from "react-router-dom";
import Nav from "./nav/Nav";
import {useDispatch, useSelector} from "react-redux";
import {logOutAction} from "../authRegis/userSliceReducer";

const Header = () => {
    const dispatch=useDispatch()

    const isAuth = useSelector(state => state.userSlice.isAuth)
    const user = useSelector(state => state.userSlice.currentUser)

    return (
        <header>
            <div className={"container"}>
                <div
                    style={isAuth ? {visibility: "visible"} : {visibility: "hidden"}}
                    className={s.wrapper}>
                    <Burger/>
                    <Nav/>
                    <div className={s.wrapRight}>
                        <Search/>
                        <Tiles/>
                        <Link to="/profile" className={s.avatar}>
                            <div className={s.nikName}>
                                {user.email}
                            </div>
                            <div className={s.iconAvatar}>
                                {
                                    user.avatar
                                        ? user.avatar
                                    :<svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                                                fill="#2e3436"/>
                                        </svg>
                                }
                            </div>
                            <div className={s.logOut}
                            onClick={()=>dispatch(logOutAction())}
                            >
                                <NavLink to={'/'}>

                                    <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1"
                                         viewBox="0 0 512 512">
                                        <g>
                                            <g>
                                                <g>
                                                    <path d="M477.261,190.805H367.064l-79.76-79.76c-1.951-15.542-15.241-27.609-31.304-27.609
				c-16.064,0-29.353,12.066-31.305,27.609l-79.76,79.76H34.739C15.584,190.805,0,206.389,0,225.544v168.28
				c0,19.156,15.584,34.739,34.739,34.739h442.523c19.156,0,34.739-15.584,34.739-34.739v-168.28
				C512,206.389,496.416,190.805,477.261,190.805z M256.001,101.283c7.562,0,13.715,6.152,13.715,13.715
				c0,7.563-6.152,13.715-13.715,13.715c-7.563,0-13.715-6.152-13.715-13.715C242.284,107.435,248.438,101.283,256.001,101.283z
				 M229.255,131.724c5.587,8.901,15.484,14.835,26.746,14.835c11.262,0,21.159-5.933,26.746-14.835l59.081,59.081H170.173
				L229.255,131.724z M494.154,393.824c0,9.315-7.578,16.893-16.893,16.893H34.739c-9.315,0-16.893-7.578-16.893-16.893v-168.28
				c0-9.315,7.578-16.893,16.893-16.893h442.523c9.315,0,16.893,7.578,16.893,16.893V393.824z"/>
                                                    <path d="M301.3,258.454c-4.928,0-8.923,3.995-8.923,8.923v84.615c0,4.928,3.995,8.923,8.923,8.923s8.923-3.995,8.923-8.923
				v-84.615C310.223,262.449,306.228,258.454,301.3,258.454z"/>
                                                    <path d="M256.921,259.98c-4.084-2.757-9.631-1.68-12.387,2.404l-21.156,31.348l-21.156-31.348
				c-2.758-4.087-8.303-5.162-12.387-2.404c-4.086,2.757-5.161,8.303-2.404,12.387l25.184,37.317l-25.184,37.317
				c-2.757,4.084-1.68,9.631,2.404,12.387c1.53,1.033,3.266,1.528,4.983,1.528c2.866,0,5.681-1.379,7.405-3.933l21.156-31.348
				l21.156,31.348c1.724,2.554,4.538,3.933,7.405,3.933c1.717,0,3.453-0.495,4.983-1.528c4.085-2.757,5.161-8.303,2.404-12.387
				l-25.184-37.317l25.184-37.317C262.084,268.283,261.007,262.737,256.921,259.98z"/>
                                                    <path d="M159.176,343.069h-41.119v-23.552h16.098c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923h-16.098v-25.372
				h41.118c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923h-50.041c-4.928,0-8.923,3.995-8.923,8.923v84.615
				c0,4.928,3.995,8.923,8.923,8.923h50.042c4.928,0,8.923-3.995,8.923-8.923S164.103,343.069,159.176,343.069z"/>
                                                    <path d="M402.866,258.454h-61.565c-4.928,0-8.923,3.995-8.923,8.923s3.995,8.923,8.923,8.923h21.86v75.692
				c0,4.928,3.995,8.923,8.923,8.923c4.928,0,8.923-3.995,8.923-8.923v-75.692h21.86c4.928,0,8.923-3.995,8.923-8.923
				S407.794,258.454,402.866,258.454z"/>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </NavLink>
                            </div>
                        </Link>
                    </div>
                </div>
                {
                    !isAuth && <div className={s.backgroundHidden}>
                        <NavLink to={"/login"}>
                            Login
                        </NavLink>
                        <NavLink to={"/registration"}>
                            Registration
                        </NavLink>
                    </div>

                }
            </div>


        </header>
    );
};

export default Header;