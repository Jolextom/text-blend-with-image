
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthMode = "signin" | "signup" | "forgot-password" | "reset-success";

export const useSupabaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  return {
    loading,
    authMode,
    setAuthMode,
    authError,
    setAuthError,
  };
};
