import { generateMeta } from "@/lib/utils";

import CustomDateRangePicker from "@/components/custom-date-range-picker";
import { Button } from "@/components/ui/button";

import {
  ActiveClientsCard,
  GeneratedLeadsCard,
  InboxShortcutCard,
  SentimentAnalytics,
  TeamMembersCard,
  TotalConversationsCard,
  WhiteLabelAnalytics
} from "@/app/dashboard/(auth)/client-dashboard/components";
import { Download } from "lucide-react";

export async function generateMetadata() {
  return generateMeta({
    title: "Agents Dashboard",
    description: "The Agents dashboard provides an overview of your conversations, leads and clients.",
    canonical: "/agents"
  });
}

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Agents Dashboard</h1>
        <div className="flex items-center space-x-2">
          <CustomDateRangePicker />
          <Button>
            <Download />
            <span className="hidden lg:inline">Export</span>
          </Button>
        </div>
      </div>
      <div className="gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
        <TotalConversationsCard />
        <GeneratedLeadsCard />
        <ActiveClientsCard />
        <TeamMembersCard />
        <div className="lg:col-span-2">
          <InboxShortcutCard />
        </div>
        <div className="lg:col-span-2">
          <WhiteLabelAnalytics />
        </div>
        <SentimentAnalytics />
      </div>
    </div>
  );
}