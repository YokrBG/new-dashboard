"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Linkedin,
  Send,
  Users,
  Cloud,
  Kanban,
  Calendar,
  Mail
} from "lucide-react";

const categories = [
  "All",
  "Outreach",
  "Social Media",
  "Chatbot",
  "CRM",
  "Text/Call",
  "Email"
];

const integrations = [
  {
    name: "WhatsApp",
    description: "Connect WhatsApp Number",
    categories: ["Outreach", "Chatbot", "Text/Call"],
    color: "#25D366",
    icon: MessageCircle
  },
  {
    name: "LinkedIn",
    description:
      "Integrate with LinkedIn to manage your professional network and automate tasks.",
    categories: ["Outreach", "Social Media"],
    color: "#0077B5",
    icon: Linkedin
  },
  {
    name: "Reddit",
    description:
      "Integrate with Reddit to manage your communities and automate tasks.",
    categories: ["Social Media"],
    color: "#FF4500",
    icon: MessageCircle
  },
  {
    name: "Mailer",
    description:
      "Send emails directly to your customers with a custom SMTP configuration.",
    categories: ["Email"],
    color: "#0EA5E9",
    icon: Send,
    installed: true
  },
  {
    name: "Agile CRM",
    description:
      "Integrate with Agile CRM to manage customer relationships and automate marketing.",
    categories: ["CRM"],
    color: "#1F8DD6",
    icon: Users
  },
  {
    name: "Salesforce",
    description:
      "Connect with Salesforce to manage customer data and automate workflows.",
    categories: ["CRM"],
    color: "#00A1E0",
    icon: Cloud
  },
  {
    name: "Monday.com",
    description:
      "Integrate with Monday.com to manage your workflows and automate tasks.",
    categories: ["CRM"],
    color: "#F62E5E",
    icon: Kanban
  },
  {
    name: "Calendly",
    description: "Connect your Calendly Meetings.",
    categories: ["Outreach"],
    color: "#0069FF",
    icon: Calendar
  },
  {
    name: "Gmail",
    description: "Connect your gmail",
    categories: ["Email"],
    color: "#EA4335",
    icon: Mail
  }
];

export default function IntegrationsClient() {
  const [category, setCategory] = useState<string>("All");

  const filtered = integrations.filter(
    (integration) => category === "All" || integration.categories.includes(category)
  );

  return (
    <div className="flex gap-6">
      <aside className="w-48 shrink-0">
        <nav className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "block w-full rounded-md px-3 py-2 text-left text-sm font-medium",
                category === cat ? "bg-muted" : "hover:bg-muted"
              )}>
              {cat}
            </button>
          ))}
        </nav>
      </aside>
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((integration) => (
          <Card key={integration.name} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2
                className="rounded-md px-3 py-1 text-sm font-semibold text-white"
                style={{ backgroundColor: integration.color }}>
                {integration.name}
              </h2>
              <div className="rounded-full bg-background p-2 text-foreground">
                <integration.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm">{integration.description}</p>
            </CardContent>
            {integration.installed && (
              <CardFooter>
                <Badge variant="secondary">Installed</Badge>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
