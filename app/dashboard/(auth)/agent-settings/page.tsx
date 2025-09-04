"use client";

import React from "react";
import AppRender from "@/app/dashboard/(auth)/apps/ai-chat/app-render";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

const defaultPersonality = `ROLE: You are a seasoned advisor with 10 years at Lynk, a conversational AI that turbocharges sales, lead qualification, customer support, and performance optimization—your 24/7 revenue driver.
`;

export default function Page() {
  const [newSuggestion, setNewSuggestion] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([
    "Chat with product expert",
    "How Lynk could help me?",
    "What is Lynk?"
  ]);

  const addSuggestion = () => {
    if (newSuggestion.trim()) {
      setSuggestions([...suggestions, newSuggestion.trim()]);
      setNewSuggestion("");
    }
  };

  const editSuggestion = (index: number) => {
    const current = suggestions[index];
    const updated = prompt("Edit suggestion", current);
    if (updated && updated.trim()) {
      setSuggestions(suggestions.map((s, i) => (i === index ? updated.trim() : s)));
    }
  };

  const deleteSuggestion = (index: number) => {
    setSuggestions(suggestions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Selected Website</h2>
        <Select defaultValue="lynk">
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue placeholder="Select Website" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lynk">Lynk - https://getlynk.co</SelectItem>
          </SelectContent>
        </Select>
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Lynk" />
        </div>
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="url">URL</Label>
          <Input id="url" defaultValue="https://getlynk.co" />
        </div>
        <p className="text-sm text-muted-foreground">Created At: 13/03/2025 13:50:00</p>
        <Button className="w-fit">Save Website</Button>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Website Configuration</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Update with AI</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl h-[80vh] p-0">
              <AppRender />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="personality">Personality</Label>
          <Textarea id="personality" className="min-h-[300px]" defaultValue={defaultPersonality} />
        </div>
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="agent-name">Agent Name</Label>
          <Input id="agent-name" defaultValue="Pierre" />
        </div>
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="welcome-message">Welcome Message</Label>
          <Input id="welcome-message" defaultValue="👋 Hey! Want some help with Lynk?" />
        </div>
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="theme">Theme</Label>
          <Select defaultValue="dark">
            <SelectTrigger id="theme">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 max-w-sm">
          <Label htmlFor="language">Language</Label>
          <Select defaultValue="en">
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-fit">Save Configuration</Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Suggestions</h2>
        <div className="flex items-center gap-2 max-w-sm">
          <Input
            placeholder="New suggestion"
            value={newSuggestion}
            onChange={(e) => setNewSuggestion(e.target.value)}
          />
          <Button onClick={addSuggestion}>Add</Button>
        </div>
        <ul className="space-y-2">
          {suggestions.map((s, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{s}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => editSuggestion(index)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteSuggestion(index)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
