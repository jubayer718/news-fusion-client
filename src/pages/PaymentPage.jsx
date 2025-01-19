
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/checkoutForm/CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { subscriptionPeriod,price } = location.state || {};
  //  console.log(price);


  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
        <p className="mb-4">You have selected: <strong>{subscriptionPeriod}</strong></p>
        <p className="mb-4">pay total: <strong>${ price}</strong></p>
        <p className="mb-6">Proceed with the payment to activate your subscription.</p>

        <Elements stripe={stripePromise}>
          <CheckoutForm subscriptionPeriod={subscriptionPeriod} price={price}></CheckoutForm>
        </Elements>

       
      </div>
    </div>
  );
};

export default PaymentPage;
