import { useSessionQuery } from "@/entities/session";
import { UiPageSpinner } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { PropsWithChildren, ReactElement } from "react";

export const protectedPage = <P,>(Component: (props: P) => ReactElement) => {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const naviagte = useNavigate();

    const { isError, isLoading } = useSessionQuery();

    if (isLoading) {
      return <UiPageSpinner />;
    }

    if (isError) {
      naviagte("/sign-in", { replace: true });
    }
    return <Component {...props} />;
  };
};
