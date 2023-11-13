import classes from "./navbar.module.css";
import { ReactNode } from "react";
import { UiLink } from "@/shared/ui";
import { useSessionQuery } from "@/entities/session";

export const Navbar = ({ rightSlot }: { rightSlot: ReactNode }) => {
  const { data: session, isLoading } = useSessionQuery();

  if (isLoading) {
    return null;
  }

  let content: ReactNode = "";

  if (!session) {
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

        <li>{rightSlot}</li>
      </>
    );
  }

  return <ul className={classes.nav}>{content}</ul>;
};
