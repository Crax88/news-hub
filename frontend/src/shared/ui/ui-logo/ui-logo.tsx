import { classNames as clsx } from "@/shared/lib";
import classes from "./ui-logo.module.css";

export const UiLogo = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(classes.ui_logo, {}, [className])}>
      <InfoIcon className={classes.ui_logo_icon} />
      NewsHub
    </div>
  );
};

export const InfoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="#2196F3"
        d="M37 40H11l-6 6V12c0-3.3 2.7-6 6-6h26c3.3 0 6 2.7 6 6v22c0 3.3-2.7 6-6 6z"
      />
      <g fill="#fff">
        <path d="M22 20h4v11h-4z" />
        <circle cx="24" cy="15" r="2" />
      </g>
    </svg>
  );
};
