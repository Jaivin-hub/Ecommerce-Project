import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

function PayPal(props) {
    const paypal = useRef()

    let history = useHistory();

    const userId = localStorage.getItem('id')

    console.log('propsss--' + props.value.addressId)
    const total = props.value.granttotal
    const addressId = props.value.addressId

    const [div, setDiv] = useState()
    const [showPage, setShowPage] = useState(false)


    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                console.log('paypal activated')
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            description: 'cool looking table',
                            amount: {
                                currency_code: 'USD',
                                value: props.value.granttotal
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                const payment = 'paypal'
                const details = { total, userId, addressId, payment }
                history.push("/orderplaced");
                axios.post(`http://localhost:3000/users/orderplaced`, details).then((res) => {

                })

            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default PayPal
