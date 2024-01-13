import React, {useState} from 'react';
import s from './labelChangePopup.module.scss'
import {useDispatch} from "react-redux";
import {labelChangePopupAction} from "./labelChangePopupSliceReducer";
import axios from "axios";


const LabelChangePopup = () => {

    const dispatch = useDispatch()

    const [newLabel, setNewLabel] = useState()
    const [checkbox, setCheckbox] = useState()
    const [label, setLabel] = useState('asfaf')

    const [allLabels,setAllLabels]=useState()

    const getLabels= async ()=>{
        const response=await axios.get()
    }

    return (




        <div className={s.wrapperPopupLabel}

        >
            <div className={s.wrapper}>
                <div className={s.headerTitle}>
                    Labels
                    <button onClick={() => dispatch(labelChangePopupAction())}>
                        <svg viewBox="0 0 50 50" width="40px" height="40px"><path
                            d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
                    </button>
                </div>
                <div className={s.header}>
                    <input type="text"
                           value={newLabel}
                           onChange={(e) => setNewLabel(e.target.value)}
                           placeholder={"new label"}
                    />
                    <button>add</button>
                </div>
                <div className={s.wrapperLabels}>
                    <label htmlFor="checkbox">
                        <input type="checkbox"
                               id={'checkbox'}
                               value={checkbox}
                        />
                        {label}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default LabelChangePopup;