import React from 'react';
import TableHead from './TableHead';
import Button from "./Button";

function Table({ items, handleEditBtn, handleDeleteBtn}) {
    return (
      <div className="table-container">
        <table className="table">
          <TableHead />
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {/* ID */}
                <td>{item.id}</td>
                {/* Name */}
                <td>{item.name}</td>
                {/* Phone */}
                <td>{item.phone_number}</td>
                {/* Country */}
                <td>{item.country}</td>
                {/* City */}
                <td>{item.city}</td>
                {/* Street */}
                <td>{item.street}</td>
                {/* House number */}
                <td>{item.house_number}</td>
                {/* Email */}
                <td>{item.email}</td>
                <td>
                  <Button onClick={()=>handleEditBtn(item.id)}>Edit</Button>
                  <Button onClick={()=>handleDeleteBtn(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Table;