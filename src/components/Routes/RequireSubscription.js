import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { fetchCurrentSubscription } from "../../services/subscriptionService";
import useAuth from "../../store/useAuth";
import { ROUTES } from "../../config/routes";

function RequireSubscription() {
  // const { user, subscription, setSubscription } = useAuth();
  const user = useAuth((state) => state.user);
  const setSubscription = useAuth((state) => state.setSubscription);
  const subscription = useAuth((state) => state.subscription);
  const [loading, setLoading] = useState(true);

  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  // const navigate = useNavigate();

  // console.log("RequireSubscription: user", user);

  useEffect(() => {
    // console.log("RequireSubscription: useEffect");

    const checkSubscription = async () => {
      if (user?.email_verified) {
        try {
          const subData = await fetchCurrentSubscription();
          // console.log("RequireSubscription: subscription", subData);
          setSubscription(subData);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch subscription:", error);
          if (attempts < maxAttempts) {
          setTimeout(() => setAttempts(attempts + 1), 1500);
        } else {
          setLoading(false); // Give up after max retries
        }
        }
      }
      
    };

    checkSubscription();
  }, [user?.email_verified, setSubscription, attempts]);
  // user?.email_verified, setSubscription

  // console.log("RequireSubscription: subscription", subscription);

  //  Still loading
  if (loading || subscription === null) {
    return (
      <Container className="text-center mt-5">
        <h5>Checking your subscription...</h5>
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  // console.log("RequireSubscription: subscription", subscription);

  // 2️ User not subscribed → redirect
  // if (!subscription?.has_subscription) {
  //   return <Navigate to={ ROUTES.USER.SUBSCRIPTION } replace />;
  // }
  // const isSubscribed = subscription?.has_subscription;
  // const isActive = subscription?.status === "active";

  // if (!isSubscribed || !isActive) {
  //   return <Navigate to={ROUTES.USER.SUBSCRIPTION} replace />;
  // }

  const invalid =
    !subscription.has_subscription ||
    ["incomplete", "canceled"].includes(subscription.status);

  if (invalid) {
    return <Navigate to={ROUTES.USER.SUBSCRIPTION} replace />;
  }

  // 3️ Access granted
  // if (!loading && subscription !== null) {
  //   // console.log("RequireSubscription: Access granted");

  // }
  // return children;
  return <Outlet />;
}

export default RequireSubscription;
