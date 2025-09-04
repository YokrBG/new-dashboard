
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FolderPlus } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [method, setMethod] = useState("" );
  const [open, setOpen] = useState(false);

  const onChange = (val: string) => {
    setMethod(val);
    if (val === "smart") {
      setOpen(true);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Recipients</h1>

      <RadioGroup
        value={method}
        onValueChange={onChange}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {[
          { value: "manual", label: "Manually Import", icon: "\u270D\uFE0F" },
          { value: "smart", label: "Smart Import", icon: "\uD83D\uDCC1" },
          { value: "third", label: "Import from 3rd tier", icon: "\uD83D\uDD17" }
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
              <span className="font-semibold text-center">{option.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {method === "manual" && (
        <div className="space-y-4">
          <Input placeholder="Name" />
          <Input placeholder="Phone number" />
          <Textarea placeholder="Description" />
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button size="lg">Continue</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Smart Import</DialogTitle>
            <DialogDescription>
              Upload a file to import recipients.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FolderPlus className="text-muted-foreground h-16 w-16" />
            <h2 className="mt-6 text-xl font-semibold">No file uploaded</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Get started by uploading a CSV file.
            </p>
            <div className="mt-6">
              <Button>Upload File</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
