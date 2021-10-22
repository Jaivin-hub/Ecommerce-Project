import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import { BiBlock } from "react-icons/bi";
import axios from 'axios';
import Navbar from '../Components/Navbar'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

// Datatable modules

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

function Users() {

    const [data, setData] = useState([])

    useEffect(() => {
        getAllUsers()
        loadItem()
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

    const loadItem = () => {
        $(document).ready(function () {
            $('#dtBasicExample').DataTable({
                "searching": false // false to disable search (or any other option)
            });
            $('.dataTables_length').addClass('bs-select');
        });
    }



    return (
        <div>
            <Navbar />
            <div className="addproductmain col-md-12">
                <div className="alldetails">

                    <div className="row pt-4">
                        <h3><strong>Customers</strong></h3>
                    </div>
                    <div className="row pt-4">
                        <div className="customersdetails pt-3">
                            <Table id="dtBasicExample" class="table table-striped table-bordered table-sm" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>x
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
                </div>
            </div>
        </div>
    )
}

export default Users;