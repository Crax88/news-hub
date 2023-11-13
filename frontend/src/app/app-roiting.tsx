import { UiHeader, UiPageSpinner } from "@/shared/ui";
import { ReactNode, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./app-layout";
import { Navbar } from "@/widgets/navbar";
import { Profile } from "@/widgets/profile";

const WithWrapper = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<UiPageSpinner />}>{children}</Suspense>;
};

const Home = lazy(() =>
  import("@/pages/home/home").then((module) => ({ default: module.HomePage }))
);
const SignIn = lazy(() =>
  import("@/pages/sign-in/sign-in").then((module) => ({
    default: module.SignInPage,
  }))
);
const SignUp = lazy(() =>
  import("@/pages/sign-up/sign-up").then((module) => ({
    default: module.SignUpPage,
  }))
);
const EditorPAge = lazy(() =>
  import("@/pages/new-editor/new-editor").then((module) => ({
    default: module.EditorPage,
  }))
);
const NewPage = lazy(() =>
  import("@/pages/new/new").then((module) => ({
    default: module.NewPage,
  }))
);

export const AppRouting = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            headerSlot={
              <UiHeader rightSlot={<Navbar rightSlot={<Profile />} />} />
            }
          />
        }
      >
        <Route
          index
          element={
            <WithWrapper>
              <Home />
            </WithWrapper>
          }
        />
        <Route
          path="/sign-in"
          element={
            <WithWrapper>
              <SignIn />
            </WithWrapper>
          }
        />
        <Route
          path="/sign-up"
          element={
            <WithWrapper>
              <SignUp />
            </WithWrapper>
          }
        />
        <Route
          path="/news/:id"
          element={
            <WithWrapper>
              <NewPage />
            </WithWrapper>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <WithWrapper>
              <EditorPAge />
            </WithWrapper>
          }
        />
        <Route
          path="/editor"
          element={
            <WithWrapper>
              <EditorPAge />
            </WithWrapper>
          }
        />
        {/* <Route
          path="/profile/:username"
          element={
            <WithWrapper>
              <ProfilePage />
            </WithWrapper>
          }
        /> */}
      </Route>
    </Routes>
  );
};
