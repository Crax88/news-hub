import { UiButton } from "@/shared/ui";
import { useSignOut } from "../../model/use-sign-out";
// import classes from './sign-out-button.module.css'

export const SignOutButton = () => {
  const { isLoading, signOut } = useSignOut();
  return (
    <UiButton
      variant="outlined"
      color="danger"
      size="small"
      disabled={isLoading}
      onClick={() => signOut()}
    >
      Sign Out
    </UiButton>
  );
};
