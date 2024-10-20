import React from "react";

function InputField({ id, label, name, value, onChange }) {
    return (
        <div>
            <label htmlFor={id}>{label}</label><br />
            <input 
                type="text" 
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
}

export default InputField;