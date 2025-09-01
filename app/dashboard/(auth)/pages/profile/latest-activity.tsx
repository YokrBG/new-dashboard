"use client";

import * as React from "react";
import Link from "next/link";
import { BadgeCheckIcon, BriefcaseBusinessIcon, ClockIcon, DownloadCloud } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

export function LatestActivity() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Latest Activity</CardTitle>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary text-sm hover:underline">
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="relative border-s">
          <li className="ms-6 mb-10 space-y-2">
            <span className="bg-muted absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full border">
              <BriefcaseBusinessIcon className="text-primary size-3" />
            </span>
            <h3 className="flex items-center font-semibold">
              Lynk Agent Application UI v2.0.0{" "}
              <Badge variant="outline" className="ms-2">
                Latest
              </Badge>
            </h3>
            <time className="text-muted-foreground flex items-center gap-1.5 text-sm leading-none">
              <ClockIcon className="size-3" /> Released on December 2nd, 2025
            </time>
            <p className="text-muted-foreground">
              Get access to the latest Lynk AI Agents.
            </p>
            <Button variant="outline" asChild>
              <Link href="#">
                <DownloadIcon /> Download ZIP
              </Link>
            </Button>
          </li>
          <li className="ms-6 mb-10 space-y-2">
            <span className="bg-muted absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full border">
              <BadgeCheckIcon className="text-primary size-3" />
            </span>
            <h3 className="font-semibold">Lynk v1.3.0</h3>
            <time className="text-muted-foreground flex items-center gap-1.5 text-sm leading-none">
              <ClockIcon className="size-3" /> Released on December 2nd, 2025
            </time>
            <p className="text-muted-foreground">
              All of Agents are tailored to your needs.
            </p>
          </li>
          <li className="ms-6 space-y-2">
            <span className="bg-muted absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full border">
              <BriefcaseBusinessIcon className="text-primary size-3" />
            </span>
            <h3 className="font-semibold">Lynk Library v1.2.2</h3>
            <time className="text-muted-foreground flex items-center gap-1.5 text-sm leading-none">
              <ClockIcon className="size-3" /> Released on September 2nd, 2025
            </time>
            <p className="text-muted-foreground">
              Get started with dozens of Agents.
            </p>
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
