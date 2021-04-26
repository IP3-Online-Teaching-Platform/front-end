import React, {useState} from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { Link } from "react-router-dom";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("https://ip3-stripe-payment.herokuapp.com/payment", {
                amount: 2000,
                id: id
            })

            if(response.data.success) {
                console.log("successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ?
        <div className="payment-form-container">
            <form className="payment-form-display" onSubmit={handleSubmit} style={{textAlign: 'center'}}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
                <div>
                    <button className="payment-form-submit-button" style={{marginRight: '3px'}}>Make Payment</button>
                    <button className="payment-form-submit-button" onClick={() => {window.location.href = '/dashboard'}} style={{marginLeft: '3px'}}>Home</button> 
                </div> 
            </form>
        </div>
        :
        <div>
            <h2>Payment Completed</h2>
            <Link to="/dashboard" className="button">Home</Link>  
        </div>
        }
            
        </>
    )
}