import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import instance from '../axios-orders'



function OfferManagement() {



    const [values, setValues] = useState()
    const [coupons, setCoupons] = useState([])
    const [ok, setOk] = useState(true)


    useEffect(() => {
        getData()
    }, [ok])

    const textChange = (e) => {
        const newValues = { ...values }
        newValues[e.target.id] = e.target.value
        setValues(newValues)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setOk(!ok)
        instance.post('/addcoupon', values).then((res) => {

        })
    }

    const getData = () => {
        instance.get('/getcoupon').then((res) => {
            setCoupons(res.data)
        })
    }

    const deleteOffer = (id) => {
        console.log(id)
        instance.get(`/dltcoupon/${id}`).then((res) => {
            setCoupons(res.data)
        })
    }

    console.log(coupons)

    console.log(values)
    return (
        <div className="row pt-5 mt-5">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Add Coupon</h4>
                        <form onSubmit={submitHandler} className="forms-sample">
                            <Form.Group className="row">
                                <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Enter Coupon Code</label>
                                <div className="col-sm-9">
                                    <Form.Control onChange={textChange} type="text" className="form-control" id="couponcode" placeholder="Type here" />
                                </div>
                            </Form.Group>
                            <Form.Group className="row">
                                <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Discount(In %)</label>
                                <div className="col-sm-9">
                                    <Form.Control onChange={textChange} type="number" className="form-control" id="discount" placeholder="Type here" />
                                </div>
                            </Form.Group>
                            <Form.Group className="row">
                                <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label">Max Purchase Amount</label>
                                <div className="col-sm-9">
                                    <Form.Control onChange={textChange} type="number" className="form-control" id="maxpurchaseamount" placeholder="Type here" />
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
                                    <Form.Control onChange={textChange} type="Date" className="form-control" id="couponExpiredate" placeholder="Type here" />
                                </div>
                            </Form.Group>
                            <div className="pt-4">
                                <button type="submit" className="btn btn-primary mr-2">Create Coupon</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Coupons</h4>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Coupon Code</th>
                                        <th>Discount(In%)</th>
                                        <th>Min_price</th>
                                        <th>Min_discount</th>
                                        <th>Expire Date</th>
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                      <td>Jacob</td>
                      <td>Photoshop</td>
                      <td className="text-danger"> 28.76% <i className="mdi mdi-arrow-down"></i></td>
                      <td><label className="badge badge-danger">Pending</label></td>
                    </tr> */}

                                    {coupons.map((item, k) => {
                                        return (
                                            <tr>
                                                <td>{item.couponcode}</td>
                                                <td>{item.discount}</td>
                                                <td>{item.maxpurchaseamount}</td>
                                                <td>{item.maxdiscountamount}</td>
                                                <td className="text-success">{item.couponExpiredate}</td>
                                                <td><label className="badge badge-success">onProcess</label></td>
                                                <td> <button onClick={() => { deleteOffer(item._id) }} type="button" className="btn btn-outline-danger btn-fw">Delete</button></td>
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

export default OfferManagement
