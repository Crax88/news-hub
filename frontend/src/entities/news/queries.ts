import { createNewsItem, getNews } from "@/shared/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

const newsListKey = ["newsList"] as unknown[];

export const useNewsListQuery = () => {
  return useQuery({
    queryKey: newsListKey,
    queryFn: () => getNews(),
    keepPreviousData: true,
  });
};

export const useCreateNewsItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewsItem,
    onSettled: async () => {
      await queryClient.invalidateQueries(newsListKey);
    },
  });
};
