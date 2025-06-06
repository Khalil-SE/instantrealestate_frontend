import React from "react";
import { Row, Col } from "react-bootstrap";
// import FacebookCampaignOverview from "../../components/Dashboard/SocialMedia/FacebookCampaignOverview";
// import FollowersByGender from "../../components/Dashboard/SocialMedia/FollowersByGender";
// import LinkedinNetFollowers from "../../components/Dashboard/SocialMedia/LinkedinNetFollowers";
// import RecentInstagramFollowers from "../../components/Dashboard/SocialMedia/RecentInstagramFollowers";
// import SocialPlatformFollowers from "../../components/Dashboard/SocialMedia/SocialPlatformFollowers";
// import Suggestions from "../../components/Dashboard/SocialMedia/Suggestions";
// import UpgradeYourPlan from "../../components/Dashboard/SocialMedia/UpgradeYourPlan";

import useAuth from "../../store/useAuth";

const AdminDashboard = () => {

  const user = useAuth((state) => state.user);


  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={6}>
          <h1>Welcome {user?.first_name}</h1>
          <h4>You are logedIn as Admin</h4>
        </Col>

        
      </Row>

    

      
    </>
  );
};

export default AdminDashboard;
