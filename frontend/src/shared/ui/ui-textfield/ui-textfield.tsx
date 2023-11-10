import { useId, PropsWithRef, InputHTMLAttributes } from "react";
import { classNames as clsx } from "@/shared/lib";
import classes from "./ui-textfield.module.css";

export type UiTextFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};

export const UiTextField = ({
  className,
  label,
  error,
  inputProps,
}: UiTextFieldProps) => {
  const id = useId();
  return (
    <div className={clsx(classes.ui_textfield, {}, [className])}>
      {label && (
        <label htmlFor={id} className={classes.ui_textfield_label}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className={clsx(
          classes.ui_textfield_input,
          {},
          [inputProps?.className]
          //   "rounded border border-slate-300 focus:border-teal-600 outline-none px-2 h-10"
        )}
        id={id}
      />
      {error && <div className={classes.ui_textfield_error}>{error}</div>}
    </div>
  );
};
