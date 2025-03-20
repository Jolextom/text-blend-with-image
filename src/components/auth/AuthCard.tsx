
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

type AuthMode = "signin" | "signup" | "forgot-password" | "reset-success";

type AuthCardProps = {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  authError: string | null;
  children: ReactNode;
};

const AuthCard = ({ authMode, setAuthMode, authError, children }: AuthCardProps) => {
  const getCardTitle = () => {
    switch (authMode) {
      case "signin": return "Sign in to TextBlend";
      case "signup": return "Create an account";
      case "forgot-password": return "Reset your password";
      case "reset-success": return "Email sent";
    }
  };

  const getCardDescription = () => {
    switch (authMode) {
      case "signin": return "Enter your details to access your account";
      case "signup": return "Create an account to get started";
      case "forgot-password": return "Enter your email to receive a reset link";
      case "reset-success": return null;
    }
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {getCardTitle()}
        </CardTitle>
        {getCardDescription() && (
          <CardDescription className="text-center">
            {getCardDescription()}
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
        {children}
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
  );
};

export default AuthCard;
