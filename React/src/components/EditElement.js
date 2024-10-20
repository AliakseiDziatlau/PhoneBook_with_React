import React from "react";
import { useEffect, useState } from 'react';
import TextInput from './TextInput'

function EditElement({handleBackToMain, selectedItem, handleSubmitInEdit}){
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (selectedItem) {
          setName(selectedItem.name);
          setPhoneNumber(selectedItem.phone_number);
          setCountry(selectedItem.country);
          setCity(selectedItem.city);
          setStreet(selectedItem.street);
          setHouseNumber(selectedItem.house_number);
          setEmail(selectedItem.email);
        }
      }, [selectedItem]);

      const handleSubmit = function(){
        handleSubmitInEdit(name, phoneNumber, country, city, street, houseNumber, email);
      }
  
    return (
        <div className='add-element-container'>
            <button style={{ position: 'absolute', top: 10, left: 10 }} className="btn btn-secondary" onClick={handleBackToMain}>
                Back
            </button>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <TextInput id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextInput id="phone" label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <TextInput id="country" label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    <TextInput id="city" label="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    <TextInput id="street" label="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                    <TextInput id="house_number" label="House Number" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
                    <TextInput id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditElement;