
import { useEffect, useState } from 'react';
import '../App.css';
import MainPage from './MainPage';
import AddElement from './AddElement';
import EditElement from './EditElement';

function App() {
  const [filterOn, setFilterOn] = useState(false);
  const [page, setPage] = useState('Main');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(false);
  const [constItems, setConstItems] = useState([]);

  const filterItems = async function(name, phone, country, city, street){
    const filtered = constItems.filter(item => {
        const matchesName = !name || item.name.toLowerCase().includes(name.toLowerCase());
        const matchesPhone = !phone || item.phone_number.toLowerCase().includes(phone.toLowerCase());
        const matchesCountry = !country || item.country.toLowerCase().includes(country.toLowerCase());
        const matchesCity = !city || item.city.toLowerCase().includes(city.toLowerCase());
        const matchesStreet = !street || item.street.toLowerCase().includes(street.toLowerCase());
        
        return matchesName && matchesPhone && matchesCountry && matchesCity && matchesStreet;
    });

    setItems(filtered);
  }

  const deleteElement = async function(){
    try {
        const response = await fetch('http://localhost:5129/api/home/deleteitem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedItem.id), 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); 
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const handleDeleteBtn = function(id){
    const sItem = items.find(item=>item.id===id);
    if(sItem){
        setSelectedItem(sItem);
        setDeleteItem(true);
    }
  }

  const addItem = async function(newItem){
    try {
        const response = await fetch('http://localhost:5129/api/home/additem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem), 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); 
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const handleAddSubmit = function(name, phone_number, country, city, street, house_number, email){
    const newItem = {
        name: name,
        phone_number: phone_number,
        country: country,
        city: city,
        street: street,
        house_number: house_number,
        email: email
    };
    addItem(newItem);
    reloadPage();
  }

  const reloadPage = function(){
    window.location.reload();
  }

  const compareItems=function(item1, item2){
    return (
        item1.name === item2.name &&
        item1.phone_number === item2.phone_number &&
        item1.country === item2.country &&
        item1.city === item2.city &&
        item1.street === item2.street &&
        item1.house_number === item2.house_number &&
        item1.email === item2.email
    );
  }

  const updateItem = async function(personItem){
    try {
        const response = await fetch('http://localhost:5129/api/home/updateitem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personItem), 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); 
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};

  const handleSubmitInEdit=function(name, phone_number, country, city, street, house_number, email){
      const editedItem = {
        name: name,
        phone_number: phone_number,
        country: country,
        city: city,
        street: street,
        house_number: house_number,
        email: email
      };
      const isEqual = compareItems(selectedItem, editedItem);
      if(!isEqual){
        Object.assign(selectedItem, editedItem);
        updateItem(selectedItem);
      }
      handleBackToMain();
  }

  const handleEditBtn = function(id){
      console.log(id);
      const sItem = items.find(item => item.id === id);

      if (sItem) {
      setSelectedItem(sItem);
      handleEditElement(); 
      } else {
        console.log("Item not found");
      }
  }

  const handleFilterbtn = function () {
      setFilterOn(!filterOn);
  }
  const handleAddElement = function () {
      setPage('AddElementWindow');
  }

  const handleBackToMain = function () {
      setPage('Main');
  }

  const handleEditElement = function(){
      setPage('EditElementWindow');
  }

  useEffect(() => {
      fetchHomeGetItem();
      console.log(items);
  }, []);

  return (
      <div>
          {page === 'Main' && (
              <MainPage 
                filterOn={filterOn} 
                handleFilterbtn={handleFilterbtn} 
                handleAddElement={handleAddElement} 
                items={items} 
                handleEditBtn={handleEditBtn} 
                handleDeleteBtn={handleDeleteBtn} 
                deleteItem={deleteItem} 
                setDeleteItem={setDeleteItem} 
                deleteElement={deleteElement} 
                reloadPage={reloadPage} 
                filterItems={filterItems} 
                setSelectedItem={setSelectedItem}
            />
          )}
          {page === 'AddElementWindow' && (
              <AddElement 
                handleBackToMain={handleBackToMain} 
                handleAddSubmit={handleAddSubmit} 
            />
          )}
          {page === 'EditElementWindow' && (
              <EditElement 
                handleBackToMain={handleBackToMain} 
                selectedItem={selectedItem} 
                handleSubmitInEdit={handleSubmitInEdit}
            />
          )}
      </div>
  );

  async function fetchHomeGetItem() {
      try {
          const response = await fetch('http://localhost:5129/api/home/getitem');
          if (!response.ok) {
              throw new Error(`Ошибка при получении данных: ${response.status}`);
          }

          const data = await response.json(); 
          console.log("Полученные данные:", data);
          setItems(data);
          setConstItems(data); 
      } catch (error) {
          console.error("Ошибка:", error); 
      }
  }
}

export default App;
