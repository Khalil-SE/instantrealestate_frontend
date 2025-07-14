import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

function StripeCardForm({ clientSecret, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe not loaded. Please refresh the page.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      }
    });

    if (paymentError) {
      setError(paymentError.message || "Payment failed.");
      toast.error(paymentError.message || "Payment failed.");
    } else if (paymentIntent.status === 'succeeded') {
      toast.success("Payment successful!");
      onSuccess(paymentIntent);  // e.g., reload subscription data
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#212529',
                '::placeholder': { color: '#adb5bd' },
              },
              invalid: {
                color: '#dc3545',
              },
            },
          }}
        />
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Pay Now"}
        </Button>
      </div>
    </form>
  );
}

export default StripeCardForm;
