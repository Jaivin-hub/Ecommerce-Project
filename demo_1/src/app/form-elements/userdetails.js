import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

function Userdetails() {

    const id = useParams()
    const userId=id.id

    const [details,setDetails] = useState([])

    useEffect(() => {
        getData()
    },[])

    const getData=()=>{
        console.log('funccccc')
        axios.get(`http://localhost:3000/users/getaddress/${userId}`).then((res)=>{
            console.log('done with details')
            console.log(res.data)
            setDetails(res.data)
        })
    }
   



    return (
        <div>
            <div className="row">
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">

                                </div>
                                <div className="col-3">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">

                                </div>
                                <div className="col-3">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">

                                </div>
                                <div className="col-3">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">

                                </div>
                                <div className="col-3">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="aligner-wrapper text-center pt-5">

                               <img style={{width: '70%',borderRadius: '15px'}} src="https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg" alt="" />
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-8 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-row justify-content-between">
                                <h4 className="card-title mb-1">Billing Address</h4>
                                <p className="text-muted mb-1">Client Address Status</p>
                            </div>
                            {details.map((itm,k)=>{
                                return(
                                    <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="preview-list">
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">firstname</h6>
                                                    <p className="text-muted mb-0">{itm.firstname}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                               
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Country</h6>
                                                    <p className="text-muted mb-0">India</p>
                                                </div>
                                              
                                            </div>
                                        </div>
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                              
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">State</h6>
                                                    <p className="text-muted mb-0">{itm.statename}</p>
                                                </div>
                                               
                                            </div>
                                        </div>
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                               
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Addressline1</h6>
                                                    <p className="text-muted mb-0">{itm.addressline1}</p>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="preview-item">
                                            <div className="preview-thumbnail">
                                               
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">postcode</h6>
                                                    <p className="text-muted mb-0">{itm.postcode}</p>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="preview-list">
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                               
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">lastname</h6>
                                                    <p className="text-muted mb-0">{itm.lastname}</p>
                                                </div>
                                               
                                            </div>
                                        </div>
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                               
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">company</h6>
                                                    <p className="text-muted mb-0">{itm.companyname}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                               
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">City</h6>
                                                    <p className="text-muted mb-0">{itm.cityname}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                               
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Addressline2</h6>
                                                    <p className="text-muted mb-0">{itm.addressline2}</p>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="preview-item">
                                            <div className="preview-thumbnail">
                                               
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">phone</h6>
                                                    <p className="text-muted mb-0">{itm.phone}</p>
                                                </div>
                                                
                                            </div>
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
            </div>
            <div className="row">
                <div className="col-sm-4 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );

}

export default Userdetails;