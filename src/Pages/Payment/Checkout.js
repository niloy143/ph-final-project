import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import ButtonSpinner from '../../components/ButtonSpinner';
import { PhContext } from '../../Contexts/Contexts';

const Checkout = ({ booking }) => {
    const { user } = useContext(PhContext);
    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const { price, email, patient, _id } = booking;
    const [processing, setProcessing] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:1234/create-payment-intent?email=${user?.email}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(({ clientSecret }) => setClientSecret(clientSecret))
            .catch(err => console.error(err))
    }, [price, user])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const card = elements.getElement(CardElement);

        if (!elements || !card || !stripe) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                    billing_details: {
                        patient,
                        email
                    },
                },
            },
        );

        if (error || confirmationError) {
            setCardError(error?.message || confirmationError?.message);
            setProcessing(false);
        }
        else if (paymentIntent.status === 'succeeded') {
            const { amount, currency, created: paidAt, id: trxId } = paymentIntent;
            const payment = { amount, currency, paidAt, trxId, _id };

            fetch(`http://localhost:1234/payments?email=${user?.email}`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(() => { })
                .catch(err => console.error(err))
                .finally(() => {
                    setPaymentDetails(payment);
                    setProcessing(false);
                })
        }

    };
    return (
        <div className="my-12 w-64">
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button className='btn btn-sm mt-3' type="submit" disabled={!stripe || !elements || !clientSecret || processing}>
                    {processing ? <ButtonSpinner size={22} /> : 'Pay'}
                </button>
            </form>
            {cardError && <small className='text-error'>{cardError}</small>}
            {
                paymentDetails && <div>
                    <p className='text-success'>Your payment is successful</p>
                    <p>Transaction ID: {paymentDetails.trxId}</p>
                </div>
            }
        </div>
    );
};

export default Checkout;