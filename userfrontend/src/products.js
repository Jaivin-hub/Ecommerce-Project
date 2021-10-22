import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiRupee } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {GiMoneyStack} from 'react-icons/gi';
import {AiFillHeart} from 'react-icons/ai';


import './card.css'


function Products() {


    useEffect(() => {
        getData()
    }, [])

    let Userid = localStorage.getItem('id')

    const [data, setData] = useState([])
    const [show,setShow] = useState(false)

    const getData = () => {
        axios.get('http://localhost:3000/users/getdetails').then((res) => {
            const newData = res.data
            setData(newData)
        })
    }

    const hoverCard = () => {
        console.log('hovered');
        setShow(true)
    }

    const leaveCard=()=>{
        setShow(false)
    }

    const productSelected=(id)=>{
        console.log(id)
        let data = {id,Userid}
        axios.post(`http://localhost:3000/users/senttheproduct`,data).then((res) => {
            console.log('success');
        })
    }


    return (
        <div classNameNameName="col-md-12 pt-4">
            <header>
                <div className="container text-center">


                    <div className="logo">
                        <h1><b>Buy a Bottle of vodka & GET A BOTTLE OF</b></h1>
                    </div>

                    <h1>DAILY'S Grenadine Syrup</h1>

                </div>
            </header>

            <div className="container">
                <div className="row">
                    {/* <div className="col-md-4">
    <h4 className="text-center"><strong>STYLE 1</strong></h4>
    <hr/> */}
                    {/* <div className="profile-card-2"><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-2.jpg" className="img img-responsive" />
        <div className="profile-name">JOHN DOE</div>
        <div className="profile-username">@johndoesurname</div>
        <div className="profile-icons"><a href="#"><i className="fa fa-facebook"></i></a><a href="#"><i className="fa fa-twitter"></i></a><a href="#"><i className="fa fa-linkedin"></i></a></div>
    </div> */}
                    {/* </div> */}

                    {data.map((item, key) => {
                        return (
                            <div className="col-md-4">
                                {/* <h4 className="text-center"><strong>STYLE 2</strong></h4> */}
                                <hr />
                                <div onMouseLeave={leaveCard} onMouseEnter={hoverCard} className="card profile-card-6"><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-6.jpg" className="img img-responsive" />
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
                                                </div>
                                                {show?
                                                <div className="row">
                                                <div className="col-md-4">
                                                    <button onClick={()=>{productSelected(item._id)}} className="usebtn"><GiShoppingBag/></button>
                                                </div>
                                                <div className="col-md-4">
                                                <button className="usebtn"><AiFillHeart /></button>
                                                </div>
                                                <div className="col-md-4">
                                                <button className="usebtn"><GiMoneyStack /></button>
                                                </div>
                                            </div>
                                                :null}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/* <div className="col-md-4">
    <h4 className="text-center"><strong>STYLE 3</strong></h4>
    <hr/>
    <div className="profile-card-4 text-center"><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg" className="img img-responsive" />
        <div className="profile-content">
            <div className="profile-name">John Doe
                <p>@johndoedesigner</p>
            </div>
            <div className="profile-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</div>
            <div className="row">
                <div className="col-xs-4">
                    <div className="profile-overview">
                        <p>TWEETS</p>
                        <h4>1300</h4></div>
                </div>
                <div className="col-xs-4">
                    <div className="profile-overview">
                        <p>FOLLOWERS</p>
                        <h4>250</h4></div>
                </div>
                <div className="col-xs-4">
                    <div className="profile-overview">
                        <p>FOLLOWING</p>
                        <h4>168</h4></div>
                </div>
            </div>
        </div>
    </div>
</div> */}
                </div>
            </div>
        </div>
    )
}
export default Products