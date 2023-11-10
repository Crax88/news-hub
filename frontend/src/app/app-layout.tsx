import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = ({ headerSlot }: { headerSlot?: ReactNode }) => {
  return (
    <>
      {headerSlot}
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
};
