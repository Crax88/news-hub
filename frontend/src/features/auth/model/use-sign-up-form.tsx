import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { signUp } from "@/shared/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

export const signUpFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid format")
    .min(1, "Email is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.*]).{8,64}$/gm,
      "at least 8 characters with 1 special character and capital character"
    ),
});

export type SigUpFormSchema = z.infer<typeof signUpFormSchema>;

export const useSignUpForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["session"]);
    },
  });

  const error: string[] = [];
  if (signUpMutation.error) {
    if (
      signUpMutation.error instanceof AxiosError &&
      signUpMutation.error.response &&
      signUpMutation.error.response.data.errors
    ) {
      for (const key in signUpMutation.error.response.data.errors) {
        if (key === "error") {
          error.push(signUpMutation.error.response.data.errors[key]);
        } else {
          error.push(
            `${key} ${signUpMutation.error.response.data.errors[key]}`
          );
        }
      }
    } else if (
      signUpMutation.error &&
      signUpMutation.error instanceof AxiosError
    ) {
      error.push(signUpMutation.error.message);
    } else {
      error.push("Sorru something failed");
    }
  }

  return {
    register,
    handleSubmit: handleSubmit((data) => signUpMutation.mutate(data)),
    isLoading: signUpMutation.isLoading,
    error,
    validation: errors,
  };
};
