import { SignUpForm } from "@/features/auth";
import classes from "./sign-up.module.css";

export const SignUpPage = () => {
  return (
    <div className={classes.sign_up}>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};
