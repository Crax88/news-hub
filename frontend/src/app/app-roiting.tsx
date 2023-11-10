import { UiHeader, UiLink, UiPageSpinner } from "@/shared/ui";
import { ReactNode, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./app-layout";
import { Navbar } from "@/widgets/navbar/navbar";

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

export const AppRouting = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout headerSlot={<UiHeader rightSlot={<Navbar />} />} />}
      >
        <Route
          index
          element={
            <WithWrapper>
              <Home />
            </WithWrapper>
          }
        />
        {/* <Route
          path="/feed"
          element={
            <WithWrapper>
              <ArticlesPage />
            </WithWrapper>
          }
        /> */}
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
        {/* <Route
          path="/article/:slug"
          element={
            <WithWrapper>
              <ArticlePage />
            </WithWrapper>
          }
        /> */}
        {/* <Route
          path="/editor/:slug"
          element={
            <WithWrapper>
              <EditorPage />
            </WithWrapper>
          }
        /> */}
        {/* <Route
          path="/editor"
          element={
            <WithWrapper>
              <EditorPage />
            </WithWrapper>
          }
        /> */}
        {/* <Route
          path="/profile/:username"
          element={
            <WithWrapper>
              <ProfilePage />
            </WithWrapper>
          }
        /> */}
        {/* <Route
          path="/profile/:username/favorited"
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
