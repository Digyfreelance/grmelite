import { Link } from "react-router-dom";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { toast } from "sonner";

const Login = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <Layout>
      <div className="container py-14 md:py-20 max-w-md">
        <div className="bg-card rounded-3xl shadow-card p-8">
          <h1 className="font-display text-3xl font-bold text-center mb-2">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="text-center text-muted-foreground text-sm mb-6">{mode === "login" ? "Sign in to access your account" : "Join GRM Elite Wear"}</p>
          <form onSubmit={(e) => { e.preventDefault(); toast.info("Auth will be enabled in Phase 2 with Lovable Cloud."); }} className="space-y-3">
            {mode === "register" && <input required placeholder="Full name" maxLength={100} className="w-full h-11 px-4 rounded-lg border border-border bg-background"/>}
            <input required type="email" placeholder="Email" maxLength={255} className="w-full h-11 px-4 rounded-lg border border-border bg-background"/>
            <input required type="password" placeholder="Password" minLength={6} className="w-full h-11 px-4 rounded-lg border border-border bg-background"/>
            <button className="w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-90 transition-smooth">
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
          <div className="text-center text-sm text-muted-foreground mt-5">
            {mode === "login" ? "New to GRM? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-primary font-medium hover:underline">
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4"><Link to="/" className="hover:text-primary">← Back to home</Link></p>
      </div>
    </Layout>
  );
};
export default Login;
