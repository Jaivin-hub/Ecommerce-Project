import { Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import axios from 'axios'


function Offers() {

    const [values, setValues] = useState()
    const [coupons, setCoupons] = useState([])
    const [ok, setOk] = useState(true)
    const [categoryDetails, setCategoryDetails] = useState([])
    const [offers, setOffers] = useState([])



    useEffect(() => {
        getData()
        getCategories()
    }, [ok])

    const textChange = (e) => {
        const newValues = { ...values }
        newValues[e.target.id] = e.target.value
        setValues(newValues)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setOk(!ok)
        axios.post('http://localhost:3000/users/addoffer', values).then((res) => {

        })
    }


    const getData = () => {
        axios.get('http://localhost:3000/users/getcategoryoffers').then((res) => {
            setOffers(res.data)
        })
    }

    const deleteOffer = (id, category) => {
        const data = { id, category }
        setOk(!ok)
        axios.post(`http://localhost:3000/users/dltoffer`, data).then((res) => {
            setCoupons(res.data)
        })
    }


    const getCategories = () => {
        axios.get('http://localhost:3000/users/findCategories').then((response) => {
            setCategoryDetails(response.data)
        })
    }







    return (
        <div className="row pt-5 mt-5">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Category offer</h4>
                        <form onSubmit={submitHandler} className="forms-sample">
                            <Form.Group>
                                <label htmlFor="exampleInputPassword4">Category</label>
                                <select onChange={textChange} className="form-control" id="maincategory">
                                    <option>Select</option>
                                    {categoryDetails.map((item, key) => {
                                        return (
                                            <option>{item.Categoryname}</option>
                                        )
                                    })}
                                </select>
                            </Form.Group>
                            <Form.Group className="row">
                                <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Discount(In %)</label>
                                <div className="col-sm-9">
                                    <Form.Control onChange={textChange} type="number" className="form-control" id="discount" placeholder="Type here" />
                                </div>
                            </Form.Group>

                            <Form.Group className="row">
                                <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label">Max Discount Amount</label>
                                <div className="col-sm-9">
                                    <Form.Control onChange={textChange} type="number" className="form-control" id="maxdiscountamount" placeholder="Type here" />
                                </div>
                            </Form.Group>
                            <Form.Group className="row">
                                <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label">Coupon Expire Date</label>
                                <div className="col-sm-9">
                                    <Form.Control onChange={textChange} type="Date" className="form-control" id="Expiredate" placeholder="Type here" />
                                </div>
                            </Form.Group>
                            <div className="pt-4">
                                <button type="submit" className="btn btn-primary mr-2">Create Offer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Offers</h4>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Discount(In%)</th>
                                        <th>Min_discount</th>
                                        <th>Expire Date</th>
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {offers.map((item, k) => {
                                        return (
                                            <tr>
                                                <td>{item.maincategory}</td>
                                                <td>{item.offerdiscount}</td>
                                                <td>{item.offer}</td>
                                                <td>{item.offerexpiredate}</td>
                                                <td><label className="badge badge-danger">{item.status}</label></td>
                                                <td><button onClick={() => { deleteOffer(item._id, item.maincategory) }} type="button" className="btn btn-outline-danger btn-fw">Delete</button></td>
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
    )
}

export default Offers
