import { ReactNode } from "react";
import type { NewsItemDto } from "@/shared/api";
import { UiLink } from "@/shared/ui";
import classes from "./news-item-preview.module.css";

type Props = {
  newItem: NewsItemDto;
  meta: ReactNode;
};

export const NewsItemPreview = ({ newItem, meta }: Props) => {
  return (
    <article className={classes.new_item_preview}>
      {meta}
      <UiLink
        to={`/news/${newItem.id}`}
        className={classes.new_item_preview_link}
      >
        <h2>{newItem.title}</h2>
        <p>{newItem.body.slice(0, 150)}...</p>
        <span>Read more...</span>
      </UiLink>
    </article>
  );
};
