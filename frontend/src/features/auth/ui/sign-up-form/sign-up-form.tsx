import { UiTextField, UiLink, UiButton } from "@/shared/ui";
import classes from "./sign-up-form.module.css";
import { useSignUpForm } from "../../model/use-sign-up-form";

export const SignUpForm = () => {
  const { register, handleSubmit, isLoading, error, validation } =
    useSignUpForm();

  return (
    <form className={classes.sign_up_form} onSubmit={handleSubmit}>
      {error && error.length > 0 && (
        <div className={classes.sign_up_form_error}>
          {error.map((msg) => {
            return <p>{msg}</p>;
          })}
        </div>
      )}
      <UiTextField
        label="Email"
        error={validation.email?.message}
        inputProps={{
          ...register("email", { required: true }),
          type: "email",
          autoComplete: "new-email",
          "aria-invalid": !!validation.email?.message,
        }}
      />
      <UiTextField
        label="Password"
        error={validation.password?.message}
        inputProps={{
          ...register("password", { required: true }),
          type: "password",
          autoComplete: "new-password",
          "aria-invalid": !!validation.email?.message,
        }}
      />
      <UiButton color="primary" variant="contained" disabled={isLoading}>
        Sign Up
      </UiButton>
      <p className={classes.sign_up_form_text}>
        Have an account?{" "}
        <UiLink to="/sign-in" className={classes.sign_up_form_link}>
          Sign In
        </UiLink>
      </p>
    </form>
  );
};
