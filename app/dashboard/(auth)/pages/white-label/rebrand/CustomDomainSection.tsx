"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CustomDomainSectionProps {
  initialDomain: string | null;
  brandId: string;
}

export default function CustomDomainSection({
  initialDomain,
  brandId
}: CustomDomainSectionProps) {
  const [domain, setDomain] = useState(initialDomain ?? "");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    fetch(`/api/brands/${brandId}/custom-domain`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ custom_domain: domain })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update custom domain");
        }
        toast.success("Custom domain updated");
      })
      .catch(() => {
        toast.error("Failed to update custom domain");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Custom Domain</p>
      <div className="flex gap-2">
        <Input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="yourdomain.com"
        />
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}