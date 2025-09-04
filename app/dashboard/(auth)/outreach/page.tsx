"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const [mode, setMode] = useState("manual");
  const [channel, setChannel] = useState("linkedin");

  const handleContinue = () => {
    router.push("/dashboard/pages/outreach/recipients");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">AI Outreach</h1>

      <div className="space-y-4">
        <div className="font-medium">Mode</div>
        <RadioGroup
          value={mode}
          onValueChange={setMode}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {[
            { value: "automatic", label: "Automatic", icon: "\u270D\uFE0F", badge: "Import file" },
            {
              value: "smart",
              label: "Smart",
              icon: "\u2699\uFE0F",
              badge: "Import file",
            },
            {
              value: "agentic",
              label: "Agentic",
              icon: "\uD83E\uDD16",
              disabled: true,
              badge: "Coming soon"
            }
          ].map((option) => (
            <div key={option.value} className="relative">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="peer sr-only"
                disabled={option.disabled}
              />
              <Label
                htmlFor={option.value}
                className="peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary hover:border-primary flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 text-base data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="font-semibold">{option.label}</span>
                {option.badge && <Badge className="mt-2">{option.badge}</Badge>}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="font-medium">Outreach via</div>
        <RadioGroup
          value={channel}
          onValueChange={setChannel}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { value: "linkedin", label: "Linkedin", icon: "\uD83D\uDD17" },
            { value: "email", label: "Email", icon: "\u2709\uFE0F" },
            { value: "whatsapp", label: "Whatsapp", icon: "\uD83D\uDCF2" },
            { value: "voice", label: "Voice", icon: "\uD83C\uDFA4" }
          ].map((option) => (
            <div key={option.value} className="relative">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={option.value}
                className="peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary hover:border-primary flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 text-base"
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="font-semibold">{option.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}