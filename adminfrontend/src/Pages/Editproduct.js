import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EditProducts() {

    const id = useParams()
    const [value, setValue] = useState([])

    // setValue(id)
    // console.log(id)


    useEffect(() => {
        getData()
    }, [])




    // const deleteProduct = (productId) => {
    //     console.log(productId)
    //     axios.post(`http://localhost:3000/users/deleteproduct/?id=${productId}`).then((response) => {
    //         console.log('all finish')
    //     })
    // }


    const getData = () => {
        axios.post(`http://localhost:3000/users/editproducts`, id).then((response) => {
            console.log('all finish')
            console.log(response.data)
            setValue(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const textChange = (e) => {
        const newData = { ...value }
        newData[e.target.id] = e.target.value
        setValue(newData)
    }






    const subHandler = (e) => {
        e.preventDefault()
        console.log('it is working')
        axios.post(`http://localhost:3000/users/updateproducts`, value).then((response) => {
            console.log('all finish')
            console.log(response.data)
            setValue(response.data)
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <div className="col-md-12">
            <form onSubmit={subHandler}>
                <div className="row mt-3 bg-dark">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="Imgspace">

                                </div>
                                <div className="fileinput pt-4">
                                    <input id="firstimg" className="text-light" type="file" />
                                </div>
                                <div className="Imgspace">

                                </div>
                                <div className="fileinput pt-4">
                                    <input id="secondimg" className="text-light" type="file" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="Imgspace">

                                </div>
                                <div className="fileinput pt-4">
                                    <input id="thirdimg" className="text-light" type="file" />
                                </div>
                                <div className="Imgspace">

                                </div>
                                <div className="fileinput pt-4">
                                    <input id="forthimg" className="text-light" type="file" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 bg-dark">
                        <div className="container">
                            <div className="fields">
                                <div className="row">
                                    <input id="name" onChange={textChange} className="detailInp text-light bg-dark" value={value.name} placeholder=" Name" type="text" />
                                </div>
                                <div className="row  mt-5">
                                    <input id="quantity" onChange={textChange} className="detailInp text-light bg-dark" value={value.quantity} placeholder=" Quantity" type="text" />
                                </div>
                                <div className="row pt-5 mt-5">
                                    <input id="category" onChange={textChange} className="detailInp text-light bg-dark" value={value.category} placeholder=" Category" type="text" />
                                </div>
                                <div className="row pt-5 mt-5">
                                    <input id="description" onChange={textChange} className="detailInp text-light bg-dark" value={value.description} placeholder=" Description" type="text" />
                                </div>
                                <div className="row  mt-5">
                                    <input id="price" onChange={textChange} className="detailInp text-light bg-dark" value={value.price} placeholder=" Price" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row bg-dark pt-5">
                    <div className="col-md-12 text-center pt-5">
                        <div className="button">
                            <button type="submit" className="btn bg-light">EDIT PRODUCTS</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProducts;