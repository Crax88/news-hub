import {
  useNewsListQuery,
  NewsList as List,
  NewsItemMeta,
  NewsItemPreview,
} from "@/entities/news";

export const NewsList = () => {
  const { data: news, isLoading } = useNewsListQuery();
  return (
    <List
      isLoading={isLoading}
      news={news?.news || []}
      renderNewItem={(newItem) => {
        return (
          <NewsItemPreview
            meta={<NewsItemMeta newItem={newItem} />}
            newItem={newItem}
          />
        );
      }}
    />
  );
};
