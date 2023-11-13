import { UiTextField, UiButton } from "@/shared/ui";
import classes from "./new-form-editor.module.css";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { NewEditorFormSchema, newFormSchema } from "../model/new-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onSubmit: (newItem: NewEditorFormSchema) => void;
  initialNew: NewEditorFormSchema;
  isLoading: boolean;
  error?: string[];
};

export const NewFormEditor = ({
  onSubmit,
  initialNew,
  isLoading,
  error,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewEditorFormSchema>({
    resolver: zodResolver(newFormSchema),
    defaultValues: initialNew,
  });
  return (
    <form className={classes.sign_in_form} onSubmit={handleSubmit(onSubmit)}>
      {error && error.length > 0 && (
        <div className={classes.sign_in_form_error}>
          {error.map((msg) => {
            return <p>{msg}</p>;
          })}
        </div>
      )}
      <UiTextField
        label="Title"
        error={errors.title?.message}
        inputProps={{
          ...register("title", { required: true }),
          autoComplete: "current-title",
        }}
      />
      <Controller
        control={control}
        name="body"
        render={({ field }) => {
          return <SimpleMDE placeholder="New text" {...field} />;
        }}
      />

      <UiButton color="primary" variant="contained" disabled={isLoading}>
        Save
      </UiButton>
    </form>
  );
};
