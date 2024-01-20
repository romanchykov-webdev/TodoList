import React from 'react';
import s from './Nav.module.scss'
import { useSelector} from "react-redux";



const Nav = () => {
    // const dispatch=useDispatch()
    // const allLabelsTodos=useSelector(state => state.getSlice.getTodos)
    const menuActive=useSelector(state => state.burgerSlice.isActive)

    return (
        menuActive &&  <nav className={s.nav}>
            <ul>
                <li> label 1</li>
                <li> label 2</li>
                <li> label 3</li>
                <li> label 4</li>
                <li> label 5</li>
            </ul>
        </nav>
    )



};

export default Nav;