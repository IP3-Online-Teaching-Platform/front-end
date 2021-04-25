import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51IiKQRG8K4iX8E0hGap9q85SRNR6UjerWHwJFt2LU4vkt0Da2gIzsvzzA9dBlKpgtl994w26YHIOZ9rQtDmTd5Z700NimAMQBj"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe = {stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}