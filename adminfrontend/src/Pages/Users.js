import React from 'react';
import { Table } from 'react-bootstrap'
import { BiBlock } from "react-icons/bi";


function Users() {
    return (
        <div className="col-md-12">
            <div className="userlist pt-5">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Block</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td><BiBlock/></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td><BiBlock/></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td><BiBlock/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Users;