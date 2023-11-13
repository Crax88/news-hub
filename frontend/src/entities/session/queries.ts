import { getSession } from "@/shared/api";
import { useQuery, useQueryClient } from "react-query";

const sessionKey = ["session"];

export const useSessionQuery = () => {
  return useQuery({
    queryKey: sessionKey,
    queryFn: getSession,
    retry: 0,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: false,
  });
};

export const useResetSession = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.removeQueries();
    queryClient.invalidateQueries(["session"]);
  };
};
