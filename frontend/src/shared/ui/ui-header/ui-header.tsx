import { ReactNode } from "react";
import { UiLogo } from "..";
import classes from "./ui-header.module.css";
import { classNames as clsx } from "@/shared/lib";

export const UiHeader = ({
  className,
  rightSlot,
}: {
  className?: string;
  rightSlot?: ReactNode;
}) => {
  return (
    <header className={clsx(classes.header, {}, [className])}>
      <UiLogo />
      {rightSlot}
    </header>
  );
};
