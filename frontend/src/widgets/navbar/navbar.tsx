import classes from "./Navbar.module.css";
import { ReactNode } from "react";
import { UiLink } from "@/shared/ui";

export const Navbar = () => {
  const isAuth = false;
  const user = { email: "test@test.com", id: 1 };

  let content: ReactNode = "";

  if (!isAuth) {
    content = (
      <>
        <li>
          <UiLink to="/" isNavLink>
            Home
          </UiLink>
        </li>
        <li>
          <UiLink to="/sign-in" isNavLink>
            Sign in
          </UiLink>
        </li>
        <li>
          <UiLink to="/sign-up" isNavLink>
            Sign up
          </UiLink>
        </li>
      </>
    );
  } else {
    content = (
      <>
        <li>
          <UiLink to="/" isNavLink>
            Home
          </UiLink>
        </li>
        <li>
          <UiLink to="/editor" isNavLink>
            Create New
          </UiLink>
        </li>

        <li>{user?.email}</li>
      </>
    );
  }

  return <ul className={classes.nav}>{content}</ul>;
};
