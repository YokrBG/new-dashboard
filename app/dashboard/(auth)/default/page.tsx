import { generateMeta } from "@/lib/utils";

import CustomDateRangePicker from "@/components/custom-date-range-picker";
import { Button } from "@/components/ui/button";

import {
  ChatWidget,
  LatestPayments,
  PaymentMethodCard,
  SubscriptionsCard,
  TeamMembersCard,
  TotalRevenueCard,
  WhiteLabelAnalytics
} from "@/app/dashboard/(auth)/default/components";
import { Download } from "lucide-react";
import { toast } from "sonner";

export async function generateMetadata() {
  return generateMeta({
    title: "White Label Dashboard",
    description:
      "The White Label dashboard provides an overview of your credits, revenues and clients.",
    canonical: "/default"
  });
}

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <CustomDateRangePicker />
          <Button>
            <Download />
            <span className="hidden lg:inline">Export</span>
          </Button>
        </div>
      </div>
      <div className="gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
        <SubscriptionsCard /> {/* nb of clients */}
        <SubscriptionsCard /> {/* used credits */}
        <TotalRevenueCard /> {/* generated revenue */}
        <TeamMembersCard />
        <div className="lg:col-span-2">
          <WhiteLabelAnalytics /> {/* component exercice minutes tsx */}
        </div>
        <div className="lg:col-span-2">
          <LatestPayments />
        </div>
        <ChatWidget /> {/* maybe we can use as customer support? */}
      </div>
    </div>
  );
}
