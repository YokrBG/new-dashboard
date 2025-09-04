import IntegrationsClient from "./integrations-client";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
  return generateMeta({
    title: "Integrations",
    description: "Browse and manage available integrations.",
    canonical: "/integrations"
  });
}

export default function Page() {
  return <IntegrationsClient />;
}
