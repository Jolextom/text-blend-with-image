
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";

type AuthMode = "signin" | "signup" | "forgot-password" | "reset-success";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/editor");
      }
    };
    
    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          console.log("Auth state changed, redirecting to editor", event);
          navigate("/editor");
        }
      }
    );

    // Check for auth error in URL
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const error = hashParams.get("error");
    const errorDescription = hashParams.get("error_description");
    
    if (error) {
      const errorMessage = errorDescription || "Authentication failed";
      console.error("Auth error from URL:", errorMessage);
      setAuthError(errorMessage);
      toast.error(errorMessage);
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location]);

  const signInSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  const signUpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
  });

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Sign in error:", error);
        setAuthError(error.message);
        toast.error(error.message);
      } else {
        toast.success("Signed in successfully!");
      }
    } catch (error) {
      console.error("Unexpected sign in error:", error);
      if (error instanceof Error) {
        setAuthError(error.message);
        toast.error(error.message);
      } else {
        setAuthError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/editor`,
        }
      });

      if (error) {
        console.error("Sign up error:", error);
        setAuthError(error.message);
        toast.error(error.message);
      } else {
        toast.success("Check your email to confirm your account!");
        setAuthMode("signin");
      }
    } catch (error) {
      console.error("Unexpected sign up error:", error);
      if (error instanceof Error) {
        setAuthError(error.message);
        toast.error(error.message);
      } else {
        setAuthError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        console.error("Password reset error:", error);
        setAuthError(error.message);
        toast.error(error.message);
      } else {
        toast.success("Password reset link sent to your email!");
        setAuthMode("reset-success");
      }
    } catch (error) {
      console.error("Unexpected password reset error:", error);
      if (error instanceof Error) {
        setAuthError(error.message);
        toast.error(error.message);
      } else {
        setAuthError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (authMode) {
      case "signin":
        return (
          <Form {...signInForm}>
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="text-center">
                <Button 
                  variant="link" 
                  onClick={() => setAuthMode("forgot-password")} 
                  className="text-sm p-0 h-auto"
                  type="button"
                >
                  Forgot your password?
                </Button>
              </div>
            </form>
          </Form>
        );

      case "signup":
        return (
          <Form {...signUpForm}>
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>
        );

      case "forgot-password":
        return (
          <Form {...forgotPasswordForm}>
            <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Sending..." : "Send reset link"}
              </Button>
              <div className="text-center">
                <Button 
                  variant="link" 
                  onClick={() => setAuthMode("signin")} 
                  className="text-sm p-0 h-auto"
                  type="button"
                >
                  Back to sign in
                </Button>
              </div>
            </form>
          </Form>
        );

      case "reset-success":
        return (
          <div className="text-center">
            <div className="mb-4 text-green-600">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Check your email</h3>
            <p className="text-gray-600 mb-4">We've sent a password reset link to your email address.</p>
            <Button onClick={() => setAuthMode("signin")}>
              Back to sign in
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold">TextBlend</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {authMode === "signin" && "Sign in to TextBlend"}
              {authMode === "signup" && "Create an account"}
              {authMode === "forgot-password" && "Reset your password"}
              {authMode === "reset-success" && "Email sent"}
            </CardTitle>
            {authMode !== "reset-success" && (
              <CardDescription className="text-center">
                {authMode === "signin" 
                  ? "Enter your details to access your account" 
                  : authMode === "signup" 
                  ? "Create an account to get started" 
                  : "Enter your email to receive a reset link"}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  {authError}
                </AlertDescription>
              </Alert>
            )}
            {renderForm()}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              {authMode === "signin" ? (
                <>
                  Don't have an account yet?{" "}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setAuthMode("signup")}>
                    Create an account
                  </Button>
                </>
              ) : authMode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setAuthMode("signin")}>
                    Sign in
                  </Button>
                </>
              ) : null}
            </div>
            <div className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-6 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TextBlend. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
