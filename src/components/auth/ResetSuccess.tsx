
import { Button } from "@/components/ui/button";

type ResetSuccessProps = {
  setAuthMode: (mode: "signin" | "signup" | "forgot-password" | "reset-success") => void;
};

const ResetSuccess = ({ setAuthMode }: ResetSuccessProps) => {
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
};

export default ResetSuccess;
