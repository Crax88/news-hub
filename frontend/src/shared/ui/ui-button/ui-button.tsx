import { ButtonHTMLAttributes } from "react";
import { classNames as clsx } from "@/shared/lib";
import classes from "./ui-button.module.css";

export type UiButtonVariant = "outlined" | "contained";
export type UiButtonColor = "primary" | "danger" | "default";
export type UiButtonSize = "small" | "medium" | "large";
export type UiButtonProps = {
  variant?: UiButtonVariant;
  color?: UiButtonColor;
  size?: UiButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const UiButton = ({
  className,
  variant = "outlined",
  color = "default",
  size = "medium",
  ...props
}: UiButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        classes.ui_button,
        {
          [classes.ui_button_primary]: color === "primary",
          [classes.ui_button_danger]: color === "danger",
          [classes.ui_button_outlined]: variant === "outlined",
          [classes.ui_button_contained]: variant === "contained",
          [classes.ui_button_small]: size === "small",
          [classes.ui_button_large]: size === "large",
        },
        [className]
      )}
    />
  );
};
