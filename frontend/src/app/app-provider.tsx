import { queryClient } from "@/shared/api/query-client";
import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

export function AppProvider({ children }: { children?: ReactNode }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
}
