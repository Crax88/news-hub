import { marked } from "marked";
import { useParams } from "react-router-dom";
import classes from "./new.module.css";
import { useGetNewsItemQuery } from "@/entities/news";
import { NewMeta } from "@/widgets/article-meta";

export const NewPage = () => {
  const { id = "" } = useParams();

  const {
    data: newItem,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNewsItemQuery(+id);

  if (isLoading) {
    return <p>Loading article...</p>;
  }
  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }
  if (isSuccess) {
    const newItemBody = marked(newItem.new.body);

    return (
      <div className={classes.page}>
        <div className={classes.banner}>
          <div className={classes.container}>
            <h1>{newItem.new.title}</h1>
            <NewMeta newItem={newItem.new} />
          </div>
        </div>
        <div className={classes.container}>
          <div
            className={classes.new_item_body}
            dangerouslySetInnerHTML={{
              __html: newItemBody,
            }}
          ></div>
          <hr
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              border: "1px solid hsl(var(--clr-light-gray))",
            }}
          />
          <div
            className={classes.new_item_actions}
            style={{ justifyContent: "center" }}
          >
            <NewMeta newItem={newItem.new} />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
