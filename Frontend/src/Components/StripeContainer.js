import React from 'react'
import { Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_51Io5JmSDMSglJRRmK38cBHN3xwNNfz1rv5fy9Rsj0PKfmw45hwWekW5niLIHMLP38kFB4m1Dz3u6GIZ8wagLhM8l005UEHYV91"

const stripTestPromise = loadStripe(PUBLIC_KEY);


export default function StripeContainer(props) {
    return (
        <div>
            <Elements stripe = {stripTestPromise}>
                <PaymentForm {...props} />

            </Elements>
        </div>
    )
}
