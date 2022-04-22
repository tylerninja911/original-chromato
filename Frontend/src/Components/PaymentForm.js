import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

import { useHistory } from 'react-router-dom';
import { serviceCallAuth } from '../services/serviceCall';
import { placeOrder } from '../services/orderService';

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const items = useSelector((state) => state.itemReducer);
  const dispatch = useDispatch()
  const total =
    items.reduce(
      (total, item) => parseInt(total) + parseInt(item.price * item.amount),
      0
    ) + 40;
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        let response;
        // if (process.env.NODE_ENV === 'production') {
          placeOrder(
            {
             id,
             items: props.items,
             shippingFee: props.shippingFee,
           },
         

        //   response = await axios.post(`/api/v1/orders`, {
        //     id,
        //     items: props.items,
        //     shippingFee: props.shippingFee,
        //   });
        //   console.log(response);
        // // } else {

        //   placeOrder(
        //      {
        //       id,
        //       items: props.items,
        //       shippingFee: props.shippingFee,
        //     },
          
          () => {
            setSuccess(true);
            setTimeout(() => history.push('/'), 1500);
          }

          )
        }catch (error) {
          console.log('Error', error);
        }
      // } 
    // } else {
    //   console.log(error.message);
    // }
  }
}

  return (
    <>
      {!success ? (
        <div>
          <div className="font-barlow font-semibold">Payment </div>
          <div className="font-barlow text-gray-100 my-2">
            Add credit / debit card
          </div>

          <form onSubmit={handleSubmit} className="">
            <fieldset className="">
              <div className="">
                <div className="h-10   rounded-md border border-gray flex items-center px-2">
                  <CardNumberElement />
                </div>
                <div className="flex justify-between  mt-6">
                  <div className="h-10 w-48%  rounded-md border border-gray flex items-center px-2">
                    <CardExpiryElement />
                  </div>
                  <div className="h-10 w-48% rounded-md border border-gray flex items-center px-2">
                    <CardCvcElement />
                  </div>
                </div>
              </div>
            </fieldset>
            <button className="focus:outline-none mt-6 w-full mr-1 h-8 bg-yellow rounded-md flex justify-center items-center font-barlow-semi-condensed">
              Pay
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p className='font-barlow-semi-condensed'>Order placed successfully!</p>
        </div>
      )}
    </>
  );
}
