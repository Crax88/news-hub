import {
  NewsItemMeta,
  NewsItemPreview,
  NewsList,
  useNewsListQuery,
} from "@/entities/news";
import classes from "./home.module.css";

export const HomePage = () => {
  const { data: news, isLoading } = useNewsListQuery();
  return (
    <div className={classes.container}>
      <NewsList
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
    </div>
  );
};
