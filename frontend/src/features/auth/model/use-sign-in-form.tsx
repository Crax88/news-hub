import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { signIn } from "@/shared/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

export const signInFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

export type SigInFormSchema = z.infer<typeof signInFormSchema>;

export const useSignInForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigInFormSchema>({
    resolver: zodResolver(signInFormSchema),
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["session"]);
    },
  });

  const error: string[] = [];
  if (signInMutation.error) {
    if (
      signInMutation.error instanceof AxiosError &&
      signInMutation.error.response &&
      signInMutation.error.response.data.errors
    ) {
      for (const key in signInMutation.error.response.data.errors) {
        if (key === "error") {
          error.push(signInMutation.error.response.data.errors[key]);
        } else {
          error.push(
            `${key} ${signInMutation.error.response.data.errors[key]}`
          );
        }
      }
    } else if (
      signInMutation.error &&
      signInMutation.error instanceof AxiosError
    ) {
      error.push(signInMutation.error.message);
    } else {
      error.push("Sorru something failed");
    }
  }

  return {
    register,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isLoading: signInMutation.isLoading,
    error,
    validation: errors,
  };
};
