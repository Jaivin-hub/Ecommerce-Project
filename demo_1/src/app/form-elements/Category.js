import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import './style.css'
import axios from 'axios';


export function BasicElements() {

    const [values, setValues] = useState()
    const [categories, setCategories] = useState([])
    const [added, setAdded] = useState(true)
    const [del, setDel] = useState(true)

    useEffect(() => {
        getCategory()
    }, [added, del])





    const valueAdded = (e) => {
        const newData = { ...values }
        newData[e.target.id] = e.target.value
        setValues(newData)
    }

    const getCategory = () => {
        axios.get('http://localhost:3000/users/getallcategory').then((res) => {
            setCategories(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        console.log('in function');
        e.preventDefault()
        setAdded(!added)
        axios.post('http://localhost:3000/users/addcatagory', values).then(() => {
            console.log('success')

        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteHandler = (id) => {
        setDel(!del)
        console.log('in the function')
        axios.post(`http://localhost:3000/users/deletecatagory/${id}`).then(() => {
            console.log('success')

        }).catch((err) => {
            console.log(err)
        })
    }

    const [showInputs,setShowInputs] = useState()

    console.log(categories);

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> Add Category</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>New Products</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add products</li>
                    </ol>
                </nav>
            </div>
            <div className="row mt-5">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add Category</h4>
                            <p className="card-description">you can add new categories.</p>
                            <form onSubmit={handleSubmit}>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">New Category</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" onChange={valueAdded} className="form-control" id="Category" placeholder="Category" />
                                    </div>
                                </Form.Group>
                                <button onClick={()=>{setShowInputs(true)}} className="btn btn-primary mr-2">Add details</button>
                                {showInputs ?
                                    <Form.Group className="row pt-4">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Category description</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" onChange={valueAdded} className="form-control" id="Category" placeholder="Add extra details" />
                                        </div>
                                    </Form.Group>
                                : null}
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                <button onClick={()=>{setShowInputs(false)}} className="btn btn-dark">Cancel</button>
                           
                            </form>
                          
                        </div>

                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Categories</h4>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th> Categories</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th> Delete Category </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((itm, k) => {
                                            return (
                                                <tr>

                                                    <td>
                                                        {itm.Categoryname}
                                                    </td>
                                                    <td>  </td>
                                                    <td>  </td>
                                                    <td> </td>
                                                    <td>  </td>
                                                    <td>  </td>
                                                    <td>
                                                        <button onClick={() => { deleteHandler(itm._id) }} className="btn btn-outline-danger btn-fw">Delete</button>
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