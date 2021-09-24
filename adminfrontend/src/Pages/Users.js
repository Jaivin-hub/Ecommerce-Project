import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import { BiBlock } from "react-icons/bi";
import axios from 'axios';


function Users() {

    const [data, setData] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])


    const getAllUsers = () => {
        console.log('in function')
        axios.get('http://localhost:3000/users/getUser').then((res) => {
            const mongodata = res.data
            setData(mongodata)
        }).catch((err) => {
            console.log('something went error while data fetching' + err)
        })
    }

    console.log(data)




    return (
        <div className="col-md-12">
            <div className="userlist pt-5">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Block</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, key) => {
                            return (
                                <tr>
                                    <td>#</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td><BiBlock /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Users;