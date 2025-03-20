
import { useState } from "react";
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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormProps = {
  setAuthMode: (mode: "signin" | "signup" | "forgot-password" | "reset-success") => void;
  setAuthError: (error: string | null) => void;
};

const ForgotPasswordForm = ({ setAuthMode, setAuthError }: ForgotPasswordFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(values.email.trim().toLowerCase(), {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleForgotPassword)} className="space-y-4">
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
};

export default ForgotPasswordForm;
