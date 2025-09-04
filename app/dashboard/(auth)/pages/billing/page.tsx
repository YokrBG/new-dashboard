import BillingPlanCard from "./billing-plan-card";
import CreditsRechargeCard from "./credits-recharge-card";

export default function Page() {
  return (
    <div className="space-y-6">
      <BillingPlanCard />
      <CreditsRechargeCard />
    </div>
  );
}