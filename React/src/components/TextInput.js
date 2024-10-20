import React from "react";

function TextInput({ id, label, value, onChange }) {
    return (
        <div className="form-group">
            <label htmlFor={id} className="control-label">{label}</label>
            <input 
                id={id}
                name={id}
                type="text"
                className="form-control"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default TextInput;