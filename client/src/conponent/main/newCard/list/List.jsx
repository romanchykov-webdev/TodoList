import React, {useEffect, useState} from 'react';
import s from './List.module.scss'
import {v4} from "uuid";
import ListCompleted from "./listCompleted/ListCompleted";
import {useDispatch, useSelector} from "react-redux";
import {listTempPushAction} from "../newCardSliceReducer";


const List = () => {
    const dispatch=useDispatch()

    const listArray=useSelector(state => state.newCardSlice.listTemp)

    const [createNewItem, setCreateNewItem] = useState('')
    const [mockArray, setMockArray] = useState(listArray)


    const noCompleted=mockArray.filter(item=> item.completed === false )
    const completed=mockArray.filter(item=> item.completed === true )



    useEffect(() => {
        setMockArray(listArray)
    }, [listArray]);


    function newItemHandler() {
        if(createNewItem.length>0){
            const newItem = {
                id: v4(),
                title: createNewItem,
                completed: false,
            }
            // setMockArray(prevMockArray => [...prevMockArray, newItem])
            // console.log(mockArray)
            dispatch(listTempPushAction({newItem}))
            setCreateNewItem('')
        }

    }

    // reyDown

    // reyDown



    return (
        <div className={s.wrapperList}>
            {
                noCompleted.length>0 && <ListCompleted mockArray={noCompleted}/>
            }



            <div className={s.createNew}>
                <span onClick={() => newItemHandler()}>+</span>
                <input type="text"
                       placeholder={"+ New item"}
                       value={createNewItem}
                       onChange={(e) => setCreateNewItem(e.target.value)}
                />
            </div>

            {
                completed.length>0 && <ListCompleted mockArray={completed} num={completed.length}/>
            }

        </div>
    );
};

export default List;