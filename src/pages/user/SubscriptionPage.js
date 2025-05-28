import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Table,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";

import useAuth from "../../store/useAuth";
import {
  fetchPlans,
  fetchCurrentSubscription,
  fetchSubscriptionHistory,
  cancelSubscription,
  openBillingPortal,
  createCheckoutSession,
} from "../../services/subscriptionService";
import ConfirmModal from "../../components/Modal/ConfirmModal";

function SubscriptionPage() {
  const { user, subscription, setSubscription } = useAuth();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email_verified) return;

    const loadData = async () => {
      try {
        if (!subscription) {
          const subData = await fetchCurrentSubscription();
          setSubscription(subData);
          toast.success("Subscription data loaded successfully.");
        }

        const plansData = await fetchPlans();
        setPlans(plansData);

        const historyData = await fetchSubscriptionHistory();
        setHistory(historyData);
      } catch (err) {
        console.error("Error loading subscription data:", err);
        setError("Failed to load subscription information.");
        toast.error("Failed to load subscription data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.email_verified]);

  const handleSubscribe = async (planId) => {
    setSubscribing(true);
    try {
      toast.info("Redirecting to payment...");
      const { checkout_url } = await createCheckoutSession(planId);
      window.location.href = checkout_url;
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Subscription initiation failed.");
    } finally {
      setSubscribing(false);
    }
  };

  const handleCancelConfirm = async () => {
    setCanceling(true);
    try {
      await cancelSubscription();
      const updated = await fetchCurrentSubscription();
      setSubscription(updated);
      toast.success("Subscription cancellation scheduled.");
    } catch (err) {
      console.error("Failed to cancel subscription:", err);
      toast.error("Failed to cancel subscription.");
    } finally {
      setCanceling(false);
      setShowCancelModal(false);
    }
  };

  const isInactive =
    !subscription?.has_subscription ||
    ["incomplete", "canceled"].includes(subscription.status);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
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
    <Container className="mt-5">
      {["incomplete", "canceled"].includes(subscription?.status) && (
        <Alert variant="warning" className="text-center">
          Your previous subscription is <strong>{subscription.status}</strong>.
          Please re-subscribe to continue using the platform.
        </Alert>
      )}

      {isInactive ? (
        <>
          <h2 className="mb-4">Choose Your Plan</h2>
          <Row>
            {plans.length === 0 && (
              <p className="text-muted">No subscription plans available.</p>
            )}
            {plans.map((plan) => (
              <Col md={6} lg={4} key={plan.id}>
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <Card.Title>{plan.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {plan.plan_duration === "monthly" ? "Monthly" : "Yearly"}{" "}
                      Plan
                    </Card.Subtitle>
                    {plan.description && (
                      <ul className="mt-3">
                        {plan.description.split("\n").map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    )}

                    <Button
                      variant="primary"
                      disabled={subscribing}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {subscribing ? "Processing..." : "Subscribe"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h2>Your Current Subscription</h2>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{subscription.plan || "Unnamed Plan"}</Card.Title>
              <Card.Text>
                Status: <strong>{subscription.status}</strong> <br />
                Start Date:{" "}
                <strong>
                  {new Date(
                    subscription.current_period_start
                  ).toLocaleDateString()}
                </strong>
                <br />
                End Date:{" "}
                <strong>
                  {new Date(
                    subscription.current_period_end
                  ).toLocaleDateString()}
                </strong>
                <br />
                Cancel at period end:{" "}
                <strong>
                  {subscription.cancel_at_period_end ? "Yes" : "No"}
                </strong>
              </Card.Text>
              <Button
                variant="warning"
                className="me-2"
                onClick={openBillingPortal}
              >
                Update Payment Method
              </Button>
              {!subscription.cancel_at_period_end && (
                <Button
                  variant="danger"
                  onClick={() => setShowCancelModal(true)}
                >
                  Cancel Subscription
                </Button>
              )}
            </Card.Body>
          </Card>

          <h4>Payment History</h4>
          {history.length === 0 ? (
            <p>No payment history available.</p>
          ) : (
            <Table striped bordered hover responsive>
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
        </>
      )}

      <ConfirmModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelConfirm}
        loading={canceling}
        title="Cancel Subscription"
        body="Are you sure you want to cancel your subscription at the end of the current billing cycle?"
        confirmText="Yes, Cancel"
      />
    </Container>
  );
}

export default SubscriptionPage;

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
