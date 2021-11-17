import React, { useState, useEffect } from 'react';
import instance from './axios-orders'
import { BiRupee } from "react-icons/bi";
import './card.css'

function Mostpopular() {


    useEffect(() => {
        getData()
        getCategory()
    }, [])



    const [data, setData] = useState([])

    const [category, setcategory] = useState([])

    const getData = () => {
        instance.get('/getdetails').then((res) => {
            const newData = res.data
            setData(newData)

        })

    }

    const getCategory=()=>{
        data.filter(async item => {
            if (item.category == "jack daniels") {
                await setcategory(item)
            }
            // else if(item.category==)
        })
    }

    console.log(category)
    


    return (
        <div classNameNameName="col-md-12">
            <header>
                <div className="container text-center">


                    <div className="logo">
                        <h1><b>MOST POPULAR PRODUCTS</b></h1>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row">


                    {category.map((item, key) => {
                        return (
                            <div className="col-md-4">
                                <hr />
                                <div className="profile-card-6"><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-6.jpg" className="img img-responsive" />
                                    <div className="profile-name">{item.name}
                                    </div>
                                    <div className="profile-position">{item.category}</div>
                                    <div className="profile-overview">
                                        <div className="profile-overview">
                                            <div className="row text-center">
                                                <div className="col-xs-4">
                                                    <h3>1</h3>
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className="col-xs-4">
                                                    {/* <h3>50</h3> */}
                                                    <p>{item.description}</p>
                                                </div>
                                                <div className="col-xs-4">
                                                    <h3><BiRupee />{item.price}/-</h3>
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default Mostpopular;
