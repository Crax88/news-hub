import { ReactNode } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./ui-link.module.css";
import { classNames as clsx } from "@/shared/lib";

export const UiLink = ({
  children,
  to,
  className,
  isNavLink,
}: {
  children: ReactNode;
  to: string;
  className?: string;
  isNavLink?: boolean;
}) => {
  if (isNavLink) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => {
          return clsx(classes.ui_link, { [classes.ui_link_active]: isActive }, [
            className,
          ]);
        }}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <Link to={to} className={clsx(classes.ui_link, {}, [className])}>
      {children}
    </Link>
  );
};
