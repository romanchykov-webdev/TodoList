import React, {useEffect, useState} from 'react';
import s from './List.module.scss'
import {v4} from "uuid";
import ListCompleted from "./listCompleted/ListCompleted";
import {useDispatch, useSelector} from "react-redux";
import {listTempPushAction} from "../newCardSliceReducer";
import {putTodos} from "../../../../actions/todos";


const List = ({itemTodo=[]}) => {



    const dispatch = useDispatch()

     let   listArray = useSelector(state => state.newCardSlice.listTemp);

if(Object.keys(itemTodo).length > 0){
    listArray=itemTodo.labelCheckBox
}


    // console.log(listArray)


    const [createNewItem, setCreateNewItem] = useState('')
    const [mockArray, setMockArray] = useState(listArray)


    const noCompleted = mockArray.filter(item => item.completed === false)
    const completed = mockArray.filter(item => item.completed === true)


    useEffect(() => {
        setMockArray(listArray)
    }, [listArray]);


    // crete new item onClick
    const newItemHandler = () => {

            if (createNewItem.length > 0) {
                const newItem = {
                    id: v4(),
                    title: createNewItem,
                    completed: false,
                }
                // setMockArray(prevMockArray => [...prevMockArray, newItem])
                // console.log(mockArray)
                if(Object.keys(itemTodo).length > 0){
                    console.log("itemTodo.id"+itemTodo.id)
                    console.log(itemTodo.labelCheckBox)

                    const newCard= {
                        ...itemTodo,
                        labelCheckBox: [...itemTodo.labelCheckBox, newItem]
                    }
                    console.log(newCard)
                    dispatch(putTodos({idItem:itemTodo.id,newCard:newCard}))
                }else{
                    dispatch(listTempPushAction({newItem}))
                }
                setCreateNewItem('')
            }

        // console.log(itemTodo)

    }
    // crete new item onClick
    // crete new item onKeyPres
    const handlerPressEnter = (e) => {
        if (e.key === 'Enter') {
            newItemHandler()
        }
    }

    // crete new item onKeyPres

    // reyDown

    // reyDown


    return (
        <div className={s.wrapperList}>
            {
                // noCompleted.length>0 && <ListCompleted mockArray={noCompleted}/>
                noCompleted.length > 0 && noCompleted.map(item => (<ListCompleted key={item.id} item={item} itemTodo={itemTodo}/>))
            }


            <div className={s.createNew}>

                <span
                    onClick={newItemHandler}

                >+</span>
                <input type="text"
                       placeholder={"+ New item"}
                       value={createNewItem}
                       onChange={(e) => setCreateNewItem(e.target.value)}
                       onKeyDown={handlerPressEnter}
                />
            </div>

            {
                completed.length > 0 && <div className={s.checkedItems}>
                                            {completed.length} checked items
                                        </div>
            }
            {


                // completed.length>0 && <ListCompleted mockArray={completed} num={completed.length}/>
                completed.length > 0 && completed.map(item => (<ListCompleted key={item.id} item={item} itemTodo={itemTodo}/>))
            }

        </div>
    );
};

export default List;