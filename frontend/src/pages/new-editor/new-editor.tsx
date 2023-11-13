import { CreateNewEditor } from "@/widgets/create-new-editor";
import classes from "./new-editor.module.css";
import { useParams } from "react-router-dom";
import { EditNewEditor } from "@/widgets/edit-new-editor/edit-new-editor";
import { protectedPage } from "@/features/auth";

const Editor = () => {
  const { id = "" } = useParams();
  return (
    <div className={classes.container}>
      {!id && <CreateNewEditor />}
      {id && <EditNewEditor id={+id} />}
    </div>
  );
};

export const EditorPage = protectedPage(Editor);
