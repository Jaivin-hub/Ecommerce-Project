import React, { useRef, useEffect,useState } from 'react'
import axios from 'axios'


function PayPal(props) {
    const paypal = useRef()

    const userId = localStorage.getItem('id')

    console.log('propsss--'+props.value.addressId)
    const total = props.value.granttotal
    const addressId = props.value.addressId

    const [div,setDiv]= useState()


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
                console.log(order)
                console.log('uproved')
                const details = {total,userId,addressId}
                axios.post(`http://localhost:3000/users/orderplaced`,details).then((res) => {
                    console.log('Order placed')
                   
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
