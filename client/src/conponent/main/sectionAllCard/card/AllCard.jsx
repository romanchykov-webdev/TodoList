import React from 'react';
// import s from './AllCard.module.scss'
import s from '../../newCard/NewCard.module.scss'




const AllCard = ({item}) => {
    return (
       <div >
           <div>title: {item.title}</div>
           <div>color: {item.color}</div>
           <div>id: {item.id}</div>
           <div>dateCreate: {item.dateCreate}</div>
           <div>isFavorite: {item.isFavorite ? 'true' : 'false'}</div>
           <div>panelChangeBGColor: {item.panelChangeBGColor ? 'true' : 'false'}</div>
           <div>textareaBox: {item.textareaCheckBox}</div>
           <div>label: {item.label }</div>
           <div>labelCheckBox:
           {item.labelCheckBox.length>0 &&

               <ul>
                   {item.labelCheckBox.map(i=>(
                       <li key={i.id}>{i.title}</li>
                   ))}
               </ul>


           }
           </div>


           <br/>
       </div>
    );
};

export default AllCard;