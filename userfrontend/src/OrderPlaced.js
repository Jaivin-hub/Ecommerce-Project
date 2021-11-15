import React from 'react'
import Footer from './Footer'
import {Link} from 'react-router-dom'

function OrderPlaced() {
    console.log('etheeeda mwonee')
    return (
        <div className="">
            <div className="mainbody row ">
                <div className="col-md-6 pt-5 text-end">
                    <img src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/icons-fast-delivery.png" alt="" />
                </div>
                <div className="col-md-6 pt-5" style={{ marginTop: "8%" }}>
                    <h1 className="mt-5" ><strong>Tankyou For Your Order</strong></h1>
                    <h5 className="mt-3" style={{ marginLeft: "11%" }}><strong>Your Order On The Way</strong></h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 text-end">
                <Link ><button className="btn">View Order</button></Link>
                </div>
                <div className="col-md-6">
                <Link to='/'><button className="btn">Continue Shoping</button></Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OrderPlaced
