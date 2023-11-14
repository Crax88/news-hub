import { useMemo } from "react";
import { UiTextField, UiButton } from "@/shared/ui";
import classes from "./new-form-editor.module.css";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";
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

  const options: SimpleMDEReactProps["options"] = useMemo(() => {
    return {
      spellChecker: false,
      hideIcons: ["heading"],
      showIcons: ["code", "heading-1", "heading-2", "heading-3", "table"],
      uploadImage: true,
      imageUploadFunction: async (image, onSuccess, onError) => {
        try {
          // TODO
          // Move to reqct-query and api
          const formData = new FormData();
          formData.append("file", image);
          const res = await fetch("http://localhost:4000/api/upload", {
            method: "POST",
            body: formData,
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          const data = await res.json();
          onSuccess(data.path.replace("/api/upload/storage", ""));
        } catch (error) {
          if (error instanceof Error) {
            return onError(error.message);
          } else {
            return onError("fail");
          }
        }
      },
    };
  }, []);
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
          return (
            <SimpleMDE
              id="editor"
              placeholder="New text"
              options={options}
              {...field}
            />
          );
        }}
      />

      <UiButton color="primary" variant="contained" disabled={isLoading}>
        Save
      </UiButton>
    </form>
  );
};
