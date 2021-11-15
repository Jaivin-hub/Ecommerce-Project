import { Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
import { Dropdown, ButtonGroup } from 'react-bootstrap';


function Sailes() {

  const [values, setValues] = useState()
  const [coupons, setCoupons] = useState([])
  const [ok, setOk] = useState(true)
  const [categoryDetails, setCategoryDetails] = useState([])
  const [offers, setOffers] = useState([])



  useEffect(() => {
    getSalesData()
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

  const [salesReport, setSalesReport] = useState([])


  const fetchReport = (type) => {
    axios.get(`http://localhost:3000/users/fetchreport/${type}`).then((res) => {
      console.log(res.data)
      setSalesReport(res.data)
    })
  }


  const getSalesData = () => {
    axios.get('http://localhost:3000/users/getSalesReport').then((res) => {
      setSalesReport(res.data)
    })
  }







  return (
    <div className="row ">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h4 className="card-title">Sales Report</h4>
              </div>
              <div className="col-md-6 text-center">
                <div className="row text-center">
                  <Dropdown>
                    <Dropdown.Toggle variant="btn btn-outline-primary" id="dropdownMenuOutlineButton1">
                      Reports
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Header></Dropdown.Header>
                      <Dropdown.Header  onClick={() => { fetchReport('monthly') }}>Monthly</Dropdown.Header>
                      <Dropdown.Item onClick={() => { fetchReport('yearly') }}>Yearly</Dropdown.Item>
                      <Dropdown.Item onClick={() => { fetchReport('weekly') }}>Weekly</Dropdown.Item>
                      <Dropdown.Item onClick={() => { fetchReport('daily') }}>Daily</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>


                  <Dropdown>
                    <Dropdown.Toggle variant="btn btn-outline-primary" id="dropdownMenuOutlineButton1">
                      Download
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Header>< ReactHtmlTableToExcel className="btn" table="salesReport" filename="Excel file" sheet="Sheet" buttonText="Export to Excel" /></Dropdown.Header>
                      
                    </Dropdown.Menu>
                  </Dropdown>
                </div>



                {/* <button onClick={()=>{fetchReport('monthly')}} className="btn btn-primary">Monthly</button>
                  <button onClick={()=>{fetchReport('yearly')}} className="btn btn-primary">Yearly</button>
                  <button onClick={()=>{fetchReport('weekly')}} className="btn btn-primary">Weekly</button>
                  <button onClick={()=>{fetchReport('daily')}} className="btn btn-primary">Daily</button> */}

                {/* <button style={{borderRadius:'5px'}} className="">download sales report</button> */}
                {/* <div className="badge badge-outline-light"><button className="">download sales report</button></div> */}
                {/* <div className="badge badge-outline-light"> < ReactHtmlTableToExcel className="btn" table="salesReport" filename="Excel file" sheet="Sheet" buttonText="Export to Excel" /></div> */}

              </div>
            </div>
            <div className="table-responsive">
              <table className="table" id="salesReport">
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
                    <th> Client id </th>
                    <th> Order No </th>
                    <th> Product Cost </th>
                    <th>Order Date</th>
                    <th> Delivered Date </th>
                    <th> Sales Status </th>
                    <th> Payment Status </th>
                  </tr>
                </thead>
                <tbody>
                  {salesReport.map((item, key) => {
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
                            <span className="pl-2">{item.userid}</span>
                          </div>
                        </td>
                        <td>  {key}</td>
                        <td> ${item.total} </td>
                        <td>{item.orderdate}</td>
                        <td> {item.date} </td>
                        <td>
                          <div className="badge badge-outline-success">Delivered</div>
                        </td>

                        <td>
                          <div className="badge badge-outline-success">Approved</div>
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
  )
}

export default Sailes
