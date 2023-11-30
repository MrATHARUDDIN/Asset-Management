import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const totalPrice = 30;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card
      });

      if (error) {
        console.error('Payment error', error);
        setError(error.message);
      } else {
        console.log('Payment method', paymentMethod);
        setError('');
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        }
      });

      if (confirmError) {
        console.error('Confirm error');
      } else {
        console.log('Payment intent', paymentIntent);
        if (paymentIntent.status === 'succeeded') {
          console.log('Transaction id', paymentIntent.id);
          setTransactionId(paymentIntent.id);

          const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: 'pending'
          };

          const res = await axiosSecure.post('/payments', payment);
          console.log('Payment saved', res.data);

          if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for Buy Our PKG",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/AddEmployee');
          }
        }
      }
    } catch (error) {
      console.error('Unhandled error', error);
    }
  };

  return (
    <div className="grid justify-center mt-32">
      <form onSubmit={handleSubmit} className="w-[39rem] bg-blue-100 p-6">
        <h1 className="mt-1 mb-5 font-semibold text-lg">Payment</h1>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn bg-pink-500 w-96 text-white p-4 mt-20"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
