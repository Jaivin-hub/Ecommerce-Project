import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import './style.css'
import instance from '../axios-orders';


export function Subcategory() {

    const [values, setValues] = useState()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = () => {
        instance.get('/getcatagory').then((res) => {
            const data = res.data
            setCategories(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const textHandler = (e) => {
        const newData = { ...values }
        newData[e.target.id] = e.target.value
        setValues(newData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        instance.post('/addsubcatagory', values).then(() => {
            console.log('success')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> Add New Subcatagory</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>New Products</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add products</li>
                    </ol>
                </nav>
            </div>
            <div className="row mt-5 ">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Category Management</h4>

                            <form onSubmit={handleSubmit} className="forms-sample">
                                <Form.Group>
                                    <label htmlFor="exampleSelectGender">Categories</label>
                                    <select onChange={textHandler} className="form-control" id="Category">
                                        {categories.map((item, k) => {
                                            return (
                                                <option>{item.Categoryname}</option>
                                            )
                                        })}
                                    </select>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Sub Category</label>
                                    <div className="col-sm-9">
                                        <Form.Control onChange={textHandler} type="text" className="form-control" id="subcategory" placeholder="Username" />
                                    </div>
                                </Form.Group>
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                <button className="btn btn-dark">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Subcategory