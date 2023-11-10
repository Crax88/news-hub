import { ReactNode } from "react";
import classes from "./news-list.module.css";
import { NewsItemDto } from "@/shared/api";

type Props = {
  isLoading: boolean;
  news: NewsItemDto[];
  renderNewItem: (newItem: NewsItemDto) => ReactNode;
};

export const NewsList = ({ isLoading, news, renderNewItem }: Props) => {
  if (isLoading) {
    return <div className={classes.article_preview}>Loading news...</div>;
  }
  if (news.length === 0) {
    return (
      <div className={classes.article_preview}>No news are here...yet</div>
    );
  }
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      {news.map(renderNewItem)}
    </ul>
  );
};
