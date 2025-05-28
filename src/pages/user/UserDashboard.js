import React from "react";
import { Row, Col } from "react-bootstrap";
// import FacebookCampaignOverview from "../../components/Dashboard/SocialMedia/FacebookCampaignOverview";
// import FollowersByGender from "../../components/Dashboard/SocialMedia/FollowersByGender";
// import LinkedinNetFollowers from "../../components/Dashboard/SocialMedia/LinkedinNetFollowers";
// import RecentInstagramFollowers from "../../components/Dashboard/SocialMedia/RecentInstagramFollowers";
// import SocialPlatformFollowers from "../../components/Dashboard/SocialMedia/SocialPlatformFollowers";
// import Suggestions from "../../components/Dashboard/SocialMedia/Suggestions";
// import UpgradeYourPlan from "../../components/Dashboard/SocialMedia/UpgradeYourPlan";

import ConnectLoftyButton from "../../components/LoftyRelatedComponents/ConnectLoftyButton";

import useAuth from "../../store/useAuth";

const UserDashboard = () => {
    const user = useAuth((state) => state.user);
  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={6}>
          Welcome to Instent RealEstate, {user?.first_name} {user?.last_name}
        </Col>

        {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={6}>
          <h1>{user?.first_name}</h1>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={6}>
          <h1>User</h1>
        </Col> */}
      </Row>

      <Row className="justify-content-center">
        {/* <Col xs={12} sm={12} md={12} lg={12} xl={5} xxl={4}>
          <h1>ABC</h1>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={7} xxl={4}>
          <h1>123</h1>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={7} xxl={4}>
          <h1>ABC</h1>
        </Col> */}
      </Row>

      <Row>
        {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={8}>
          <h1>123</h1>
          <ConnectLoftyButton />
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={4}>
          <h1>ABC</h1>
        </Col> */}
      </Row>
    </>
  );
};

export default UserDashboard;
