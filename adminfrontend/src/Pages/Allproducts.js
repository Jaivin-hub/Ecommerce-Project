import React from 'react';
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Allproducts() {
    return (
        <div className="allproducts pt-5">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>dj</td>
                        <td><FaEdit /></td>
                        <td><MdDelete /></td>
                    </tr>
                  
                </tbody>
            </Table>
        </div>
    )
}

export default Allproducts;