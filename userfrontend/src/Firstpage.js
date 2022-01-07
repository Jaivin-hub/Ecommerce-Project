import React, { useState, useEffect } from 'react'
import './style.css'
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
function Firstpage() {

    useEffect(() => {
        auth()

    }, [])

    const [showVideo, setShowvideo] = useState(false)
    const auth = () => {
        let token = localStorage.getItem('token')
        if (token == undefined) {
            history.push("/");
            console.log('here........')
            setShowvideo(true)
        } else {
            history.push('/home')
        }
    }

    let history = useHistory();
    const numOfFields = 3;
    const [data, setData] = useState({ DD: '', MM: '', YYYY: '' })
    const [show, setShow] = useState(false)

    const { DD, MM, YYYY } = { ...data }
    console.log(DD, MM, YYYY)

    if (DD.length == 2 && MM.length == 2 && YYYY.length == 4) {
        const userYear = parseInt(YYYY)
        const userMonth = parseInt(MM)
        const userDay = parseInt(DD)
        const currentDay = new Date().getUTCDate() - 1
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        console.log('d', currentYear, currentMonth, currentDay)
        if (currentYear - userYear >= 18) {
            history.push("/home");
        } else {
            history.push("/");
        }
    }

    const handleChange = e => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        if (value.length >= maxLength) {
            if (parseInt(fieldIndex, 10) < 3) {
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
        }
    }
    console.log(showVideo)


    return (
        <div>
            <div className="main col-12" style={{ backgroundColor: 'black' }}>

                <ReactPlayer
                    url='/main.mp4'
                    width='100%'
                    height='100vh'
                    playing
                    muted
                    controls={false}
                    loop
                    config={{
                        filetrue: {
                            attributes: {
                                autoPlay: true,
                                muted: true
                            }
                        }
                    }}
                />


                <small className="text text-justify">TO ACCESS MY YOUROWN WEBSITES  YOU MUST <br /> BE OF LEGAL DRINKING AGEIN YOUR  COUNTRY <br />  OF ACCESS OR OLDER.</small>
                <p className="dateofbirth">PLEASE ENTER YOUR DATE OF BIRTH:</p>


                <div className="textInput mt-5 ">
                    <div className="input_wrapper__1lXNx-">
                        <label className="input_label__2EQrH-" for="DD">Date</label>
                        <div className="input_inputBox__1bIPw-">
                            <input className="input_input__1Zlh--" placeholder="DD" name="ssn-1" onChange={handleChange} type="number" id="DD" maxLength={2} />
                        </div>
                    </div>



                    <div className="input_wrapper__1lXNx-">
                        <label className="input_label__2EQrH-" for="DD">Month</label>
                        <div className="input_inputBox__1bIPw-">
                            <input className="input_input__1Zlh--" placeholder="MM" name="ssn-2" onChange={handleChange} type="number" id="MM" maxLength={2} />
                        </div>
                    </div>
                    <div className="input_wrapper__1lXNx- input_wrapper__1lXNxt- input_wrapperLong__2nT28-">
                        <label className="input_label__2EQrH-" for="DD">Year</label>
                        <div className="input_inputBox__1bIPw-">
                            <input className="input_input__1Zlh--" onChange={handleChange} name="ssn-3" placeholder="YYYY" type="number" id="YYYY" maxLength={4} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Firstpage
