import { NewsList } from "@/widgets/news-list";
import classes from "./home.module.css";

export const HomePage = () => {
  return (
    <div className={classes.container}>
      <NewsList />
    </div>
  );
};
