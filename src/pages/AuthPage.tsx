
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthCard from "@/components/auth/AuthCard";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetSuccess from "@/components/auth/ResetSuccess";

const AuthPage = () => {
  const { authMode, setAuthMode, authError, setAuthError } = useSupabaseAuth();

  const renderForm = () => {
    switch (authMode) {
      case "signin":
        return <SignInForm setAuthMode={setAuthMode} setAuthError={setAuthError} />;
      case "signup":
        return <SignUpForm setAuthMode={setAuthMode} setAuthError={setAuthError} />;
      case "forgot-password":
        return <ForgotPasswordForm setAuthMode={setAuthMode} setAuthError={setAuthError} />;
      case "reset-success":
        return <ResetSuccess setAuthMode={setAuthMode} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4">
        <AuthCard 
          authMode={authMode} 
          setAuthMode={setAuthMode} 
          authError={authError}
        >
          {renderForm()}
        </AuthCard>
      </main>

      <AuthFooter />
    </div>
  );
};

export default AuthPage;
