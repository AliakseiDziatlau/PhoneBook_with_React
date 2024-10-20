import React from 'react';
import Head from './Head';
import Table from './Table';
import Filters from "./Filters";
import Button from "./Button";
import DeleteItem from './DeleteItem';

function MainPage({
        filterOn, 
        handleFilterbtn, 
        handleAddElement, 
        items, 
        handleEditBtn, 
        handleDeleteBtn, 
        deleteItem, 
        setDeleteItem, 
        deleteElement, 
        reloadPage, 
        filterItems, 
        setSelectedItem
    }) {
    return (
        <div className='main-page'>
            <Head />
            <div className="filter-btn-container">
                {filterOn ?
                    null : (
                        <div className="btn-filter">
                            <Button onClick={handleFilterbtn}>Filter</Button>
                        </div>
                    )
                }
                <Button onClick={handleAddElement}>Add Element</Button>
            </div>
  
            {filterOn && (
                <Filters 
                    handleFilterbtn={handleFilterbtn} 
                    filterItems={filterItems}
                />
            )}

            {deleteItem && (
                <DeleteItem 
                    deleteItem={deleteItem} 
                    setDeleteItem={setDeleteItem} 
                    deleteElement={deleteElement} 
                    reloadPage={reloadPage} 
                    setSelectedItem={setSelectedItem}
                />
            )}
  
            <Table 
                items={items} 
                handleEditBtn={handleEditBtn} 
                handleDeleteBtn={handleDeleteBtn} 
            />
        </div>
    );
}

export default MainPage;