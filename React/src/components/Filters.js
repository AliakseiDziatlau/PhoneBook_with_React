import React from 'react';
import { useEffect, useState } from 'react';
import InputField from './InputField';
import Button from "./Button";

function Filters({handleFilterbtn, filterItems}) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');


    const handleResetBtn = function(){
        setName('');
        setPhone('');
        setCountry('');
        setCity('');
        setStreet('');
    }

    const handleApplyBtn = function(){
        filterItems(name, phone, country, city, street);
    }

    return (
        <div className="filter-container">
            <div className="buttons-container">
                <Button className="close-btn" onClick={handleFilterbtn}>&#215;</Button> 
                <Button className="reset-btn" onClick={handleResetBtn}>⟳</Button>
            </div>
            <div className="row">
                <div className="labels-container">
                    {/* Label for name */}
                    <InputField
                        id="nameInput"
                        label="Name"
                        name="PhoneItemFilter.Name" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
  
                    {/* Label for phone */}
                    <InputField 
                        id="phoneInput" 
                        label="Phone" 
                        name="PhoneItemFilter.Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)} 
                    />
                    
                    {/* Label for country */}
                    <InputField 
                        id="countryInput" 
                        label="Country" 
                        name="PhoneItemFilter.Country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                    
                    {/* Label for city */}
                    <InputField 
                        id="cityInput" 
                        label="City" 
                        name="PhoneItemFilter.City" 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    
                    {/* Label for street */}
                    <InputField 
                        id="streetInput" 
                        label="Street" 
                        name="PhoneItemFilter.Street" 
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                    />
                </div>
            </div>
            <div className="apply-btn-container">
                <Button 
                    className="apply-btn" onClick={handleApplyBtn}>Apply</Button> 
            </div>            
        </div>
    );
}

export default Filters;