"use client";

import React from "react";

import { Check, ChevronsDownIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

/** ===== Element A, adapted (no CardAction) ===== */
function UpgradePlanCard({ used = 215, limit = 2000 }: { used?: number; limit?: number }) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  return (
    <Card>
      <CardHeader className="flex items-start justify-between space-y-0">
        <CardTitle>Developer Plan</CardTitle>
        <Button variant="outline" size="sm" className="-mt-1">
          Upgrade Plan
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={pct} />
        <div className="text-muted-foreground text-sm">
          You used {used} of {limit} credits
        </div>
      </CardContent>
    </Card>
  );
}
/** ============================================= */

const roles = [
  { id: 1, name: "All Plans", description: "Can view and comment." },
  { id: 2, name: "Developer", description: "Can view, comment and edit." },
  { id: 3, name: "Billing", description: "Can view, comment and manage billing." },
  { id: 4, name: "Owner", description: "Admin-level access to all resources." }
];

const members = [
  {
    id: 1,
    name: "Linkedin Outreach",
    avatar: `https://bundui-images.netlify.app/avatars/01.png`,
    role_id: 1
  },
  {
    id: 2,
    name: "Email Outreach",
    avatar: `https://bundui-images.netlify.app/avatars/02.png`,
    role_id: 2
  },
  {
    id: 3,
    name: "Web Chatbot",
    avatar: `https://bundui-images.netlify.app/avatars/03.png`,
    role_id: 1
  }
];

export function ClientCreditsDashboard() {
  const [data, setData] = React.useState(members);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <Card>
      {/* Credits card on top */}
      <CardContent className="pb-0">
        <UpgradePlanCard used={215} limit={2000} />
      </CardContent>

      {/* Online Agents header below */}
      <CardHeader className="pt-6">
        <CardTitle>Online Agents</CardTitle>
        <CardDescription>Select your Agents</CardDescription>
      </CardHeader>

      {/* Agents list */}
      <CardContent className="grid gap-6">
        {data.map((member, key) => (
          <div key={key} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={member.avatar} />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm leading-none font-medium">{member.name}</p>
              </div>
            </div>
            <Popover
              open={openIndex === key}
              onOpenChange={(isOpen) => setOpenIndex(isOpen ? key : null)}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  {roles.find((role) => role.id === member.role_id)?.name}{" "}
                  <ChevronsDownIcon className="text-muted-foreground ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup>
                      {roles.map((role, rk) => (
                        <CommandItem
                          key={rk}
                          onSelect={() => {
                            setData((prev) =>
                              prev.map((m) =>
                                m.id === member.id ? { ...m, role_id: role.id } : m
                              )
                            );
                            setOpenIndex(null);
                          }}
                          className="flex items-start px-4 py-2 space-y-1"
                        >
                          <div>
                            <p>{role.name}</p>
                            <p className="text-muted-foreground text-sm">{role.description}</p>
                          </div>
                          {member.role_id === role.id ? (
                            <Check className="text-primary ml-auto flex size-4" />
                          ) : null}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
