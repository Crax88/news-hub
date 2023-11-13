import { NewsItemDto } from "@/shared/api";
import classes from "./news-item-meta.module.css";
import { ReactNode } from "react";

type Props = {
  newItem: NewsItemDto;
  actions?: ReactNode;
};

export const NewsItemMeta = ({ newItem, actions }: Props) => {
  return (
    <div className={classes.news_item_meta}>
      <div className={classes.news_item_meta_info}>
        <p className={classes.news_item_meta_author}>{newItem.author.email}</p>
        <span className={classes.news_item_meta_date}>
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(newItem.publishDate))}
        </span>
      </div>
      <div className={classes.actions_container}>{actions}</div>
    </div>
  );
};
