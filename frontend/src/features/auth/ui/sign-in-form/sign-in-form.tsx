import { UiTextField, UiLink, UiButton } from "@/shared/ui";
import classes from "./sign-in-form.module.css";
import { useSignInForm } from "../../model/use-sign-in-form";

export const SignInForm = () => {
  const { register, handleSubmit, isLoading, error, validation } =
    useSignInForm();

  return (
    <form className={classes.sign_in_form} onSubmit={handleSubmit}>
      {error && error.length > 0 && (
        <div className={classes.sign_in_form_error}>
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
          autoComplete: "current-email",
        }}
      />
      <UiTextField
        label="Password"
        error={validation.password?.message}
        inputProps={{
          ...register("password", { required: true }),
          type: "password",
          autoComplete: "current-password",
        }}
      />
      <UiButton color="primary" variant="contained" disabled={isLoading}>
        Sign In
      </UiButton>
      <p className={classes.sign_in_form_text}>
        Need an account?{" "}
        <UiLink to="/sign-up" className={classes.sign_in_form_link}>
          Sign Up
        </UiLink>
      </p>
    </form>
  );
};
