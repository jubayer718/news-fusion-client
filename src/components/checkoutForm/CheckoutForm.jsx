import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../useAxiosSecure/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { use } from "react";


const CheckoutForm = ({subscriptionPeriod, price }) => {
  const { user } = UseAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');
  const navigate=useNavigate()
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price: price })
        .then(res => {
          // console.log('inside checkOut form', res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
    }
  },[axiosSecure,price])
// console.log('client secret',clientSecret);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })


    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[paymentMethod]', paymentMethod);
      setError('')
    }


    //confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,{
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name:user?.displayName||'anonymous'
        }
      }
    })
 
    if (confirmError) {
      console.log(confirmError);
    } else {
     if (paymentIntent.status === 'succeeded') {
        // console.log('paymentIntent', paymentIntent);
     const {data}=await axiosSecure.put(`/subscribe/${user.email}`, {  duration:subscriptionPeriod });
      //  console.log(data);
        // now save the payment in the database
        const payment = {
          email: user.email,
          price: price,
          transactionId:paymentIntent.id,
          date: new Date(), //convert date ,use moment js
          // cartIds: cart.map(item => item._id),
          // menuIds: cart.map(item => item.menuId),
          status: 'pending',

        }
        const res = await axiosSecure.post('/payments', payment);
        // refetch();
        if (res.data.insertedId) {
          Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Payment success",
  showConfirmButton: false,
  timer: 1500
});
        }
       navigate('/')
        
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="mt-5 w-full bg-orange-400 hover:bg-orange-600 duration-300 text-white font-bold py-2 rounded shadow-lg" type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className="text-xl text-red-400 mt-2">{ error}</p>
    </form>
  );
};

export default CheckoutForm;