import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { BiRupee } from "react-icons/bi";



export function BasicElements() {

    let history = useHistory();

    const [data, setData] = useState([])
    const [status,setStatus] = useState('')

    useEffect(() => {
        getData()
    }, [])

    console.log(data.id)

    const getData = () => {
        axios.get(`http://localhost:3000/users/getorders`).then((res) => {
            console.log('success')
            const alldata = res.data
            console.log(alldata)
            setData(alldata)
        }).catch((err) => {
            console.log(err)
        })
    }

    const userDetails = (id) => {
        console.log('func')
        console.log(id)
        history.push(`/userdetails/${id}`);
    }

    const productsDetails = (id) => {
        history.push(`/productdetails/${id}`);
    }

    const optionChange = (e) => {
        setStatus(e.target.value)
        axios.post(`http://localhost:3000/users/setStatus`,status).then((response) =>{
            console.log('all set')
        })
    }



    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">Order mangement</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>OrderManagement</a></li>
                        <li className="breadcrumb-item active" aria-current="page">view orders</li>
                    </ol>
                </nav>
            </div>
            <div className="row ">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Order Status</h4>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="form-check form-check-muted m-0">
                                                    <label className="form-check-label">
                                                        <input type="checkbox" className="form-check-input" />
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </th>
                                            <th> Client Name </th>
                                            <th> Order No </th>
                                            <th> Product Cost </th>
                                            <th> Product </th>
                                            <th> Payment Mode </th>
                                            <th> Order Date </th>
                                            <th> Payment Status </th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, key) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="form-check form-check-muted m-0">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" />
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <img src={require('../../assets/images/faces/face4.jpg')} alt="face" />
                                                            <span className="pl-2 pt-2">{data[key].userid}</span>
                                                            <span><div onClick={() => { userDetails(data[key].userid) }} style={{ cursor: 'pointer' }} className="badge badge-outline-primary">Details</div></span>
                                                        </div>
                                                    </td>
                                                    <td>{key}</td>
                                                    <td> <BiRupee />{data[key].total} </td>
                                                    <td> <div onClick={() => { productsDetails(data[key].userid) }} style={{ cursor: 'pointer' }} className="badge badge-outline-secondary">Details</div> </td>
                                                    <td> Paypal </td>
                                                    <td> 04 Dec 2019 </td>
                                                    <td>
                                                        <div className="badge badge-outline-success">Approved</div>
                                                    </td>
                                                    <td>
                                                        <div className="badge badge-outline-info">
                                                            <select className="form-control" onChange={optionChange} style={{ cursor: 'pointer', backgroundColor: 'black', color: '#fff' }} onChange={optionChange} id="status">
                                                                <option>Deleved</option>
                                                                <option>Pending</option>
                                                                <option>Placed</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BasicElements