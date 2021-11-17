import React, { useState, useEffect } from 'react';
import './style.css'
import instance from '../axios-orders'
import { useHistory } from "react-router-dom";
import { BiRupee } from "react-icons/bi";



export function BasicElements() {

    let history = useHistory();

    const [newStatus, setNewStatus] = useState(false)
    const [data, setData] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        getData()
    }, [newStatus])


    const getData = () => {
        instance.get(`/getorders`).then((res) => {
            const alldata = res.data
            setData(alldata)
        }).catch((err) => {
            console.log(err)
        })
    }


    const userDetails = (id, addressid) => {
        const data = { id, addressid }
        history.push(`/userdetails/${id}?addressid=${addressid}`);
    }

    const productsDetails = (id) => {
        console.log(id)
        history.push(`/productdetails/${id}`);
    }

    const optionChange = (id, value) => {
        const data = { id, value }
        setNewStatus(!newStatus)
        instance.post(`/setStatus`, data).then((response) => {
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
            <div className="row">
                <div style={{  }} className="col-12 grid-margin">
                    <div style={{ overflow: 'scroll', overflowX: 'hidden', overflowY: 'scroll' }} className="card">
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
                                                          
                                                            <span><div onClick={() => { userDetails(data[key].userid, data[key].addressid) }} style={{ cursor: 'pointer', marginLeft: "10%" }} className="badge badge-outline-primary">Details</div></span>
                                                        </div>
                                                    </td>
                                                    <td>{key}</td>
                                                    <td> <BiRupee />{data[key].total} </td>
                                                    <td> <div onClick={() => { productsDetails(data[key]._id) }} style={{ cursor: 'pointer' }} className="badge badge-outline-secondary">Details</div> </td>
                                                    <td> {data[key].payment} </td>
                                                    <td> {data[key].orderdate}</td>
                                                    <td>
                                                        {data[key].payment == 'COD' ?
                                                            <div className="badge badge-outline-warning">Pending</div>
                                                            :
                                                            <div className="badge badge-outline-success">Approved</div>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="badge badge-outline-info">
                                                            <select className="form-control" style={{ cursor: 'pointer', backgroundColor: 'black', color: '#fff' }} value='kdj' onChange={(e) => { optionChange(data[key]._id, e.target.value) }} id="status">
                                                                <option>{data[key].orderStatus}</option>
                                                                <option>Delivered</option>
                                                                <option>Pending</option>
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