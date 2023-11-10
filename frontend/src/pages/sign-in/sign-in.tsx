import { SignInForm } from "@/features/auth";
import classes from "./sign-in.module.css";

export const SignInPage = () => {
  return (
    <div className={classes.sign_in}>
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  );
};
