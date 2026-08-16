"use client";

import { useCurrentUser } from "../auth/AuthContext";
import AffiliateUserLink from "./AffiliateUserLink";
import CreateCoupon from "./Create-coupon";

const AffiliateDashboard = () => {
  const { user } = useCurrentUser();

  return (
    <div>
      {user?.affiliateCoupon ? (
        <AffiliateUserLink/>
      ) : (
        <CreateCoupon />
      )}
    </div>
  );
};

export default AffiliateDashboard;