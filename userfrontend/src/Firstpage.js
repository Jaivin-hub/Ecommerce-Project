import React, { useState } from 'react'
import './style.css'

function Firstpage() {

    const [day, setDay] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()

    const dayChange = (e) => {
        // var newValue = { ...day }
       var newValue = e.target.value
        setDay(newValue)
    }


    const monthChange = (e) => {
        var newValue = { ...day }
        newValue = e.target.value
        setMonth(newValue)
    }

    const yearChange = (e) => {
        var newValue = { ...day }
        newValue = e.target.value
        setYear(newValue)
    }
    console.log(day.length)
    

    return (
        <div>
            <div className="main">
                <img style={{ width: '100%' }} src="https://cutewallpaper.org/21/alcohol-wallpaper/24-Liquor-HD-Wallpapers-Background-Images-Wallpaper-Abyss.jpg" alt="jh" />
                <small className="text text-justify">TO ACCESS OUR YOUROWN WEBSITES  YOU MUST <br /> BE OF LEGAL DRINKING AGEIN YOUR  COUNTRY <br />  OF ACCESS OR OLDER.</small>
                <p className="dateofbirth">PLEASE ENTER YOUR DATE OF BIRTH:</p>
                <div className="textInput mt-5 ">
                    <div className="input_wrapper__1lXNx-">
                        <label className="input_label__2EQrH-" for="DD">Date</label>
                        <div className="input_inputBox__1bIPw-">
                            <input className="input_input__1Zlh--" placeholder="DD" onChange={dayChange} type="number" id="DD" value={day} maxLength="2" />
                        </div>
                    </div>
                    {day.length>2 ?
                        <div className="input_errorMessage__2BX8K-">
                            <span className="input_errorIcon__24vck-"></span>
                            "Invalid day input"
                        </div>
                        : null
                    }

                    <div className="input_wrapper__1lXNx-">
                        <label className="input_label__2EQrH-" for="DD">Month</label>
                        <div className="input_inputBox__1bIPw-">
                            <input className="input_input__1Zlh--" placeholder="MM" onChange={monthChange} type="number" id="MM" value={month} maxLength='2' />
                        </div>
                    </div>
                    <div className="input_wrapper__1lXNx- input_wrapperLong__2nT28-">
                        <label className="input_label__2EQrH-" for="DD">Year</label>
                        <div className="input_inputBox__1bIPw-">
                            <input className="input_input__1Zlh--" onChange={yearChange} placeholder="YYYY" type="number" id="YYYY" value={year} maxLength='2' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Firstpage
