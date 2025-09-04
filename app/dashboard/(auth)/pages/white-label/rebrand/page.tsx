"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Save, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import CustomDomainSection from "./CustomDomainSection";

interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  custom_domain: string | null;
  created_at: Date;
  login_greeting_1: string;
  login_greeting_2: string;
  login_inspiration: string;
  login_mantra: string;
  register_greeting_1: string;
  register_greeting_2: string;
  register_motivation: string;
  register_quote: string;
  welcome_image_url: string | null;
  widget_logo_url: string | null;
}

export default function RebrandingPage() {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [brandName, setBrandName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [welcomeImageFile, setWelcomeImageFile] = useState<File | null>(null);
  const [widgetLogoFile, setWidgetLogoFile] = useState<File | null>(null);
  const [previewSignedUrl, setPreviewSignedUrl] = useState<string | null>(null);
  const [welcomeImageSignedUrl, setWelcomeImageSignedUrl] = useState<string | null>(null);
  const [widgetLogoSignedUrl, setWidgetLogoSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loginGreeting1, setLoginGreeting1] = useState("");
  const [loginGreeting2, setLoginGreeting2] = useState("");
  const [loginInspiration, setLoginInspiration] = useState("");
  const [loginMantra, setLoginMantra] = useState("");
  const [registerGreeting1, setRegisterGreeting1] = useState("");
  const [registerGreeting2, setRegisterGreeting2] = useState("");
  const [registerMotivation, setRegisterMotivation] = useState("");
  const [registerQuote, setRegisterQuote] = useState("");

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const fetchedBrand = data[0];
          setBrand(fetchedBrand);
          setBrandName(fetchedBrand.name);
          setLoginGreeting1(fetchedBrand.login_greeting_1);
          setLoginGreeting2(fetchedBrand.login_greeting_2);
          setLoginInspiration(fetchedBrand.login_inspiration);
          setLoginMantra(fetchedBrand.login_mantra);
          setRegisterGreeting1(fetchedBrand.register_greeting_1);
          setRegisterGreeting2(fetchedBrand.register_greeting_2);
          setRegisterMotivation(fetchedBrand.register_motivation);
          setRegisterQuote(fetchedBrand.register_quote);
          if (fetchedBrand.logo_url) {
            fetch(`/api/image?key=${encodeURIComponent(fetchedBrand.logo_url)}`)
              .then((res) => res.json())
              .then((result) => setPreviewSignedUrl(result.url))
              .catch(() => console.error("Failed to fetch signed URL for logo"));
          }
          if (fetchedBrand.welcome_image_url) {
            fetch(`/api/image?key=${encodeURIComponent(fetchedBrand.welcome_image_url)}`)
              .then((res) => res.json())
              .then((result) => setWelcomeImageSignedUrl(result.url))
              .catch(() => console.error("Failed to fetch signed URL for welcome image"));
          }
          if (fetchedBrand.widget_logo_url) {
            fetch(`/api/image?key=${encodeURIComponent(fetchedBrand.widget_logo_url)}`)
              .then((res) => res.json())
              .then((result) => setWidgetLogoSignedUrl(result.url))
              .catch(() => console.error("Failed to fetch signed URL for widget logo"));
          }
        }
      })
      .catch(() => console.error("Failed to fetch brand"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => {
      if (previewSignedUrl && logoFile) URL.revokeObjectURL(previewSignedUrl);
      if (welcomeImageSignedUrl && welcomeImageFile)
        URL.revokeObjectURL(welcomeImageSignedUrl);
      if (widgetLogoSignedUrl && widgetLogoFile)
        URL.revokeObjectURL(widgetLogoSignedUrl);
    };
  }, [
    previewSignedUrl,
    logoFile,
    welcomeImageSignedUrl,
    welcomeImageFile,
    widgetLogoSignedUrl,
    widgetLogoFile
  ]);

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreviewSignedUrl(URL.createObjectURL(file));
    }
  };

  const handleWelcomeImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setWelcomeImageFile(file);
      setWelcomeImageSignedUrl(URL.createObjectURL(file));
    }
  };

  const handleWidgetLogoFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setWidgetLogoFile(file);
      setWidgetLogoSignedUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveBrand = () => {
    if (!brand || !brandName.trim()) return;
    const confirmed = window.confirm(
      "Do you want to save the brand changes?"
    );
    if (!confirmed) return;

    setSaveLoading(true);
    const formData = new FormData();
    formData.append("id", brand.id);
    formData.append("name", brandName);
    formData.append("login_greeting_1", loginGreeting1);
    formData.append("login_greeting_2", loginGreeting2);
    formData.append("login_inspiration", loginInspiration);
    formData.append("login_mantra", loginMantra);
    formData.append("register_greeting_1", registerGreeting1);
    formData.append("register_greeting_2", registerGreeting2);
    formData.append("register_motivation", registerMotivation);
    formData.append("register_quote", registerQuote);
    if (logoFile) formData.append("logo", logoFile);
    if (welcomeImageFile) formData.append("welcome_image", welcomeImageFile);
    if (widgetLogoFile) formData.append("widget_logo", widgetLogoFile);
    formData.append("currentLogoUrl", brand.logo_url || "");
    formData.append(
      "currentWelcomeImageUrl",
      brand.welcome_image_url || ""
    );
    formData.append(
      "currentWidgetLogoUrl",
      brand.widget_logo_url || ""
    );

    fetch(`/api/brands`, {
      method: "PUT",
      body: formData
    })
      .then((res) => res.json())
      .then((updatedBrand) => {
        setBrand(updatedBrand);
        setBrandName(updatedBrand.name);
        setLoginGreeting1(updatedBrand.login_greeting_1);
        setLoginGreeting2(updatedBrand.login_greeting_2);
        setLoginInspiration(updatedBrand.login_inspiration);
        setLoginMantra(updatedBrand.login_mantra);
        setRegisterGreeting1(updatedBrand.register_greeting_1);
        setRegisterGreeting2(updatedBrand.register_greeting_2);
        setRegisterMotivation(updatedBrand.register_motivation);
        setRegisterQuote(updatedBrand.register_quote);
        setPreviewSignedUrl(updatedBrand.logo_url || null);
        setWelcomeImageSignedUrl(updatedBrand.welcome_image_url || null);
        setWidgetLogoSignedUrl(updatedBrand.widget_logo_url || null);
        setLogoFile(null);
        setWelcomeImageFile(null);
        setWidgetLogoFile(null);
        toast.success("Brand has been updated.");
      })
      .catch(() => {
        toast.error("Failed to update brand.");
      })
      .finally(() => setSaveLoading(false));
  };

  const needsUpdate = (value: string) => /change[- ]me/i.test(value);

  if (loading) {
    return (
      <div className="inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!brand) {
    return <div className="p-4">No brand found.</div>;
  }

  return (
    <div className="container mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Rebrand Your Solution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="mb-1 flex items-center text-sm font-medium">
                Brand Name
                {needsUpdate(brandName) && (
                  <AlertTriangle className="ml-2 h-4 w-4 text-yellow-500" />
                )}
              </p>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Brand Name"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Brand Logo</p>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoFileChange}
                placeholder="Upload Logo"
              />
              {previewSignedUrl && (
                <div className="mt-2">
                  <img
                    src={previewSignedUrl}
                    alt="Logo preview"
                    className="h-auto max-w-full rounded border"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Welcome Image</p>
              <Input
                type="file"
                accept="image/*"
                onChange={handleWelcomeImageFileChange}
                placeholder="Upload Welcome Image"
              />
              {welcomeImageSignedUrl && (
                <div className="mt-2">
                  <img
                    src={welcomeImageSignedUrl}
                    alt="Welcome Image preview"
                    className="h-auto max-w-full rounded border"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Widget Logo</p>
              <Input
                type="file"
                accept="image/*"
                onChange={handleWidgetLogoFileChange}
                placeholder="Upload Widget Logo"
              />
              {widgetLogoSignedUrl && (
                <div className="mt-2">
                  <img
                    src={widgetLogoSignedUrl}
                    alt="Widget Logo preview"
                    className="h-auto max-w-full rounded border"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Login Greeting 1</p>
              <Input
                value={loginGreeting1}
                onChange={(e) => setLoginGreeting1(e.target.value)}
                placeholder="Login Greeting 1"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Login Greeting 2</p>
              <Input
                value={loginGreeting2}
                onChange={(e) => setLoginGreeting2(e.target.value)}
                placeholder="Login Greeting 2"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Login Inspiration</p>
              <Input
                value={loginInspiration}
                onChange={(e) => setLoginInspiration(e.target.value)}
                placeholder="Login Inspiration"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Login Mantra</p>
              <Input
                value={loginMantra}
                onChange={(e) => setLoginMantra(e.target.value)}
                placeholder="Login Mantra"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Register Greeting 1</p>
              <Input
                value={registerGreeting1}
                onChange={(e) => setRegisterGreeting1(e.target.value)}
                placeholder="Register Greeting 1"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Register Greeting 2</p>
              <Input
                value={registerGreeting2}
                onChange={(e) => setRegisterGreeting2(e.target.value)}
                placeholder="Register Greeting 2"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Register Motivation</p>
              <Input
                value={registerMotivation}
                onChange={(e) => setRegisterMotivation(e.target.value)}
                placeholder="Register Motivation"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Register Quote</p>
              <Input
                value={registerQuote}
                onChange={(e) => setRegisterQuote(e.target.value)}
                placeholder="Register Quote"
              />
            </div>
            <CustomDomainSection
              initialDomain={brand.custom_domain}
              brandId={brand.id}
            />
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(brand.created_at).toLocaleString()}
            </p>
            <div className="flex justify-end">
              <Button
                onClick={handleSaveBrand}
                className="bg-primary text-white"
                disabled={saveLoading}
              >
                {saveLoading ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-1 h-4 w-4" />
                )}
                Save Brand
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}