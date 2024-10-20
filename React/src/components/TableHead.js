import React from "react";
import TableHeaderCell from './TableHeaderCell'

function TableHead() {
    return (
      <thead>
        <tr>
          <TableHeaderCell label="Id" />
          <TableHeaderCell label="Name" />
          <TableHeaderCell label="Phone Number" />
          <TableHeaderCell label="Country" />
          <TableHeaderCell label="City" />
          <TableHeaderCell label="Street" />
          <TableHeaderCell label="House Number" />
          <TableHeaderCell label="Email" />
          <TableHeaderCell label="" />
        </tr>
      </thead>
    );
}

export default TableHead;