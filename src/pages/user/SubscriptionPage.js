// ==== SubscriptionPage.js ====
import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Table,
  Alert,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../store/useAuth";
import {
  fetchPlans,
  fetchCurrentSubscription,
  fetchSubscriptionHistory,
  cancelSubscription,
  resumeSubscription,
  startSubscription,
  schedulePlanChange,
  openBillingPortal,
} from "../../services/subscriptionService";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import StripeCardFormModal from "../../components/Stripe/StripeCardFormModal";

import ContentBlockCard from "../../components/Form/ContentBlockCard";

function SubscriptionPage() {
  const { user, subscription, setSubscription } = useAuth();

  const [plans, setPlans] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [changingPlan, setChangingPlan] = useState(false);
  const [error, setError] = useState(null);

  // Stripe Modal
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [stripeClientSecret, setStripeClientSecret] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const sub = await fetchCurrentSubscription();
      setSubscription(sub);

      const [plansData, historyData] = await Promise.all([
        fetchPlans(),
        fetchSubscriptionHistory(),
      ]);
      setPlans(plansData);
      setHistory(historyData);
    } catch (err) {
      console.error("Subscription load error:", err);
      setError("Unable to load subscription info.");
    } finally {
      setLoading(false);
    }
  }, [setSubscription]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubscribe = async (planId) => {
    setSubscribing(true);
    try {
      const res = await startSubscription(user.email, planId);
      setStripeClientSecret(res.client_secret);
      setShowStripeModal(true);
    } catch (err) {
      toast.error("Failed to start subscription.");
    } finally {
      setSubscribing(false);
    }
  };

  const handleCancelConfirm = async () => {
    setCanceling(true);
    try {
      await cancelSubscription();
      toast.success("Subscription will be cancelled at period end.");
      const updated = await fetchCurrentSubscription();
      setSubscription(updated);
    } catch (err) {
      toast.error("Cancel failed.");
    } finally {
      setCanceling(false);
      setShowCancelModal(false);
    }
  };

  const handleResume = async () => {
    try {
      await resumeSubscription();
      toast.success("Subscription cancellation reversed.");
      const updated = await fetchCurrentSubscription();
      setSubscription(updated);
    } catch (err) {
      console.error(err);
      toast.error("Resume failed.");
    }
  };

  const handlePlanChange = async () => {
    if (!selectedPlanId) return;
    setChangingPlan(true);
    try {
      await schedulePlanChange(selectedPlanId);
      toast.success("Your new plan will be applied after the current period ends.");
      setSelectedPlanId(null);
    } catch (err) {
      console.error("Plan change error:", err);
      toast.error(err?.response?.data?.error || "Failed to schedule plan change.");
      // toast.error(err?.response?.data?.detail || "An error occurred while changing the plan.");
    } finally {
      setChangingPlan(false);
    }
  };

  const isInactive = subscription?.is_active === false;

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {isInactive ? (
        <ContentBlockCard>
          <h2 className="mb-4 text-center">Your Subscription Has Ended</h2>
          <p className="text-center text-muted mb-4">
            Select a plan to continue using the platform.
          </p>
          <Row className="g-4">
            {plans.map((plan) => (
              <Col md={6} lg={4} key={plan.id}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <Card.Title>{plan.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"} Plan
                    </Card.Subtitle>
                    {plan.description && (
                      <ul className="mt-3">
                        {plan.description.split("\n").map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    )}
                    <div className="d-grid mt-4">
                      <Button
                        variant="primary"
                        disabled={subscribing}
                        onClick={() => handleSubscribe(plan.id)}
                      >
                        {subscribing ? "Processing..." : "Subscribe"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </ContentBlockCard>
      ) : (
        <ContentBlockCard>
          <h2 className="mb-4 text-center">Your Current Subscription</h2>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title>{subscription.plan}</Card.Title>
              <Card.Text>
                Status: <strong>{subscription.status}</strong>
                <br />
                Start:{" "}
                <strong>
                  {new Date(subscription.current_period_start).toLocaleDateString()}
                </strong>
                <br />
                End:{" "}
                <strong>
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </strong>
                <br />
                Cancel at period end:{" "}
                <strong>{subscription.cancel_at_period_end ? "Yes" : "No"}</strong>
              </Card.Text>

              {subscription.cancel_at_period_end ? (
                <Button variant="success" onClick={handleResume}>
                  Resume Subscription
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={() => setShowCancelModal(true)}
                  className="me-2"
                >
                  Cancel Subscription
                </Button>
              )}

              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={openBillingPortal}
              >
                Update Payment Method
              </Button>
            </Card.Body>
          </Card>

          <h4>Schedule Plan Change</h4>
          <Form.Select
            className="mb-3"
            value={selectedPlanId || ""}
            onChange={(e) => setSelectedPlanId(e.target.value)}
          >
            <option value="" disabled>
              Select a new plan
            </option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </Form.Select>
          <Button
            variant="primary"
            disabled={!selectedPlanId || changingPlan}
            onClick={handlePlanChange}
          >
            {changingPlan ? "Processing..." : "Schedule Change"}
          </Button>

          <h4 className="mt-5 mb-3">Payment History</h4>
          {history.length === 0 ? (
            <p className="text-muted">No payment history yet.</p>
          ) : (
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount Paid</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
                    <td>${entry.amount_paid.toFixed(2)}</td>
                    <td>
                      <a
                        href={entry.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Invoice
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </ContentBlockCard>
      )}

      {/* Cancel Confirmation */}
      <ConfirmModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelConfirm}
        loading={canceling}
        title="Cancel Subscription"
        body="Are you sure you want to cancel your subscription at the end of the billing cycle?"
        confirmText="Yes, Cancel"
      />

      {/* Stripe Modal */}
      <StripeCardFormModal
        show={showStripeModal}
        onClose={() => setShowStripeModal(false)}
        clientSecret={stripeClientSecret}
      />
    </Container>
  );
}

export default SubscriptionPage;




// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Container,
//   Card,
//   Button,
//   Spinner,
//   Row,
//   Col,
//   Table,
//   Alert,
//   Form,
//   Modal,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import useAuth from "../../store/useAuth";
// import {
//   fetchPlans,
//   fetchCurrentSubscription,
//   fetchSubscriptionHistory,
//   cancelSubscription,
//   startSubscription,
//   schedulePlanChange,
//   resumeSubscription,
//   openBillingPortal,
// } from "../../services/subscriptionService";
// import ConfirmModal from "../../components/Modal/ConfirmModal";
// import StripeCardForm from "../../components/Stripe/StripeCardForm"; // Ensure this exists

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// function SubscriptionPage() {
//   const { user, subscription, setSubscription } = useAuth();

//   const [plans, setPlans] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState(false);
//   const [canceling, setCanceling] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [error, setError] = useState(null);

//   const [selectedPlanId, setSelectedPlanId] = useState(null);
//   const [changingPlan, setChangingPlan] = useState(false);

//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [clientSecret, setClientSecret] = useState(null);

//   const loadData = useCallback(async () => {
//     try {
//       const sub = await fetchCurrentSubscription();
//       setSubscription(sub);
//       const [plansData, historyData] = await Promise.all([
//         fetchPlans(),
//         fetchSubscriptionHistory(),
//       ]);
//       setPlans(plansData);
//       setHistory(historyData);
//     } catch (err) {
//       console.error("Subscription load error:", err);
//       setError("Unable to load subscription info.");
//     } finally {
//       setLoading(false);
//     }
//   }, [setSubscription]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleSubscribe = async (planId) => {
//     setSubscribing(true);
//     try {
//       const res = await startSubscription(user.email, planId);
//       setClientSecret(res.client_secret);
//       setShowPaymentModal(true);
//     } catch (err) {
//       toast.error("Failed to start subscription.");
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   const handleCancelConfirm = async () => {
//     setCanceling(true);
//     try {
//       await cancelSubscription();
//       toast.success("Subscription will be cancelled at period end.");
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//     } catch (err) {
//       toast.error("Cancel failed.");
//     } finally {
//       setCanceling(false);
//       setShowCancelModal(false);
//     }
//   };

//   const handlePlanChange = async () => {
//     if (!selectedPlanId) return;
//     setChangingPlan(true);
//     try {
//       await schedulePlanChange(selectedPlanId);
//       toast.success("Your new plan will be applied after the current period ends.");
//       setSelectedPlanId(null);
//     } catch (err) {
//       console.error("Plan change error:", err);
//       toast.error("Failed to schedule plan change.");
//     } finally {
//       setChangingPlan(false);
//     }
//   };

//   const handlePaymentSuccess = async () => {
//     setShowPaymentModal(false);
//     await loadData();
//   };

//   const isInactive = subscription?.is_active === false;

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-4">
//       {isInactive ? (
//         <>
//           <h2 className="mb-4 text-center">Your Subscription Has Ended</h2>
//           <p className="text-center text-muted mb-4">
//             Select a plan to continue using the platform.
//           </p>
//           <Row className="g-4">
//             {plans.map((plan) => (
//               <Col md={6} lg={4} key={plan.id}>
//                 <Card className="shadow-sm border-0 h-100">
//                   <Card.Body>
//                     <Card.Title>{plan.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">
//                       {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"} Plan
//                     </Card.Subtitle>
//                     {plan.description && (
//                       <ul className="mt-3">
//                         {plan.description.split("\n").map((line, idx) => (
//                           <li key={idx}>{line}</li>
//                         ))}
//                       </ul>
//                     )}
//                     <div className="d-grid mt-4">
//                       <Button
//                         variant="primary"
//                         disabled={subscribing}
//                         onClick={() => handleSubscribe(plan.id)}
//                       >
//                         {subscribing ? "Processing..." : "Subscribe"}
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       ) : (
//         <>
//           <h2 className="mb-4 text-center">Your Current Subscription</h2>
//           <Card className="mb-4 shadow-sm border-0">
//             <Card.Body>
//               <Card.Title>{subscription.plan}</Card.Title>
//               <Card.Text>
//                 Status: <strong>{subscription.status}</strong>
//                 <br />
//                 Start: <strong>{new Date(subscription.current_period_start).toLocaleDateString()}</strong>
//                 <br />
//                 End: <strong>{new Date(subscription.current_period_end).toLocaleDateString()}</strong>
//                 <br />
//                 Cancel at period end: <strong>{subscription.cancel_at_period_end ? "Yes" : "No"}</strong>
//               </Card.Text>
//               {!subscription.cancel_at_period_end && (
//                 <Button
//                   variant="danger"
//                   onClick={() => setShowCancelModal(true)}
//                   className="me-2"
//                 >
//                   Cancel Subscription
//                 </Button>
//               )}
//               <Button variant="secondary" onClick={openBillingPortal}>
//                 Update Payment Method
//               </Button>
//             </Card.Body>
//           </Card>

//           <h4>Schedule Plan Change</h4>
//           <Form.Select
//             className="mb-3"
//             value={selectedPlanId || ""}
//             onChange={(e) => setSelectedPlanId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select a new plan
//             </option>
//             {plans.map((plan) => (
//               <option key={plan.id} value={plan.id}>
//                 {plan.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Button
//             variant="primary"
//             disabled={!selectedPlanId || changingPlan}
//             onClick={handlePlanChange}
//           >
//             {changingPlan ? "Processing..." : "Schedule Change"}
//           </Button>

//           <h4 className="mb-3">Payment History</h4>
//           {history.length === 0 ? (
//             <p className="text-muted">No payment history yet.</p>
//           ) : (
//             <Table striped bordered responsive>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Amount Paid</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, idx) => (
//                   <tr key={idx}>
//                     <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
//                     <td>${entry.amount_paid.toFixed(2)}</td>
//                     <td>
//                       <a
//                         href={entry.pdf_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Invoice
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </>
//       )}

//       <ConfirmModal
//         show={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         onConfirm={handleCancelConfirm}
//         loading={canceling}
//         title="Cancel Subscription"
//         body="Are you sure you want to cancel your subscription at the end of the billing cycle?"
//         confirmText="Yes, Cancel"
//       />

//       <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Complete Payment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {clientSecret && (
//             <Elements stripe={stripePromise} options={{ clientSecret }}>
//               <StripeCardForm
//                 clientSecret={clientSecret}
//                 onSuccess={handlePaymentSuccess}
//                 onCancel={() => setShowPaymentModal(false)}
//               />
//             </Elements>
//           )}
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }

// export default SubscriptionPage;




// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Container,
//   Card,
//   Button,
//   Spinner,
//   Row,
//   Col,
//   Table,
//   Alert,
//   Form,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import useAuth from "../../store/useAuth";
// import {
//   fetchPlans,
//   fetchCurrentSubscription,
//   fetchSubscriptionHistory,
//   cancelSubscription,
//   startSubscription,
//   schedulePlanChange,
//   resumeSubscription,
//   openBillingPortal,
// } from "../../services/subscriptionService";
// import ConfirmModal from "../../components/Modal/ConfirmModal";

// function SubscriptionPage() {
//   const { user, subscription, setSubscription } = useAuth();

//   const [plans, setPlans] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState(false);
//   const [canceling, setCanceling] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedPlanId, setSelectedPlanId] = useState(null);
//   const [changingPlan, setChangingPlan] = useState(false);
//   const [resubscribing, setResubscribing] = useState(false);

//   const loadData = useCallback(async () => {
//     try {
//       const sub = await fetchCurrentSubscription();
//       setSubscription(sub);

//       const [plansData, historyData] = await Promise.all([
//         fetchPlans(),
//         fetchSubscriptionHistory(),
//       ]);
//       setPlans(plansData);
//       setHistory(historyData);
//     } catch (err) {
//       console.error("Subscription load error:", err);
//       setError("Unable to load subscription info.");
//     } finally {
//       setLoading(false);
//     }
//   }, [setSubscription]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleSubscribe = async (planId) => {
//     setSubscribing(true);
//     try {
//       const res = await startSubscription(user.email, planId);
//       toast.success("Redirecting to payment...");
//       window.location.href = `/signup/confirm?client_secret=${res.client_secret}&customer_id=${res.customer_id}&subscription_id=${res.subscription_id}&plan_id=${planId}`;
//     } catch (err) {
//       toast.error("Failed to start subscription.");
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   const handleCancelConfirm = async () => {
//     setCanceling(true);
//     try {
//       await cancelSubscription();
//       toast.success("Subscription will be cancelled at period end.");
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//     } catch (err) {
//       toast.error("Cancel failed.");
//     } finally {
//       setCanceling(false);
//       setShowCancelModal(false);
//     }
//   };

//   const handlePlanChange = async () => {
//     if (!selectedPlanId) return;
//     setChangingPlan(true);
//     try {
//       await schedulePlanChange(selectedPlanId);
//       toast.success("Plan change scheduled for next billing cycle.");
//       setSelectedPlanId(null);
//     } catch (err) {
//       toast.error("Failed to schedule plan change.");
//     } finally {
//       setChangingPlan(false);
//     }
//   };

//   const handleResumeSubscription = async () => {
//     try {
//       await resumeSubscription();
//       toast.success("Subscription resumed.");
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//     } catch (err) {
//       toast.error("Failed to resume subscription.");
//     }
//   };

//   const handleChangePayment = async () => {
//     try {
//       await openBillingPortal();
//     } catch (err) {
//       toast.error("Unable to open billing portal.");
//     }
//   };

//   const isInactive = subscription?.is_active === false;

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-4">
//       {isInactive ? (
//         <>
//           <h2 className="mb-4 text-center">Your Subscription Has Ended</h2>
//           <p className="text-center text-muted mb-4">
//             Select a plan to continue using the platform.
//           </p>
//           <Row className="g-4">
//             {plans.map((plan) => (
//               <Col md={6} lg={4} key={plan.id}>
//                 <Card className="shadow-sm border-0 h-100">
//                   <Card.Body>
//                     <Card.Title>{plan.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">
//                       {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"} Plan
//                     </Card.Subtitle>
//                     <ul className="mt-3">
//                       {plan.description.split("\n").map((line, idx) => (
//                         <li key={idx}>{line}</li>
//                       ))}
//                     </ul>
//                     <div className="d-grid mt-4">
//                       <Button
//                         variant="primary"
//                         disabled={subscribing}
//                         onClick={() => handleSubscribe(plan.id)}
//                       >
//                         {subscribing ? "Processing..." : "Subscribe"}
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       ) : (
//         <>
//           <h2 className="mb-4 text-center">Your Current Subscription</h2>
//           <Card className="mb-4 shadow-sm border-0">
//             <Card.Body>
//               <Card.Title>{subscription.plan}</Card.Title>
//               <Card.Text>
//                 Status: <strong>{subscription.status}</strong>
//                 <br />
//                 Start: <strong>{new Date(subscription.current_period_start).toLocaleDateString()}</strong>
//                 <br />
//                 End: <strong>{new Date(subscription.current_period_end).toLocaleDateString()}</strong>
//                 <br />
//                 Cancel at period end: <strong>{subscription.cancel_at_period_end ? "Yes" : "No"}</strong>
//               </Card.Text>
//               {!subscription.cancel_at_period_end ? (
//                 <>
//                   <Button
//                     variant="danger"
//                     onClick={() => setShowCancelModal(true)}
//                     className="me-2"
//                   >
//                     Cancel Subscription
//                   </Button>
//                   <Button
//                     variant="secondary"
//                     onClick={handleChangePayment}
//                     className="me-2"
//                   >
//                     Change Payment Method
//                   </Button>
//                 </>
//               ) : (
//                 <Button variant="success" onClick={handleResumeSubscription}>
//                   Resume Subscription
//                 </Button>
//               )}
//             </Card.Body>
//           </Card>

//           <h4>Schedule Plan Change</h4>
//           <Form.Select
//             className="mb-3"
//             value={selectedPlanId || ""}
//             onChange={(e) => setSelectedPlanId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select a new plan
//             </option>
//             {plans.map((plan) => (
//               <option key={plan.id} value={plan.id}>
//                 {plan.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Button
//             variant="primary"
//             disabled={!selectedPlanId || changingPlan}
//             onClick={handlePlanChange}
//           >
//             {changingPlan ? "Processing..." : "Schedule Change"}
//           </Button>

//           <h4 className="mt-5 mb-3">Payment History</h4>
//           {history.length === 0 ? (
//             <p className="text-muted">No payment history yet.</p>
//           ) : (
//             <Table striped bordered responsive>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Amount Paid</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, idx) => (
//                   <tr key={idx}>
//                     <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
//                     <td>${entry.amount_paid.toFixed(2)}</td>
//                     <td>
//                       <a
//                         href={entry.pdf_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Invoice
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </>
//       )}

//       <ConfirmModal
//         show={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         onConfirm={handleCancelConfirm}
//         loading={canceling}
//         title="Cancel Subscription"
//         body="Are you sure you want to cancel your subscription at the end of the billing cycle?"
//         confirmText="Yes, Cancel"
//       />
//     </Container>
//   );
// }

// export default SubscriptionPage;






// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Container,
//   Card,
//   Button,
//   Spinner,
//   Row,
//   Col,
//   Table,
//   Alert,
//   Form,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import useAuth from "../../store/useAuth";
// import {
//   fetchPlans,
//   fetchCurrentSubscription,
//   fetchSubscriptionHistory,
//   cancelSubscription,
//   resumeSubscription,
//   openBillingPortal,
//   startSubscription,
//   schedulePlanChange,
// } from "../../services/subscriptionService";
// import ConfirmModal from "../../components/Modal/ConfirmModal";

// function SubscriptionPage() {
//   const { user, subscription, setSubscription } = useAuth();

//   const [plans, setPlans] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState(false);
//   const [canceling, setCanceling] = useState(false);
//   const [resuming, setResuming] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [error, setError] = useState(null);

//   const [selectedPlanId, setSelectedPlanId] = useState(null);
//   const [changingPlan, setChangingPlan] = useState(false);

//   const isInactive = subscription?.is_active === false;
//   const isCanceled = subscription?.status === "canceled" || subscription?.status === "incomplete_cancel";

//   const loadData = useCallback(async () => {
//     try {
//       const sub = await fetchCurrentSubscription();
//       setSubscription(sub);

//       const [plansData, historyData] = await Promise.all([
//         fetchPlans(),
//         fetchSubscriptionHistory(),
//       ]);
//       setPlans(plansData);
//       setHistory(historyData);
//     } catch (err) {
//       console.error("Subscription load error:", err);
//       setError("Unable to load subscription info.");
//     } finally {
//       setLoading(false);
//     }
//   }, [setSubscription]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleSubscribe = async (planId) => {
//     setSubscribing(true);
//     try {
//       const res = await startSubscription(user.email, planId);
//       toast.success("Redirecting to complete payment...");
//       window.location.href = `/signup/confirm?client_secret=${res.client_secret}&customer_id=${res.customer_id}&subscription_id=${res.subscription_id}&plan_id=${planId}`;
//     } catch (err) {
//       toast.error("Failed to start subscription.");
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   const handleCancelConfirm = async () => {
//     setCanceling(true);
//     try {
//       await cancelSubscription();
//       toast.success("Subscription will be cancelled at period end.");
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//     } catch (err) {
//       toast.error("Cancel failed.");
//     } finally {
//       setCanceling(false);
//       setShowCancelModal(false);
//     }
//   };

//   const handleResumeSubscription = async () => {
//     setResuming(true);
//     try {
//       await resumeSubscription();
//       toast.success("Subscription resumed.");
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//     } catch (err) {
//       toast.error("Failed to resume subscription.");
//     } finally {
//       setResuming(false);
//     }
//   };

//   const handleUpdatePayment = async () => {
//     try {
//       const res = await openBillingPortal();
//       if (res?.url) {
//         window.location.href = res.url;
//       } else {
//         toast.error("Failed to open billing portal.");
//       }
//     } catch (err) {
//       toast.error("Error opening billing portal.");
//     }
//   };

//   const handlePlanChange = async () => {
//     if (!selectedPlanId) return;
//     setChangingPlan(true);
//     try {
//       await schedulePlanChange(selectedPlanId);
//       toast.success("Your new plan will be applied after the current period ends.");
//       setSelectedPlanId(null);
//     } catch (err) {
//       console.error("Plan change error:", err);
//       toast.error("Failed to schedule plan change.");
//     } finally {
//       setChangingPlan(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-4">
//       {isInactive ? (
//         <>
//           <h2 className="mb-4 text-center">Your Subscription Has Ended</h2>
//           <p className="text-center text-muted mb-4">
//             Select a plan to continue using the platform.
//           </p>
//           <Row className="g-4">
//             {plans.map((plan) => (
//               <Col md={6} lg={4} key={plan.id}>
//                 <Card className="shadow-sm border-0 h-100">
//                   <Card.Body>
//                     <Card.Title>{plan.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">
//                       {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"} Plan
//                     </Card.Subtitle>
//                     {plan.description && (
//                       <ul className="mt-3">
//                         {plan.description.split("\n").map((line, idx) => (
//                           <li key={idx}>{line}</li>
//                         ))}
//                       </ul>
//                     )}
//                     <div className="d-grid mt-4">
//                       <Button
//                         variant="primary"
//                         disabled={subscribing}
//                         onClick={() => handleSubscribe(plan.id)}
//                       >
//                         {subscribing ? "Processing..." : "Subscribe"}
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       ) : (
//         <>
//           <h2 className="mb-4 text-center">Your Current Subscription</h2>
//           <Card className="mb-4 shadow-sm border-0">
//             <Card.Body>
//               <Card.Title>{subscription.plan}</Card.Title>
//               <Card.Text>
//                 Status: <strong>{subscription.status}</strong>
//                 <br />
//                 Start:{" "}
//                 <strong>
//                   {new Date(subscription.current_period_start).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 End:{" "}
//                 <strong>
//                   {new Date(subscription.current_period_end).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 Cancel at period end:{" "}
//                 <strong>{subscription.cancel_at_period_end ? "Yes" : "No"}</strong>
//               </Card.Text>
//               <div className="d-flex flex-wrap gap-2">
//                 <Button variant="outline-secondary" onClick={handleUpdatePayment}>
//                   Update Payment Method
//                 </Button>
//                 {subscription.cancel_at_period_end ? (
//                   <Button
//                     variant="success"
//                     onClick={handleResumeSubscription}
//                     disabled={resuming}
//                   >
//                     {resuming ? "Processing..." : "Resume Subscription"}
//                   </Button>
//                 ) : (
//                   <Button variant="danger" onClick={() => setShowCancelModal(true)}>
//                     Cancel Subscription
//                   </Button>
//                 )}
//               </div>
//             </Card.Body>
//           </Card>

//           <h4 className="mt-4">Schedule Plan Change</h4>
//           <Form.Select
//             className="mb-3"
//             value={selectedPlanId || ""}
//             onChange={(e) => setSelectedPlanId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select a new plan
//             </option>
//             {plans.map((plan) => (
//               <option key={plan.id} value={plan.id}>
//                 {plan.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Button
//             variant="primary"
//             disabled={!selectedPlanId || changingPlan}
//             onClick={handlePlanChange}
//           >
//             {changingPlan ? "Processing..." : "Schedule Change"}
//           </Button>

//           <h4 className="mt-5 mb-3">Payment History</h4>
//           {history.length === 0 ? (
//             <p className="text-muted">No payment history yet.</p>
//           ) : (
//             <Table striped bordered responsive>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Amount Paid</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, idx) => (
//                   <tr key={idx}>
//                     <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
//                     <td>${entry.amount_paid.toFixed(2)}</td>
//                     <td>
//                       <a
//                         href={entry.invoice_pdf}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Invoice
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </>
//       )}

//       <ConfirmModal
//         show={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         onConfirm={handleCancelConfirm}
//         loading={canceling}
//         title="Cancel Subscription"
//         body="Are you sure you want to cancel your subscription at the end of the billing cycle?"
//         confirmText="Yes, Cancel"
//       />
//     </Container>
//   );
// }

// export default SubscriptionPage;




// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Container,
//   Card,
//   Button,
//   Spinner,
//   Row,
//   Col,
//   Table,
//   Alert,
//   Form,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import useAuth from "../../store/useAuth";
// import {
//   fetchPlans,
//   fetchCurrentSubscription,
//   fetchSubscriptionHistory,
//   cancelSubscription,
//   startSubscription,
// } from "../../services/subscriptionService";
// import ConfirmModal from "../../components/Modal/ConfirmModal";

// function SubscriptionPage() {
//   const { user, subscription, setSubscription } = useAuth();

//   const [plans, setPlans] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState(false);
//   const [canceling, setCanceling] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [error, setError] = useState(null);

//     const [selectedPlanId, setSelectedPlanId] = useState(null);
//   const [changingPlan, setChangingPlan] = useState(false);

//   const loadData = useCallback(async () => {
//     // if (!user?.email_verified) return;

//     try {
//       const sub = await fetchCurrentSubscription();
//       setSubscription(sub);

//       const [plansData, historyData] = await Promise.all([
//         fetchPlans(),
//         fetchSubscriptionHistory(),
//       ]);
//       setPlans(plansData);
//       setHistory(historyData);
//     } catch (err) {
//       console.error("Subscription load error:", err);
//       setError("Unable to load subscription info.");
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.email_verified, setSubscription]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleSubscribe = async (planId) => {
//     setSubscribing(true);
//     try {
//       const res = await startSubscription(user.email, planId);
//       toast.success("Subscription started. Please complete payment.");
//       window.location.href = `/signup/confirm?client_secret=${res.client_secret}&customer_id=${res.customer_id}&subscription_id=${res.subscription_id}&plan_id=${planId}`;
//     } catch (err) {
//       toast.error("Failed to start subscription.");
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   const handleCancelConfirm = async () => {
//     setCanceling(true);
//     try {
//       await cancelSubscription();
//       toast.success("Subscription will be cancelled at period end.");
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//     } catch (err) {
//       toast.error("Cancel failed.");
//     } finally {
//       setCanceling(false);
//       setShowCancelModal(false);
//     }
//   };


//     const handlePlanChange = async () => {
//     if (!selectedPlanId) return;
//     setChangingPlan(true);
//     try {
//       // Save the selected plan ID for next renewal (future backend)
//       toast.success("Your new plan will be applied after the current period ends.");
//       setSelectedPlanId(null);
//     } catch (err) {
//       console.error("Plan change error:", err);
//       toast.error("Failed to schedule plan change.");
//     } finally {
//       setChangingPlan(false);
//     }
//   };




//   const isInactive = subscription?.is_active === false;

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-4">
//       {isInactive ? (
//         <>
//           <h2 className="mb-4 text-center">Your Subscription Has Ended</h2>
//           <p className="text-center text-muted mb-4">
//             Select a plan to continue using the platform.
//           </p>
//           <Row className="g-4">
//             {plans.map((plan) => (
//               <Col md={6} lg={4} key={plan.id}>
//                 <Card className="shadow-sm border-0 h-100">
//                   <Card.Body>
//                     <Card.Title>{plan.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">
//                       {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"} Plan
//                     </Card.Subtitle>
//                     {plan.description && (
//                       <ul className="mt-3">
//                         {plan.description.split("\n").map((line, idx) => (
//                           <li key={idx}>{line}</li>
//                         ))}
//                       </ul>
//                     )}
//                     <div className="d-grid mt-4">
//                       <Button
//                         variant="primary"
//                         disabled={subscribing}
//                         onClick={() => handleSubscribe(plan.id)}
//                       >
//                         {subscribing ? "Processing..." : "Subscribe"}
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       ) : (
//         <>
//           <h2 className="mb-4 text-center">Your Current Subscription</h2>
//           <Card className="mb-4 shadow-sm border-0">
//             <Card.Body>
//               <Card.Title>{subscription.plan}</Card.Title>
//               <Card.Text>
//                 Status: <strong>{subscription.status}</strong>
//                 <br />
//                 Start:{" "}
//                 <strong>
//                   {new Date(subscription.current_period_start).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 End:{" "}
//                 <strong>
//                   {new Date(subscription.current_period_end).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 Cancel at period end:{" "}
//                 <strong>{subscription.cancel_at_period_end ? "Yes" : "No"}</strong>
//               </Card.Text>
//               {!subscription.cancel_at_period_end && (
//                 <Button
//                   variant="danger"
//                   onClick={() => setShowCancelModal(true)}
//                   className="me-2"
//                 >
//                   Cancel Subscription
//                 </Button>
//               )}
//             </Card.Body>
//           </Card>

//           <h4>Schedule Plan Change</h4>
//            <Form.Select
//             className="mb-3"
//             value={selectedPlanId || ""}
//             onChange={(e) => setSelectedPlanId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select a new plan
//             </option>
//             {plans.map((plan) => (
//               <option key={plan.id} value={plan.id}>
//                 {plan.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Button
//             variant="primary"
//             disabled={!selectedPlanId || changingPlan}
//             onClick={handlePlanChange}
//           >
//             {changingPlan ? "Processing..." : "Schedule Change"}
//           </Button>


//           <h4 className="mb-3">Payment History</h4>
//           {history.length === 0 ? (
//             <p className="text-muted">No payment history yet.</p>
//           ) : (
//             <Table striped bordered responsive>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Amount Paid</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, idx) => (
//                   <tr key={idx}>
//                     <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
//                     <td>${entry.amount_paid.toFixed(2)}</td>
//                     <td>
//                       <a
//                         href={entry.invoice_pdf}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Invoice
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </>
//       )}

//       <ConfirmModal
//         show={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         onConfirm={handleCancelConfirm}
//         loading={canceling}
//         title="Cancel Subscription"
//         body="Are you sure you want to cancel your subscription at the end of the billing cycle?"
//         confirmText="Yes, Cancel"
//       />
//     </Container>
//   );
// }

// export default SubscriptionPage;





// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Spinner,
//   Table,
//   Alert,
//   Form,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import useAuth from "../../store/useAuth";
// import {
//   fetchPlans,
//   fetchCurrentSubscription,
//   fetchSubscriptionHistory,
//   cancelSubscription,
// } from "../../services/subscriptionService";
// import ConfirmModal from "../../components/Modal/ConfirmModal";

// function SubscriptionPage() {
//   const { user, subscription, setSubscription } = useAuth();

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [canceling, setCanceling] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedPlanId, setSelectedPlanId] = useState(null);
//   const [changingPlan, setChangingPlan] = useState(false);

//   const loadData = useCallback(async () => {
//     // if (!user?.email_verified) return;

//     try {
//       const subData = await fetchCurrentSubscription();
//       setSubscription(subData);

//       const plansData = await fetchPlans();
//       setPlans(plansData);

//       const historyData = await fetchSubscriptionHistory();
//       setHistory(historyData);
//     } catch (err) {
//       console.error("Error loading subscription data:", err);
//       setError("Failed to load subscription information.");
//       toast.error("Failed to load subscription data.");
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.email_verified, setSubscription]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleCancelConfirm = async () => {
//     setCanceling(true);
//     try {
//       await cancelSubscription();
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//       toast.success("Subscription cancellation scheduled.");
//     } catch (err) {
//       console.error("Failed to cancel subscription:", err);
//       toast.error("Failed to cancel subscription.");
//     } finally {
//       setCanceling(false);
//       setShowCancelModal(false);
//     }
//   };

//   const handlePlanChange = async () => {
//     if (!selectedPlanId) return;
//     setChangingPlan(true);
//     try {
//       // Save the selected plan ID for next renewal (future backend)
//       toast.success("Your new plan will be applied after the current period ends.");
//       setSelectedPlanId(null);
//     } catch (err) {
//       console.error("Plan change error:", err);
//       toast.error("Failed to schedule plan change.");
//     } finally {
//       setChangingPlan(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   const isInactive = subscription?.is_active === false;
//     // !subscription?.has_subscription ||
//     // ["incomplete", "canceled"].includes(subscription.status);

//   return (
//     <Container className="mt-5">
//       {isInactive ? (
//         <Alert variant="warning" className="text-center">
//           You currently do not have an active subscription.
//         </Alert>
//       ) : (
//         <>
//           <h2>Your Current Subscription</h2>
//           <Card className="mb-4">
//             <Card.Body>
//               <Card.Title>{subscription.plan || "Unnamed Plan"}</Card.Title>
//               <Card.Text>
//                 Status: <strong>{subscription.status}</strong> <br />
//                 Start Date: {" "}
//                 <strong>
//                   {new Date(
//                     subscription.current_period_start
//                   ).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 End Date: {" "}
//                 <strong>
//                   {new Date(
//                     subscription.current_period_end
//                   ).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 Cancel at period end: {" "}
//                 <strong>
//                   {subscription.cancel_at_period_end ? "Yes" : "No"}
//                 </strong>
//               </Card.Text>
//               <Button
//                 variant="danger"
//                 onClick={() => setShowCancelModal(true)}
//                 disabled={subscription.cancel_at_period_end}
//               >
//                 Cancel Subscription
//               </Button>
//             </Card.Body>
//           </Card>

//           <h4>Schedule Plan Change</h4>
//           <Form.Select
//             className="mb-3"
//             value={selectedPlanId || ""}
//             onChange={(e) => setSelectedPlanId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select a new plan
//             </option>
//             {plans.map((plan) => (
//               <option key={plan.id} value={plan.id}>
//                 {plan.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Button
//             variant="primary"
//             disabled={!selectedPlanId || changingPlan}
//             onClick={handlePlanChange}
//           >
//             {changingPlan ? "Processing..." : "Schedule Change"}
//           </Button>

//           <h4 className="mt-5">Payment History</h4>
//           {history.length === 0 ? (
//             <p>No payment history available.</p>
//           ) : (
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Amount Paid</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, idx) => (
//                   <tr key={idx}>
//                     <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
//                     <td>${entry.amount_paid.toFixed(2)}</td>
//                     <td>
//                       <a
//                         href={entry.invoice_pdf || entry.hosted_invoice_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Invoice
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </>
//       )}

//       <ConfirmModal
//         show={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         onConfirm={handleCancelConfirm}
//         loading={canceling}
//         title="Cancel Subscription"
//         body="Are you sure you want to cancel your subscription at the end of the current billing cycle?"
//         confirmText="Yes, Cancel"
//       />
//     </Container>
//   );
// }

// export default SubscriptionPage;




// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Spinner,
//   Table,
//   Alert,
// } from "react-bootstrap";
// import { toast } from "react-toastify";

// import useAuth from "../../store/useAuth";
// import {
//   fetchPlans,
//   fetchCurrentSubscription,
//   fetchSubscriptionHistory,
//   cancelSubscription,
//   openBillingPortal,
//   createCheckoutSession,
// } from "../../services/subscriptionService";
// import ConfirmModal from "../../components/Modal/ConfirmModal";

// function SubscriptionPage() {
//   const { user, subscription, setSubscription } = useAuth();

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState(false);
//   const [canceling, setCanceling] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState(null);


//   const loadData = useCallback(async () => {
//     if (!user?.email_verified) return;

//     try {
//       if (!subscription) {
//         const subData = await fetchCurrentSubscription();
//         setSubscription(subData);
//         toast.success("Subscription data loaded successfully.");
//       }

//       const plansData = await fetchPlans();
//       setPlans(plansData);

//       const historyData = await fetchSubscriptionHistory();
//       setHistory(historyData);
//     } catch (err) {
//       console.error("Error loading subscription data:", err);
//       setError("Failed to load subscription information.");
//       toast.error("Failed to load subscription data.");
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.email_verified, subscription, setSubscription]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // useEffect(() => {
//   //   if (!user?.email_verified) return;

//   //   const loadData = async () => {
//   //     try {
//   //       if (!subscription) {
//   //         const subData = await fetchCurrentSubscription();
//   //         setSubscription(subData);
//   //         toast.success("Subscription data loaded successfully.");
//   //       }

//   //       const plansData = await fetchPlans();
//   //       setPlans(plansData);

//   //       const historyData = await fetchSubscriptionHistory();
//   //       setHistory(historyData);
//   //     } catch (err) {
//   //       console.error("Error loading subscription data:", err);
//   //       setError("Failed to load subscription information.");
//   //       toast.error("Failed to load subscription data.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   loadData();
//   // }, [user?.email_verified]);

//   const handleSubscribe = async (planId) => {
//     setSubscribing(true);
//     try {
//       toast.info("Redirecting to payment...");
//       const { checkout_url } = await createCheckoutSession(planId);
//       window.location.href = checkout_url;
//     } catch (err) {
//       console.error("Checkout error:", err);
//       toast.error("Subscription initiation failed.");
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   const handleCancelConfirm = async () => {
//     setCanceling(true);
//     try {
//       await cancelSubscription();
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//       toast.success("Subscription cancellation scheduled.");
//     } catch (err) {
//       console.error("Failed to cancel subscription:", err);
//       toast.error("Failed to cancel subscription.");
//     } finally {
//       setCanceling(false);
//       setShowCancelModal(false);
//     }
//   };

//   const isInactive =
//     !subscription?.has_subscription ||
//     ["incomplete", "canceled"].includes(subscription.status);

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       {["incomplete", "canceled"].includes(subscription?.status) && (
//         <Alert variant="warning" className="text-center">
//           Your previous subscription is <strong>{subscription.status}</strong>.
//           Please re-subscribe to continue using the platform.
//         </Alert>
//       )}

//       {isInactive ? (
//         <>
//           <h2 className="mb-4">Choose Your Plan</h2>
//           <Row>
//             {plans.length === 0 && (
//               <p className="text-muted">No subscription plans available.</p>
//             )}
//             {plans.map((plan) => (
//               <Col md={6} lg={4} key={plan.id}>
//                 <Card className="mb-4 shadow-sm">
//                   <Card.Body>
//                     <Card.Title>{plan.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">
//                       {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"}{" "}
//                       Plan
//                     </Card.Subtitle>
//                     {plan.description && (
//                       <ul className="mt-3">
//                         {plan.description.split("\n").map((line, idx) => (
//                           <li key={idx}>{line}</li>
//                         ))}
//                       </ul>
//                     )}

//                     <Button
//                       variant="primary"
//                       disabled={subscribing}
//                       onClick={() => handleSubscribe(plan.id)}
//                     >
//                       {subscribing ? "Processing..." : "Subscribe"}
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       ) : (
//         <>
//           <h2>Your Current Subscription</h2>
//           <Card className="mb-4">
//             <Card.Body>
//               <Card.Title>{subscription.plan || "Unnamed Plan"}</Card.Title>
//               <Card.Text>
//                 Status: <strong>{subscription.status}</strong> <br />
//                 Start Date:{" "}
//                 <strong>
//                   {new Date(
//                     subscription.current_period_start
//                   ).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 End Date:{" "}
//                 <strong>
//                   {new Date(
//                     subscription.current_period_end
//                   ).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 Cancel at period end:{" "}
//                 <strong>
//                   {subscription.cancel_at_period_end ? "Yes" : "No"}
//                 </strong>
//               </Card.Text>
//               <Button
//                 variant="warning"
//                 className="me-2"
//                 onClick={openBillingPortal}
//               >
//                 Update Payment Method
//               </Button>
//               {!subscription.cancel_at_period_end && (
//                 <Button
//                   variant="danger"
//                   onClick={() => setShowCancelModal(true)}
//                 >
//                   Cancel Subscription
//                 </Button>
//               )}
//             </Card.Body>
//           </Card>

//           <h4>Payment History</h4>
//           {history.length === 0 ? (
//             <p>No payment history available.</p>
//           ) : (
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Amount Paid</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, idx) => (
//                   <tr key={idx}>
//                     <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
//                     <td>${entry.amount_paid.toFixed(2)}</td>
//                     <td>
//                       <a
//                         href={entry.pdf_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Invoice
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </>
//       )}

//       <ConfirmModal
//         show={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         onConfirm={handleCancelConfirm}
//         loading={canceling}
//         title="Cancel Subscription"
//         body="Are you sure you want to cancel your subscription at the end of the current billing cycle?"
//         confirmText="Yes, Cancel"
//       />
//     </Container>
//   );
// }

// export default SubscriptionPage;

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Spinner,
//   Table,
//   Alert,
// } from "react-bootstrap";
// import { toast } from "react-toastify";

// import useAuth from "../../store/useAuth";
// import {
//   fetchPlans,
//   fetchCurrentSubscription,
//   fetchSubscriptionHistory,
//   cancelSubscription,
//   openBillingPortal,
//   createCheckoutSession,
// } from "../../services/subscriptionService";
// import ConfirmModal from "../../components/Modal/ConfirmModal";

// function SubscriptionPage() {
//   const { user, subscription, setSubscription } = useAuth();

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState(false);
//   const [canceling, setCanceling] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);

//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {

//       // Optional: Clean up session_id param after use
//       // if (window.location.search.includes("session_id")) {
//       //   window.history.replaceState({}, document.title, "/user/subscription");
//       // }

//     if (!user?.email_verified) return;

//     const loadData = async () => {
//       try {
//         if (!subscription) {
//           const subData = await fetchCurrentSubscription();
//           setSubscription(subData);
//           toast.success("Subscription data loaded successfully.");
//         }

//         const plansData = await fetchPlans();
//         setPlans(plansData);

//         const historyData = await fetchSubscriptionHistory();
//         setHistory(historyData);
//       } catch (err) {
//         console.error("Error loading subscription data:", err);
//         setError("Failed to load subscription information.");
//         toast.error("Failed to load subscription data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [user?.email_verified]);

//   const handleSubscribe = async (planId) => {
//     setSubscribing(true);
//     try {
//       toast.info("Redirecting to payment...");
//       const { checkout_url } = await createCheckoutSession(planId);
//       window.location.href = checkout_url;
//     } catch (err) {
//       console.error("Checkout error:", err);
//       toast.error("Subscription initiation failed.");
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   const handleCancelConfirm = async () => {
//     setCanceling(true);
//     try {
//       await cancelSubscription();
//       const updated = await fetchCurrentSubscription();
//       setSubscription(updated);
//       toast.success("Subscription cancellation scheduled.");
//     } catch (err) {
//       console.error("Failed to cancel subscription:", err);
//       toast.error("Failed to cancel subscription.");
//     } finally {
//       setCanceling(false);
//       setShowCancelModal(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       {["incomplete", "canceled"].includes(subscription?.status) && (
//         <Alert variant="warning" className="text-center">
//           Your previous subscription is <strong>{subscription.status}</strong>.
//           Please re-subscribe to continue using the platform.

//         </Alert>

//       )}

//       {!subscription?.has_subscription || ["incomplete", "canceled"].includes(subscription?.status) ? (
//         <>
//           <h2 className="mb-4">Choose Your Plan</h2>
//           <Row>
//             {plans.length === 0 && <p>No subscription plans available.</p>}
//             {plans.map((plan) => (
//               <Col md={6} lg={4} key={plan.id}>
//                 <Card className="mb-4 shadow-sm">
//                   <Card.Body>
//                     <Card.Title>{plan.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">
//                       {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"} Plan
//                     </Card.Subtitle>
//                     <Button
//                       variant="primary"
//                       disabled={subscribing}
//                       onClick={() => handleSubscribe(plan.id)}
//                     >
//                       {subscribing ? "Processing..." : "Subscribe"}
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       ) : (
//         <>
//           <h2>Your Current Subscription</h2>
//           <Card className="mb-4">
//             <Card.Body>
//               <Card.Title>{subscription.plan}</Card.Title>
//               <Card.Text>
//                 Status: <strong>Active</strong> <br />
//                 Start Date:{" "}
//                 <strong>{new Date(subscription.current_period_start).toLocaleDateString()}</strong>
//                 <br />
//                 End Date:{" "}
//                 <strong>{new Date(subscription.current_period_end).toLocaleDateString()}</strong>
//                 <br />
//                 Cancel at period end:{" "}
//                 <strong>{subscription.cancel_at_period_end ? "Yes" : "No"}</strong>
//               </Card.Text>
//               <Button
//                 variant="warning"
//                 className="me-2"
//                 onClick={openBillingPortal}
//               >
//                 Update Payment Method
//               </Button>
//               {!subscription.cancel_at_period_end && (
//                 <Button variant="danger" onClick={() => setShowCancelModal(true)}>
//                   Cancel Subscription
//                 </Button>
//               )}
//             </Card.Body>
//           </Card>

//           <h4>Payment History</h4>
//           {history.length === 0 ? (
//             <p>No payment history available.</p>
//           ) : (
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Amount Paid</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, idx) => (
//                   <tr key={idx}>
//                     <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
//                     <td>${entry.amount_paid.toFixed(2)}</td>
//                     <td>
//                       <a
//                         href={entry.pdf_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Invoice
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </>
//       )}

//       {/* Cancel Confirmation Modal */}
//       <ConfirmModal
//         show={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         onConfirm={handleCancelConfirm}
//         loading={canceling}
//         title="Cancel Subscription"
//         body="Are you sure you want to cancel your subscription at the end of the current billing cycle?"
//         confirmText="Yes, Cancel"
//       />
//     </Container>
//   );
// }

// export default SubscriptionPage;

// import React, {  useEffect, useState } from "react";

// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Spinner,
//   Table,
//   Alert,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import useAuth from "../../store/useAuth";
// import {
//   fetchPlans,
//   fetchCurrentSubscription,
//   fetchSubscriptionHistory,
//   cancelSubscription,
//   openBillingPortal,
//   createCheckoutSession,
// } from "../../services/subscriptionService";

// function SubscriptionPage() {
//   const { user, subscription, setSubscription } = useAuth();
//   const [subscribing, setSubscribing] = useState(false);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState(null);

// useEffect(() => {

//   if (!user?.email_verified) return;

//   const loadData = async () => {
//     try {
//       if (!subscription) {
//         const subData = await fetchCurrentSubscription();
//         setSubscription(subData);
//         toast.success("Subscription data loaded successfully.");
//       }

//       const plansData = await fetchPlans();
//       setPlans(plansData);

//       // if (subscription?.has_subscription) {
//         const historyData = await fetchSubscriptionHistory();
//         setHistory(historyData);
//       // }

//     } catch (err) {
//       console.error("Error loading subscription data:", err);
//       setError("Failed to load subscription information.");
//       toast.error("Failed to load subscription data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadData();
// }, [user?.email_verified]);

//   const handleSubscribe = async (planId) => {
//     setSubscribing(true);
//     try {
//       toast.info("Redirecting to payment...");

//       const { checkout_url } = await createCheckoutSession(planId);
//       window.location.href = checkout_url;
//     } catch (err) {
//       toast.error("Subscription initiation failed.");
//       console.error("Checkout error:", err);
//       alert("Subscription initiation failed.");
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   const handleCancel = async () => {
//     if (
//       window.confirm(
//         "Are you sure you want to cancel your subscription at period end?"
//       )
//     ) {
//       try {
//         await cancelSubscription();
//         const updated = await fetchCurrentSubscription();
//         setSubscription(updated);
//         toast.success("Subscription cancellation scheduled.");
//       } catch (e) {
//         console.log("Failed to cancel subscription.");
//         toast.error("Failed to cancel subscription.");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       {["incomplete", "canceled"].includes(subscription?.status) && (
//   <Alert variant="warning" className="text-center">
//     Your previous subscription has <strong>{subscription.status}</strong>. Please re-subscribe to continue using the platform.
//   </Alert>
// )}
//       {!subscription?.has_subscription ? (
//         <>
//           <h2 className="mb-4">Choose Your Plan</h2>
//           <Row>
//             {plans.map((plan) => (
//               <Col md={6} lg={4} key={plan.id}>
//                 <Card className="mb-4 shadow-sm">
//                   <Card.Body>
//                     <Card.Title>{plan.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">
//                       {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"}{" "}
//                       Plan
//                     </Card.Subtitle>
//                     <Button
//                       variant="primary"
//                       disabled={subscribing}
//                       onClick={() => handleSubscribe(plan.id)}
//                     >
//                       {subscribing ? "Processing..." : "Subscribe"}
//                     </Button>
//                     {/* <Button
//                       variant="primary"
//                       onClick={() => handleSubscribe(plan.id)}
//                     >
//                       Subscribe
//                     </Button> */}
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </>
//       ) : (
//         <>
//           <h2>Your Current Subscription</h2>
//           <Card className="mb-4">
//             <Card.Body>
//               <Card.Title>{subscription.plan}</Card.Title>
//               <Card.Text>
//                 Status: <strong>Active</strong> <br />
//                 Start Date:{" "}
//                 <strong>
//                   {new Date(
//                     subscription.current_period_start
//                   ).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 End Date:{" "}
//                 <strong>
//                   {new Date(
//                     subscription.current_period_end
//                   ).toLocaleDateString()}
//                 </strong>
//                 <br />
//                 Cancel at period end:{" "}
//                 <strong>
//                   {subscription.cancel_at_period_end ? "Yes" : "No"}
//                 </strong>
//               </Card.Text>
//               <Button
//                 variant="warning"
//                 className="me-2"
//                 onClick={openBillingPortal}
//               >
//                 Update Payment Method
//               </Button>
//               {!subscription.cancel_at_period_end && (
//                 <Button variant="danger" onClick={handleCancel}>
//                   Cancel Subscription
//                 </Button>
//               )}
//             </Card.Body>
//           </Card>

//           <h4>Payment History</h4>
//           {/* {subscription?.has_subscription && (
//             <p>You have no active subscription</p>
//           )} */}
//           {history.length === 0 ? (
//             <p>No payment history available.</p>
//           ) : (
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Amount Paid</th>
//                   <th>Invoice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, idx) => (
//                   <tr key={idx}>
//                     <td>{new Date(entry.paid_at).toLocaleDateString()}</td>
//                     <td>${entry.amount_paid.toFixed(2)}</td>
//                     <td>
//                       <a
//                         href={entry.pdf_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Invoice
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </>
//       )}
//     </Container>
//   );
// }

// export default SubscriptionPage;
