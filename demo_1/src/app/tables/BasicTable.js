import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { BiBlock } from "react-icons/bi";
import instance from '../axios-orders'
export function BasicTable() {

  const [data, setData] = useState([])

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = () => {
    instance.get('/getUser').then((res) => {
      const mongodata = res.data
      setData(mongodata)
    }).catch((err) => {
      console.log('something went error while data fetching' + err)
    })
  }

  const blockHandler = (id) => {
    instance.post('/blockUser', { id: id }).then((res) => {
    })
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> User Mangement </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>UserManagement</a></li>
            <li className="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div style={{ height: "55em" }} className="col-lg-12 grid-margin stretch-card">
          <div style={{ overflow: 'scroll', overflowX: 'hidden', overflowY: 'scroll' }} className="card">
            <div className="card-body">
              <h4 className="card-title">Users</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th> User </th>
                      <th> First name </th>
                      <th> Last name </th>
                      <th> Email </th>
                      <th> Phone No </th>
                      <th> Block </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, key) => {
                      return (
                        <tr>
                          <td className="py-1">
                            {item.image ?
                              <img src={item.image} alt="user icon" />
                              :
                              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPb_pSj-ir-9eB6mi0lVJdQP1KKHiB8fRBS1CbmOXGd9Z1FEGMJHbEKhahwhWLGSaEXY&usqp=CAU' alt="user icon" />

                            }
                          </td>
                          <td>{item.firstname} </td>
                          <td>{item.lastname}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          {item.ActiveStatus == "" ?
                            <td style={{ cursor: 'pointer' }} onClick={() => { blockHandler(item._id) }}><BiBlock /></td>
                            :
                            <td>Blocked</td>
                          }
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
  // }
}

export default BasicTable
