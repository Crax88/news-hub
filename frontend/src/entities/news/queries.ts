import { createNewsItem, getNews, updateNewsItem } from "@/shared/api";
import { deleteNewsItem, getNewsItem } from "@/shared/api/api";
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

export const useUpdateNewsItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNewsItem,
    onSettled: async () => {
      await queryClient.invalidateQueries(newsListKey);
    },
  });
};

export const useGetNewsItemQuery = (newItemId: number) => {
  return useQuery({
    queryKey: newsListKey.concat(newItemId),
    queryFn: () => getNewsItem(newItemId),
    keepPreviousData: true,
  });
};

export const useDeleteNewsITemMutation = (newItemId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteNewsItem(newItemId),
    onSettled: async () => {
      await queryClient.invalidateQueries(newsListKey);
    },
  });
};
