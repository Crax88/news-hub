import { NewsItemDto } from "@/shared/api";
import classes from "./news-item-meta.module.css";

type Props = {
  newItem: NewsItemDto;
};

export const NewsItemMeta = ({ newItem }: Props) => {
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
    </div>
  );
};
