import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "@/hooks/use-toast";

export default function Auth() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/admin");
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      else toast({ title: "Account created", description: "Check your email to confirm, then sign in." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-16 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <h1 className="font-display text-3xl mb-2">{mode === "signin" ? "ADMIN SIGN IN" : "CREATE ADMIN ACCOUNT"}</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "signup" ? "First account becomes the admin." : "Sign in to manage site content and view submissions."}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            </div>
            <Button type="submit" disabled={busy} className="w-full font-display tracking-widest">
              {busy ? "..." : mode === "signin" ? "SIGN IN" : "SIGN UP"}
            </Button>
          </form>
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 text-sm text-muted-foreground hover:text-accent w-full text-center">
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
