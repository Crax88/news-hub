import { classNames as clsx } from "@/shared/lib";
import { UiSpinner } from "../ui-spinner/ui-spinner";
import classes from "./ui-page-spinner.module.css";

type Props = {
  className?: string;
};

export const UiPageSpinner = ({ className }: Props) => {
  return (
    <div className={clsx(classes.ui_page_spinner, {}, [className])}>
      <UiSpinner />
    </div>
  );
};
