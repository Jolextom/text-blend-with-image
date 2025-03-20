
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignInFormProps = {
  setAuthMode: (mode: "signin" | "signup" | "forgot-password" | "reset-success") => void;
  setAuthError: (error: string | null) => void;
};

const SignInForm = ({ setAuthMode, setAuthError }: SignInFormProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      console.log("Attempting to sign in with:", { email: values.email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      console.log("Sign-in response:", { data, error });

      if (error) {
        console.error("Sign in error:", error);
        setAuthError(error.message);
        toast.error("Invalid login credentials. Please check your email and password.");
      } else if (data.user) {
        console.log("Signed in successfully with user:", data.user);
        toast.success("Signed in successfully!");
        navigate("/editor");
      } else {
        console.error("No user returned from sign in");
        setAuthError("An unexpected error occurred during sign in");
        toast.error("An unexpected error occurred during sign in");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
};

export default SignInForm;
