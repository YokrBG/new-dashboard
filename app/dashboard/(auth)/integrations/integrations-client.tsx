"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Linkedin,
  Send,
  Users,
  Cloud,
  Kanban,
  Calendar,
  Mail,
  Loader2,
  BotIcon
} from "lucide-react";

const categories = ["All", "Outreach", "Social Media", "Chatbot", "CRM", "Text/Call", "Email", "Calendar"];

type Integration = {
  name: string;
  description: string;
  categories: string[];
  color: string;
  icon: any;
  installed?: boolean;
};

const integrations: Integration[] = [
  {
    name: "WhatsApp",
    description: "Connect WhatsApp Number",
    categories: ["Outreach", "Text/Call"],
    color: "#25D366",
    icon: MessageCircle
  },
  {
    name: "LinkedIn",
    description: "Integrate with LinkedIn to manage your professional network and automate tasks.",
    categories: ["Outreach", "Social Media"],
    color: "#0077B5",
    icon: Linkedin
  },
  {
    name: "Reddit",
    description: "Integrate with Reddit to manage your communities and automate tasks.",
    categories: ["Social Media"],
    color: "#FF4500",
    icon: MessageCircle
  },
  {
    name: "Mailer",
    description: "Send emails directly to your customers with a custom SMTP configuration.",
    categories: ["Email", "Outreach"],
    color: "#0EA5E9",
    icon: Send,
    installed: true
  },
  {
    name: "Agile CRM",
    description: "Integrate with Agile CRM to manage customer relationships and automate marketing.",
    categories: ["CRM"],
    color: "#1F8DD6",
    icon: Users
  },
  {
    name: "Salesforce",
    description: "Connect with Salesforce to manage customer data and automate workflows.",
    categories: ["CRM"],
    color: "#00A1E0",
    icon: Cloud
  },
  {
    name: "Monday.com",
    description: "Integrate with Monday.com to manage your workflows and automate tasks.",
    categories: ["CRM"],
    color: "#F62E5E",
    icon: Kanban
  },
  {
    name: "Calendly",
    description: "Connect your Calendly Meetings.",
    categories: ["Calendar"],
    color: "#0069FF",
    icon: Calendar
  },
  {
    name: "Gmail",
    description: "Connect your gmail",
    categories: ["Email", "Outreach"],
    color: "#EA4335",
    icon: Mail
  },
  {
    name: "Chatbot",
    description: "Connect your website chatbot",
    categories: ["Chatbot"],
    color: "#faaa55ff",
    icon: BotIcon
  }
];

export default function IntegrationsClient() {
  const [category, setCategory] = useState<string>("All");
  const [items, setItems] = useState<Integration[]>(integrations);
  const [installing, setInstalling] = useState<string | null>(null);

  const filtered = items.filter(
    (integration) => category === "All" || integration.categories.includes(category)
  );

  function handleInstall(name: string) {
    // simulate install flow; replace with your real connect logic
    setInstalling(name);
    setTimeout(() => {
      setItems((prev) => prev.map((i) => (i.name === name ? { ...i, installed: true } : i)));
      setInstalling(null);
    }, 600);
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar filter */}
      <aside className="w-48 shrink-0">
        <nav className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition",
                category === cat
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-foreground/80"
              )}>
              {cat}
            </button>
          ))}
        </nav>
      </aside>

      {/* Cards grid */}
      <div className="grid flex-1 gap-4 md:grid-cols-2 auto-rows-[1fr]">
        {filtered.map((integration) => {
          const Icon = integration.icon;
          const isInstalling = installing === integration.name;

          return (
            <Card
              key={integration.name}
              className="group flex h-full flex-col border transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="flex min-h-[72px] flex-row items-center justify-between gap-3">
                <div
                  className="rounded-md px-3 py-1 text-sm font-semibold text-white shadow-sm"
                  style={{ backgroundColor: integration.color }}>
                  {integration.name}
                </div>
                <div className="rounded-full bg-muted p-2 ring-1 ring-border">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {integration.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {integration.categories.map((c) => (
                    <Badge key={c} variant="outline" className="text-xs">
                      {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="mt-auto flex items-center justify-between">
                {integration.installed ? (
                  <>
                    <Badge variant="secondary">Installed</Badge>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-muted-foreground">Not connected</span>
                    <Button
                      size="sm"
                      onClick={() => handleInstall(integration.name)}
                      disabled={isInstalling}>
                      {isInstalling ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding…
                        </>
                      ) : (
                        "Add"
                      )}
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
