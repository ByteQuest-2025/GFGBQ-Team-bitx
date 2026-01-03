import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, History, Download, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schemas
const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(loginForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    
    // Mock authentication - simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock success (in real app, would validate credentials)
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    
    setIsLoading(false);
    navigate("/history");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse(signupForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    
    // Mock authentication - simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock success
    toast({
      title: "Account created!",
      description: "Welcome to VeriFact AI. Your account has been created.",
    });
    
    setIsLoading(false);
    navigate("/history");
  };

  const handleContinueWithoutLogin = () => {
    navigate("/verify");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">VeriFact AI</h1>
          <p className="text-primary-foreground/80 text-sm mt-2 max-w-md mx-auto px-4">
            AI-powered hallucination detection and citation verification
          </p>
        </div>
      </div>

      {/* Auth Card */}
      <div className="flex-1 -mt-8 relative z-10">
        <div className="container max-w-md mx-auto px-4">
          {/* Optional login notice */}
          <div className="mb-4 p-3 bg-muted/60 rounded-xl border border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Login is optional.</span>{" "}
              Create an account to save verification history and download reports.
            </p>
          </div>

          <div className="bg-card rounded-2xl border shadow-xl p-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-5">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Welcome back to VeriFact AI</h2>
                  <p className="text-sm text-muted-foreground">
                    Access your saved verification history and reports.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="name@example.com"
                        className={`pl-10 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password" className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                        Password
                      </Label>
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline"
                        onClick={() => toast({ title: "Password reset", description: "Check your email for reset instructions." })}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-pulse">Signing you in...</span>
                      </>
                    ) : (
                      <>
                        Log In
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                  onClick={handleContinueWithoutLogin}
                >
                  Continue without login
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign up
                  </button>
                </p>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-5">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Create your VeriFact AI account</h2>
                  <p className="text-sm text-muted-foreground">
                    Save and track your AI verification results.
                  </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        className={`pl-10 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        className={`pl-10 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-pulse">Creating account...</span>
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                  onClick={handleContinueWithoutLogin}
                >
                  Continue without login
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Already have an account?{" "}
                  <button 
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => setActiveTab("login")}
                  >
                    Log in
                  </button>
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Trust & Privacy notice */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-verified" />
            <span>We don't store verification content without your consent.</span>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-muted-foreground mt-4 px-4">
            By continuing, you agree to our{" "}
            <button className="text-primary hover:underline">Terms of Service</button>
            {" "}and{" "}
            <button className="text-primary hover:underline">Privacy Policy</button>.
          </p>

          {/* Benefits section */}
          <div className="mt-6 p-4 bg-muted/40 rounded-xl border border-border/50">
            <h3 className="text-sm font-medium mb-4 text-center">Why create an account?</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-background/60">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <History className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">Save History</p>
                  <p className="text-xs text-muted-foreground">Access past verifications</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-background/60">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">Download Reports</p>
                  <p className="text-xs text-muted-foreground">Export your results</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-background/60">
                <div className="w-8 h-8 rounded-lg bg-verified/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-verified" />
                </div>
                <div>
                  <p className="text-xs font-medium">Track Quality</p>
                  <p className="text-xs text-muted-foreground">Monitor content trends</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-background/60">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">Analytics</p>
                  <p className="text-xs text-muted-foreground">View usage insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="py-8" />
    </div>
  );
}
