import { classNames as clsx } from "@/shared/lib";
import classes from "./ui-spinner.module.css";

type Props = {
  className?: string;
};

export const UiSpinner = ({ className }: Props) => {
  return (
    <div className={clsx(classes.lds_ring, {}, [className])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
