import { useResetSession } from "@/entities/session";
import { signOut } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

export const useSignOut = () => {
  const resetSession = useResetSession();
  const navigate = useNavigate();

  const signOutMutation = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      navigate("/");
      resetSession();
    },
  });

  return {
    isLoading: signOutMutation.isLoading,
    signOut: signOutMutation.mutate,
  };
};
