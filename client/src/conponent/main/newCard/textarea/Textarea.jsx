import React, {useRef, useState} from 'react';
import s from './Textarea.module.scss'
import {newCardShowAction, textareaAction} from "../newCardSliceReducer";
import {useDispatch} from "react-redux";


const Textarea = () => {

    const textareaRef = useRef(null);
    const [text, setText] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');

    const handleTextareaChange = (event) => {
        setText(event.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        const textareaLineHeight = 24; // Замените это значением высоты строки textarea
        const minRows = 1;
        const maxRows = 10; // Максимальное количество строк, которые могут быть отображены

        const currentRows = Math.floor(textareaRef.current.scrollHeight / textareaLineHeight);
        const rows = Math.min(maxRows, Math.max(minRows, currentRows));

        setTextareaHeight(`${rows * textareaLineHeight}px`);
    };

    const dispatch=useDispatch()

    const  textareaHandler=()=> {
        dispatch(newCardShowAction());
        dispatch(textareaAction())
    }

    return (
        <textarea name="" id="" rows="1"
                  placeholder={"Label ..."}
                  ref={textareaRef}
                  style={{ height: textareaHeight }}
                  value={text}
                  onChange={handleTextareaChange}
                  onClick={()=>textareaHandler()}
        ></textarea>
    );
};

export default Textarea;