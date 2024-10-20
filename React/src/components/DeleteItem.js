import React from 'react';
import { useEffect, useState } from 'react';

function DeleteItem({deleteItem, setDeleteItem, deleteElement, reloadPage, setSelectedItem}) {
    useEffect(()=>{
        if(deleteItem){
            document.body.style.overflow='hidden';
        }else{
            document.body.style.overflow='';
        }

        return () => {
            document.body.style.overflow = '';
          };
    },[deleteItem]);

    const handleDelete = function(){
        deleteElement();
        reloadPage();
        setSelectedItem(null);
    }

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Are you sure you want to delete this item?</h2>
          <div className="modal-buttons">
            <button onClick={()=>setDeleteItem(false)}>Back</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    );
}

export default DeleteItem;