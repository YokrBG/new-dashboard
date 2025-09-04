"use client";

import * as React from "react";
import {
  AlertCircle,
  Archive,
  Bot,
  Inbox,
  Mail,
  MessagesSquare,
  Phone,
  ShoppingCart,
  Trash2,
  Users2
} from "lucide-react";

import { Nav } from "./nav";
import { Separator } from "@/components/ui/separator";
import { AccountSwitcher } from "./account-switcher";
import { accounts } from "../data";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function NavMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-auto [&>button:first-of-type]:hidden">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Navigation</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>

        <div className="flex h-[52px] items-center justify-center px-2">
          <AccountSwitcher isCollapsed={false} accounts={accounts} />
        </div>

        <Separator />

        <Nav
          isCollapsed={false}
          links={[
            {
              title: "All Inboxes",
              label: "128",
              icon: Inbox,
              variant: "default"
            },
            {
              title: "Chatbot",
              label: "9",
              icon: Bot,
              variant: "ghost"
            },
            {
              title: "Socials",
              label: "",
              icon: MessagesSquare,
              variant: "ghost"
            },
            {
              title: "Emails",
              label: "23",
              icon: Mail,
              variant: "ghost"
            },
            {
              title: "Calls",
              label: "",
              icon: Phone,
              variant: "ghost"
            },
            {
              title: "Trash",
              label: "",
              icon: Trash2,
              variant: "ghost"
            },
            {
              title: "Archive",
              label: "",
              icon: Archive,
              variant: "ghost"
            }
          ]}
        />

        <Separator />

        <Nav
          isCollapsed={false}
          links={[
            {
              title: "No Outcome",
              label: "972",
              icon: Users2,
              dot: <span className="me-2 size-3.5 rounded-full bg-gray-400 dark:bg-gray-700" />,
              variant: "ghost"
            },
            {
              title: "Lead Captured",
              label: "342",
              icon: AlertCircle,
              dot: <span className="me-2 size-3.5 rounded-full bg-green-400 dark:bg-green-700" />,
              variant: "ghost"
            },
            {
              title: "Lead Opportunity",
              label: "128",
              icon: MessagesSquare,
              dot: <span className="me-2 size-3.5 rounded-full bg-yellow-400 dark:bg-yellow-700" />,
              variant: "ghost"
            },
            {
              title: "Unsuccessful",
              label: "8",
              icon: ShoppingCart,
              dot: <span className="me-2 size-3.5 rounded-full bg-red-400 dark:bg-red-700" />,
              variant: "ghost"
            },
            {
              title: "Resolved",
              label: "21",
              icon: Archive,
              dot: <span className="me-2 size-3.5 rounded-full bg-purple-400 dark:bg-purple-700" />,
              variant: "ghost"
            }
          ]}
        />
      </SheetContent>
    </Sheet>
  );
}