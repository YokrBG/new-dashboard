"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function CreditsUsageCard() {
  const used = 200;
  const total = 500;
  const remaining = total - used;
  const percentage = (used / total) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credits</CardTitle>
        <CardAction className="flex gap-2">
          <Button size="sm">Buy Credits</Button>
          <Button size="sm" variant="outline">
            Upgrade Plan
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} />
        <div className="mt-2 font-display text-2xl">
          {used} of {total} used
        </div>
        <p className="text-muted-foreground mt-1.5 text-xs">
          {remaining} credits left
        </p>
      </CardContent>
    </Card>
  );
}
